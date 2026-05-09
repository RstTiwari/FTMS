import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

import { localDateString } from "../Helper/EpochConveter";
import PageHeader from "./VipPlayTemplate/PageHeader";

// Styles
const styles = StyleSheet.create({

    page: {
        padding: 30,
        fontFamily: "Helvetica",
        fontSize: 12,
    },

    section: {
        marginBottom: 12,
    },

    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 6,
        fontWeight: "bold",
    },

    centerText: {
        textAlign: "center",
        fontSize: 11,
    },

    // CUSTOMER BLOCK

 
    customerName: {
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 12,
    },

    customerDetails: {
        fontSize: 10,
        textTransform: "uppercase",
        marginBottom: 0,
        paddingBottom: 0,
        lineHeight: 1.1,
    },

    // TABLE

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#333",
        color: "#fff",
        padding: 6,
        alignItems: "center",
    },

    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "#ccc",
        paddingVertical: 5,
        paddingHorizontal: 4,
        alignItems: "center",
    },

    cell: {
        flex: 1,
        fontSize: 9,
    },

    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 8,
    },

    amountText: {
        textAlign: "center",
    },

    // SUMMARY

    summaryContainer: {
        marginTop: 20,
        alignSelf: "flex-end",
        width: "48%",
        borderWidth: 1,
        borderColor: "#ccc",
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd",
    },

    summaryLabel: {
        fontWeight: "bold",
        fontSize: 10,
        textTransform: "uppercase",
    },

    summaryValue: {
        fontSize: 10,
        fontWeight: "bold",
    },

    // FINAL BALANCE

    finalBalanceBox: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        alignSelf: "flex-end",
        width: "48%",
    },

    finalBalanceText: {
        fontWeight: "bold",
        fontSize: 12,
        textAlign: "right",
        textTransform: "uppercase",
    },
});

// Main PDF Component

const CustomerStatementPDF = ({ result }) => {

    const customerData = result.partyData;

    const {
        billingAddress,
        gstNo,
        panNo,
        name,
    } = customerData;

    const address = `
        ${billingAddress?.stree1 || ""}
        ${billingAddress?.street2 || ""}
        ${billingAddress?.city || ""}
        ${billingAddress?.state || ""}
        ${billingAddress?.pincode || ""}
    `;

    return (

        <Document>

            <Page
                size="A4"
                style={styles.page}
            >
                <PageHeader
                    organization={result.organization}
                />

                <Text style={styles.title}>
                    LEDGER STATEMENT    
                </Text>

                <Text style={styles.centerText}>
                    FROM {localDateString(result?.startOfPeriod)}
                    {" "}TO{" "}
                    {localDateString(result?.endOfPeriod)}
                </Text>
                <View style={styles.customerBlock}>

                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginBottom: 2,
                        }}
                    >
                        TO
                    </Text>

                    <Text style={styles.customerName}>
                        {name ? name.toUpperCase() : ""}
                    </Text>

                    {
                        gstNo &&
                        <Text style={[styles.customerDetails,{marginBottom:5}]}>
                            GST NO : {gstNo}
                        </Text>
                    }

                
                </View>
                <View style={styles.section}>
                    <View style={styles.tableHeader}>
                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                { flex: 1.5 },
                            ]}
                        >
                            DATE
                        </Text>
                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                { flex: 3 },
                            ]}
                        >
                            TRANSACTION
                        </Text>
                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                { flex: 3 },
                            ]}
                        >
                            DETAILS
                        </Text>
                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.amountText,
                                { flex: 2 },
                            ]}
                        >
                            {
                                result.type === "customers"
                                    ? "INVOICE AMOUNT"
                                    : "PURCHASE AMOUNT"
                            }
                        </Text>
                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.amountText,
                                { flex: 2 },
                            ]}
                        >
                            {
                                result.type === "customers"
                                    ? "AMOUNT RECEIVED"
                                    : "AMOUNT PAID"
                            }
                        </Text>
                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.amountText,
                                { flex: 1.2 },
                            ]}
                        >
                            BALANCE
                        </Text>

                    </View>
                    {result.data.map((row, rowIndex) => (

                        <View
                            style={styles.tableRow}
                            key={rowIndex}
                        >
                            <Text
                                style={[
                                    styles.cell,
                                    { flex: 1.5 },
                                ]}
                            >
                                {
                                    row.date
                                        ? localDateString(row.date)
                                        : ""
                                }
                            </Text>

                            <Text
                                style={[
                                    styles.cell,
                                    { flex: 3 },
                                ]}
                            >
                                {row.particulars || ""}
                            </Text>

                            {/* DETAILS */}

                            <Text
                                style={[
                                    styles.cell,
                                    { flex: 3 },
                                ]}
                            >
                                {
                                    row.voucherType
                                        ? `${row.voucherType} - ${row.voucherNo}`
                                        : ""
                                }
                            </Text>

                            {/* DEBIT */}

                            <Text
                                style={[
                                    styles.cell,
                                    styles.amountText,
                                    { flex: 2 },
                                ]}
                            >
                                {row.debit || ""}
                            </Text>

                            {/* CREDIT */}

                            <Text
                                style={[
                                    styles.cell,
                                    styles.amountText,
                                    { flex: 2 },
                                ]}
                            >
                                {row.credit || ""}
                            </Text>

                            {/* BALANCE */}

                            <Text
                                style={[
                                    styles.cell,
                                    styles.amountText,
                                    { flex: 1.2 },
                                ]}
                            >
                                {row.balance || 0}
                            </Text>

                        </View>

                    ))}

                </View>
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryRow}>

                        <Text style={styles.summaryLabel}>
                            OPENING BALANCE
                        </Text>

                        <Text style={styles.summaryValue}>
                            {result.openingBalance || 0}
                        </Text>

                    </View>

                    {
                        result.openingAdvance > 0 &&
                        <View style={styles.summaryRow}>

                            <Text style={styles.summaryLabel}>
                                OPENING ADVANCE
                            </Text>

                            <Text style={styles.summaryValue}>
                                {result.openingAdvance}
                            </Text>

                        </View>
                    }

                    {/* TOTAL DEBIT */}

                    <View style={styles.summaryRow}>

                        <Text style={styles.summaryLabel}>
                            {
                                result.type === "customers"
                                    ? "TOTAL INVOICE AMOUNT"
                                    : "TOTAL PURCHASE AMOUNT"
                            }
                        </Text>

                        <Text style={styles.summaryValue}>
                            {result.totalDebit || 0}
                        </Text>

                    </View>

                    {/* TOTAL CREDIT */}

                    <View style={styles.summaryRow}>

                        <Text style={styles.summaryLabel}>
                            {
                                result.type === "customers"
                                    ? "TOTAL AMOUNT RECEIVED"
                                    : "TOTAL AMOUNT PAID"
                            }
                        </Text>

                        <Text style={styles.summaryValue}>
                            {result.totalCredit || 0}
                        </Text>

                    </View>

                </View>

                <View style={styles.finalBalanceBox}>

                    <Text style={styles.finalBalanceText}>

                        {
                            result.type === "customers"
                                ? "TOTAL BALANCE DUE : "
                                : "TOTAL PAYABLE : "
                        }

                        {result.closingBalance || 0}

                    </Text>

                </View>

            </Page>

        </Document>
    );
};

export default CustomerStatementPDF;