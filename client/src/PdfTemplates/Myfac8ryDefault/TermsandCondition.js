import React from "react";
import {  StyleSheet, Text, View } from "@react-pdf/renderer";

// Styles for the component
let borderColor = "#ddd"
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
    borderBottom: 1,
    borderBottomColor: borderColor,
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

// TermsAndConditions component
const TermsAndConditions = ({ terms = [] }) => {
  if (terms.length === 0) return null; // Do not render if terms are empty
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>
      <View style={styles.table}>
        {terms.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.cellLabel,]}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 8,  marginBottom: 5, textAlign: "left", wordWrap: "break-word"}} >
                {`${index+1}.  ${item?.value}`}
              </Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TermsAndConditions;
