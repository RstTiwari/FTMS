import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { authApi } from "./apiFunction";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const loginUser = (data) => {
        window.location.replace("/dashboard");
        setCookie("token", data);
    };

    const logoutUser = () => {
        removeCookie("token");
        window.location.replace("/login");
    };
    const verifyToken = async() => {
        let token =
            cookies.token && cookies.token.token ? cookies.token.token : null; // setting token value
        let response =  await authApi("isValidAuthtoken", token, {});
        console.log(response)
        if (response.success === 0) {
            removeCookie("token");
            window.location.replace("/login");
        }
    };

    return (
        <AuthContext.Provider value={{ loginUser, logoutUser, verifyToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
