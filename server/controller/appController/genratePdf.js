import pdfTemplateSelector from "../../template/pdfTemplate/myfac8ry/index.js";
import whiteSimple from "../../template/pdfTemplate/whitesample/index.js"
import tenanDb from "../../models/coreModels/Tenant.js"
import checkDbForEntity from "../../Helper/databaseSelector.js";
import { organizationData ,entityData} from "../../data/orgnization.js";
const  generatePdf = async (req, res, next,) => {
    
    try {
        const { entity,id } = req.query;
        let tenantId = req.tenantId ;
        let dataBase = checkDbForEntity(entity)
        // let entityData = await dataBase.findOne({_id:id ,tenantId:tenantId})
        //await tenanDb.findOne({tenantId:tenantId})

        const templateId = "myfac8ry"
        // data["orgnization"] = tenantData
        if(templateId ==="myfac8ry"){
            return pdfTemplateSelector(req,res,next,entityData,organizationData,entity)
        }else if(templateId ==="whitesimple"){
                return whiteSimple(req,res,next,data,entity)
        }else{

        }   

    } catch (error) {
        next(error)
    }
};

export default generatePdf;
