import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 40,
  },
  container: {
    textAlign: "center",
    border: "1 solid red",
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: "red",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "black",
  },
});

// React-PDF Error Message Component
const ErrorPdfMessage = ({ message }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>PDF Generation Error</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Page>
  </Document>
);

export default ErrorPdfMessage;
