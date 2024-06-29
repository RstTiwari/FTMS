import React, { useState } from "react";
import "./Login.css";
import PageLoader from "pages/PageLoader";
import SideContent from "module/AuthModule/SideContent";
import LoginForm from "Forms/LoginForm.js";
import { useAuth } from "../../state/AuthProvider";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import { message } from "antd";
const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { logoutUser, loginUser, authApiCall } = useAuth();

    const handleLoginChange = async (value) => {
        setLogin(value);
        setIsLoading(true);
        let response = await authApiCall("login", value);
        if (response.success === 1) {
            loginUser(response.result);
            setIsLoading(false);
            let tenantId = response.result?.tenant.tenantId;
            let entity = "dashboard";
            navigate(`/app/${tenantId}/dashboard`);
        } else {
            setIsLoading(false);
            return NotificationHandler.error(response.message);
        }
    };
    return (
        <>
            <div className="parent_clearfix">
                <SideContent />
                <div className="login">
                    <div className="container">
                        <PageLoader
                            isLoading={isLoading}
                            text={"Plase Wait..."}
                        />
                        <LoginForm handleLoginChange={handleLoginChange} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
