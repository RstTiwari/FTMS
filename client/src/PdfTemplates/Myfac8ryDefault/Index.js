import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  PDFViewer,
} from "@react-pdf/renderer";
import InvoiceData from "../data.json";
import PageHeader from "./PageHeader";
import {
  bankDetailsFormatter,
  customPageHeader,
  entityDetailsFormatter,
  getTableHeaders2,
  grandAndOtherChargesFormatter,
  entityNameFormatter,
  workOrderTable,
} from "PdfTemplates/helper/detailsFormatter";
import EntityDetails from "./EntityDetails";
import ItemsTable from "./ItemTable";
import AmountsAndNotes from "./AmountAndBank";
import TermsAndConditions from "./TermAndNotes";
import BankDetails from "./BankDetails";
import MultilevelWorkOrder from "./MultileveWorkOrder";

// Common styles
let borderColor = "#000000";
const commonStyles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
    marginTop: 1,
    marginBottom: -5,
    paddingBottom: 2,
    border: 2,
    borderBottomColor: borderColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderTopColor: borderColor,
  },
  titleDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderBottom: 1,
    borderBottomColor: "#000000",
    marginBottom: 20,
  },
  imageDiv: {
    flex: 0.25,
  },
  titleContainer: {
    flex: 1.8,
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
    textAlign: "center",
  },
  reportTitle: {
    color: "#42cbf5",
    fontSize: 20,
    textAlign: "center",
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
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },

  contentText: {
    fontSize: 12,
    fontFamily: "Helvetica",
  },
});

// MyDocument component
const Index = ({ entity, data }) => {
  let { entityData, organization, selectColumns, entityPrefix } = data;

  const pageHeaderDetail = customPageHeader(entity, entityData, entityPrefix);
  const entityDetails = entityDetailsFormatter(
    entity,
    entityData,
    organization
  );

  let amounts = grandAndOtherChargesFormatter(entity, entityData);

  let headers = getTableHeaders2(entity, selectColumns);
  let bankDetails = bankDetailsFormatter(entity, organization?.bankDetails);
  let entityName = entityNameFormatter(entity);
  return (
    <Document>
      <Page size="A4" break={true} style={commonStyles.page}>
        {/* PageHeader with dynamic data */}
        <PageHeader
          organization={organization}
          detailsData={pageHeaderDetail}
        />

        <EntityDetails data={entityDetails} entityName={entityName} />

        <ItemsTable columns={headers} items={entityData?.items} />

        <AmountsAndNotes amounts={amounts} notes={entityData?.notes} />
        <TermsAndConditions terms={entityData?.terms} />
        <BankDetails entity={entity} bankDetails={bankDetails} />
        <Text
          style={{
            color: "#42cbf5",
            fontSize: 12,
            fontFamily: "Helvetica-Bold",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Thank You For Business
        </Text>
      </Page>
    </Document>
  );
};

export default Index;
