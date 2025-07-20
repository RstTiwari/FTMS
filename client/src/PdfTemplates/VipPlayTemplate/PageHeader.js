import React from "react";
import { Text, View, StyleSheet, Link, Image } from "@react-pdf/renderer";

let borderColor = "#000000";

const style = StyleSheet.create({
    container: {
        borderBottom: 1,
        borderBottomColor: "#000000",
    },
    titleDiv: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingVertical: 5,
        borderBottom: 1,
        borderBottomColor: "#000000",
    },
    imageDiv: {
        width: "20%",
        alignItems: "flex-start",
        paddingLeft: 10,
    },
    titleContainer: {
        width: "80%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 10,
    },
    reportTitle: {
        color: "#42cbf5",
        fontSize: 20,
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        marginBottom: 2,
    },
    tagLine: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        marginBottom: 3,
    },
    add: {
        fontSize: 9,
        color: "#000000",
        textAlign: "center",
    },
    contactText: {
        fontSize: 9,
        textAlign: "center",
    },
    logo: {
        width: 100,
        height: 66,
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
    leftSideBase: {
        paddingTop: 3,
        paddingLeft: 3,
        justifyContent: "flex-start",
        height: "auto",
        borderRight: 0.5,
        borderRightColor: borderColor,
    },
    rightSideBase: {
        paddingTop: 3,
        paddingLeft: 3,
        justifyContent: "flex-start",
        borderLeft: 0.5,
        borderLeftColor: borderColor,
    },
    billto: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        fontWeight: "heavy",
    },
    detailsItem: {
        color: "#000000",
        marginBottom: 5,
        wordWrap: "break-word",
        fontFamily: "Helvetica-Bold",
        fontWeight: "heavy",
        textTransform: "uppercase",
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

    // Dynamic styles
    const isQuotation = entity === "quotations";
    const leftFlex = isQuotation ? 0.65 : 0.5;
    const rightFlex = isQuotation ? 0.35 : 0.5;
    const fontSize = isQuotation ? 10 : 12;

    return (
        <View style={style.container}>
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
                        MOB - {phone}{" "}
                        {alternatePhone ? `/ ${alternatePhone}` : ""} , EMAIL -{" "}
                        <Link>{email?.toUpperCase()}</Link>
                    </Text>
                </View>
            </View>

            <View style={style.headerContainer}>
                {/* Left Side */}
                <View style={{ ...style.leftSideBase, flex: leftFlex }}>
                    {isQuotation && entityDetails ? (
                        entityDetails.map((group, idx) => (
                            <View key={idx} style={{ marginBottom: 5 }}>
                                {group.map((item, i) => (
                                    <Text
                                        key={i}
                                        style={{
                                            ...style.detailsItem,
                                            fontSize,
                                        }}
                                    >
                                        {item.label?.toUpperCase()}
                                    </Text>
                                ))}
                            </View>
                        ))
                    ) : (
                        <>
                            <Text style={style.billto}>COMPANY DETAILS</Text>
                            <Text
                                style={{
                                    fontWeight: "1000",
                                    fontSize,
                                    fontFamily: "Helvetica-Bold",
                                }}
                            >
                                {companyName.toUpperCase()}
                            </Text>
                            <Text style={{ fontSize }}>GSTIN : {gstNo}</Text>
                            <Text style={{ fontSize }}>PAN-NO : {panNo}</Text>
                            <Text style={{ fontSize }}>
                                STATE : {state?.toUpperCase()}
                            </Text>
                        </>
                    )}
                </View>

                {/* Right Side */}
                <View style={{ ...style.rightSideBase, flex: rightFlex }}>
                    {entityData &&
                        entityData.map((item, index) => (
                            <Text
                                key={index}
                                style={{
                                    ...style.detailsItem,
                                    fontSize,
                                }}
                            >
                                <Text style={{ fontWeight: "bold" }}>
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
