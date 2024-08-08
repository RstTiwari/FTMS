import React, { useState } from "react";
import { Form, Input, Checkbox, Col, Row, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CoustomButton from "components/Comman/CoustomButton";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";


 const RegisterForm = () => {
    const {authApiCall} = useAuth()

    const handleRegisterFormFinish = async (values) => {
        let response = await authApiCall("register", values);
        if (response.success === 1) {
            return NotificationHandler.success(response.message);
        } else {
            return NotificationHandler.error(response.message);
        }
    };
    
    return (
        <Form name="registerFrom" onFinish={handleRegisterFormFinish}>
            <Form.Item
                label={"Company Name"}
                name={"companyName"}
                labelAlign="left"
                labelCol={{ span: 6 }}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Company Name" size={"large"} />
            </Form.Item>
            <Form.Item
                label={"Your Name"}
                name={"name"}
                labelAlign="left"
                labelCol={{ span: 6 }}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Your Name" size={"large"} />
            </Form.Item>
            <Form.Item
                label={"Email"}
                name={"email"}
                labelAlign="left"
                labelCol={{ span: 6 }}
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
                    prefix={<UserOutlined />}
                    placeholder={"Email"}
                    type={"email"}
                    size={"large"}
                />
            </Form.Item>
            <Form.Item
                label={"password"}
                name={"password"}
                rules={[
                    {
                        required: true,
                    },
                ]}
                labelAlign="left"
                labelCol={{ span: 6 }}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeHolder="password"
                    size="large"
                />
            </Form.Item>
            <Form.Item>
                <Row align={"middle"}></Row>
            </Form.Item>
            <Form.Item>
                <Row justify={"center"}>
                    ExistingUser - <Link to={"/login"}> LOGIN</Link>
                </Row>
            </Form.Item>

            <Form.Item>
                <Row justify={"center"}>
                    <CoustomButton htmlType="submit" text={"REGISTER"} />
                </Row>
            </Form.Item>
        </Form>
    );
};


export default RegisterForm