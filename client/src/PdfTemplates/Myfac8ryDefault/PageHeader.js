import React from "react";
import { StyleSheet, Text, View, Image, Link } from "@react-pdf/renderer";

// Define custom styles for the PageHeader component
const pageHeaderStyles = StyleSheet.create({
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start", // Align logo and text to the left
    borderBottom: 1,
    borderBottomColor: "#000000",
  },
  logoWrapper: {
    flex: 0.2, // Adjust the width for the logo to ensure no overlap
    paddingRight: 15, // Added padding to the right to separate logo and text
    marginRight: 20, // Added margin to ensure space between logo and text
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  textWrapper: {
    flex: 3, // Adjust width of the textWrapper for better space distribution
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
    textAlign: "left", // Align text to the left
    width: "70%", // Ensure the text takes up 70% of available space
    paddingLeft: 10, // Added padding left to give space from logo
    borderRight: 1, // Add left vertical border
    borderColor: "#000000",
  },
  titleText: {
    color: "#42cbf5",
    fontSize: 12, // Slightly increased font size for the title
    fontFamily: "Helvetica-Bold",
    fontWeight: "heavy",
    wordWrap: "break-word",
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
  contentText: {
    fontSize: 8, // Increased font size for better readability
    color: "#000000",
    marginBottom: 5,
    wordWrap: "break-word", // Ensure text wraps if it exceeds width
  },
  addressText: {
    fontSize: 8, // Increased font size for better readability
    color: "#000000",
    marginBottom: 2,
    wordWrap: "break-word",
  },
  detailsWrapper: {
    flex: 2,
    width: "30%", // Give more space to the details section
    display: "flex",
    flexDirection: "column",
    fontWeight:"extrabold",
    paddingLeft: 10,
    paddingRight: 10,
  },
  detailsItem: {
    fontSize: 12, // Increased font size for better readability
    color: "#000000",
    marginBottom: 5,
    wordWrap: "break-word",
  },
});

const PageHeader = ({ organization, detailsData }) => {
  // Destructure organization and address details
  const { companyName, phone, email, logo, billingAddress } = organization;
  const { street1, street2, city, state, pincode } = billingAddress;

  return (
    <View style={pageHeaderStyles.headerWrapper}>
      {/* Logo on the left */}
      <View style={pageHeaderStyles.logoWrapper}>
        <Image style={pageHeaderStyles.logoImage} src={logo} />
      </View>

      {/* Organization details */}
      <View style={pageHeaderStyles.textWrapper}>
        <Text style={pageHeaderStyles.titleText}>
          {companyName.toUpperCase()}
        </Text>

        {/* Billing Address */}
        <View>
          <Text style={pageHeaderStyles.addressText}>
            {street1}
            {street2}
          </Text>
          <Text style={pageHeaderStyles.addressText}>
            {city}, {state} - {pincode}
          </Text>

          {/* Contact details */}
          <Text style={pageHeaderStyles.contentText}>Phone: {phone}</Text>
          <Link src={`mailto:${email}`} style={pageHeaderStyles.contentText}>
            Email: {email}
          </Link>
        </View>
      </View>

      {/* Invoice Details */}
      <View style={pageHeaderStyles.detailsWrapper}>
        {detailsData.map((item, index) => (
          <Text key={index} style={pageHeaderStyles.detailsItem}>
            <Text style={{ fontWeight: "bold" }}>{item.label}: </Text>
            {item.value}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default PageHeader;
