import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../pages/Notfound";
import CoustomerItem from "../../Forms/App/CoustomersForm";
import QuotesFormItems from "../../Forms/App/QuotationForm";
import InvoicesFormItems from "../../Forms/App/Invoice";
import ChallanFormItem from "../../Forms/App/DeliveryChallanForm";
import VendorFormItem from "../../Forms/App/VendorForm";
import PurchaseFormItem from "../../Forms/App/PurchaseOrderForm";
import ExpensesItem from "../../Forms/App/ExpenseForm";
import PaymentFormItem from "../../Forms/App/PaymentForm";
import LeadFormItem from "../../Forms/App/LeadForm";
import ProductForm from "../../Forms/App/ProductFrom";
import EntityNo from "../../Forms/App/Counters";
import OrganizationForm from "../../Forms/App/OrgnizationForm";

const UpdateModule = ({ entity, form }) => {
    // const { entity: entityFromRouter } = useParams();
    let componentToRender = <NotFound />;
    // const entity = entityOfForm || entityFromRouter;

    switch (entity) {
        case "customers":
            componentToRender = <CoustomerItem form={form} />;
            break;
        case "quotations":
            componentToRender = <QuotesFormItems form={form} />;
            break;
        case "invoices":
            componentToRender = <InvoicesFormItems form={form} />;
            break;
        case "leads":
            componentToRender = <LeadFormItem form={form} />;
            break;
        case "challans":
            componentToRender = <ChallanFormItem form={form} />;
            break;
        case "purchases":
            componentToRender = <PurchaseFormItem form={form} />;
            break;
        case "vendors":
            componentToRender = <VendorFormItem form={form} />;
            break;
        case "expenses":
            componentToRender = <ExpensesItem form={form} />;
            break;
        case "products":
            componentToRender = <ProductForm form={form} />;
            break;
        case "paymentsrecived":
            componentToRender = <PaymentFormItem form={form} isUpdate={true} />;
            break;
        case "counters":
            componentToRender = <EntityNo form={form} />;
        case "orgnizations":
            componentToRender = <OrganizationForm form={form} />;
            break;
        default:
            break;
    }

    return componentToRender;
};

export default UpdateModule;
