import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

// Define custom styles
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid #ddd",
  },
  entityName: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#000",
    fontWeight: 1000,
    borderBottom: "1px solid #000",
  },
  group: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupItem: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1, // Ensures items grow equally to fill the row
    flexBasis: "30%", // Ensures the items have a base width
    flexShrink: 0, // Prevents items from shrinking smaller than the base width
    paddingLeft: 10,
    wordWrap: "break-word", // Ensures text wraps within the div
  },
  heading: {
    fontSize: 10,
    color: "#42cbf5",
    fontFamily: "Helvetica-Bold",
    fontWeight: "heavy",
    marginBottom: 2,
  },
  subheading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    fontWeight: "heavy",
    color: "#000",
    marginBottom: 2,
  },
  label: {
    fontSize: 8,
    color: "#000",
    marginBottom: 2,
    wordWrap: "break-word", // Ensures label text wraps within the div
  },
  value: {
    fontSize: 8,
    color: "#000",
    wordWrap: "break-word", // Ensures value text wraps within the div
  },
  borderLeft: {
    borderLeft: "1px solid #000",
  },
});

const EntityDetails = ({ data,entityName }) => {
  // Determine how many sections to show based on the data length
  const sections = data.slice(0, Math.min(data.length, 3)); // Limit to max 3 sections
  return (
    <View style={styles.container}>
      <Text style={styles.entityName}>{entityName}</Text>
      <View style={styles.group}>
        {sections.map((group, index) => (
          <View
            key={index}
            style={[
              styles.groupItem,
              index !== 0 && styles.borderLeft, // Add left border to items except the first one
            ]}
          >
            {group.map((item, idx) => (
              <View key={idx}>
                <Text
                  style={
                    item.type === "heading"
                      ? styles.heading
                      : item.type === "subheading"
                      ? styles.subheading
                      : styles.label
                  }
                >
                  {item.label}
                </Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default EntityDetails;
