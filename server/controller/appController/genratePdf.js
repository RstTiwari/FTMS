import pdfTemplateSelector from "../../template/pdfTemplate/myfac8ry/index.js";
import whiteSimple from "../../template/pdfTemplate/whitesample/index.js";
import tenantDb from "../../models/coreModels/Tenant.js";
import checkDbForEntity from "../../Helper/databaseSelector.js";
import countersDb from "../../models/appModels/counters.js";
import { organizationData } from "../../data/orgnization.js";

const generatePdf = async (req, res, next, forEmail) => {
    try {
        const { entity, id } = req.query;
        let tenantId = req.tenantId;
        let dataBase = checkDbForEntity(entity);
        let entityData = await dataBase
            .findOne({
                _id: id,
                tenantId: tenantId,
            })
            .populate([
                {
                    path: "customer",
                    select: "name billingAddress shippingAddress",
                    options: { strictPopulate: false },
                },
                {
                    path: "vendor",
                    select: "name",
                    options: { strictPopulate: false },
                },
                {
                    path: "payments", // Populate payment details
                    select: "amount paymentDate no", // Select relevant payment fields
                    options: { strictPopulate: false },
                },
                {
                    path: "components.product",
                    // Selecting all fields, so no need for 'select'
                    options: { strictPopulate: false },
                },
                {
                    path: "parts.product",
                    // Selecting all fields, so no need for 'select'
                    options: { strictPopulate: false },
                },
                {
                    path: "hardwares.product",
                    // Selecting all fields, so no need for 'select'
                    options: { strictPopulate: false },
                },
                {
                    path: "product",
                    // Selecting all fields, so no need for 'select'
                    options: { strictPopulate: false },
                },
                {
                    path: "items.product",
                    options: { strictPopulate: false },
                },
            ]);
        let organization = await tenantDb.findOne({ _id: tenantId });
        let prefix = await countersDb.findOne({
            entityName: entity,
            tenantId: tenantId,
        });
        let entityPrefix = prefix?.prefix
            ? prefix.prefix
            : entity.slice(0, 2).toUpperCase();

        const templateId = "myfac8ry";
        if (templateId === "myfac8ry") {
            return pdfTemplateSelector(
                req,
                res,
                next,
                entityData,
                organization,
                entity,
                entityPrefix,
                forEmail
            );
        } else if (templateId === "whitesimple") {
            return whiteSimple(req, res, next, data, entity);
        } else {
        }
    } catch (error) {
        next(error);
    }
};

export default generatePdf;
