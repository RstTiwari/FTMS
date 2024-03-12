import invoicePdf from "./invoice.js";
import quotationPdf from "./quotation.js";
import challanPdf from "./challan.js";
import purchaseOrderPdf from "./purchaseOrder.js";

const pdfTemplateSelector = (req, res, next, data,entity) => {
    if (entity === "quote") {
        return quotationPdf(req, res, next, data);
    } else if (entity === "invoice") {
        return invoicePdf(req, res, next, data);
    } else if (entity === "deliverychallan") {
        return challanPdf(req, res, next, data);
    } else if (entity === "purchaseorder") {
        return purchaseOrderPdf(req, res, next, data);
    }
};

export default pdfTemplateSelector;
