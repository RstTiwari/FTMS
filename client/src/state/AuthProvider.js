import { createContext, useContext, useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import NotificationHandler from "EventHandler/NotificationHandler";
import axios from "axios";
import { removeLocalData } from "Helper/FetchingLocalData";
let myfac8ryBaseUrl = process.env.REACT_APP_URL_PROD;
if (process.env.NODE_ENV === "development") {
    myfac8ryBaseUrl = process.env.REACT_APP_URL_LOCAL;
}
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const loginUser = (result) => {
        setCookie("token", result.token, { maxAge: result.expiresIn });
        setCookie("authData", JSON.stringify(result), {
            maxAge: result.expiresIn,
        });
    };

    const logoutUser = () => {
        removeCookie("token");
        removeCookie("authData");
        removeLocalData("customer");
        removeLocalData("payments");
        removeLocalData("quote");
        removeLocalData("challan");
        removeLocalData("lead");
        removeLocalData("expenses");
    };

    const authApiCall = async (path, data) => {
        let token = cookies["token"];

        let axiosConfig = {
            url: myfac8ryBaseUrl + `auth/${path}`,
            method: "post",
            headers: {
                "Content-Type": "application/json",
                token: token ? token : null,
            },
            data: data,
        };
        try {
            let response = await axios(axiosConfig);
            return response.data;
        } catch (error) {
            console.log(error.response, "--");
            let response = {
                success: 0,
                result: null,
                message: error.response
                    ? error.response.data.message
                    : "NetWork Error",
                error: error.message,
            };
            return response;
        }
    };

    const appApiCall = async (method, path, payload, params) => {
        let token = cookies["token"];
        let axiosConfig = {
            url: myfac8ryBaseUrl + `app/${path}`,
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                token: token ? token : null,
            },
            data: payload ? payload : null,
            params: params ? params : null,
        };
        try {
            let response = await axios(axiosConfig);
            return response.data;
        } catch (error) {
            let response = {
                success: 0,
                result: null,
                message: error.response
                    ? error.response.data.message
                    : "NetWork Error",
            };
            return response;
        }
    };

    const getDropDownData = async (entity, fieldName) => {
        let data = await appApiCall("post", "getList", { entity: entity });
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

    const createData = async (payload) => {
        let data = await appApiCall("post", "create", payload);
        if (data.success === 0) {
            return { success: 0, result: null, message: data.message };
        } else {
            return { success: 1, result: data.result, message: data.message };
        }
    };

    const readData = async (params) => {
        let data = await appApiCall("get", "read", {}, params);
        if (data.success === 0) {
            return { success: 0, result: null, message: data.message };
        } else {
            return { success: 1, result: data.result, message: data.message };
        }
    };

    const updateData = async (payload) => {
        let data = await appApiCall("post", "update", payload, {});
        if (data.success === 0) {
            return { success: 0, result: null, message: data.message };
        } else {
            return { success: 1, result: data.result, message: data.message };
        }
    };
    const patchData = async (payload) => {
        let data = await appApiCall("patch", "patch", payload,{});
        if (data.success === 0) {
            return { success: 0, result: null, message: data.message };
        } else {
            return { success: 1, result: data.result, message: data.message };
        }
    };

    const getTableData = async (entity) => {
        let data = await appApiCall("post", "getList", { entity: entity });
        if (data.success === 0) {
            return { success: 0, result: null, message: data.message };
        } else {
            return { success: 1, result: data.result, message: data.message };
        }
    };

    const pdfGenrate = async (entity, params, entityNo) => {
        try {
            const headers = {
                "Content-Type": "application/json", //Example header
                Authorization: "Bearer YOUR_TOKEN", //Example authorization header
                token: cookies["token"],
            };
            let url = `${myfac8ryBaseUrl}app/pdf?entity=${entity}&id=${params}&entityNo=${entityNo}`;

            // Fetch with headers
            const response = await fetch(url, {
                method: "GET",
                headers: headers,
            });
            const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);
            //you can initiate a download
            const a = document.createElement("a");
            a.href = pdfUrl;
            a.download = `${entity}/${entityNo}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            return NotificationHandler.error(
                `Failed to download ${entity} pdf`
            );
        }
    };

    const verifyToken = async () => {
        try {
            let token = cookies["token"];

            let axiosConfig = {
                url: myfac8ryBaseUrl + `auth/isValidAuthtoken`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    token: token ? token : null,
                },
                withCredetials: true,
                data: {},
            };
            let response = await axios(axiosConfig);
            if (response && !response.data.success) {
                removeCookie("token");
                window.location.replace("/login");
            }
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

    return (
        <AuthContext.Provider
            value={{
                loginUser,
                logoutUser,
                authApiCall,
                appApiCall,
                getDropDownData,
                getTableData,
                createData,
                readData,
                updateData,
                pdfGenrate,
                patchData
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
