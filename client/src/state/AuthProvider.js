import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const loginUser = (data) => {
            window.localStorage.setItem("auth", true);
            window.localStorage.removeItem("isLogout");
            window.location.replace("/dashboard")
            setIsLoggedIn(true);
        }

    const logoutUser = () => {
        window.localStorage.removeItem("auth");
        setIsLoggedIn(false);
        window.location.replace("/login")
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
