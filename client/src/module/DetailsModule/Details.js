import NotFound from "pages/Notfound";
import Customer from "../../pages/Details/Customer/Customer"
import PDFGenerator from "pages/Details/PdfGenrator";
const DetailsModule = ({entity,payload,id})=>{
    let  component = <NotFound />
    switch (entity) {
        case "customers":
            component = <Customer payload = {payload} />
            break;
        case "invoices":
                component = <PDFGenerator  entity={entity} id={id} />
                break;
        case "quotations":
                    component = <PDFGenerator  entity={entity} id={id} />
                    break;
        default:
            break;
    }
    return component
}

export default DetailsModule