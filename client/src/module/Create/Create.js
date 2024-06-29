import React from "react";
import { useParams } from "react-router-dom";
import ReadCustomer from "pages/Customer/ReadCustomer";
import ReadQuation from "pages/Quote/ReadQuotation";
import ReadInvoice from "pages/Invoice/ReadInvoice";
import ReadLead from "pages/Lead/ReadLead";
import NotFound from "pages/Notfound";
import ReadChallan from "pages/DeliveyChallan/ReadChallan";
import ReadPurchaseOrder from "pages/PurchaseOrder/ReadPurchaseOrder";
import ReadVendor from "pages/Vendor/ReadVendor";
import NewCustomer from "pages/Customer/NewCustomer";

const Create = () => {
    const { tenantId, entity, pageNo } = useParams();

    let componentToRender = <NotFound />;

    switch (entity) {
        case "customers":
            componentToRender = <NewCustomer />;
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
        case "vendors":
            componentToRender = <ReadVendor />;
            break;
        default:
            break;
    }

    return <>{componentToRender}</>;
};

export default Create;
