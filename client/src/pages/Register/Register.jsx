import React, { useState } from "react";
import "../Login/Login.css";
import { Button, Form, Input, Row, Col, Spin, Alert } from "antd";
import SideContent from "module/AuthModule/SideContent";
import { RegisterForm } from "Forms/RegisterForm";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "ErrorHandler/NotificationHandler";

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpVerify, setIsOtpVerify] = useState(false);
    const [otp, setOtp] = useState();
    const [userId, setUserId] = useState("");
    const [tenantId, setTenantId] = useState("");
    const navigate = useNavigate();

    const { loginUser, authApiCall } = useAuth();
    const handleRegisterFormFinish = async (value) => {
        setIsLoading(true);
        let response = await authApiCall("register", value);
        if (response.success === 1) {
            setIsLoading(false);
            setIsOtpVerify(true);
            setUserId(response.result.userId);
            setTenantId(response.result.tenantId);
            return NotificationHandler.success(response.message);
        } else {
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
            console.log(response.result);
            loginUser(response.result);
            navigate("/dashboard");
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
                                        <Button
                                            type="primary"
                                            onClick={handleVerifyClick}
                                        >
                                            Vefiry
                                        </Button>
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
                        <Spin>
                            <Alert
                                message="Please Wait we working...."
                                type="info"
                            />
                        </Spin>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
