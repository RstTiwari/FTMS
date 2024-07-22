import NotFound from "pages/Notfound";
import Customer from "../../pages/Details/Customer"
const DetailsModule = ({entity,payload})=>{
    let  component = <NotFound />
    switch (entity) {
        case "customers":
            component = <Customer />
            break;
        default:
            break;
    }
    return component
}

export default DetailsModule