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
    marginBottom:1,
    textTransform: "uppercase",
    textAlign: "center", // Center title text
  },
  itemBox: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 2,
    padding:1,
    marginBottom:1,
  },
  itemText: {
    fontSize: 10,
    fontFamily: "Helvetica",
    textAlign: "left",
    lineHeight: 1.4,
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
