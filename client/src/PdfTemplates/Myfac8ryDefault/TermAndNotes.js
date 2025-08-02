import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

// Define border color
const borderColor = "#ddd";

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  sectionWrapper: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 0, // remove side padding
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    fontWeight: 1000,
    paddingVertical: 3,
    paddingHorizontal: 4,
    backgroundColor: "#f0f0f0", // Background color added
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 2,
  },
  itemBox: {
    borderTopWidth: 1,
    borderColor: borderColor,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  itemText: {
    fontSize: 9.5,
    fontFamily: "Helvetica",
    lineHeight: 1.3,
  },
  itemBullet: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    marginRight: 4,
  },
});

const TermsAndNotes = ({ terms = [], notes = [], specification = [] }) => {
  const hasTerms = terms.length > 0;
  const hasNotes = notes.length > 0;
  const hasSpecification = specification.length > 0;

  if (!hasTerms && !hasNotes && !hasSpecification) return null;

  return (
    <View style={styles.container}>
      {/* Terms Section */}
      {hasTerms && (
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Terms and Conditions</Text>
          {terms.map((term, index) => (
            <View key={index} style={styles.itemBox}>
              <Text style={styles.itemText}>
                <Text style={styles.itemBullet}>{`${index + 1}. `}</Text>
                {term?.value}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Specification Section */}
      {hasSpecification && (
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Technical Specification</Text>
          {specification.map((spec, index) => (
            <View key={index} style={styles.itemBox}>
              <Text style={styles.itemText}>
                <Text style={styles.itemBullet}>{`${index + 1}. `}</Text>
                {spec?.value}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Notes Section */}
      {hasNotes && (
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Notes</Text>
          {notes.map((note, index) => (
            <View key={index} style={styles.itemBox}>
              <Text style={styles.itemText}>
                <Text style={styles.itemBullet}>{`${index + 1}. `}</Text>
                {note}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default TermsAndNotes;
