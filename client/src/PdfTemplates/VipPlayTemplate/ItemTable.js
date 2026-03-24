import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";

// ✅ Updated styles
const styles = StyleSheet.create({
  table: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000", // ✅ black border
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000", // ✅ black
  },
  tableCell: {
    padding: 2,
    borderRightWidth: 1,
    borderColor: "#000", // ✅ black
    flexGrow: 1,
    wordBreak: "break-word",
  },

  // ✅ MATCHED with InvoiceTable
  header: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#BFF0FD", // ✅ same blue
  },

  cellText: {
    fontSize: 8,
    flexWrap: "wrap",
    fontFamily: "Helvetica", // ✅ correct font (fix from fontStyle)
  },
});

const ItemsTable = ({ items, columns }) => {
  return (
    <>
      {/* ✅ HEADER */}
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

      {/* ✅ ROWS */}
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

              ) : col.property === "gstPercent" ? (
                <Text style={{ fontSize: 8 }}>
                  {item.gstType
                    ? `${item.gstPercent}%`
                    : item[col.property]}
                </Text>

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