import CollapsibleTable from "components/Comman/ColapsableListTable";
import invoiceData from "Data/InvoiceData";
import paymentData from "Data/PaymentReceivedData";
import quotationData from "Data/QuotationData";
const TransactionTab = () => (
    <>
        <CollapsibleTable
            columns={invoiceData.getColumns()}
            panelHeader={"Invoice"}
            entity={"invoices"}
        />
        <CollapsibleTable
            panelHeader={"Payments Received"}
            columns={paymentData.getColumns()}
            entity={"paymentsreceived"}
        />
        <CollapsibleTable
            panelHeader={"Quotations"}
            columns={quotationData.getColumns()}
            entity={"quotations"}
        />
    </>
);

export default TransactionTab;
