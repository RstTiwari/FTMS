import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    table: {
        width: "100%",
        marginBottom: 10,
        borderWidth: 1,
    },

    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
    },

    lastRow: {
        borderBottomWidth: 0,
    },

    cell: {
        padding: 3,
        fontSize: 8,
        fontFamily: "Helvetica",
        borderRightWidth: 1,
        borderRightColor: "#000",
        textAlign: "left",
    },

    lastCell: {
        borderRightWidth: 0,
    },

    header: {
        backgroundColor: "#42cbf5",
    },

    boldText: {
        fontFamily: "Helvetica-Bold",
    },
});

const InvoiceTable = ({ items }) => {

    const totals = items.reduce(
        (acc, item) => {
            acc.qty += Number(item.qty || 0);
            acc.final += Number(item.finalAmount || 0);

            if (item.gstType === "GST") {
                acc.cgst += item.taxAmount / 2;
                acc.sgst += item.taxAmount / 2;
            } else if (item.gstType === "IGST") {
                acc.igst += item.taxAmount;
            }

            return acc;
        },
        { qty: 0, cgst: 0, sgst: 0, igst: 0, final: 0 }
    );

    const Cell = ({ children, width, isLast, bold, align = "left" }) => (
        <Text
            style={[
                styles.cell,
                { width, textAlign: align },
                isLast && styles.lastCell,
                bold && styles.boldText,
            ]}
        >
            {children}
        </Text>
    );

    return (
        <View style={styles.table}>

            {/* ✅ HEADER (Grouped in ONE ROW visually) */}
            <View style={[styles.row, styles.header]}>

                <Cell width={25} bold>#</Cell>
                <Cell width={175} bold>DESCRIPTION</Cell>
                <Cell width={50} bold>HSN</Cell>
                <Cell width={50} bold align="right">RATE</Cell>
                <Cell width={40} bold align="right">QTY</Cell>

                <View style={{ width: 75, borderRightWidth: 1, borderRightColor: "#000" }}>

                    <Text style={[
                        styles.cell,
                        styles.boldText,
                        { textAlign: "center", borderRightWidth: 0 }
                    ]}>
                        CGST
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={[
                            styles.cell,
                            { width: 25, borderRightWidth: 0 }
                        ]}>
                            %
                        </Text>

                        <Text style={[
                            styles.cell,
                            { width: 50, textAlign: "right", borderRightWidth: 0 }
                        ]}>
                            Amt
                        </Text>
                    </View>
                </View>
                <View style={{ width: 75, borderRightWidth: 1, borderRightColor: "#000" }}>

                    <Text style={[
                        styles.cell,
                        styles.boldText,
                        { textAlign: "center", borderRightWidth: 0 }
                    ]}>
                        SGST
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={[
                            styles.cell,
                            { width: 25, borderRightWidth: 0 }
                        ]}>
                            %
                        </Text>

                        <Text style={[
                            styles.cell,
                            { width: 50, textAlign: "right", borderRightWidth: 0 }
                        ]}>
                            Amt
                        </Text>
                    </View>
                </View>
                <View style={{ width: 75, borderRightWidth: 1, borderRightColor: "#000" }}>

                    <Text style={[
                        styles.cell,
                        styles.boldText,
                        { textAlign: "center", borderRightWidth: 0 }
                    ]}>
                        IGST
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={[
                            styles.cell,
                            { width: 25, borderRightWidth: 0 }
                        ]}>
                            %
                        </Text>

                        <Text style={[
                            styles.cell,
                            { width: 50, textAlign: "right", borderRightWidth: 0 }
                        ]}>
                            Amt
                        </Text>
                    </View>
                </View>

                <Cell width={75} isLast bold align="right">TOTAL</Cell>
            </View>

            {/* ✅ ITEMS */}
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
                    <View key={index} style={styles.row}>
                        <Cell width={25}>{index + 1}</Cell>
                        <Cell width={175}>{item.description}</Cell>
                        <Cell width={50}>{item.hsnCode}</Cell>
                        <Cell width={50} align="right">{item.rate}</Cell>
                        <Cell width={40} align="right">{item.qty}</Cell>

                        <Cell width={25}>{cgstPercent}</Cell>
                        <Cell width={50} align="right">{Math.round(cgstAmount)}</Cell>

                        <Cell width={25}>{sgstPercent}</Cell>
                        <Cell width={50} align="right">{Math.round(sgstAmount)}</Cell>

                        <Cell width={25}>{igstPercent}</Cell>
                        <Cell width={50} align="right">{Math.round(igstAmount)}</Cell>

                        <Cell width={75} isLast align="right">{item.finalAmount}</Cell>
                    </View>
                );
            })}

            {/* ✅ TOTAL ROW */}
            <View style={[styles.row, styles.lastRow]}>
                <Cell width={25}></Cell>
                <Cell width={175} bold>TOTAL</Cell>
                <Cell width={50}></Cell>
                <Cell width={50}></Cell>
                <Cell width={40} bold align="right">{totals.qty}</Cell>

                <Cell width={25}></Cell>
                <Cell width={50} bold align="right">{Math.round(totals.cgst)}</Cell>

                <Cell width={25}></Cell>
                <Cell width={50} bold align="right">{Math.round(totals.sgst)}</Cell>

                <Cell width={25}></Cell>
                <Cell width={50} bold align="right">{Math.round(totals.igst)}</Cell>

                <Cell width={75} isLast bold align="right">{totals.final}</Cell>
            </View>

        </View>
    );
};

export default InvoiceTable;    