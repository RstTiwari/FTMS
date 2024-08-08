import React from "react";
import { Form, Row, Col, Button, Input, Typography, InputNumber } from "antd";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useNavigate } from "react-router-dom";
import CoustomButton from "components/Comman/CoustomButton";
import Taglabel from "components/Comman/Taglabel";
const { Text, Link, Title } = Typography;

const UpdatePasswordForm = ({ userId, tenantId }) => {
    const [form] = Form.useForm();
    const { authApiCall } = useAuth();
    const navigate = useNavigate();
    const handleFormFinish = async (value) => {
        value["userId"] = userId;
        value["tenantId"] = tenantId;
        const response = await authApiCall("updatePassword", value);
        if (response.success === 0)
            return NotificationHandler.error(response.message);
        else {
            NotificationHandler.success(response.message);
            navigate("/login");
        }
    };
    return (
        <Form name="updatePassword" form={form} onFinish={handleFormFinish}>
            <Row justify={"center"}>
                <Title level={3} type="success">
                    Please check mail and enter otp
                </Title>
            </Row>
            <Form.Item
                name={"otp"}
                label={<Taglabel text={"Enter Received OTP"} />}
                labelAlign="left"
                labelCol={{ span: 12 }}
                rules={[
                    {
                        required: true,
                        message: "Please Enter OTP",
                    },
                ]}
            >
                <Input  />
            </Form.Item>
            <Form.Item
                name={"password"}
                label={<Taglabel text={"Enter The New Password"} />}
                labelAlign="left"
                labelCol={{ span: 12 }}
                rules={[
                    {
                        required: true,
                        message: "Please Enter New Password",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name={"password2"}
                label={<Taglabel text={"Re-Enter The New Password"} />}
                dependencies={["password"]}
                labelAlign="left"
                labelCol={{ span: 12 }}
                rules={[
                    {
                        required: true,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error("Both Password  not matching!")
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Row justify={"center"}>
                <Form.Item>
                    <CoustomButton text={"UPDATE"} htmlType="submit" />
                </Form.Item>
            </Row>
        </Form>
    );
};

export default UpdatePasswordForm;
