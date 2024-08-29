import { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import NotificationHandler from "EventHandler/NotificationHandler";
import axios from "axios";

let myfac8ryBaseUrl = process.env.REACT_APP_URL_PROD;

if (process.env.NODE_ENV === "development") {
    myfac8ryBaseUrl = process.env.REACT_APP_URL_LOCAL;
}

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const storeLocalData = (key, value, maxAge = 3600) => {
        setCookie(key, value, { maxAge: maxAge });
    };

    const removeLocalData = async (key) => {
        removeCookie(key);
    };
    const fetchLocalData = (key) => {
        return cookies[key];
    };

    const authApiCall = async (path, data,params) => {
        let token = cookies["token"];

        let axiosConfig = {
            url: myfac8ryBaseUrl + `auth/${path}`,
            method: "post",
            headers: {
                "Content-Type": "application/json",
                token: token ? token : null,
            },
            data: data,
            params: params ? params : "",

        };
        try {
            let response = await axios(axiosConfig);
            return response?.data;
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
            data: data ? data : "",
            params: params ? params : "",
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

    const pdfGenerate = async (entity, id, no, action = "display") => {
        const token = cookies["token"];
        try {
            const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer YOUR_TOKEN",
                token: token ? token : "",
            };

            let url = `${myfac8ryBaseUrl}app/pdf?entity=${entity}&id=${id}`;

            const response = await fetch(url, {
                method: "GET",
                headers: headers,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const blob = await response.blob();

            const pdfUrl = URL.createObjectURL(blob);

            if (action === "download") {
                const a = document.createElement("a");
                a.href = pdfUrl;
                a.download = `${entity.toUpperCase()}${no}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else if (action === "display") {
                // Create a new File with the desired name
                const fileName = `${entity.toUpperCase()}${no}.pdf`;
                console.log(fileName);

                const file = new File([blob], fileName, {
                    type: "application/pdf",
                });
                return file;
            }
        } catch (error) {
            NotificationHandler.error(
                `Failed to handle ${entity} PDF: ${error.message}`
            );
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
                storeLocalData,
                removeLocalData,
                fetchLocalData,
                authApiCall,
                appApiCall,
                adminApiCall,
                pdfGenerate,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
