import React, { useState } from "react";
import { Form, Input, Checkbox, Col, Row, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CoustomButton from "components/SmallComponent/CoustomButton";

export const RegisterForm = () => {
    return (
        <div>
            <Form.Item
                label={"Company Name"}
                name={"companyName"}
                labelAlign="left"
                labelCol={{span:6}}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Company Name" 
                    size={"large"}

                />
            </Form.Item>
            <Form.Item
                label={"Your Name"}
                name={"name"}
                labelAlign="left"
                labelCol={{span:6}}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Your Name" 
                    size={"large"}

                 />
            </Form.Item>
            <Form.Item
                label={"Email"}
                name={"email"}
                labelAlign="left"
                labelCol={{span:6}}
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
                labelCol={{span:6}}
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
                ExistingUser -  <Link to={"/login"}> LogIn</Link>
            </Row>
            </Form.Item>
           
            <Form.Item>
                <Row justify={"center"}>
                    <CoustomButton  htmlType="submit"  text={"Register"}/>
                </Row>
            </Form.Item>
        </div>
    );
};
