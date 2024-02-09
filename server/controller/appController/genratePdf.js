import quotationPdf from "../../template/pdfTemplate/quotation.js";
const generatePdf = async (req, res, next,dataBase) => {
    try {
        const { entity,id, entityNo } = req.query;
        let tenantId = req.tenantId ;
        let data = await dataBase.findOne({_id:id ,tenantId:tenantId})
        if(entity ==="quote"){
            return quotationPdf(req,res,next,data)
        }


    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to generate PDF");
    }
};

export default generatePdf;
