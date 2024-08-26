import CollapsibleTable from "components/Comman/ColapsableTable";
import PurchaseData from "Data/PurchaseData";
import paymentReceivedData from "../../../Data/PaymnetMadeData";
import purchaseData from "Data/PurchaseData";
const TransectionTab = () => (
    <>
        <CollapsibleTable
            columns={purchaseData.getColumns()}
            panelHeader={"Purchase Order"}
        />
        <CollapsibleTable
            panelHeader={"Payments Made"}
            columns={paymentReceivedData.getColumns()}
        />
       
    </>
);

export default TransectionTab;
