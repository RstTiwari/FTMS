import NotFound from "pages/Notfound";
import Customer from "../../pages/Details/Customer/Customer";
import PDFGenerator from "pages/Details/PdfGenrator";
import PaymentDetails from "../../pages/Details/PayementDetails";
import ExpenseDetails from "pages/Details/ExpenseDetails";
import ProductDetails from "pages/Details/ProductDetails";
import VendorDetails from "pages/Details/Vendor/Vendor";
import InvoiceDetails from "pages/Details/InvoiceDetails";
import QuotationDetailsPage from "pages/Details/QuotationDetails";
import PurchaseOrderDetails from "pages/Details/PurchaseOrderDetails";
import DeliveryChallanDetails from "pages/Details/DeliveryChallanDetails";
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
        case "payments":
            component = (
                <PaymentDetails entity={entity} id={id} values={values} />
            );
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
        default:
            break;
    }
    return component;
};

export default DetailsModule;
