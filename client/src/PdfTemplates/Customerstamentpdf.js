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

// =====================================
// STYLES
// =====================================

const styles = StyleSheet.create({

    page: {
        paddingTop: 18,
        paddingBottom: 22,
        paddingHorizontal: 18,
        fontFamily: "Helvetica",
        fontSize: 9,
        color: "#222",
    },

    title: {
        textAlign: "center",
        fontSize: 11,
        fontWeight: "bold",
        letterSpacing: 1,
        marginTop: 2,
    },

    centerText: {
        textAlign: "center",
        fontSize: 8,
        color: "#555",
        marginTop: 2,
        marginBottom: 10,
    },

    // =================================
    // PARTY BLOCK
    // =================================

    customerBlock: {
        marginBottom: 10,
        paddingBottom: 6,
        borderBottomWidth: 0.8,
        borderBottomColor: "#dcdcdc",
    },

    toText: {
        fontSize: 9,
        fontWeight: "bold",
        marginBottom: 2,
        color: "#666",
        letterSpacing: 1,
    },

    customerName: {
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 1,
    },

    customerDetails: {
        fontSize: 7.8,
        color: "#555",
        lineHeight: 1.2,
        marginBottom: 1,
        textTransform: "uppercase",
    },

    // =================================
    // TABLE
    // =================================

    tableWrapper: {
        borderWidth: 0.8,
        borderColor: "#cfcfcf",
    },

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#1f2937",
        paddingVertical: 5,
        paddingHorizontal: 3,
        alignItems: "center",
    },

    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 0.4,
        borderBottomColor: "#ececec",
        paddingVertical: 4,
        paddingHorizontal: 3,
        alignItems: "center",
        minHeight: 24,
    },

    cell: {
        fontSize: 7.5,
        paddingHorizontal: 2,
        justifyContent: "center",
    },

    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 7,
        textTransform: "uppercase",
    },

    // =================================
    // ALIGNMENTS
    // =================================

    leftText: {
        textAlign: "left",
    },

    centerAlign: {
        textAlign: "center",
    },

    rightAlign: {
        textAlign: "right",
    },

    amountText: {
        textAlign: "right",
        fontFamily: "Helvetica-Bold",
    },

    balanceNegative: {
        color: "#dc2626",
        fontWeight: "bold",
        textAlign: "right",
        lineHeight: 1.2,
    },

    balancePositive: {
        color: "#166534",
        fontWeight: "bold",
        textAlign: "right",
    },

    advanceText: {
        fontSize: 6.5,
        color: "#dc2626",
        marginTop: 1,
    },

    // =================================
    // SUMMARY
    // =================================

    summaryContainer: {
        marginTop: 12,
        width: "44%",
        alignSelf: "flex-end",
        borderWidth: 0.8,
        borderColor: "#d9d9d9",
    },

    summaryHeader: {
        backgroundColor: "#f3f4f6",
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderBottomWidth: 0.8,
        borderBottomColor: "#ddd",
    },

    summaryHeaderText: {
        fontSize: 8,
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderBottomWidth: 0.4,
        borderBottomColor: "#e5e5e5",
    },

    summaryLabel: {
        fontSize: 7.5,
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    summaryValue: {
        fontSize: 7.5,
        fontWeight: "bold",
    },

    // =================================
    // FINAL BOX
    // =================================

    finalBalanceBox: {
        marginTop: 10,
        alignSelf: "flex-end",
        width: "44%",
        backgroundColor: "#111827",
        paddingVertical: 8,
        paddingHorizontal: 10,
    },

    finalBalanceText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 9,
        textAlign: "right",
        textTransform: "uppercase",
        lineHeight: 1.3,
    },
});

// =====================================
// COMPONENT
// =====================================

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
    `
        .replace(/\s+/g, " ")
        .trim();

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

                {/* PARTY DETAILS */}

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
                                styles.centerAlign,
                                { flex: 1.6 },
                            ]}
                        >
                            Date
                        </Text>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.leftText,
                                { flex: 3.2 },
                            ]}
                        >
                            Particulars
                        </Text>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.centerAlign,
                                { flex: 1.8 },
                            ]}
                        >
                            Vch Type
                        </Text>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.centerAlign,
                                { flex: 1.5 },
                            ]}
                        >
                            Vch No
                        </Text>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.rightAlign,
                                { flex: 2 },
                            ]}
                        >
                            Debit
                        </Text>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.rightAlign,
                                { flex: 2 },
                            ]}
                        >
                            Credit
                        </Text>

                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                styles.rightAlign,
                                { flex: 2.2 },
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

                                    {/* DATE */}

                                    <Text
                                        style={[
                                            styles.cell,
                                            styles.centerAlign,
                                            { flex: 1.6 },
                                        ]}
                                    >
                                        {
                                            row.date
                                                ? localDateString(row.date)
                                                : ""
                                        }
                                    </Text>

                                    {/* PARTICULARS */}

                                    <Text
                                        style={[
                                            styles.cell,
                                            styles.leftText,
                                            { flex: 3.2 },
                                        ]}
                                    >
                                        {row.particulars || ""}
                                    </Text>

                                    {/* VCH TYPE */}

                                    <Text
                                        style={[
                                            styles.cell,
                                            styles.centerAlign,
                                            { flex: 1.8 },
                                        ]}
                                    >
                                        {row.voucherType || ""}
                                    </Text>

                                    {/* VCH NO */}

                                    <Text
                                        style={[
                                            styles.cell,
                                            styles.centerAlign,
                                            { flex: 1.5 },
                                        ]}
                                    >
                                        {row.voucherNo || ""}
                                    </Text>

                                    {/* DEBIT */}

                                    <Text
                                        style={[
                                            styles.cell,
                                            styles.amountText,
                                            { flex: 2 },
                                        ]}
                                    >
                                        {
                                            isCustomer
                                                ? row.debit || ""
                                                : row.credit || ""
                                        }
                                    </Text>

                                    {/* CREDIT */}

                                    <Text
                                        style={[
                                            styles.cell,
                                            styles.amountText,
                                            { flex: 2 },
                                        ]}
                                    >
                                        {
                                            isCustomer
                                                ? row.credit || ""
                                                : row.debit || ""
                                        }
                                    </Text>

                                    {/* BALANCE */}

                                    <View
                                        style={[
                                            styles.cell,
                                            {
                                                flex: 2.2,
                                                alignItems: "flex-end",
                                            },
                                        ]}
                                    >

                                        {
                                            isAdvance ? (
                                                <>
                                                    <Text style={styles.balanceNegative}>
                                                        {Math.abs(row.balance)}
                                                    </Text>

                                                    <Text style={styles.advanceText}>
                                                        (
                                                        {
                                                            isCustomer
                                                                ? "Advance Received"
                                                                : "Advance Paid"
                                                        }
                                                        )
                                                    </Text>
                                                </>
                                            ) : (
                                                <Text style={styles.balancePositive}>
                                                    {row.balance}
                                                </Text>
                                            )
                                        }

                                    </View>

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
                            Total Bought
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

                {/* FINAL BOX */}

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