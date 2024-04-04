const getList = async (req, res, next, dataBase) => {
    let tenantId = req.tenantId 
    try {
        let data = await dataBase.find({tenantId:tenantId}).sort({_id:-1});
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
