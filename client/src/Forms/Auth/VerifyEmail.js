import React, { useState } from "react";
import { Form, Row, Col, Input } from "antd";
import Taglabel from "components/Comman/Taglabel";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import CoustomButton from "components/Comman/CoustomButton";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
    const { authApiCall } = useAuth();
    const [email, setEmail] = useState("");

    const handleVerifyClick = async () => {
        let payload = {
            // emailOtp: Number(otp),
            // userId: userId,
            // tenantId: tenantId,
        };

        let response = await authApiCall("verify", payload);
        if (response.success === 1) {
        } else {
            return NotificationHandler.error(response.message);
        }
    };

    return (
        <Form>
            <Row justify={"center"}>
                <Taglabel
                    text={`Mail has been  send to  ${email} `}
                    type={"amount"}
                    weight={500}
                />
            </Row>
            <Row justify={"center"}>
                <Taglabel text={"Enter OTP to verify"} type="counter" />
            </Row>

            <Row justify={"center"}>
                <Col>
                    <Form.Item
                        name={"otp"}
                        labelAlign="left"
                        labelCol={{ span: 10 }}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"} style={{ margin: "1rem" }}>
                <CoustomButton onClick={handleVerifyClick} text={"VERIFY"} />
            </Row>
            <Row justify={"center"} style={{ margin: "1rem" }}>
                <Link to="/">
                  BACK TO LOGIN
                </Link>
            </Row>
        </Form>
    );
};

export default VerifyEmail;
