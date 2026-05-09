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

// ==============================
// STYLES
// ==============================

const styles = StyleSheet.create({

    page: {
        paddingTop: 24,
        paddingBottom: 30,
        paddingHorizontal: 28,
        fontFamily: "Helvetica",
        fontSize: 11,
        color: "#222",
    },

    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1,
        marginTop: 6,
    },

    centerText: {
        textAlign: "center",
        fontSize: 10,
        color: "#555",
        marginTop: 3,
        marginBottom: 18,
    },

    // ==========================
    // PARTY BLOCK
    // ==========================

    customerBlock: {
        marginBottom: 14,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
    },

    toText: {
        fontSize: 11,
        fontWeight: "bold",
        marginBottom: 3,
        color: "#666",
        letterSpacing: 1,
    },

    customerName: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 2,
    },

    customerDetails: {
        fontSize: 9,
        color: "#555",
        lineHeight: 1.4,
        marginBottom: 1,
        textTransform: "uppercase",
    },

    // ==========================
    // TABLE
    // ==========================

    tableWrapper: {
        borderWidth: 1,
        borderColor: "#d9d9d9",
    },

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#1f2937",
        paddingVertical: 8,
        paddingHorizontal: 5,
        alignItems: "center",
    },

    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "#e5e5e5",
        paddingVertical: 7,
        paddingHorizontal: 5,
        alignItems: "center",
    },

    cell: {
        fontSize: 8.7,
        paddingRight: 4,
    },

    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 8,
        textTransform: "uppercase",
    },

    amountText: {
        textAlign: "center",
    },

    balanceNegative: {
        color: "#c2410c",
        fontWeight: "bold",
    },

    balancePositive: {
        color: "#166534",
        fontWeight: "bold",
    },

    // ==========================
    // SUMMARY
    // ==========================

    summaryContainer: {
        marginTop: 18,
        width: "48%",
        alignSelf: "flex-end",
        borderWidth: 1,
        borderColor: "#d9d9d9",
    },

    summaryHeader: {
        backgroundColor: "#f3f4f6",
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    summaryHeaderText: {
        fontSize: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#e5e5e5",
    },

    summaryLabel: {
        fontSize: 9,
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    summaryValue: {
        fontSize: 9,
        fontWeight: "bold",
    },

    // ==========================
    // FINAL BOX
    // ==========================

    finalBalanceBox: {
        marginTop: 14,
        alignSelf: "flex-end",
        width: "48%",
        backgroundColor: "#111827",
        paddingVertical: 10,
        paddingHorizontal: 12,
    },

    finalBalanceText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
        textAlign: "right",
        textTransform: "uppercase",
    },
});

// ==============================
// COMPONENT
// ==============================

const CustomerStatementPDF = ({ result }) => {

    const customerData = result.partyData || {};

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
    `.replace(/\s+/g, " ").trim();

    const isCustomer =
        result.type === "customers";

    return (

        <Document>

            <Page
                size="A4"
                style={styles.page}
            >

                <PageHeader
                    organization={result.organization}
                />

                {/* TITLE */}

                <Text style={styles.title}>
                    LEDGER STATEMENT
                </Text>

                <Text style={styles.centerText}>
                    FROM {localDateString(result?.startOfPeriod)}
                    {"  "}TO{"  "}
                    {localDateString(result?.endOfPeriod)}
                </Text>

                {/* CUSTOMER */}

                <View style={styles.customerBlock}>

                    <Text style={styles.toText}>
                        TO
                    </Text>

                    <Text style={styles.customerName}>
                        {name || ""}
                    </Text>

                    {
                        address &&
                        <Text style={styles.customerDetails}>
                            {address}
                        </Text>
                    }

                    {
                        gstNo &&
                        <Text style={styles.customerDetails}>
                            GST NO : {gstNo}
                        </Text>
                    }

                    {
                        panNo &&
                        <Text style={styles.customerDetails}>
                            PAN NO : {panNo}
                        </Text>
                    }

                </View>

                {/* TABLE */}

                <View style={styles.tableWrapper}>

                    {/* HEADER */}

                    <View style={styles.tableHeader}>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                { flex: 1.5 },
                            ]}
                        >
                            Date
                        </Text>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                { flex: 2.7 },
                            ]}
                        >
                            Transaction
                        </Text>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                { flex: 3 },
                            ]}
                        >
                            Details
                        </Text>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.amountText,
                                { flex: 2.5 },
                            ]}
                        >
                            {
                                isCustomer
                                    ? "Invoice Amount"
                                    : "Purchase Amount"
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
                                isCustomer
                                    ? "Amount Received"
                                    : "Amount Paid"
                            }
                        </Text>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.amountText,
                                { flex: 1.5 },
                            ]}
                        >
                            Balance
                        </Text>

                    </View>

                    {/* ROWS */}

                    {
                        result.data.map((row, index) => {

                            const isAdvance =
                                Number(row.balance) < 0;

                            return (

                                <View
                                    key={index}
                                    style={styles.tableRow}
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
                                            { flex: 2.7 },
                                        ]}
                                    >
                                        {row.particulars || ""}
                                    </Text>

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

                                    <Text
                                        style={[
                                            styles.cell,
                                            styles.amountText,
                                            { flex: 2 },
                                        ]}
                                    >
                                        {row.debit || ""}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.cell,
                                            styles.amountText,
                                            { flex: 2 },
                                        ]}
                                    >
                                        {row.credit || ""}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.cell,
                                            styles.amountText,
                                            {
                                                flex: 1.5,
                                            },
                                            isAdvance
                                                ? styles.balanceNegative
                                                : styles.balancePositive,
                                        ]}
                                    >

                                        {
                                            isAdvance
                                                ? (
                                                    <>
                                                        {Math.abs(row.balance)}
                                                        {"\n"}
                                                        (
                                                        {
                                                            isCustomer
                                                                ? "Advance Received"
                                                                : "Advance Paid"
                                                        }
                                                        )
                                                    </>
                                                )
                                                : row.balance
                                        }

                                    </Text>

                                </View>
                            );
                        })
                    }

                </View>

                {/* SUMMARY */}

                <View style={styles.summaryContainer}>

                    <View style={styles.summaryHeader}>
                        <Text style={styles.summaryHeaderText}>
                            Ledger Summary
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Opening Balance
                        </Text>

                        <Text style={styles.summaryValue}>
                            {result.openingBalance || 0}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            {
                                isCustomer
                                    ? "Total Invoice Amount"
                                    : "Total Purchase Amount"
                            }
                        </Text>

                        <Text style={styles.summaryValue}>
                            {result.totalDebit || 0}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            {
                                isCustomer
                                    ? "Total Amount Received"
                                    : "Total Amount Paid"
                            }
                        </Text>

                        <Text style={styles.summaryValue}>
                            {result.totalCredit || 0}
                        </Text>
                    </View>

                </View>

                {/* FINAL */}

                <View style={styles.finalBalanceBox}>

                    <Text style={styles.finalBalanceText}>

                        {
                            Number(result.closingBalance) < 0
                                ? isCustomer
                                    ? `Advance Received : ${Math.abs(result.closingBalance)}`
                                    : `Advance Paid : ${Math.abs(result.closingBalance)}`
                                : isCustomer
                                    ? `Total Balance Due : ${result.closingBalance || 0}`
                                    : `Total Payable : ${result.closingBalance || 0}`
                        }

                    </Text>

                </View>

            </Page>

        </Document>
    );
};

export default CustomerStatementPDF;