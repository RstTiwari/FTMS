import axios from "axios";

const REACT_APP_LOCAL_URL = "http://localhost:5001/";
const REACT_APP_PRODUCTION_URL = "http://195.88.27.17:5001/";
let myfac8ryBaseUrl = REACT_APP_PRODUCTION_URL;

if (process.env.NODE_ENV === "development") {
    myfac8ryBaseUrl = REACT_APP_LOCAL_URL;
}

const appApiCall = async (method, path, payload) => {
    const token = window.document.cookie.split("=")[1];
    try {
        let axiosConfig = {
            url: myfac8ryBaseUrl + `app/${path}`,
            method:method,
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
