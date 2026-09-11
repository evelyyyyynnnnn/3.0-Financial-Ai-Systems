"""The property this project exists to get right.

Realised volatility is easy to fit and easy to fit dishonestly. The model can
only be evidence of anything if nothing from the test period reaches the
training data -- not a label, and not a scaling statistic.

The scaler used to be fitted with fit_transform over the whole series, so the
minimum and maximum of the test tail were baked into every training feature.
The first test below fails against that version.
"""
import numpy as np

from conftest import price_frame


def test_changing_only_the_future_leaves_the_training_data_untouched(loader):
    """Shift the last 10% of the series by 10x. That period is test data. If
    any of it reaches the training tensor, the split is not a split."""
    baseline, _, _, y_base, _, _ = loader(price_frame()).get_train_val_test_split()
    shocked, _, _, y_shock, _, _ = loader(
        price_frame(tail_shock=10.0)).get_train_val_test_split()

    assert baseline.shape == shocked.shape
    assert np.allclose(baseline, shocked), (
        "the future changed the past: max difference "
        f"{np.abs(baseline - shocked).max():.4f}")
    assert np.allclose(y_base, y_shock)


def test_the_scaler_is_fitted_only_on_rows_the_training_split_reaches(loader):
    ld = loader()
    ld.get_train_val_test_split()

    n_rows = len(ld.raw_data)
    ws = ld.config.window_size
    n_sequences = n_rows - ws
    highest_training_row = int(n_sequences * ld.config.train_ratio) + ws

    assert ld.scaler_fitted_on_rows == highest_training_row
    assert ld.scaler_fitted_on_rows < n_rows


def test_the_split_is_chronological_and_never_shuffled(loader):
    """Each split must start where the previous one ended, in order."""
    ld = loader()
    X, y = ld.prepare_data()
    X_tr, X_val, X_te, y_tr, y_val, y_te = ld.get_train_val_test_split()

    assert len(X_tr) + len(X_val) + len(X_te) == len(X)
    assert np.array_equal(X_tr, X[:len(X_tr)])
    assert np.array_equal(X_val, X[len(X_tr):len(X_tr) + len(X_val)])
    assert np.array_equal(X_te, X[len(X_tr) + len(X_val):])
    assert np.array_equal(np.concatenate([y_tr, y_val, y_te]), y)


def test_every_target_comes_from_after_its_own_feature_window(loader):
    """Sequence i must predict the target one step beyond the rows it saw."""
    ld = loader()
    features = ld.add_technical_indicators(ld.raw_data)
    cols = ["Close", "Volume"] + ld.indicator_columns
    target = ld.calculate_volatility(ld.raw_data).ffill().bfill()

    X, y = ld._create_sequences(features[cols].ffill().bfill(), target)

    ws = ld.config.window_size
    for i in (0, 5, len(X) - 1):
        assert np.allclose(X[i], features[cols].ffill().bfill().iloc[i:i + ws].values)
        assert y[i] == target.iloc[i + ws]


def test_backfilling_the_target_never_reaches_a_target_that_is_used(loader):
    """The volatility series is NaN during its rolling warm-up and is filled
    backwards, which copies a later value into an earlier slot. That is only
    safe while the warm-up ends before the first target the model sees."""
    ld = loader()
    raw_vol = ld.calculate_volatility(ld.raw_data)

    first_valid_row = int(raw_vol.notna().to_numpy().argmax())
    first_row_used_as_a_target = ld.config.window_size

    assert first_valid_row <= first_row_used_as_a_target, (
        f"volatility is still warming up at row {first_row_used_as_a_target}; "
        "a back-filled value would be used as a training label")
