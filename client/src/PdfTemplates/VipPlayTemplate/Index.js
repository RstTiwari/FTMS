import React from "react";
import {
    Document,
    Page,
    StyleSheet,
    Text,
    View,
    PDFViewer,
} from "@react-pdf/renderer";
import {
    bankDetailsFormatter,
    customPageHeader,
    entityDetailsFormatter,
    getTableHeaders2,
    grandAndOtherChargesFormatter,
    entityNameFormatter,
    workOrderTable,
} from "PdfTemplates/helper/detailsFormatter";
import InvoiceData from "../data.json";
import PageHeader from "./PageHeader";
import EntityDetails from "PdfTemplates/VipPlayTemplate/EntityDetails";
import ItemsTable from "./ItemTable";
import AmountsAndNotes from "PdfTemplates/Myfac8ryDefault/AmoutNotes";
import TermsAndConditions from "PdfTemplates/Myfac8ryDefault/TermsandCondition";
import BankDetails from "PdfTemplates/Myfac8ryDefault/BankDetails";

let borderColor = "#000000";
const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        fontSize: 11,
        padding: 5,
        lineHeight: 1.5,
        flexDirection: "column",
    },
    invoice: {
        borderRight: 1.5,
        borderLeft: 1.5,
        borderBottom: 1.5,
        borderTop: 1.5,
        borderBottomColor: borderColor,
        borderLeftColor: borderColor,
        borderRightColor: borderColor,
        borderTopColor: borderColor,
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: "auto",
        marginRight: "auto",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});
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
            <Page size="A4" break={true} style={styles.page} >
                <View style={styles.invoice}>
                    <PageHeader organization = {organization} entityData={pageHeaderDetail} />
                    <EntityDetails
                        data={entityDetails}
                        entityName={entityName}
                    />
                    <ItemsTable columns={headers} items={entityData?.items} />
                    <AmountsAndNotes
                        amounts={amounts}
                        notes={entityData?.notes}
                    />
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
                </View>
            </Page>
        </Document>
    );
};

export default Index;
