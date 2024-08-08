import ForgetPasswordForm from "Forms/Auth/ForgetPassword";
import React, { useState } from "react";
import { Form, Row, Input, Col, Button } from "antd";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import SideContent from "pages/Auth/SideContent";
import PageLoader from "../PageLoader";
import "./Login.css";
import ForgotPasswordForm from "../../Forms/Auth/ForgetPassword";

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [tenantId, setTenantId] = useState("");

    const { authApiCall } = useAuth();

    return (
        <>
            <div className="parent_clearfix">
                <SideContent />
                <div className="login">
                    <div className="container">
                        <ForgotPasswordForm
                            userId={userId}
                            tenantId={tenantId}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
