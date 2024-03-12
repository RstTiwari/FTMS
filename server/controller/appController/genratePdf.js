import myfac8ryTemplate from "../../template/pdfTemplate/myfac8ry/index.js";
import whiteSimple from "../../template/pdfTemplate/whitesample/index.js"
import tenanDb from "../../models/coreModels/Tenant.js"
const  generatePdf = async (req, res, next,dataBase) => {
    try {
        const { entity,id, entityNo } = req.query;
        let tenantId = req.tenantId ;
        let data = await dataBase.findOne({_id:id ,tenantId:tenantId})
        const tenantData = await tenanDb.findOne({tenantId:tenantId})
        const templateId = tenantData.templateId
        data["orgnization"] = tenantData
        if(templateId ==="myfac8ry"){
            return myfac8ryTemplate(req,res,next,data,entity)
        }else if(templateId ==="whitesimple"){
                return whiteSimple(req,res,next,data,entity)
        }else{

        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to generate PDF");
    }
};

export default generatePdf;
