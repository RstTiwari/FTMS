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
    numberToWordsIndian,
} from "PdfTemplates/helper/detailsFormatter";
import InvoiceData from "../data.json";
import PageHeader from "./PageHeader";
import EntityDetails from "PdfTemplates/VipPlayTemplate/EntityDetails";
import ItemsTable from "./ItemTable";
import AmountsAndNotes from "PdfTemplates/Myfac8ryDefault/AmountAndBank";
import TermsAndConditions from "PdfTemplates/Myfac8ryDefault/TermAndNotes";
import BankDetails from "PdfTemplates/Myfac8ryDefault/BankDetails";
import TermsAndNotes from "PdfTemplates/Myfac8ryDefault/TermAndNotes";
import SignatureBlock from "PdfTemplates/Myfac8ryDefault/SignatureBlock";
import AmountInWords from "PdfTemplates/Myfac8ryDefault/AmountInWords";
import QuotationMessage from "PdfTemplates/Myfac8ryDefault/QuotationMessage";

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
    entityName: {
        textAlign: "center",
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        color: "#000",
        fontWeight: 1000,
        borderBottom: "1px solid #000",
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius:5
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});
const Index = ({ entity, data }) => {
    let { entityData, organization, selectColumns, entityPrefix } = data;
  const pageHeaderDetail = customPageHeader(entity, entityData, entityPrefix,organization);

    const entityDetails = entityDetailsFormatter(
        entity,
        entityData,
        organization
    );

    let amounts = grandAndOtherChargesFormatter(entity, entityData);
    let amountInWords = numberToWordsIndian(entityData.grandTotal)
    let headers = getTableHeaders2(entity, selectColumns);
    let bankDetails = bankDetailsFormatter(entity, organization?.bankDetails, organization.panNo);
    let entityName = entityNameFormatter(entity);
    return (
        <Document>
            <Page size="A4" break={true} style={styles.page} >
                <View style={styles.invoice}>
                    <PageHeader organization = {organization} entityData={pageHeaderDetail}  entityDetails ={entityDetails} entity={entity}/>
                    <Text style={styles.entityName}>{entityName}</Text>
                    <QuotationMessage  entity={entity} message={entityData["message"]}/>

                    <EntityDetails
                        data={entityDetails}
                        entity={entity}
                    />
                    <ItemsTable columns={headers} items={entityData?.items} />
                    <AmountsAndNotes
                        amounts={amounts}
                        bankDetails={bankDetails}
                        entity={entity}
                       
                    />
                    <AmountInWords amount={amountInWords}/>
                    <TermsAndNotes terms={entityData?.terms} notes={entityData.notes} specification={entityData.specification}/>
                    <SignatureBlock  companyName ={organization.companyName}/>
                </View>
            </Page>
        </Document>
    );
};

export default Index;
