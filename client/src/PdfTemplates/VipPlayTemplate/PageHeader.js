import React from "react";
import { Text, View, StyleSheet, Link, Image } from "@react-pdf/renderer";

let borderColor = "#000000";

const style = StyleSheet.create({
    container: {
        borderBottom: 1,
        borderBottomColor: borderColor,
    },
    titleDiv: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingVertical: 4,
    },
    imageDiv: {
        width: "25%", // increased width for more logo space
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 5,
    },
    titleContainer: {
        width: "75%",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingRight: 5,
    },
    reportTitle: {
        color: "#42cbf5",
        fontSize: 24, // increased font size
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        textAlign: "center",
    },
    tagLine: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        marginBottom: 3,
        textAlign: "center",
    },
    add: {
        fontSize: 9,
        color: "#000000",
        textAlign: "center",
        marginBottom: 2,
    },
    contactText: {
        fontSize: 9,
        textAlign: "center",
    },
    logo: {
        width: 120, // increased width
        height: 80,  // increased height
    },
    headerContainer: {
        fontSize: 10,
        flexDirection: "row",
        alignItems: "stretch", 
        borderTop: 1,
        borderTopColor: borderColor,
        paddingVertical: 0, 
        marginTop: 6, 
    },    
    leftSideBase: {
        padding: 6,
        justifyContent: "flex-start",
        flexGrow: 1,
    },    
    rightSideBase: {
        paddingHorizontal: 6,
        justifyContent: "flex-start",
        borderLeft: 0.5,
        borderLeftColor: borderColor,
        flexGrow: 1, 
    },
    billto: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        marginBottom: 4,
    },
    detailsItem: {
        color: "#000000",
        marginBottom: 4,
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        textTransform: "uppercase",
        lineHeight: 1.2,
    },
    detailsItem2: {
        color: "#000000",
        marginBottom: 4,
        fontWeight: "bold",
        textTransform: "uppercase",
        lineHeight: 1.2,
    },
});

const PageHeader = ({ organization, entityData, entityDetails, entity }) => {
    const {
        companyName,
        phone,
        alternatePhone,
        email,
        logo,
        billingAddress,
        tagLine,
        gstNo,
        panNo,
    } = organization;
    const { street1, street2, city, state, pincode } = billingAddress;

    const isQuotation = entity === "quotations";
    const leftFlex = isQuotation ? 0.65 : 0.5;
    const rightFlex = isQuotation ? 0.35 : 0.5;
    const fontSize = isQuotation ? 10 : 10;

    return (
        <View style={style.container}>
            {/* Top Section with Logo and Company Info */}
            <View style={style.titleDiv}>
                <View style={style.imageDiv}>
                    <Image style={style.logo} src={logo || ""} />
                </View>
                <View style={style.titleContainer}>
                    <Text style={style.reportTitle}>
                        {companyName?.toUpperCase() || ""}
                    </Text>
                    {tagLine && <Text style={style.tagLine}>{tagLine}</Text>}
                    <Text style={style.add}>
                        {`${street1} ${street2} ${city} ${state} ${pincode}`}
                    </Text>
                    <Text style={style.contactText}>
                        MOB - {phone}
                        {alternatePhone ? ` / ${alternatePhone}` : ""} , EMAIL -{" "}
                        <Link>{email?.toUpperCase()}</Link>
                    </Text>
                </View>
            </View>

            {/* Bottom Section with Billing/Entity Details */}
            <View style={style.headerContainer}>
                <View style={{ ...style.leftSideBase, flex: leftFlex }}>
                    {isQuotation && entityDetails ? (
                        entityDetails.map((group, idx) => (
                            <View key={idx} style={{ marginBottom: 5 }}>
                                {group.map((item, i) => (
                                    <Text key={i} style={{ ...style.detailsItem, fontSize }}>
                                        {item.label?.toUpperCase()}
                                    </Text>
                                ))}
                            </View>
                        ))
                    ) : (
                        <>
                            <Text style={{ fontSize, fontFamily: "Helvetica-Bold" }}>
                                {companyName.toUpperCase()}
                            </Text>
                            <Text style={{ fontSize }}>GSTIN: {gstNo}</Text>
                            <Text style={{ fontSize }}>PAN-NO: {panNo}</Text>
                            <Text style={{ fontSize }}>
                                STATE: {state?.toUpperCase()}
                            </Text>
                        </>
                    )}
                </View>

                <View style={{ ...style.rightSideBase, flex: rightFlex }}>
                    {entityData &&
                        entityData.map((item, index) => (
                            <Text key={index} style={{ ...style.detailsItem2, fontSize }}>
                                <Text>
                                    {item.label?.toUpperCase()}:{" "}
                                </Text>
                                {item.value?.toUpperCase()}
                            </Text>
                        ))}
                </View>
            </View>
        </View>
    );
};

export default PageHeader;
