import NotFound from "pages/Notfound";
import Customer from "../../pages/Details/Customer/Customer";
import PaymentDetails from "../../pages/Details/PayementReceivedDetails";
import ExpenseDetails from "pages/Details/ExpenseDetails";
import ProductDetails from "pages/Details/ProductDetails";
import VendorDetails from "pages/Details/Vendor/Vendor";
import InvoiceDetails from "pages/Details/InvoiceDetails";
import QuotationDetailsPage from "pages/Details/QuotationDetails";
import PurchaseOrderDetails from "pages/Details/PurchaseOrderDetails";
import DeliveryChallanDetails from "pages/Details/DeliveryChallanDetails";
import PaymentMade from "pages/Details/PaymentMadeDetails";
import WorkOrderDetails from "pages/Details/WorkOderDetails";
import UserDetails from "pages/Details/UserDetails";
const DetailsModule = ({ entity, values, id, loading }) => {
    let component = <NotFound />;
    switch (entity) {
        case "customers":
            component = <Customer values={values} loading={loading} />;
            break;
        case "invoices":
            component = <InvoiceDetails invoice={values} loading={loading} />;
            break;
        case "quotations":
            component = (
                <QuotationDetailsPage quotation={values} loading={loading} />
            );
            break;
        case "paymentsreceived":
            component = (
                <PaymentDetails entity={entity} id={id} values={values} />
            );
            break;
        case "paymentsmade":
            component = <PaymentMade entity={entity} id={id} values={values} />;
            break;
        case "products":
            component = (
                <ProductDetails entity={entity} id={id} values={values} />
            );
            break;
        case "expenses":
            component = (
                <ExpenseDetails entity={entity} id={id} values={values} />
            );
            break;
        case "vendors":
            component = (
                <VendorDetails entity={entity} id={id} values={values} />
            );
            break;
        case "purchases":
            component = (
                <PurchaseOrderDetails
                    entity={entity}
                    id={id}
                    purchaseOrder={values}
                />
            );
            break;
        case "challans":
            component = (
                <DeliveryChallanDetails
                    entity={entity}
                    id={id}
                    deliveryChallan={values}
                />
            );
            break;
        case "workorders":
            component = <WorkOrderDetails entity={entity} workOrder={values} />;
            break;
        case "user":
            component = <UserDetails entity={entity} user={values} />;
            break;
        default:
            break;
    }
    return component;
};

export default DetailsModule;
