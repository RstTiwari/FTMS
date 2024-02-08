import React from "react";
import { useParams } from "react-router-dom";
import ReadInvoice from "pages/Invoice/ReadInvoice";
import QuotationPdf from "Pdf/QuotationPdf.js"
import NotFound from "pages/Notfound";

const PdfModule = () => {
    const { entity, id } = useParams();
    let componentToRender = <NotFound/>
    switch (entity) {
        case "quote":
            componentToRender = <QuotationPdf  />;
            break;
        case "invoice":
            componentToRender = <ReadInvoice />;
            break;

        default:
            break;
    }
    return <>{componentToRender}</>;
};

export default PdfModule;
