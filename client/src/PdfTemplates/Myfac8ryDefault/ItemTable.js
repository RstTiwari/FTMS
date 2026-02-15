import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  tableCell: {
    padding: 4,
    borderRightWidth: 1,
    borderColor: "#ddd",
    flexGrow: 1,
  },

  /* HEADER TEXT STYLE */
  headerText: {
    fontSize: 6,                     
    fontFamily: "Helvetica-Bold",   
  },

  /* CELL TEXT STYLE */
  cellText: {
    fontSize: 6,                   
    fontFamily: "Helvetica",
  },

  headerRow: {
    backgroundColor: "#f0f0f0",
  },
});

const ItemsTable = ({ items, columns }) => {
  return (
    <View style={styles.table}>
      
      {/* HEADER */}
      <View style={[styles.tableRow, styles.headerRow]}>
        {columns.map((col, index) => (
          <View
            key={index}
            style={[
              styles.tableCell,
              {
                width: col.width,
                borderRightWidth:
                  index === columns.length - 1 ? 0 : 1,
              },
            ]}
          >
            <Text style={styles.headerText}>
              {col.title}
            </Text>
          </View>
        ))}
      </View>

      {/* BODY */}
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
                  style={{ width: 25, height: 25 }}
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
    </View>
  );
};

export default ItemsTable;
