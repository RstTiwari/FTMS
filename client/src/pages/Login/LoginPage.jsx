import React, { useState } from "react";
import "./Login.css";
import PageLoader from "pages/PageLoader";
import SideContent from "module/AuthModule/SideContent";
import LoginForm from "Forms/LoginForm.js";
import { useAuth } from "../../state/AuthProvider";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import { message, Row, Col } from "antd";
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
        <Row
            justify="center"
            align="middle"
            style={{ minHeight: "100vh", padding: "20px" ,}}
        >
            <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                style={{ textAlign: "center" }}
            >
                <SideContent />
            </Col>
            
            <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                style={{ textAlign: "center" }}
            >
                <PageLoader isLoading={isLoading} text={"Please Wait..."} />
                <LoginForm handleLoginChange={handleLoginChange} />
            </Col>
        </Row>
    );
};

export default Login;
