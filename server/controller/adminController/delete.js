import checkDbForEntity from "../../Helper/databaseSelector.js";

const deleteRoute = async (req, res, next) => {
  try {
    const { entity, tenantId ,_id} = req.query;
    const { userId, role, email } = req;
    let filter = { _id:_id, tenantId: tenantId };

    if (entity === "tenant") {
      filter = { _id: tenantId };
    }
    console.log(entity,filter)
    const dataBase = checkDbForEntity(entity);
    const data = await dataBase.deleteOne(filter)
    if (data.deletedCount !== 1) {
      return res.status(400).json({
        success: 0,
        result: null,
        message: "Failed to Find Delete Data",
      });
    }
    res.status(200).json({
      success: 1,
      result: data,
      message: "Data Deleted SuccessFully",
    });
  } catch (error) {
    return res.status(400).json({
      success: 0,
      result: null,
      message: error.message,
    });
  }
};

export default deleteRoute;
