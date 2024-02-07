import React from "react";
import { useParams } from "react-router-dom";
import UpdateCustomer from "pages/Customer/UpdateCustomer";
import NotFound from "pages/Notfound";
import UpdateQuotation from "pages/Quote/UpdateQuotation";
import UpdateInvoice from "pages/Invoice/UpdateInvoice";
import UpdateLead from "pages/Lead/UpdateLead";

const UpdateModule = () => {
    const { entity, id } = useParams();
    let componentToRender = <NotFound />;
    switch (entity) {
        case "customer":
            componentToRender = <UpdateCustomer />;
            break;
        case "quote":
            componentToRender = <UpdateQuotation />;
            break;
        case "invoice":
            componentToRender = <UpdateInvoice />;
            break;
        case "lead":
            componentToRender = <UpdateLead />;
            break;
        default:
            break;
    }
    return <>{componentToRender}</>;
};

export default UpdateModule;
