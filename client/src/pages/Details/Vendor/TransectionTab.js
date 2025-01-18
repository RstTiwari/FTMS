import CollapsibleTable from "components/Comman/ColapsableListTable";
import PurchaseData from "Data/PurchaseData";
import paymentReceivedData from "../../../Data/PaymnetMadeData";
import purchaseData from "Data/PurchaseData";
const TransectionTab = ({id}) => (
    <>
        <CollapsibleTable
            columns={purchaseData.getColumns()}
            panelHeader={"Purchase Order"}
            entity={"purchases"}
            id={id}
        />
        <CollapsibleTable
            panelHeader={"Payments Made"}
            columns={paymentReceivedData.getColumns()}
            entity={"paymentsmade"}
            id={id}
        />
    </>
);

export default TransectionTab;
