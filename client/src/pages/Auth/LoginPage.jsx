import React, { useState } from "react";
import PageLoader from "pages/PageLoader";
import SideContent from "pages/Auth/SideContent";
import LoginForm from "../../Forms/Auth/LoginForm.js";
import { useAuth } from "../../state/AuthProvider";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import { message, Row, Col } from "antd";
const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { logoutUser, loginUser, authApiCall } = useAuth();

 
    return (
        <div className="parent_clearfix">
            <SideContent />
            <div className="login">
                <LoginForm handleLoginChange={handleLoginChange} />
            </div>
        </div>
    );
};

export default Login;
