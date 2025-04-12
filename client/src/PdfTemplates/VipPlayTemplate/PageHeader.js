import React from "react";
import { Text, View, StyleSheet, Link, Image } from "@react-pdf/renderer";

let borderColor = "#000000";
const style = StyleSheet.create({
    container: {
        borderBottom: 1,
        borderBottomColor: "#000000",
    },
    titleDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderBottom: 1,
        borderBottomColor: "#000000",
        width: "100%", // Ensure full width usage
    },
    imageDiv: {
        flex: 0.25, // 25% width
        alignItems: "center", // Center the image horizontally
        justifyContent: "center", // Center the image vertically
    },
    titleContainer: {
        flex: 0.75, // 75% width
        display: "flex",
        flexDirection: "column",
        fontSize: 10,
        textAlign: "left", // Adjusted to left-align text
        overflow: "hidden", // Prevent overflow
        paddingLeft: 10, // Add some padding to separate text from the edge
    },
    reportTitle: {
        color: "#42cbf5",
        fontSize: 20,
        textAlign: "left", // Left-align the title
        fontFamily: "Helvetica-Bold",
        fontWeight: "heavy",
        fontStyle: "italic",
        letterSpacing: 0.5,
    },
    logo: {
        width: 100,
        height: 66,
        marginLeft: "auto",
        marginRight: "auto",
    },
    add: {
        fontSize: 9,
        color: "#000000",
    },
    title: {
        textAlign: "center",
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        fontWeight: "heavy",
    },
    headerContainer: {
        fontSize: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        borderTop: 1,
        height: "auto",
        borderTopColor: borderColor,
    },
    leftSide: {
        paddingTop: 3,
        paddingLeft: 3,
        flex: 1,
        justifyContent: "flex-start",
        height: "auto",
        fontSize:12,
        borderRight:0.5,
        borderRightColor:borderColor
    },
    rightSide: {
        paddingTop: 3,
        paddingLeft: 3,
        flex: 1,
        justifyContent: "flex-start",
        borderLeft:0.5,
        borderLeftColor:borderColor
    },
    bottomleftSide: {
        paddingTop: 3,
        paddingLeft: 3,
        flex: 1,
        justifyContent: "flex-start",
        height: "auto",
    },
    bottomrightSide: {
        paddingTop: 3,
        paddingLeft: 3,
        flex: 1,
        borderLeft: 1,
        borderLeftColor: borderColor,
        justifyContent: "flex-start",
        height: "auto",
    },
    billto: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        fontWeight: "heavy",
    },
    address: {
        fontSize: 10,
        width: 250,
        hyphens: "manual",
        overflowwrap: "break-word",
    },
    contact: {
        fontSize: 10,
        width: 250,
        hyphens: "manual",
        overflowwrap: "break-word",
    },
    detailsItem: {
        fontSize: 12, // Increased font size for better readability
        color: "#000000",
        marginBottom: 5,
        wordWrap: "break-word",
    },
});

const PageHeader = ({ organization, entityData }) => {
    const {
        companyName,
        phone,
        alternatePhone,
        email,
        logo,
        billingAddress,
        tagLine,
        gstNo,
        panNo
    } = organization;
    const { street1, street2, city, state, pincode } = billingAddress;
    return (
        <View style ={style.container}>
            <View style={style.titleDiv}>
                <View style={style.imageDiv}>
                    <Image style={style.logo} src={logo || ""} />
                </View>
                <View style={style.titleContainer}>
                    <Text style={style.reportTitle}>
                        {companyName.toUpperCase() || ""}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: "Helvetica-Bold",
                            fontWeight: "heavy",
                        }}
                    >
                        {tagLine || ""}
                    </Text>
                    <Text style={style.add}>
                        {`${street1} ${street2} ${city} ${state} ${pincode}`}
                    </Text>
                    <Text>
                        MOB - {phone}{" "}
                        {alternatePhone ? `/ ${alternatePhone}` : ""} , EMAIL-{" "}
                        <Link>{email?.toUpperCase()}</Link>
                    </Text>
                </View>
            </View>
            <View style={style.headerContainer}>
                <View style={style.leftSide}>
                    <Text style={style.billto}>COMPANY  DETAILS</Text>
                    <Text style={{ fontWeight: "1000" ,fontSize:12}}>
                        {companyName.toUpperCase()}
                    </Text>
                    <Text>GSTIN : {gstNo}</Text>
                    <Text>PAN-NO : {panNo}</Text>
                    <Text>STATE : {state?.toUpperCase()}</Text>

                </View>
                <View style={style.rightSide}>
                    {entityData.map((item, index) => (
                        <Text key={index} style={style.detailsItem}>
                            <Text style={{ fontWeight: "bold" }}>
                                {item.label}:{" "}
                            </Text>
                            {item.value}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default PageHeader;
