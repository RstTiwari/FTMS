import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

let borderColor = "#ddd";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 2,
  },
  leftSection: {
    flex: 1,
    marginRight: 10,
    padding: 0.5,
    height: "auto",
  },
  subLeftSection: {
    borderWidth: 1,
    borderColor: borderColor,
    padding: 5,
  },
  rightSection: {
    flex: 1,
    height: "auto",
  },
  subRightSection: {
    borderWidth: 1,
    borderColor: borderColor,
  },
  bankItemLabel: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 3,
    fontFamily: "Helvetica-Bold",
  },
  bankItemValue: {
    fontSize: 9,
    marginBottom: 6,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: 1,
    borderBottomColor: borderColor,
  },
  amountLabel: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRight: 1,
    borderRightColor: borderColor,
    fontFamily: "Helvetica-Bold",
  },
  amountValue: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
});

const AmountAndBank = ({ amounts = [], bankDetails = {}, panNo = "", entity }) => {
  const allowedEntities = ["invoices", "quotations", "purchase", "challans"];

  const shouldShowBankDetails = allowedEntities.includes(entity);

  return (
    <View wrap={true}>
      <View style={styles.container}>
        {/* ✅ Conditionally render Left: Bank Info */}
        {shouldShowBankDetails && (
          <View style={styles.leftSection}>
            <View style={styles.subLeftSection}>
              {Object.entries(bankDetails).map(([label, value], index) => (
                <View key={index}>
                  <Text style={styles.bankItemLabel}>
                    {label}: {value || "-"}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Right: Amounts */}
        {amounts.length > 0 && (
          <View style={styles.rightSection}>
            <View style={styles.subRightSection}>
              {amounts
                .filter((amount) => entity === "quotations" || amount.value > 0)
                .map((amount, index) => (
                  <View key={index}>
                    <View style={styles.amountRow}>
                      <Text style={styles.amountLabel}>
                        {amount.label.toUpperCase()}
                      </Text>
                      <Text style={styles.amountValue}>{amount.value}</Text>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default AmountAndBank;
