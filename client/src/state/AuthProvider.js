import { createContext, useContext, useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import NotificationHandler from "EventHandler/NotificationHandler";
import axios from "axios";
import { removeLocalData } from "Helper/FetchingLocalData";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";

let myfac8ryBaseUrl = process.env.REACT_APP_URL_PROD;

if (process.env.NODE_ENV === "development") {
    myfac8ryBaseUrl = process.env.REACT_APP_URL_LOCAL;
};

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const loginUser = (result) => {
        setCookie("token", result.token, { maxAge: result.expiresIn });
        setCookie("profile", JSON.stringify(result), {
            maxAge: result.expiresIn,
        });
    };

    const logoutUser = async() => {
        removeCookie("token");
        removeCookie("profile");
        removeLocalData("customer");
        removeLocalData("invoice")
        removeLocalData("payments");
        removeLocalData("quote");
        removeLocalData("challan");
        removeLocalData("lead");
        removeLocalData("expenses");
        removeLocalData("vendors");
        removeLocalData("deliverychallan");
        removeLocalData("purchaseorder");
        removeLocalData("vendors");
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
    const adminApiCall = async (method, path, data, params) => {
        const token = cookies["token"];
        let axiosConfig = {
            url: myfac8ryBaseUrl + `admin/${path}`,
            method: method,
            headers: {
                "Content-Type": "application/json",
                token: token ? token : null,
            },
            data: data ? data :"",
            params : params ? params :""
        };
        try {
            let response = await axios(axiosConfig);
            const data = response.data;
            return {
                success: data ? data.success : 0,
                result: data ? data.result : null,
                message: data ? data.message : "NewWork Error",
            };
        } catch (error) {
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

        if (payload instanceof FormData) {
            axiosConfig.headers["Content-Type"] = "multipart/form-data";
            axiosConfig.data = payload;
        }

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
    const uploadFile = async (payload) => {
        let data = await appApiCall("post", "upload", payload, {});
        if (data.success === 0) {
            return { success: 0, result: null, message: data.message };
        } else {
            return { success: 1, result: data.result, message: data.message };
        }
    };
    const patchData = async (payload) => {
        let data = await appApiCall("patch", "patch", payload, {});
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

    const pdfGenerate = async (entity, id, action = "display") => {
        const token = cookies['token']
        try {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_TOKEN",
                token:token ? token:""
            };
    
            let url = `${myfac8ryBaseUrl}app/pdf?entity=${entity}&id=${id}`;
    
            const response = await fetch(url, {
                method: "GET",
                headers: headers,
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);
    
            if (action === "download") {
                const a = document.createElement('a');
                a.href = pdfUrl;
                a.download = `${entity}${id}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else if (action === "display") {
                return pdfUrl;
            }
        } catch (error) {
            NotificationHandler.error(`Failed to handle ${entity} PDF: ${error.message}`);
            throw error;
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
                adminApiCall,
                getDropDownData,
                getTableData,
                createData,
                readData,
                updateData,
                pdfGenerate,
                patchData,
                uploadFile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
