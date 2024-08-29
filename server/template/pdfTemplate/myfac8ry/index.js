import defaultPdfTemplate from "./defult.js";

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
