import ForgetPassword from "Forms/ForgetPassword";
import React, { useState } from "react";
import { Form } from "antd";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState();

    const { authApiCall } = useAuth();
    const handleFormFinish = async (value) => {
        setIsLoading(true);
        let response = await authApiCall("forgetPassword", value);
        if (response.success === 1) {
            setVerifyOtp(true);
            setIsLoading(false);
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
            navigate("/dashboard");
        }else{
           return NotificationHandler.error(response.message)
        }
    };
    return (
        <div>
            {verifyOtp ? (
                <>
                    <Row justify={"center"}>Verify OTP</Row>
                    <Row justify={"center"}>
                        <Input onChange={(e) => setOtp(e.target.value)} />
                    </Row>
                    <Row justify={"center"} style={{ margin: "1rem" }}>
                        <Button type="primary" onClick={handleVerifyClick}>
                            Vefiry
                        </Button>
                    </Row>
                </>
            ) : (
                <Form
                    name="forgotPassword"
                    form={form}
                    onFinish={handleFormFinish}
                >
                    <ForgetPassword />
                </Form>
            )}
        </div>
    );
};

export default ForgotPassword;
