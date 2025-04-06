import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

// Define styles for the component
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
    height: "auto", // Dynamic height based on content
  },
  subLeftSection: {
    borderWidth: 1, // Outer border for the section
    borderColor: borderColor,
    padding: 0.5,
  },
  rightSection: {
    flex: 1,
    height: "auto", // Dynamic height based on content
  },
  subRightSection: {
    borderWidth: 1, // Outer border for the section
    borderColor: borderColor,
  },
  noteItem: {
    fontSize: 8, // Reduced font size
    marginBottom: 5,
    textAlign: "left", // Align text to the left for notes
    wordWrap: "break-word", // Wrap text properly
  },
  amountRow: {
    flexDirection: "row", // Two-column layout for label and value
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: 1,
    borderBottomColor: borderColor,
  },
  amountLabel: {
    flex: 1,
    fontSize: 10, // Label font size
    fontWeight: "bold",
    textAlign: "center", // Align label to the left
    wordWrap: "break-word",
    borderRight: 1,
    borderRightColor: borderColor,
    fontFamily: "Helvetica-Bold",
  },
  amountValue: {
    flex: 1,
    fontSize: 10, // Value font size
    fontFamily: "Helvetica-Bold",
    fontWeight: "bold",
    textAlign: "center", // Align value to the right
    wordWrap: "break-word",
  },
  line: {
    borderBottomWidth: 1,
    borderColor: borderColor,
  },
});

// The main component to render amounts and notes
const AmountsAndNotes = ({ amounts, notes = [] }) => {
  return (
    <View wrap={true}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <View style={[notes.length > 0 ? styles.subLeftSection : ""]}>
            {" "}
            {/* css only if Notes are there  */}
            {notes.length > 0 && (
              <Text
                style={{ fontSize: 10, fontWeight: "bold", marginBottom: 5 }}
              >
                Notes:
              </Text>
            )}
            {notes.map((note, index) => (
              <Text key={index} style={styles.noteItem}>
                {`${index + 1}. ${note}`}
              </Text>
            ))}
          </View>
        </View>

        {/* Right Section: Amounts */}
        {amounts.length > 0 ? (
          <View style={styles.rightSection}>
            <View style={styles.subRightSection}>
              {amounts.map((amount, index) => (
                <View key={index}>
                  {/* Amount Row (Label and Value) */}
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
        ) : null}
      </View>
    </View>
  );
};

export default AmountsAndNotes;
