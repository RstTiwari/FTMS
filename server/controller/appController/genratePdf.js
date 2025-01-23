import myfac8ryDefault from "../../template/pdfTemplate/myfac8rydefualt.js";
import vipDefault from "../../template/pdfTemplate/vipDefault.js";
import pdfTemplate1 from "../../template/pdfTemplate/pdftemplate1.js";
import tenantDb from "../../models/coreModels/Tenant.js";
import colPreDb from "../../models/appModels/columnPrefrence.js";
import checkDbForEntity from "../../Helper/databaseSelector.js";
import countersDb from "../../models/appModels/counters.js";
import pdftem2 from "../../template/pdfTemplate/pdftempalte2.js";

const generatePdf = async (req, res, next, forEmail) => {
    try {
        const { entity, id, tenantId } = req.query;
        let dataBase = checkDbForEntity(entity);
        let entityData = await dataBase
          .findOne({
            _id: id,
            tenantId: tenantId,
          })
          .populate([
            {
              path: "customer",
              select: "name billingAddress shippingAddress phone",
              options: { strictPopulate: false },
            },
            {
              path: "customer",
              select: "billingAddress shippingAddress phone",
              options: { strictPopulate: false },
            },
            {
              path: "vendor",
              select: "name  billingAddress shippingAddress phone",
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
          ]).lean();
        let organization = await tenantDb.findOne({ _id: tenantId });
        let columns = await colPreDb.findOne({
            tenantId: tenantId,
            entity: entity,
        });
        let selectColumns = columns?.preferences;

        let prefix = await countersDb.findOne({
            entityName: entity,
            tenantId: tenantId,
        });
        let entityPrefix = prefix?.prefix
            ? prefix.prefix
            : entity.slice(0, 2).toUpperCase();

        const templateId = "myfac8ry";
        let data = {}
        data['entityData'] = entityData
        data["organization"] = organization;
        data["selectColumns"] = selectColumns
        data["templateId"] = templateId;
        data["entityPrefix"] = entityPrefix
        res.status(200).json({
          success: 1,
          data: data,
        });

      
    } catch (error) {
        next(error);
    }
};

export default generatePdf;
