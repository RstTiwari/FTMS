import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

// Define border color
const borderColor = "#ddd";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  sectionWrapper: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 3,
    padding: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    fontWeight: 1000,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  itemText: {
    fontSize: 10,
    fontFamily: "Helvetica",
    textAlign: "left",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  itemBullet: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    marginRight: 4,
  },
});

const TermsAndNotes = ({ terms = [], notes = [] }) => {
  const hasTerms = terms.length > 0;
  const hasNotes = notes.length > 0;

  if (!hasTerms && !hasNotes) return null;

  return (
    <View style={styles.container}>
      {/* Terms Section */}
      {hasTerms && (
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Terms and Conditions</Text>
          {terms.map((term, index) => (
            <Text key={index} style={styles.itemText}>
              <Text style={styles.itemBullet}>{`${index + 1}. `}</Text>
              {term?.value}
            </Text>
          ))}
        </View>
      )}

      {/* Notes Section */}
      {hasNotes && (
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Notes</Text>
          {notes.map((note, index) => (
            <Text key={index} style={styles.itemText}>
              <Text style={styles.itemBullet}>{`${index + 1}. `}</Text>
              {note}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default TermsAndNotes;
