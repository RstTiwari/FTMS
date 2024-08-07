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
import EntityNo from "Forms/Counters";
import OrganizationForm from "Forms/OrgnizationForm";

const UpdateModule = ({ entity, form }) => {
    // const { entity: entityFromRouter } = useParams();
    let componentToRender = <NotFound />;
    // const entity = entityOfForm || entityFromRouter;

    switch (entity) {
        case "customers":
            componentToRender = <CoustomerItem form={form}  />;
            break;
        case "quotations":
            componentToRender = <QuotesFormItems form={form} />;
            break;
        case "invoices":
            componentToRender = <InvoicesFormItems  form={form} />;
            break;
        case "leads":
            componentToRender = <LeadFormItem form={form}  />;
            break;
        case "challans":
            componentToRender = <ChallanFormItem form={form}  />;
            break;
        case "purchases":
            componentToRender = <PurchaseFormItem  form={form} />;
            break;
        case "vendors":
            componentToRender = <VendorFormItem form={form} />;
            break;
        case "expenses":
            componentToRender = <ExpensesItem  form={form} />;
            break;
        case "products":
            componentToRender = <ProductForm form={form}  />;
            break;
        case "payments":
            componentToRender = <PaymentFormItem form={form}  />;
            break;
        case "counters":
            componentToRender = <EntityNo form={form}  />;
        case "organization":
                componentToRender = <OrganizationForm form={form}  />;
            break;
        default:
            break;
    }

    return componentToRender;
};

export default UpdateModule;
