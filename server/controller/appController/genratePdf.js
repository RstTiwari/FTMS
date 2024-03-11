import invoicePdf from "../../template/pdfTemplate/invoice.js";
import quotationPdf from "../../template/pdfTemplate/quotation.js";
import challanPdf from "../../template/pdfTemplate/Challan.js";

import tenanDb from "../../models/coreModels/Tenant.js"
const generatePdf = async (req, res, next,dataBase) => {
    try {
        const { entity,id, entityNo } = req.query;
        let tenantId = req.tenantId ;
        let data = await dataBase.findOne({_id:id ,tenantId:tenantId})
        const tenantData = await tenanDb.findOne({tenantId:tenantId})
        data["orgnization"] = tenantData
        
        if(entity ==="quote"){
            return quotationPdf(req,res,next,data)
        }else if(entity ==="invoice"){
            return invoicePdf(req,res,next,data)
        }else if(entity ==="deliverychallan"){
            return challanPdf(req,res,next,data)
        }


    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to generate PDF");
    }
};

export default generatePdf;
