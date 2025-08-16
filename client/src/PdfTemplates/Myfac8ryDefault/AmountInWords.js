// AmountInWords.js
import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderTop: 1,
    borderBottom: 1,
    borderColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
});

const AmountInWords = ({ amount, entity }) => {
  const allowedEntities = ["quotations", "invoices", "purchase", "challans"];

  if (!allowedEntities.includes(entity)) {
    return null; // Do not render anything
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Amount in Words: {amount}</Text>
    </View>
  );
};

export default AmountInWords;
