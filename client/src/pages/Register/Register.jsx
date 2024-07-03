import React, { useState } from "react";
import "../Login/Login.css";
import { Button, Form, Input, Row, Col, Spin, Alert } from "antd";
import SideContent from "module/AuthModule/SideContent";
import { RegisterForm } from "Forms/RegisterForm";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";
import CoustomButton from "components/SmallComponent/CoustomButton";

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpVerify, setIsOtpVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState();
    const [userId, setUserId] = useState("");
    const [tenantId, setTenantId] = useState("");
    const navigate = useNavigate();

    const { loginUser, authApiCall } = useAuth();
    const handleRegisterFormFinish = async (value) => {
        setIsLoading(true);
        setEmail(value.email);
        let response = await authApiCall("register", value);
        if (response.success === 1) {
            setIsLoading(false);
            setIsOtpVerify(true);
            setUserId(response.result.userId);
            setTenantId(response.result.tenantId);
            return NotificationHandler.success(response.message);
        } else {
            setIsLoading(false);
            return NotificationHandler.error(response.message);
        }
    };

    const handleVerifyClick = async () => {
        setIsLoading(true);
        let payload = {
            emailOtp: Number(otp),
            userId: userId,
            tenantId: tenantId,
        };

        let response = await authApiCall("verify", payload);
        if (response.success === 1) {
            setIsLoading(false);
            loginUser(response.result);
            navigate("/app");
        } else {
            return NotificationHandler.error(response.message);
        }
    };

    return (
        <div className="parent_clearfix">
            <SideContent />
            <div className="login">
                <div className="container">
                    {!isLoading ? (
                        <div>
                            {isOtpVerify ? (
                                <>
                                    <Row justify={"center"}>Verify OTP</Row>
                                    <Row>Mail hasbeend send to {email}</Row>
                                    <Row justify={"center"}>
                                        <Input
                                            onChange={(e) =>
                                                setOtp(e.target.value)
                                            }
                                        />
                                    </Row>
                                    <Row
                                        justify={"center"}
                                        style={{ margin: "1rem" }}
                                    >
                                        <CoustomButton  onClick={handleVerifyClick} text={"Verify"}/>
                                    </Row>
                                </>
                            ) : (
                                <div>
                                    <Form
                                        name="registerFrom"
                                        onFinish={handleRegisterFormFinish}
                                    >
                                        <RegisterForm />
                                    </Form>
                                </div>
                            )}
                        </div>
                    ) : (
                        <PageLoader text={"Hold On ...Creating Your Account"} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
