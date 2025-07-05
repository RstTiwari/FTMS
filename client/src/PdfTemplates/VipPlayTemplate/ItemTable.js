import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";

// Define styles for the table
const styles = StyleSheet.create({
  table: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderColor: "#ddd",
    flexGrow: 1,
    wordBreak: "break-word",
  },
  header: {
    fontSize: 6,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  cellText: {
    fontSize: 8,
    flexWrap: "wrap",
    fontWeight:"bold",
    fontStyle:"Helvetica-Bold"
  },
});

// Component to display items in a table format with wrapping
const ItemsTable = ({ items, columns }) => {
  return (
      <>
          {/* Render table headers */}
          <View style={[styles.tableRow, styles.header]}>
              {columns.map((col, index) => (
                  <Text
                      key={index}
                      style={[
                          styles.tableCell,
                          {
                              width: col.width,
                              borderRightWidth:
                                  index === columns.length - 1 ? 0 : 1,
                          },
                      ]}
                      wrap
                  >
                      {col.title}
                  </Text>
              ))}
          </View>

          {/* Render table rows */}
          {items.map((item, itemIndex) => (
              <View key={item._id || itemIndex} style={styles.tableRow}>
                  {columns.map((col, colIndex) => (
                      <View
                          key={colIndex}
                          style={[
                              styles.tableCell,
                              {
                                  width: col.width,
                                  borderRightWidth:
                                      colIndex === columns.length - 1 ? 0 : 1,
                              },
                          ]}
                      >
                          {col.property === "srNo" ? (
                              <Text style={styles.cellText}>
                                  {itemIndex + 1}
                              </Text>
                          ) : col.property === "image" && item.image ? (
                              <Image
                                  style={{ width: 60, height: 60 }}
                                  src={item.image}
                              />
                          ) : (
                              <Text style={styles.cellText} wrap>
                                  {item[col.property]}
                              </Text>
                          )}
                      </View>
                  ))}
              </View>
          ))}
      </>
  );
};

export default ItemsTable;
