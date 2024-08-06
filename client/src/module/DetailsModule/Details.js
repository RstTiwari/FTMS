import NotFound from "pages/Notfound";
import Customer from "../../pages/Details/Customer/Customer";
import PDFGenerator from "pages/Details/PdfGenrator";
import PaymentDetails from "../../pages/Details/PayementDetails";
import ExpenseDetails from "pages/Details/ExpenseDetails";
const DetailsModule = ({ entity, values, id }) => {
    let component = <NotFound />;
    switch (entity) {
        case "customers" || "vend":
            component = <Customer values={values} />;
            break;
        case "invoices":
            component = <PDFGenerator entity={entity} id={id} />;
            break;
        case "quotations":
            component = <PDFGenerator entity={entity} id={id} />;
            break;
        case "payments":
            component = (
                <PaymentDetails entity={entity} id={id} values={values} />
            );
            break;
        case "expenses":
            component = (
                <ExpenseDetails entity={entity} id={id} values={values} />
            );
            break;
        case "vendors":
                component = (
                    <Customer entity={entity} id={id} values={values} />
                );
                break;
        case "purchases":
                    component = (
                        <PDFGenerator entity={entity} id={id}  />
                    );
                    break;
        case "challans":
                        component = (
                            <PDFGenerator entity={entity} id={id}  />
                        );
                        break;
        default:
            break;
    }
    return component;
};

export default DetailsModule;
