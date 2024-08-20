import pdfTemplateSelector from "../../template/pdfTemplate/myfac8ry/index.js";
import whiteSimple from "../../template/pdfTemplate/whitesample/index.js";
import tenantDb from "../../models/coreModels/Tenant.js";
import checkDbForEntity from "../../Helper/databaseSelector.js";
import countersDb from "../../models/appModels/counters.js";
import { organizationData } from "../../data/orgnization.js";

const generatePdf = async (req, res, next) => {
    try {
        const { entity, id } = req.query;
        let tenantId = req.tenantId;
        let dataBase = checkDbForEntity(entity);
        let entityData = await dataBase.findOne({
            _id: id,
            tenantId: tenantId,
        });
        let organization = await tenantDb.findOne({ _id: tenantId });
        let prefix = await countersDb.findOne({
            entityName: entity,
            tenantId: tenantId,
        });
        console.log(entityData);
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
                entityPrefix
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
