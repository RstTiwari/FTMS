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
    entityPrefix
) => {
    return defaultPdfTemplate(
        req,
        res,
        next,
        entityData,
        organizationData,
        entity,
        entityPrefix
    );
};

export default pdfTemplateSelector;
