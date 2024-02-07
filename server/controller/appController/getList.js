const getList = async (req, res, next, dataBase) => {
    let tenantId = req.tenantId 
    console.log(tenantId);
    try {
        let data = await dataBase.find({tenantId:tenantId});
        return res.status(200).json({
            success: 1,
            result: data,
            message: `${req.body.entity} Data Fetched Succefully`,
        });
    } catch (error) {
        console.error(error);
    }
};

export default getList;
