import CollapsibleTable from "components/Comman/ColapsableListTable";
import invoiceData from "Data/InvoiceData";
import paymentData from "Data/PaymentReceivedData";
import quotationData from "Data/QuotationData";
const TransactionTab = ({id}) => (
    <>
        <CollapsibleTable
            columns={invoiceData.getColumns()}
            panelHeader={"Invoice"}
            entity={"invoices"}
            id={id}
        />
        <CollapsibleTable
            panelHeader={"Payments Received"}
            columns={paymentData.getColumns()}
            entity={"paymentsreceived"}
            id={id}
        />
        <CollapsibleTable
            panelHeader={"Quotations"}
            columns={quotationData.getColumns()}
            entity={"quotations"}
            id={id}
        />
    </>
);

export default TransactionTab;
