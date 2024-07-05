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
import ProductForm from "Forms/ProductFrom";
import EntityNo from "Forms/EntityNo";

const CoustomFormItem = ({ entityOfForm, form, isModal }) => {
    const { entity: entityFromRouter } = useParams();
    let componentToRender = <NotFound />;
    const entity = entityOfForm || entityFromRouter;

    switch (entity) {
        case "customers":
            componentToRender = <CoustomerItem form = {form} isModal={isModal} />;
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
            componentToRender = <VendorFormItem isModal={isModal} />;
            break;
        case "expenses":
            componentToRender = <ExpensesItem />;
            break;
        case "products":
            componentToRender = <ProductForm isModal={isModal} />;
            break;
        case "payments":
            componentToRender = <PaymentFormItem />;
            break;
        case "entityNo":
            componentToRender = <EntityNo />;
            break;
        default:
            break;
    }

    return componentToRender;
};

export default CoustomFormItem;
