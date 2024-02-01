import axios from "axios";

let myfac8ryBaseUrl = process.env.REACT_APP_URL_PROD;
if (process.env.NODE_ENV === "development") {
    myfac8ryBaseUrl = process.env.REACT_APP_URL_LOCAL;
}

const appApiCall = async (method, path, payload) => {
    const token = window.document.cookie;
    console.log(token);
    try {
        let axiosConfig = {
            url: myfac8ryBaseUrl + `app/${path}`,
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
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
