
# ===========================================================
# —— 组合器：把多策略权重合成（等权或自定义权重），T+1 对齐 ——
# ===========================================================
def combine_weights(weights_list: List[pd.DataFrame], scheme: List[float] = None,
                    max_weight: float = 0.35) -> pd.DataFrame:
    # 对不同策略的权重按时间并集对齐，缺失填0，按 scheme 相加并归一，最后做单票上限并把剩余给现金
    names = sorted(set(sum([list(w.columns) for w in weights_list if w is not None and not w.empty], [])))
    if CASH not in names: 
        names.append(CASH)
    idx = sorted(set(sum([list(w.index) for w in weights_list if w is not None and not w.empty], [])))
    stack = []
    for w in weights_list:
        if w is None or w.empty:
            continue
        stack.append(w.reindex(index=idx, columns=names).fillna(0.0))
    if not stack:
        return pd.DataFrame()
    scheme = scheme or [1.0/len(stack)]*len(stack)
    W = sum(s*st for s,st in zip(scheme, stack))
    # 行内归一
    W = W.div(W.sum(axis=1).replace(0, np.nan), axis=0).fillna(0.0)
    # 单票上限 + 现金兜底
    nm = [c for c in W.columns if c != CASH]
    W[nm] = W[nm].clip(0, max_weight)
    W[CASH] += (1.0 - W.sum(axis=1))
    return W