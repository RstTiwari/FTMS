import { createContext, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
let myfac8ryBaseUrl = process.env.REACT_APP_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const loginUser = (result) => {
        setCookie("token", result.token);
        // window.location.replace("/dashboard");
    };

    const logoutUser = () => {
        removeCookie("token");
        window.location.replace("/login");
    };

    const axiosCall = async (path,data)=>{
        try {
        let token = cookies["token"]

            let axiosConfig = {
                url: myfac8ryBaseUrl + `auth/${path}`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                     token : token ? token : null
                   
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
    }

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
        <AuthContext.Provider value={{ loginUser, logoutUser,axiosCall, verifyToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
