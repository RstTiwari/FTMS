import appAPICall from "state/appAPICall";
import { useAuth } from "state/AuthProvider";
export const getDropDownData = async (entity, fieldName) => {
    let data = await appAPICall("post", "getList", { entity: entity });
    if (data.success === 0) {
        return (data = []);
    } else {
        data = data.result.map((item) => {
            item["label"] = item[fieldName];
            item["value"] = item._id;
            return item;
        });
        return data;
    }
};

export const createData = async (payload) => {
    let data = await appAPICall("post", "create", payload);
    if (data.success === 0) {
        return { success: 0, result: null, message: data.message };
    } else {
        return { success: 1, result: data.result, message: data.message };
    }
};

export const getTableData = async (entity) => {
    let data = await appAPICall("post", "getList", { entity: entity });
    if (data.success === 0) {
        return { success: 0, result: null, message: data.message };
    } else {
        return { success: 1, result: data.result, message: data.message };
    }
};
