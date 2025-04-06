import React from "react";
import { Document, Page, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import InvoiceData from "./data.json";
import PageHeader from "./Myfac8ryDefault/PageHeader";
import {
  customPageHeader,
  entityDetailsFormatter,
  getTableHeaders2,
  grandAndOtherChargesFormatter,
} from "PdfTemplates/helper/detailsFormatter";
import EntityDetails from "./Myfac8ryDefault/EntityDetails";
import ItemsTable from "./Myfac8ryDefault/ItemTable";
import AmountsAndNotes from "./Myfac8ryDefault/AmoutNotes";
import TermsAndConditions from "./Myfac8ryDefault/TermsandCondition";

// Common styles
const commonStyles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
    marginTop: 1,
    marginBottom: -5,
    paddingBottom: 2,
    border: 2,
    borderBottomColor: "#000000",
    borderLeftColor: "#000000",
    borderRightColor: "#000000",
    borderTopColor: "#000000",
  },
  section: {
    marginBottom: 20,
  },
});

// TestingPdf component
const TestingPdf = ({ entity, data }) => {
  const pageHeaderDetail = customPageHeader("invoices", InvoiceData, "My");
  const entityDetails = entityDetailsFormatter("invoices", InvoiceData);
  let amounts = grandAndOtherChargesFormatter("invoices", InvoiceData);
  let headers = getTableHeaders2("invoices", []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A4" break={true} style={commonStyles.page}>
            {/* PageHeader with dynamic data */}
            <PageHeader
              organization={InvoiceData.organization}
              detailsData={pageHeaderDetail}
            />
            <EntityDetails data={entityDetails} />
            <ItemsTable columns={headers} items={InvoiceData?.items} />
            <AmountsAndNotes amounts={amounts} notes={InvoiceData?.notes} />
            <TermsAndConditions terms={InvoiceData?.terms} />
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default TestingPdf;
