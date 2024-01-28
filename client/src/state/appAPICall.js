import axios from "axios";

let myfac8ryBaseUrl = process.env.REACT_APP_URL;
const appApiCall = async (method, path, payload) => {
    const token = window.document.cookie.split("=")[1];
    try {
        let axiosConfig = {
            url: myfac8ryBaseUrl + `app/${path}`,
            method: method,
            headers: {
                "Content-Type": "application/json",
                token: token ? token : null,
            },
            data: payload,
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

export default appApiCall;
