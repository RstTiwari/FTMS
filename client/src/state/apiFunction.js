
import axios from "axios";
let myfac8ryBaseUrl = process.env.REACT_APP_URL;

export const authApi = async (path,token, data) => {
    try {
        let axiosConfig = {
            url: myfac8ryBaseUrl + `auth/${path}`,
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "token" : token ? token :null
            },
            data: data,
        };
        let response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        let response = {
            success: 0,
            result: null,
            message: "axios call Failed",
            error: error.message,
        };
        return response;
    }
};

export const productApi = async (path, data) => {
    try {
        let axiosConfig = {
            url: myfac8ryBaseUrl + `product/${path}`, // Update the path accordingly
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        let response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        let response = {
            success: 0,
            result: null,
            message: "axios call Failed",
            error: error.message,
        };
        return response;
    }
};
