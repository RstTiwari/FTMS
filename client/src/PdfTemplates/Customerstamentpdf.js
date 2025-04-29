import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
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
    },
    label: {
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#333",
        color: "#fff",
        padding: 5,
    },
    tableRow: {
        flexDirection: "row",
        borderBottom: 0.5,
        borderColor: "#ccc",
        padding: 5,
    },
    cell: {
        flex: 1,
        fontSize: 10,
    },
    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 10,
    },
    centerText: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 12,
    },

    customerName: {
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 12,
    },
});

// Main PDF component
const CustomerStatementPDF = ({ result }) => {
    let customerData  = result.customerData
    console.log(customerData,"--")
    let  {billingAddress,gstNo,panNo ,name} = customerData
    let address = `${billingAddress?.stree1 ? billingAddress?.stree1 : ""}${
        billingAddress?.street2 ? billingAddress.street2 : ""
    } ${billingAddress?.city ? billingAddress.city:""} ${
        billingAddress?.state ? billingAddress.state : ""
    } ${billingAddress?.pincode ? billingAddress.pincode : ""}`;
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>LEDGER STATEMENT</Text>

                <Text style={styles.centerText}>
                    FROM {localDateString(result?.startOfPeriod)} -{" "}
                    {localDateString(result?.endOfPeriod)}
                </Text>
                <>
                    <Text style={[styles.customerName]}>To</Text>
                    <Text style={[styles.customerName, styles.underline]}>
                        {name ? name.toUpperCase() : ""}
                    </Text>
                    <>
                        <Text style={[styles.customerName,{fontSize:10}]}>
                            {address}
                        </Text>
                        <Text style={[styles.customerName,{fontSize:10}]}>
                            {gstNo ? `GST NO:${gstNo}  ` : ""}{" "}
                            {panNo ? `PAN NO:${panNo}` : ""}
                        </Text>
                    </>
                </>

                <View style={[styles.section, { alignItems: "flex-end" }]}>
                    <Text style={styles.underline}>
                        <Text style={styles.label}>Opening Balance: </Text>
                        {result.openingBalanceAmount}
                    </Text>
                    <Text style={styles.underline}>
                        <Text style={styles.label}>
                            {result.type === "customers"
                                ? "Invoice Amount"
                                : "Purchase Amount"}
                            :
                        </Text>{" "}
                        {result.totalAmount}
                    </Text>
                    <Text style={styles.underline}>
                        <Text style={styles.label}>Total Received: </Text>
                        {result.totalReceived}
                    </Text>
                </View>

                <View style={styles.section}>
                    {/* Table Header */}
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
                                { flex: 3 },
                            ]}
                        >
                            Transactions
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
                                { flex: 1 },
                            ]}
                        >
                            Amount
                        </Text>
                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                { flex: 1 },
                            ]}
                        >
                            Payment
                        </Text>
                        <Text
                            style={[
                                styles.cell,
                                styles.headerText,
                                { flex: 1 },
                            ]}
                        >
                            Balance
                        </Text>
                    </View>

                    {/* Table Rows */}
                    {result.data.map((row, rowIndex) => (
                        <View style={styles.tableRow} key={rowIndex}>
                            <Text style={[styles.cell, { flex: 1.5 }]}>
                                {row.date ? localDateString(row.date) : ""}
                            </Text>
                            <Text style={[styles.cell, { flex: 3 }]}>
                                {row.type || ""}
                            </Text>
                            <Text style={[styles.cell, { flex: 3 }]}>
                                {row.details || ""}
                            </Text>
                            <Text style={[styles.cell, { flex: 1 }]}>
                                {row.amount ? String(row.amount) : ""}
                            </Text>
                            <Text style={[styles.cell, { flex: 1 }]}>
                                {row.payment ? String(row.payment) : ""}
                            </Text>
                            <Text style={[styles.cell, { flex: 1 }]}>
                                {row.balance ? String(row.balance) : 0}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.label}>
                        BALANCE DUE: {result.totalBalanceDue}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default CustomerStatementPDF;
