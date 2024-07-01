import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../pages/Notfound";
import CoustomerItem from "../../Forms/CoustomersForm";
import QuotesFormItems from "../../Forms/QuotationForm";
import InvoicesFormItems from "../../Forms/Invoice";
import ChallanFormItem from "../../Forms/DeliveryChallanForm";
import VendorFormItem from "../../Forms/VendorForm";
import PurchaseFormItem from "../../Forms/PurchaseOrderForm";
import ExpensesItem from "../../Forms/ExpenseForm";
import PaymentFormItem from "../../Forms/PaymentForm";
import LeadFormItem from "../../Forms/LeadForm";


const CoustomFormItem = ({ form}) => {
    const {entity} = useParams()
    let componentToRender = <NotFound />;

    switch (entity) {
        case "customers":
            componentToRender = <CoustomerItem form = {form} />;
            break;
        case "quotations":
            componentToRender = <QuotesFormItems />;
            break;
        case "invoices":
            componentToRender = <InvoicesFormItems />;
            break;
        case "leads":
            componentToRender = <LeadFormItem />;
            break;
        case "challans":
            componentToRender = <ChallanFormItem />;
            break;
        case "purchases":
            componentToRender = <PurchaseFormItem />;
            break;
        case "vendors":
            componentToRender = <VendorFormItem />;
            break;
        case "expenses":
            componentToRender = <ExpensesItem />;
            break;
        case "payments":
            componentToRender = <PaymentFormItem />;
            break;
        default:
            break;
    }

    return componentToRender;
};

export default CoustomFormItem;
