import ForgetPasswordForm from "Forms/ForgetPassword";
import React, { useState } from "react";
import { Form, Row, Input, Col, Button } from "antd";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import SideContent from "module/AuthModule/SideContent";
import PageLoader from "./PageLoader";
import "../pages/Login/Login.css";
import UpdatePasswordForm from "Forms/UpdatePasswordForm";

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [tenantId, setTenantId] = useState("");

    const [otp, setOtp] = useState();

    const { authApiCall } = useAuth();
    const handleReciveOTP = async (value) => {
        setIsLoading(true);
        const response = await authApiCall("forgetPassword", value);
        if (response.success === 1) {
            setIsLoading(false);
            setVerifyOtp(true);
            setUserId(response.result.userId);
            setTenantId(response.result.tenantId);
        } else {
            return NotificationHandler.error(response.message);
        }
    };

    return (
        <>
            <div className="parent_clearfix">
                <SideContent />
                <div className="login">
                    {verifyOtp ? (
                        <div className="container">
                            <UpdatePasswordForm
                                userId={userId}
                                tenantId={tenantId}
                            />
                        </div>
                    ) : (
                        <div className="container">
                            <PageLoader
                                isLoading={isLoading}
                                text={"Hold On ..."}
                            />
                            <Form
                                name="forgetPassword"
                                form={form}
                                onFinish={handleReciveOTP}
                            >
                                <ForgetPasswordForm />
                            </Form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
