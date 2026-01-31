import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const borderColor = "#000";
const TAX_COL_FLEX = 1.4;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },

  /* LEFT BANK */
  subLeftSection: {
    borderWidth: 1,
    borderColor,
    borderStyle: "solid",
    shadowColor: "transparent",
    shadowOpacity: 0,
    paddingLeft:1
  },

  /* TAX TABLE */
  taxSection: { paddingHorizontal: 0 },
  taxTable: {
    borderWidth: 1,
    borderColor,
    borderStyle: "solid",
    shadowColor: "transparent",
    shadowOpacity: 0,
  },
  taxTitleRow: {
    borderBottomWidth: 1,
    borderColor,
    borderStyle: "solid",
    fontSize: 8,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    paddingVertical: 2,
  },
  taxRow: {
    flexDirection: "row",
  },
  cell: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor,
    borderStyle: "solid",
    shadowColor: "transparent",
    shadowOpacity: 0,
    fontSize: 7,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },

  rateCell: { flex: TAX_COL_FLEX / 2 },
  amountCell: { flex: TAX_COL_FLEX / 2 },
  totalCell: {
    flex: TAX_COL_FLEX / 2,
    borderRightWidth: 0,
  },

  totalRow: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
  },

  /* RIGHT AMOUNTS */
  rightSection: { padding: 0 },
  subRightSection: {
    borderWidth: 1,
    borderColor,
    borderStyle: "solid",
    shadowColor: "transparent",
    shadowOpacity: 0,
  },
  amountRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor,
    borderStyle: "solid",
    shadowColor: "transparent",
    shadowOpacity: 0,
  },
  amountLabel: {
    flex: 1.3,
    fontSize: 10,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor,
    fontFamily: "Helvetica-Bold",
  },
  amountValue: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  totalText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    textAlign: "center",
  },
});

