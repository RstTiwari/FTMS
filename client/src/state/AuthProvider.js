import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginUser = (data) => {
            const auth_state = {
                isLoggedIn: true,
                isLoading: false,
                isSuccess: true,
            };
            window.localStorage.setItem("auth", true);
            window.localStorage.removeItem("isLogout");
            setIsLoggedIn(true);
            window.location.replace("/dashboard")
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
