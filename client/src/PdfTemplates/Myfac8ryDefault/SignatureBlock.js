import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

// Styles
const borderColor = "#000";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        borderTop: 1,
        borderColor: borderColor,
        marginTop: 10,
    },
    cell: {
        flex: 1,
        borderRight: 1,
        borderColor: borderColor,
        padding: 8,
        fontSize: 9,
        textTransform: "uppercase",
    },
    lastCell: {
        borderRight: 0,
    },
    line: {
        marginTop: 10,
        fontSize: 8,
        fontFamily: "Helvetica",
        textTransform: "capitalize",
    },
    signatoryText: {
        marginTop: 20,
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        textAlign: "right",
        textTransform: "capitalize",
    },
});

const SignatureBlock = ({ companyName = "Myfac8ry.com" }) => (
    <View style={styles.container}>
        {/* Left Block */}
        <View style={styles.cell}>
            <Text>
                CERTIFY THAT PARTICULAR GIVEN ABOVE ARE TRUE AND CORRECT
            </Text>
            <Text>
                THE AMOUNT INDICATED REPRESENT THE PRICE ACTUAL CHARGED AND THAT
                THERE IS NO ADDITIONAL CHARGES
            </Text>
            <Text>JURISDICTION - VASAI</Text>
            <Text style={styles.signatoryText}>(Receiver Signatory)</Text>
        </View>

        {/* Right Block */}
        <View style={[styles.cell, styles.lastCell]}>
            <Text>{companyName}</Text>
            <Text style={styles.line}>(Authorised Signatory)</Text>
        </View>
    </View>
);

export default SignatureBlock;
