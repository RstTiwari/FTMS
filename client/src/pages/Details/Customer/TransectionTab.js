import CollapsibleTable from "components/Comman/ColapsableTable";
import invoiceData from "Data/InvoiceData";
import paymentData from "Data/PaymentReceivedData";
import quotationData from "Data/QuotationData";
const TransactionTab = () => (
    <>
        <CollapsibleTable
            columns={invoiceData.getColumns()}
            panelHeader={"Invoice"}
        />
        <CollapsibleTable
            panelHeader={"Payments"}
            columns={paymentData.getColumns()}
        />
        <CollapsibleTable
            panelHeader={"Quotations"}
            columns={quotationData.getColumns()}
        />
    </>
);

export default TransactionTab;
