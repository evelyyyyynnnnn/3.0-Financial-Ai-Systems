#!/usr/bin/env python3
"""Offline tests for the 13F parser and the derived columns.

These run without network access, which matters: the job itself only ever runs
on a GitHub runner, so the parsing rules need to be pinned down somewhere that
can be executed locally when the filing shapes change.

    python -m unittest test_edgar_13f -v
"""

import unittest

import edgar_13f as e

# A 13F information table in the shape EDGAR actually serves: default namespace
# on the root, one issuer split across two manager lots, an option position, and
# a bond position. Values here are in whole dollars (post-2023 filings).
INFO_TABLE = b"""<?xml version="1.0" encoding="UTF-8"?>
<informationTable xmlns="http://www.sec.gov/edgar/document/thirteenf/informationtable">
  <infoTable>
    <nameOfIssuer>APPLE INC</nameOfIssuer>
    <titleOfClass>COM</titleOfClass>
    <cusip>037833100</cusip>
    <value>40000000</value>
    <shrsOrPrnAmt><sshPrnamt>200000</sshPrnamt><sshPrnamtType>SH</sshPrnamtType></shrsOrPrnAmt>
    <investmentDiscretion>SOLE</investmentDiscretion>
    <votingAuthority><Sole>200000</Sole><Shared>0</Shared><None>0</None></votingAuthority>
  </infoTable>
  <infoTable>
    <nameOfIssuer>APPLE INC</nameOfIssuer>
    <titleOfClass>COM</titleOfClass>
    <cusip>037833100</cusip>
    <value>10000000</value>
    <shrsOrPrnAmt><sshPrnamt>50000</sshPrnamt><sshPrnamtType>SH</sshPrnamtType></shrsOrPrnAmt>
    <investmentDiscretion>DFND</investmentDiscretion>
    <votingAuthority><Sole>50000</Sole><Shared>0</Shared><None>0</None></votingAuthority>
  </infoTable>
  <infoTable>
    <nameOfIssuer>COCA COLA CO</nameOfIssuer>
    <titleOfClass>COM</titleOfClass>
    <cusip>191216100</cusip>
    <value>25000000</value>
    <shrsOrPrnAmt><sshPrnamt>400000</sshPrnamt><sshPrnamtType>SH</sshPrnamtType></shrsOrPrnAmt>
    <investmentDiscretion>SOLE</investmentDiscretion>
    <votingAuthority><Sole>400000</Sole><Shared>0</Shared><None>0</None></votingAuthority>
  </infoTable>
  <infoTable>
    <nameOfIssuer>TESLA INC</nameOfIssuer>
    <titleOfClass>COM</titleOfClass>
    <cusip>88160R101</cusip>
    <value>9999999</value>
    <shrsOrPrnAmt><sshPrnamt>1000</sshPrnamt><sshPrnamtType>SH</sshPrnamtType></shrsOrPrnAmt>
    <putCall>Put</putCall>
    <investmentDiscretion>SOLE</investmentDiscretion>
  </infoTable>
  <infoTable>
    <nameOfIssuer>SOME CORP NOTE 5.5 2030</nameOfIssuer>
    <titleOfClass>NOTE</titleOfClass>
    <cusip>123456789</cusip>
    <value>7777777</value>
    <shrsOrPrnAmt><sshPrnamt>7000000</sshPrnamt><sshPrnamtType>PRN</sshPrnamtType></shrsOrPrnAmt>
    <investmentDiscretion>SOLE</investmentDiscretion>
  </infoTable>
</informationTable>
"""

# The same portfolio as an older filing would express it: values in thousands.
INFO_TABLE_THOUSANDS = INFO_TABLE.replace(
    b"<value>40000000</value>", b"<value>40000</value>"
).replace(
    b"<value>10000000</value>", b"<value>10000</value>"
).replace(
    b"<value>25000000</value>", b"<value>25000</value>"
)


class TestParsing(unittest.TestCase):
    def setUp(self):
        self.positions = e.parse_information_table(INFO_TABLE, "2026-03-31")
        self.by_name = {p.issuer: p for p in self.positions}

    def test_options_and_bonds_are_excluded(self):
        self.assertNotIn("TESLA INC", self.by_name, "putCall rows are options, not shares")
        self.assertNotIn("SOME CORP NOTE 5.5 2030", self.by_name, "PRN rows are debt")
        self.assertEqual(len(self.positions), 2)

    def test_lots_of_the_same_issuer_are_summed(self):
        apple = self.by_name["APPLE INC"]
        self.assertEqual(apple.value, 50_000_000)
        self.assertEqual(apple.shares, 250_000)

    def test_namespace_is_stripped(self):
        self.assertEqual(self.by_name["COCA COLA CO"].cusip, "191216100")


