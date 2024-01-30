import React, { useState } from "react";
import "../Login/Login.css";
import { Button, Form, Input, Row, Col } from "antd";
import SideContent from "module/AuthModule/SideContent";
import { RegisterForm } from "Forms/RegisterForm";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [isOtpVerify, setIsOtpVerify] = useState(false);
    const [otp, setOtp] = useState();
    const [userId, setUserId] = useState("");
    const [tenantId, setTenantId] = useState("");
    const navigate = useNavigate();

    const { loginUser, authApiCall } = useAuth();
    const handleRegisterFormFinish = async (value) => {
        let response = await authApiCall("register", value);
        if (response.success === 1) {
            setIsOtpVerify(true);
            setUserId(response.result.userId);
            setTenantId(response.result.tenantId);
        }
    };

    const handleVerifyClick = async () => {
        let payload = {
            emailOtp: Number(otp),
            userId: userId,
            tenantId: tenantId,
        };

        let response = await authApiCall("verify", payload);
        if (response.success === 1) {
            loginUser(response.result);
            navigate("/dashboard");
        }
    };

    return (
        <div className="parent_clearfix">
            <SideContent />
            <div className="login">
                <div className="container">
                    <div>
                        {isOtpVerify ? (
                            <>
                                <Row justify={"center"}>Verify OTP</Row>
                                <Row justify={"center"}>
                                    <Input
                                        onChange={(e) => setOtp(e.target.value)}
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
                </div>
            </div>
        </div>
    );
};

export default Register;
