import defaultPdfTemplate from "./defult.js";
import quotationPdf from "./quotation.js";
import challanPdf from "./challan.js";
import purchaseOrderPdf from "./purchaseOrder.js";

const pdfTemplateSelector = (
    req,
    res,
    next,
    entityData,
    organizationData,
    entity,
    entityPrefix,
    forEmail
) => {
    return defaultPdfTemplate(
        req,
        res,
        next,
        entityData,
        organizationData,
        entity,
        entityPrefix,
        forEmail
    );
};

export default pdfTemplateSelector;
