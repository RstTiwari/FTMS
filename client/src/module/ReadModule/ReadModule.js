import React from "react";
import { useParams } from "react-router-dom";
import ReadCustomer from "pages/Customer/ReadCustomer";
import ReadQuation from "pages/Quote/ReadQuotation";
import ReadInvoice from "pages/Invoice/ReadInvoice";
import ReadLead from "pages/Lead/ReadLead";
import NotFound from "pages/Notfound";
import ReadChallan from "pages/DeliveyChallan/ReadChallan";
import ReadPurchaseOrder  from "pages/PurchaseOrder/ReadPurchaseOrder";


const ReadModule = () => {
    const { entity, id } = useParams();
    let componentToRender = <NotFound />;
    switch (entity) {
        case "customer":
            componentToRender = <ReadCustomer />;
            break;
        case "quote":
            componentToRender = <ReadQuation />;
            break;
        case "invoice":
            componentToRender = <ReadInvoice />;
            break;
        case "lead":
            componentToRender = <ReadLead />;
            break;
        case "deliverychallan":
            componentToRender = <ReadChallan />;
            break;
        case "purchaseorder":
            componentToRender = <ReadPurchaseOrder />;
            break;

        default:
            break;
    }
    return <>{componentToRender}</>;
};

export default ReadModule;
