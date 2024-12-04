import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  header: {
    backgroundColor: "#f1f1f1",
    fontWeight: "bold",
  },
  cellText: {
    fontSize: 14,
  },
  nestedTable: {
    marginLeft: 20,
  },
});

const MultilevelWorkOrder = ({ items, columns }) => {
  const renderTable = (items, columns) => {
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
                  borderRightWidth: index === columns.length - 1 ? 0 : 1,
                },
              ]}
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
                    borderRightWidth: colIndex === columns.length - 1 ? 0 : 1,
                  },
                ]}
              >
                {/* Check each column property to decide what content to render */}
                {col.property === "name" ? (
                  <Text style={styles.cellText}>{item?.product?.name}</Text>
                ) : col.property === "image" && item?.product?.image ? (
                  <Image
                    style={{ width: 25, height: 25 }}
                    src={item.product.image}
                  />
                ) : col.property === "totalQty" ? (
                  <Text style={styles.cellText}>{item?.product?.qty}</Text>
                ) : col.property === "qty" ? (
                  <Text style={styles.cellText}>{item.qty}</Text>
                ) : (
                  <Text style={styles.cellText}>N/A</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </>
    );
  };

  return (
    <>
      {items.map((item, itemIndex) => {
        // Render the main product table for the item
        return (
          <View key={item._id || itemIndex}>
            {renderTable([item], columns)}

            {/* Recursively render components and parts */}
            {item.product.components && item.product.components.length > 0 && (
              <View style={styles.nestedTable}>
                <MultilevelWorkOrder
                  items={item.product.components}
                  columns={columns}
                />
              </View>
            )}

            {item.product.parts && item.product.parts.length > 0 && (
              <View style={styles.nestedTable}>
                <MultilevelWorkOrder
                  items={item.product.parts}
                  columns={columns}
                />
              </View>
            )}

            {item.product.hardwares && item.product.hardwares.length > 0 && (
              <View style={styles.nestedTable}>
                <MultilevelWorkOrder
                  items={item.product.hardwares}
                  columns={columns}
                />
              </View>
            )}

            {item.product.accessories &&
              item.product.accessories.length > 0 && (
                <View style={styles.nestedTable}>
                  <MultilevelWorkOrder
                    items={item.product.accessories}
                    columns={columns}
                  />
                </View>
              )}
          </View>
        );
      })}
    </>
  );
};

export default MultilevelWorkOrder;
