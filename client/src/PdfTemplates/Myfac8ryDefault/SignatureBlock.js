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
        fontSize: 6,
        textTransform: "uppercase",
        justifyContent: "flex-start",
    },
    lastCell: {
        borderRight: 0,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    line: {
        marginTop: 5,
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
    companyName: {
        fontFamily: "Helvetica-Bold",
        fontSize: 9,
    },
});

const SignatureBlock = ({ companyName = "Myfac8ry.com" }) => (
    <View
        style={styles.container}
        wrap={false} // This ensures it won't break mid-section
        minPresenceAhead={80} // Prevents it from rendering unless there's space
    >
        {/* Left Block */}
        <View style={styles.cell}>
            <Text>
                CERTIFY THAT THE PARTICULARS GIVEN ABOVE ARE TRUE AND CORRECT.
            </Text>
            <Text>
                THE AMOUNT INDICATED REPRESENTS THE PRICE ACTUALLY CHARGED AND
                THAT THERE ARE NO ADDITIONAL CHARGES. WE HEREBY DECLARE THAT THE
                TAX CHARGED IN THIS INVOICE IS PAYABLE UNDER THE APPLICABLE
                LAWS.
            </Text>
            <Text>
                JURISDICTION – VASAI. E. & O. E. THIS IS A COMPUTER-GENERATED
                DOCUMENT AND DOES NOT REQUIRE A PHYSICAL SIGNATURE.
            </Text>
            <Text style={styles.signatoryText}>(Receiver Signatory)</Text>
        </View>

        {/* Right Block (Centered Content) */}
        <View style={[styles.cell, styles.lastCell]}>
            <Text style={styles.companyName}>{companyName}</Text>
            <Text style={styles.line}>(Authorised Signatory)</Text>
        </View>
    </View>
);

export default SignatureBlock;
