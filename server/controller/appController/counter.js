import checkDbForEntity from "../../Helper/databaseSelector.js";

export const fetchCountersNumber = async (req, res, next) => {
  try {
    const {entityName } = req.query;
    const tenantId = req["tenantId"];

    if (!entityName || !tenantId) {
      throw new Error("Invalid Payload");
    }
    const dataBase = checkDbForEntity(entityName);
    let query = {};
    query["tenantId"] = tenantId;

    // Before checking in counter data base let first find the last save no for entity;
    let entityDataBase = checkDbForEntity(entityName);
    let entityData = await entityDataBase.findOne({tenantId}).sort({ no: -1 });

    if (entityData) {
        let prefix = entityData?.prefix?.toUpperCase();
        let no = entityData?.no + 1;
        return res.status(200).json({
            success: 1,
            result: {
                prefix: prefix,
                nextNumber: no,
            },
        });
    }

    const response = {
        success: 1,
        result: {
            prefix: entityName.slice(0, 3).toUpperCase(),
            nextNumber: 1,
            suffix: "",
        },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateCountersNumber = async (req, res, next) => {
  try {
    const { entity, values } = req.body;
    const tenantId = req["tenantId"];
    let { entityName, prefix, nextNumber } = values;

    if (!entity || !entityName || !prefix || !nextNumber) {
      throw new Error("Invalid Payload");
    }

    const dataBase = checkDbForEntity(entity);
    let query = {};
    query["tenantId"] = tenantId;
    query["entityName"] = entityName;

    const existingCounters = await dataBase.findOne(query);
    if (existingCounters) {
      let updateObj = {
        $set: {
          prefix: prefix,
          nextNumber: nextNumber,
        },
      };
      const updatedDocument = await dataBase.updateOne(query, updateObj);
      if (updatedDocument.nModified <= 0) {
        throw new Error("Failed to Update");
      }
      const response = {
        success: 1,
        result: updateObj,
        message: `${entityName} counter updated`,
      };
      res.status(200).json(response);
    } else {
      values["tenantId"] = tenantId;
      // create the document for the give entityName
      const newData = await dataBase.create(values);
      const response = {
        success: 1,
        result: newData,
        message: `${entityName} counter updated`,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
};
