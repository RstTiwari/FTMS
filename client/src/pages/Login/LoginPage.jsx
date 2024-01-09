import React, { useState } from "react";
import "./Login.css";
import PageLoader from "pages/PageLoader";
import SideContent from "module/AuthModule/SideContent";
import { LoginForm } from "Forms/LoginForm";
import { useAuth } from "../../state/AuthProvider";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState("");
    const {logoutUser,loginUser,axiosCall } = useAuth()
    
    const handleLoginChange = async (value) => {
        setLogin(value);
        let response = await axiosCall("login", value);
        if (response.success === 1) {
            loginUser(response.result);
        } else {
        }
    };
    return (
        <>
            <div className="parent_clearfix">
                <SideContent />
                <div className="login">
                    <div className="container">
                        <div className="login-form">
                            <LoginForm handleLoginChange={handleLoginChange} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
