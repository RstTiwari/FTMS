import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const borderColor = "#000";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor,
    borderStyle: "solid",
  },

  /* LEFT BANK (65%) */
  leftSection: {
    width: "65%",
    borderRightWidth: 1,
    borderColor,
    padding: 6,
  },

  bankTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold", // ✅ Bank title bold
    marginBottom: 4,
  },

  bankRow: {
    flexDirection: "row",
    marginBottom: 2,
  },

  bankLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },

  bankValue: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold", // ✅ All values bold
  },

  /* RIGHT AMOUNTS (35%) */
  rightSection: {
    width: "35%",
  },

  amountRow: {
    flexDirection: "row",
    borderBottomWidth:  1,
    borderColor,
  },

  amountLabel: {
    flex: 1,
    fontSize: 8,
    textAlign: "right",
    paddingRight: 4,
    borderRightWidth: 1,   // ✅ Divider between label & value
    borderColor,
    fontFamily: "Helvetica",
  },

  amountValue: {
    flex: 1,
    fontSize: 8,
    textAlign: "center",
    paddingLeft: 4,
  },

  lastRowBold: {
    fontFamily: "Helvetica-Bold",
  },
});

const AmountAndBank = ({
  amounts = [],
  bankDetails = {},
  bankTitle = "Bank Details",
  amountInWords
}) => {
  return (
    <View wrap ={false} style={styles.container}>
      
      {/* LEFT BANK */}
      <View style={styles.leftSection}>
        {Object.entries(bankDetails).map(([k, v], i) => (
          <View key={i} style={styles.bankRow}>
            <Text style={styles.bankLabel}>{k}: </Text>
            <Text style={styles.bankValue}>{v || "-"}</Text>
          </View>
        ))}
      </View>

      {/* RIGHT AMOUNTS */}
      <View style={styles.rightSection}>
        {amounts.map((a, i) => {
          const isLast = i === amounts.length - 1;

          return (
            <View key={i} style={[styles.amountRow]}>
              <Text
                style={[
                  styles.amountLabel,
                  isLast && styles.lastRowBold, // ✅ Last row bold
                ]}
              >
                {a.label}
              </Text>

              <Text
                style={[
                  styles.amountValue,
                  isLast && styles.lastRowBold,
                ]}
              >
                {a.value}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AmountAndBank;
