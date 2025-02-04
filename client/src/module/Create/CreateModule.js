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
import OrganizationForm from "Forms/App/OrgnizationForm";
import PaymentMadeForm from "Forms/App/PaymentMadeForm";
import WorkOrderForm from "Forms/App/WorkOder";
import SubUserForm from "Forms/App/UserForm";

const CoustomFormItem = ({ entity, form, isModal, isUpdate }) => {
  // const { entity: entityFromRouter } = useParams();
  let componentToRender = <NotFound />;
  // const entity = entityOfForm || entityFromRouter;

  switch (entity) {
    case "customers":
      componentToRender = <CoustomerItem form={form} isModal={isModal} />;
      break;
    case "quotations":
      componentToRender = <QuotesFormItems form={form}  entity={entity}/>;
      break;
    case "invoices":
      componentToRender = <InvoicesFormItems form={form} entity={entity} />;
      break;
    case "leads":
      componentToRender = <LeadFormItem form={form}  entity={entity}/>;
      break;
    case "challans":
      componentToRender = <ChallanFormItem form={form} entity={entity} />;
      break;
    case "purchases":
      componentToRender = (
        <PurchaseFormItem form={form} isCreate={true} entity={entity} />
      );
      break;
    case "vendors":
      componentToRender = (
        <VendorFormItem form={form} isModal={isModal} entity={entity} />
      );
      break;
    case "expenses":
      componentToRender = <ExpensesItem form={form} entity={entity} />;
      break;
    case "products":
      componentToRender = (
        <ProductForm form={form} isModal={isModal} entity={entity} />
      );
      break;
    case "paymentsreceived":
      componentToRender = (
        <PaymentFormItem
          form={form}
          isUpdate={isUpdate}
          entity={entity}
        />
      );
      break;
    case "paymentsmade":
      componentToRender = (
        <PaymentMadeForm form={form} isUpdate={isUpdate} entity={entity} />
      );
      break;
    case "counters":
      componentToRender = <EntityNo form={form} entity={entity} />;

      break;
    case "organization":
      componentToRender = <OrganizationForm form={form} entity={entity} />;
      break;
    case "workorders":
      componentToRender = <WorkOrderForm form={form} entity={entity} />;
      break;
    case "user":
      componentToRender = <SubUserForm form={form} entity={entity} />;
      break;
    default:
      break;
  }

  return componentToRender;
};

export default CoustomFormItem;
