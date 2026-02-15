import React from "react";
import { Text, View, StyleSheet, Link, Image } from "@react-pdf/renderer";

const borderColor = "#000000";

const styles = StyleSheet.create({
    container: {
        // borderBottom: 1,
        // borderBottomColor: borderColor,
        position: "relative",
    },

    titleDiv: {
        flexDirection: "row",
        width: "100%",
        borderBottom: 1,
        borderBottomColor: "#000000",
        alignItems: "flex-start",
        paddingBottom: 0,
        marginBottom: 0,
    },
    imageDiv: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        width: "60%",   // ✅ Fixed center width
        alignItems: "center",
        justifyContent: "center",
    },

    reportTitle: {
        color: "#42cbf5",
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Helvetica-Bold",
        fontWeight: "heavy",
        fontStyle: "italic",
        letterSpacing: 0.5,
        marginTop: 0,
        marginBottom: 1,
        wordBreak: "normal",
    },
    subtitle: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        fontWeight: "heavy",
        textAlign: "center",
        marginBottom: 2,
        wordBreak: "normal",
    },
    add: {
        fontSize: 9,
        textAlign: "center",
        marginBottom: 2,
        wordBreak: "normal",
    },
    contactText: {
        fontSize: 8,
        textAlign: "center",
    },
    logo: {
        width: 100,
        height: 80,
        marginLeft: "auto",
        marginRight: "auto",
    },

    headerContainer: {
        fontSize: 8,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    leftSideBase: {
        padding: 6,
        justifyContent: "flex-start",
        flexGrow: 1,
        border: 1,
        borderColor: "black",
        margin: "2.5px", // Only right margin
        borderRadius: "10px",
        height: 70,
    },

    rightSideBase: {
        padding: 6,
        justifyContent: "flex-start",
        flexGrow: 1,
        border: 1,
        borderColor: "black",
        margin: "2.5px", // Only left margin
        borderRadius: "10px",
        height: 70,
    },

    detailLabel: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        fontWeight: "heavy",
    },
    detailText: {
        fontSize: 10,
    },

    rightSpacer: {
        width: "20%",   // ✅ Equal to imageDiv
    },
});

const PageHeader = ({ organization, entityData, entityDetails = [], entity }) => {
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
        website,
    } = organization;
    const { street1, street2, city, state, pincode } = billingAddress;
    const isQuotation = entity === "quotations";
    const leftFlex = isQuotation ? 0.65 : 0.5;
    const rightFlex = isQuotation ? 0.45 : 0.5;
    const fontSize = isQuotation ? 8 : 8;
    return (
        <View style={styles.container}>
            {/* TOP SECTION — Updated as per InvoiceTitle */}
            <View style={styles.titleDiv}>
                <View style={styles.imageDiv}>
                    <Image style={styles.logo} src={logo || ""} />
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.reportTitle}
                        hyphenationCallback={(word) => [word]}

                    >
                        {companyName?.toUpperCase() || ""}
                    </Text>

                    {tagLine && <Text style={styles.subtitle} hyphenationCallback={(word) => [word]}>{tagLine}</Text>}

                    <Text style={styles.add} hyphenationCallback={(word) => [word]}>
                        {`${street1 || ""} ${street2 || ""} ${city || ""} ${state || ""
                            } ${pincode || ""}`}
                    </Text>

                    <Text style={styles.contactText}>
                        MOB-{phone}
                        {alternatePhone ? `/${alternatePhone}` : ""}, EMAIL-{" "}
                        <Link>{email?.toUpperCase()}</Link>,
                        WEB-{website ? (
                            <Link>{website?.toUpperCase()}</Link>
                        ) : ""}
                    </Text>
                </View>

                {/* ✅ NEW RIGHT SPACER */}
                <View style={styles.rightSpacer} />
            </View>


            {/* Bottom: Details (conditional) */}
            <View style={styles.headerContainer}>
                <View style={{ ...styles.leftSideBase, flex: leftFlex }}>
                    {isQuotation ? (
                        entityDetails.map((group, groupIndex) => (
                            <View
                                key={groupIndex}
                                style={{ marginBottom: 5, fontSize: 10 }}
                            >
                                {group.map((item, itemIndex) => (
                                    <Text
                                        key={itemIndex}
                                        style={{
                                            ...styles.detailsItem2,
                                            fontSize,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: "Helvetica-Bold",
                                            }}
                                        >
                                            {item.label?.toUpperCase()}:{" "}
                                        </Text>
                                        {item.value?.toUpperCase()}
                                    </Text>
                                ))}
                            </View>
                        ))
                    ) : (
                        <>
                            <Text
                                style={{ fontSize, fontFamily: "Helvetica-Bold" }}
                            >
                                {companyName.toUpperCase()}
                            </Text>
                            {gstNo && (
                                <Text style={{ fontSize }}>GSTIN: {gstNo}</Text>
                            )}
                            {panNo && (
                                <Text style={{ fontSize }}>PAN-NO: {panNo}</Text>
                            )}
                            {state && (
                                <Text style={{ fontSize }}>
                                    STATE: {state.toUpperCase()}
                                </Text>
                            )}
                        </>
                    )}
                </View>

                <View style={{ ...styles.rightSideBase, flex: rightFlex }}>
                    {entityData?.map((item, index) => (
                        <Text
                            key={index}
                            style={{ ...styles.detailsItem2, fontSize }}
                        >
                            <Text style={{ fontFamily: "Helvetica-Bold" }}>
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
