import checkDbForEntity from "../../Helper/databaseSelector.js";
const read = async (req, res, next) => {
    try {
        let {entity,pageNo,pageSize,select} = req.body;
        let tenantId = req.tenantId;
        console.log(entity,pageNo,pageSize,select);

        if(!entity || !pageNo ||!pageSize|| !tenantId){
            throw new Error(`Invalid Payload for ${entity} List`)
        }

        // selecting the Database
        const dataBase = checkDbForEntity(entity)

        let skip = (pageNo-1)*pageSize
        let data = await dataBase
            .find({ tenantId: tenantId })
            .select(select)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(pageSize)
            .lean();
      
        res.status(200).json({
            success: 1,
            result: data ,
            message: ` ${entity} fetched SuccessFully`,
        });
    } catch (error) {
         next(error)
    }
};
export default read