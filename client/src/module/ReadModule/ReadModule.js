import React from "react";
import { useParams } from "react-router-dom";
import ReadCustomer from "pages/Customer/ReadCustomer";
import ReadQuation from "pages/Quote/ReadQuotation";
import ReadInvoice from "pages/Invoice/ReadInvoice";
import ReadLead from "pages/Lead/ReadLead";
import NotFound from "pages/Notfound";

const ReadModule = () => {
    const { entity, id } = useParams();
    let componentToRender = <NotFound/>
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

        default:
            break;
    }
    return <>{componentToRender}</>;
};

export default ReadModule;
