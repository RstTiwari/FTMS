import CollapsibleTable from "components/Comman/ColapsableTable";
import PurchaseData from "Data/PurchaseData";
import paymentReceivedData from "../../../Data/PaymnetMadeData";
import purchaseData from "Data/PurchaseData";
const TransectionTab = () => (
    <>
        <CollapsibleTable
            columns={purchaseData.getColumns()}
            panelHeader={"Purchase Order"}
            entity={"purchases"}
        />
        <CollapsibleTable
            panelHeader={"Payments Made"}
            columns={paymentReceivedData.getColumns()}
            entity={"paymentsmade"}
        />
    </>
);

export default TransectionTab;
