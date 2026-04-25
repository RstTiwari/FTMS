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
    borderColor: "#000",
  },
  tableCell: {
    padding: 2,
    borderRightWidth: 1,
    borderColor: "#000",
    flexGrow: 1,
    wordBreak: "break-word",
  },


  header: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#BFF0FD",
  },

  cellText: {
    fontSize: 8,
    flexWrap: "wrap",
    fontFamily: "Helvetica",
  },
});

const ItemsTable = ({ items, columns }) => {
  return (
    <>
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

      {items.map((item, itemIndex) => (
        <View
          key={item._id || itemIndex}
          style={styles.tableRow}
          wrap={false}   // ✅ prevent row breaking
        >
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