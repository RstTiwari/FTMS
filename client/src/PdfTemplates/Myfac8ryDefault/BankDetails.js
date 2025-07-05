import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

// Styles for the component
let borderColor = "#ddd";
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    border: 1,
    borderColor: borderColor,
    padding: 2,
  },
  heading: {
    paddingLeft: 5,
    paddingTop: 5,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    fontWeight: 1000,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    padding: 5,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    padding: 1,
  },
  tableCell: {
    flex: 1,
    fontSize: 8,
  },
  cellLabel: {
    fontWeight: "bold",
  },
});

// BankDetails component
const BankDetails = ({ entity, bankDetails }) => {
  let enabled = ["invoices" ,"quotations"]
  if (entity !== "invoices" && entity !== "quotations") return null; // Only render if entity is 'invoices'

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bank Details</Text>
      <View style={styles.table}>
        {Object.entries(bankDetails).map(([key, value], index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.cellLabel]}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {key.toUpperCase()}
              </Text>
              : {value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BankDetails;
