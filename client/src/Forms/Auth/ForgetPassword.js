import React, { useState } from "react";
import { Form, Input, Typography, Row,} from "antd";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import CoustomButton from "components/Comman/CoustomButton";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
const { Text, Title } = Typography;


const ForgetPassword = () => {
    const [form] = Form.useForm()
    const {authApiCall} = useAuth()
    const handleReciveOTP = async (value) => {
        const response = await authApiCall("forgetPassword", value);
        if (response.success === 1) {
        
        } else {
            return NotificationHandler.error(response.message);
        }
    };
   
    return (
        <Form name="forgetPassword" form={form} onFinish={handleReciveOTP}>
            <Row>
                <Title level={4} type="warning">
                    Please Enter Your Register Email To Reset Password
                </Title>
            </Row>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                    },
                    {
                        type: "email",
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    type="email"
                    placeholder="Email"
                    size="large"
                />
            </Form.Item>
            <Row align={"middle"} justify={"center"}>
                <Form.Item>
                    <CoustomButton htmlType="submit" text={"Send OTP"} />
                </Form.Item>
            </Row>
            <Row justify={"center"}>
                <Link to="/"> BACK TO LOGIN</Link>
            </Row>
        </Form>
    );
};

export default ForgetPassword;