class TestValueScaling(unittest.TestCase):
    def test_thousands_are_scaled_to_dollars(self):
        positions = e.parse_information_table(INFO_TABLE_THOUSANDS, "2018-03-31")
        by_name = {p.issuer: p for p in positions}
        self.assertEqual(by_name["APPLE INC"].value, 50_000_000)

    def test_dollars_are_left_alone(self):
        positions = e.parse_information_table(INFO_TABLE, "2026-03-31")
        by_name = {p.issuer: p for p in positions}
        self.assertEqual(by_name["APPLE INC"].value, 50_000_000)

    def test_a_thousands_filing_after_the_cutoff_is_still_caught(self):
        """The period says dollars but the prices say otherwise; prices win."""
        positions = e.parse_information_table(INFO_TABLE_THOUSANDS, "2026-03-31")
        by_name = {p.issuer: p for p in positions}
        self.assertEqual(by_name["APPLE INC"].value, 50_000_000)


class TestDerivedColumns(unittest.TestCase):
    def setUp(self):
        self.filing = e.Filing(
            cik="0001067983",
            accession="0000000000-26-000001",
            period="2026-03-31",
            positions=e.parse_information_table(INFO_TABLE, "2026-03-31"),
        )

    def test_percentages_sum_to_one_hundred(self):
        rows = e.derive_rows(self.filing, None)
        self.assertAlmostEqual(sum(r["pct"] for r in rows), 100.0, places=1)

    def test_price_is_value_over_shares(self):
        rows = {r["company"]: r for r in e.derive_rows(self.filing, None)}
        self.assertAlmostEqual(rows["APPLE INC"]["price"], 200.0, places=2)
        self.assertAlmostEqual(rows["COCA COLA CO"]["price"], 62.5, places=2)

    def test_rows_are_ordered_by_value(self):
        rows = e.derive_rows(self.filing, None)
        self.assertEqual(rows[0]["company"], "APPLE INC")

    def test_change_is_blank_without_a_prior_quarter(self):
        rows = e.derive_rows(self.filing, None)
        self.assertTrue(all(r["change_pct"] is None for r in rows))

    def test_activity_classification(self):
        prior = {"APPLE INC": 200_000, "COCA COLA CO": 400_000, "OLD HOLDING": 10}
        rows = {r["company"]: r for r in e.derive_rows(self.filing, prior)}
        self.assertEqual(rows["APPLE INC"]["activity"], "Add")      # 200k -> 250k
        self.assertAlmostEqual(rows["APPLE INC"]["change_pct"], 25.0, places=2)
        self.assertEqual(rows["COCA COLA CO"]["activity"], "Unchanged")

    def test_a_position_absent_last_quarter_is_a_buy(self):
        rows = {r["company"]: r for r in e.derive_rows(self.filing, {"COCA COLA CO": 400_000})}
        self.assertEqual(rows["APPLE INC"]["activity"], "Buy")
        self.assertIsNone(rows["APPLE INC"]["change_pct"])


class TestGuards(unittest.TestCase):
    def test_empty_table_yields_nothing(self):
        empty = b'<informationTable xmlns="http://www.sec.gov/edgar/document/thirteenf/informationtable"/>'
        self.assertEqual(e.parse_information_table(empty, "2026-03-31"), [])

    def test_zero_total_value_is_refused(self):
        filing = e.Filing(cik="x", accession="y", period="2026-03-31",
                          positions=[e.Position("X", "c", 0.0, 100.0)])
        with self.assertRaises(RuntimeError):
            e.derive_rows(filing, None)

    def test_quarter_labels(self):
        self.assertEqual(e.quarter_label("2026-03-31"), "Q1 2026")
        self.assertEqual(e.quarter_label("2026-06-30"), "Q2 2026")
        self.assertEqual(e.quarter_label("2026-12-31"), "Q4 2026")


if __name__ == "__main__":
    unittest.main(verbosity=2)