const AmountAndBank = ({
  amounts = [],
  bankDetails = {},
  taxValues = {},
}) => {
  const hasCGST = taxValues.CGST?.some((t) => t.amount > 0);
  const hasSGST = taxValues.SGST?.some((t) => t.amount > 0);
  const hasIGST = taxValues.IGST?.some((t) => t.amount > 0);

  const showTaxTable = hasCGST || hasSGST || hasIGST;

  const leftWidth = showTaxTable ? "30%" : "50%";
  const taxWidth = showTaxTable ? "40%" : "0%";
  const rightWidth = showTaxTable ? "30%" : "50%";

  const normalizeTax = (arr = []) => {
    const map = {};
    arr.forEach(({ rate, amount }) => {
      if (!map[rate]) map[rate] = 0;
      map[rate] += Number(amount || 0);
    });
    return Object.entries(map)
      .map(([rate, amount]) => ({ rate: Number(rate), amount }))
      .sort((a, b) => a.rate - b.rate);
  };

  const cgstRows = normalizeTax(taxValues.CGST);
  const sgstRows = normalizeTax(taxValues.SGST);
  const igstRows = normalizeTax(taxValues.IGST);

  const allRates = [
    ...new Set([
      ...cgstRows.map((i) => i.rate),
      ...sgstRows.map((i) => i.rate),
      ...igstRows.map((i) => i.rate),
    ]),
  ].sort((a, b) => a - b);

  let totalCGST = 0;
  let totalSGST = 0;
  let totalIGST = 0;
  let grandTotal = 0;

  return (
    <View wrap style={styles.container}>
      {/* LEFT BANK */}
      <View style={[styles.leftSection, { width: leftWidth }]}>
        <View style={styles.subLeftSection}>
          {Object.entries(bankDetails).map(([k, v], i) => (
            <Text key={i} style={{ fontSize: 9 }}>
              {k}: {v || "-"}
            </Text>
          ))}
        </View>
      </View>

      {/* TAX TABLE */}
      {showTaxTable && (
        <View style={{ width: taxWidth }}>
          <View style={styles.taxTable}>
            <Text style={styles.taxTitleRow}>TAX SUMMARY</Text>

            {/* HEADER */}
            <View style={styles.taxRow}>
              {hasCGST && <Text style={[styles.cell, { flex: TAX_COL_FLEX }]}>CGST</Text>}
              {hasSGST && <Text style={[styles.cell, { flex: TAX_COL_FLEX }]}>SGST</Text>}
              {hasIGST && <Text style={[styles.cell, { flex: TAX_COL_FLEX }]}>IGST</Text>}
              <Text style={[styles.cell, styles.totalCell]}>TOTAL</Text>
            </View>

            {/* SUB HEADER */}
            <View style={styles.taxRow}>
              {hasCGST && <>
                <Text style={[styles.cell, styles.rateCell]}>Rate</Text>
                <Text style={[styles.cell, styles.amountCell]}>Amount</Text>
              </>}
              {hasSGST && <>
                <Text style={[styles.cell, styles.rateCell]}>Rate</Text>
                <Text style={[styles.cell, styles.amountCell]}>Amount</Text>
              </>}
              {hasIGST && <>
                <Text style={[styles.cell, styles.rateCell]}>Rate</Text>
                <Text style={[styles.cell, styles.amountCell]}>Amount</Text>
              </>}
              <Text style={[styles.cell, styles.totalCell]} />
            </View>

            {/* DATA ROWS */}
            {allRates.map((rate, i) => {
              const cgst = cgstRows.find((x) => x.rate === rate)?.amount || 0;
              const sgst = sgstRows.find((x) => x.rate === rate)?.amount || 0;
              const igst = igstRows.find((x) => x.rate === rate)?.amount || 0;
              const rowTotal = cgst + sgst + igst;

              totalCGST += cgst;
              totalSGST += sgst;
              totalIGST += igst;
              grandTotal += rowTotal;

              return (
                <View key={i} style={styles.taxRow}>
                  {hasCGST && <>
                    <Text style={[styles.cell, styles.rateCell]}>{cgst ? `${rate}%` : "-"}</Text>
                    <Text style={[styles.cell, styles.amountCell]}>{cgst || "-"}</Text>
                  </>}
                  {hasSGST && <>
                    <Text style={[styles.cell, styles.rateCell]}>{sgst ? `${rate}%` : "-"}</Text>
                    <Text style={[styles.cell, styles.amountCell]}>{sgst || "-"}</Text>
                  </>}
                  {hasIGST && <>
                    <Text style={[styles.cell, styles.rateCell]}>{igst ? `${rate}%` : "-"}</Text>
                    <Text style={[styles.cell, styles.amountCell]}>{igst || "-"}</Text>
                  </>}
                  <Text style={[styles.cell, styles.totalCell]}>{rowTotal || "-"}</Text>
                </View>
              );
            })}

            {/* TOTAL ROW */}
            <View style={styles.totalRow}>
              {hasCGST && <>
                <Text style={[styles.cell, styles.rateCell, styles.totalText]}>TOTAL</Text>
                <Text style={[styles.cell, styles.amountCell, styles.totalText]}>{totalCGST}</Text>
              </>}
              {hasSGST && <>
                <Text style={[styles.cell, styles.rateCell]} />
                <Text style={[styles.cell, styles.amountCell, styles.totalText]}>{totalSGST}</Text>
              </>}
              {hasIGST && <>
                <Text style={[styles.cell, styles.rateCell]} />
                <Text style={[styles.cell, styles.amountCell, styles.totalText]}>{totalIGST}</Text>
              </>}
              <Text style={[styles.cell, styles.totalCell, styles.totalText]}>{grandTotal}</Text>
            </View>
          </View>
        </View>
      )}

      {/* RIGHT AMOUNTS */}
      <View style={[styles.rightSection, { width: rightWidth }]}>
        <View style={styles.subRightSection}>
          {amounts.map((a, i) => (
            <View key={i} style={styles.amountRow}>
              <Text style={styles.amountLabel}>{a.label}</Text>
              <Text style={styles.amountValue}>{a.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AmountAndBank;
