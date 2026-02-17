import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    table: {
        width: "100%",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },

    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    lastRow: {
        borderBottomWidth: 0,
    },

    cell: {
        padding: 4,
        fontSize: 8,
        fontFamily: "Helvetica",
        borderRightWidth: 1,
        borderRightColor: "#ddd",
        textAlign: "left",
        flexWrap: "wrap",
        wordBreak: "break-word",
    },

    lastCell: {
        borderRightWidth: 0,
    },

    headerRow: {
        backgroundColor: "#f0f0f0",
        fontFamily: "Helvetica-Bold",
    },

    boldText: {
        fontFamily: "Helvetica-Bold",
    },
});

const InvoiceTable = ({ items }) => {
    const totals = items.reduce(
        (acc, item) => {
            acc.qty += Number(item.qty || 0);
            acc.rate += Number(item.rate || 0);
            acc.final += Number(item.finalAmount || 0);

            if (item.gstType === "GST") {
                acc.cgst += item.taxAmount / 2;
                acc.sgst += item.taxAmount / 2;
            } else if (item.gstType === "IGST") {
                acc.igst += item.taxAmount;
            }

            return acc;
        },
        { qty: 0, rate: 0, cgst: 0, sgst: 0, igst: 0, final: 0 }
    );

    const Cell = ({ children, width, isLast, bold }) => (
        <Text
            style={[
                styles.cell,
                { width },
                isLast && styles.lastCell,
                bold && styles.boldText,
            ]}
            wrap
        >
            {children}
        </Text>
    );

    return (
        <View style={styles.table}>
            {/* HEADER ROW 1 */}
            <View style={[styles.row, styles.headerRow]}>
                <Cell width={25} bold>#</Cell>
                <Cell width={175} bold>DESCRIPTION</Cell>
                <Cell width={50} bold>HSN CODE</Cell>
                <Cell width={50} bold>RATE</Cell>
                <Cell width={40} bold>QTY</Cell>
                <Cell width={75} bold>CGST</Cell>
                <Cell width={75} bold>SGST</Cell>
                <Cell width={75} bold>IGST</Cell>
                <Cell width={75} isLast bold>TOTAL</Cell>
            </View>

            {/* HEADER ROW 2 */}
            <View style={styles.row}>
                <Cell width={25}></Cell>
                <Cell width={175}></Cell>
                <Cell width={50}></Cell>
                <Cell width={50}></Cell>
                <Cell width={40}></Cell>

                {/* CGST split into % and Amt */}
                <Cell width={25}>%</Cell>
                <Cell width={50}>Amt</Cell>

                {/* SGST split */}
                <Cell width={25}>%</Cell>
                <Cell width={50}>Amt</Cell>

                {/* IGST split */}
                <Cell width={25}>%</Cell>
                <Cell width={50}>Amt</Cell>

                <Cell width={75} isLast></Cell>
            </View>

            {/* ITEMS */}
            {items.map((item, index) => {
                const isGST = item.gstType === "GST";
                const isIGST = item.gstType === "IGST";

                const cgstPercent = isGST ? item.gstPercent / 2 : "";
                const sgstPercent = isGST ? item.gstPercent / 2 : "";
                const igstPercent = isIGST ? item.gstPercent : "";

                const cgstAmount = isGST ? item.taxAmount / 2 : "";
                const sgstAmount = isGST ? item.taxAmount / 2 : "";
                const igstAmount = isIGST ? item.taxAmount : "";

                return (
                    <View key={item._id || index} style={styles.row}>
                        <Cell width={25}>{index + 1}</Cell>
                        <Cell width={175}>{item.description}</Cell>
                        <Cell width={50}>{item.hsnCode}</Cell>
                        <Cell width={50}>{item.rate}</Cell>
                        <Cell width={40}>{item.qty}</Cell>

                        <Cell width={25}>{cgstPercent !== "" ? `${cgstPercent}%` : ""}</Cell>
                        <Cell width={50}>{cgstAmount}</Cell>

                        <Cell width={25}>{sgstPercent !== "" ? `${sgstPercent}%` : ""}</Cell>
                        <Cell width={50}>{sgstAmount}</Cell>

                        <Cell width={25}>{igstPercent !== "" ? `${igstPercent}%` : ""}</Cell>
                        <Cell width={50}>{igstAmount}</Cell>

                        <Cell width={75} isLast>{item.finalAmount}</Cell>
                    </View>
                );
            })}

            {/* TOTAL ROW */}
            <View style={[styles.row, styles.lastRow]}>
                <Cell width={25}></Cell>
                <Cell width={175} bold>TOTAL</Cell>
                <Cell width={50}></Cell>
                <Cell width={50}></Cell>
                <Cell width={40}></Cell>

                {/* CGST */}
                <Cell width={25}></Cell>
                <Cell width={50} bold>{totals.cgst}</Cell>

                {/* SGST */}
                <Cell width={25}></Cell>
                <Cell width={50} bold>{totals.sgst}</Cell>

                {/* IGST */}
                <Cell width={25}></Cell>
                <Cell width={50} bold>{totals.igst}</Cell>

                <Cell width={75} isLast bold>{totals.final}</Cell>
            </View>

        </View>
    );
};

export default InvoiceTable;
