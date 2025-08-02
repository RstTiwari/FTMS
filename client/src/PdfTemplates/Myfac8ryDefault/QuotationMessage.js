import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  messageContainer: {
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    borderBottom:1,
    borderBottomColor: "#000000",
  },
  messageText: {
    fontSize: 10,
    fontFamily: "Helvetica",
    textAlign: "left",
    lineHeight: 1.5,
  },
});

// Component
const QuotationMessage = ({ entity ,message}) => {
  if (entity !== "quotations" || !message) return null;

  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>
       {
        message
       }
      </Text>
    </View>
  );
};

export default QuotationMessage;
