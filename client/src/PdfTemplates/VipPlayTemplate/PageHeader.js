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
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",      
    paddingHorizontal:5,
  },
  reportTitle: {
    color: "#42cbf5",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontWeight: "heavy",
    fontStyle: "italic",
    letterSpacing: 0.5,
    marginTop: 0,  
    marginBottom:1,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    fontWeight: "heavy",
    textAlign: "center",
    marginBottom: 2,
  },
  add: {
    fontSize: 9,
    textAlign: "center",
    marginBottom: 2,
  },
  contactText: {
    fontSize: 9,
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
    height: 100,
  },
  
  rightSideBase: {
    padding: 6,
    justifyContent: "flex-start",
    flexGrow: 1,
    border: 1,
    borderColor: "black",
    margin: "2.5px", // Only left margin
    borderRadius: "10px",
    height: 100,
  },
  
  detailLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    fontWeight: "heavy",
  },
  detailText: {
    fontSize: 10,
  },
});

const PageHeader = ({ organization, entityData,entityDetails=[] ,entity}) => {
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
     const fontSize = isQuotation ? 10 : 12;
  return (
      <View style={styles.container}>
          {/* TOP SECTION — Updated as per InvoiceTitle */}
          <View style={styles.titleDiv}>
              <View style={styles.imageDiv}>
                  <Image style={styles.logo} src={logo || ""} />
              </View>
              <View style={styles.titleContainer}>
                  <Text style={styles.reportTitle}>
                      {companyName?.toUpperCase() || ""}
                  </Text>
                  {tagLine && <Text style={styles.subtitle}>{tagLine}</Text>}
                  <Text style={styles.add}>
                      {`${street1 || ""} ${street2 || ""} ${city || ""} ${
                          state || ""
                      } ${pincode || ""}`}
                  </Text>
                  <Text style={styles.contactText}>
                      MOB-{phone}
                      {alternatePhone ? `/${alternatePhone}` : ""}, EMAIL-{" "}
                      <Link>{email?.toUpperCase()}</Link>,
                      WEB-{website ? (<Link>{website?.toUpperCase()}</Link> ):""}
                  </Text>
              </View>
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
