import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (data) => {
        if (data.success) {
            const auth_state = {
                current: data.result,
                isLoggedIn: true,
                isLoading: false,
                isSuccess: true,
            };
            window.localStorage.setItem("auth", JSON.stringify(auth_state));
            window.localStorage.removeItem("isLogout");
            setIsLoggedIn(true);
        }
    };

    const logout = () => {
        window.localStorage.removeItem("auth");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
