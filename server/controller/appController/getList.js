const getList = async (req, res, next, dataBase) => {
    try {
        let data = await dataBase.find({});
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
