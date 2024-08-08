import React, { useState } from "react";
import { Form, Input, Checkbox, Col, Row, Button, Typography, Tooltip } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import CustomLabel from "components/Comman/CustomLabel";
import CoustomButton from "components/Comman/CoustomButton";
import useAuthApiCall from "Hook/useAuthApiCall";
import PageLoader from "pages/PageLoader";
const { Text } = Typography;

const LoginForm = () => {
    const [form] = Form.useForm()
    const handleCheckBoxChange =(e)=>{
        form.setFieldsValue({remember:e.target.checked})
    }
    const {isLoading ,error,handleAuthApi} = useAuthApiCall("user","login","/")
    const handleLoginChange = async (values) => {
           await handleAuthApi(values)
    };
    if(isLoading){
        return <PageLoader isLoading={true} text={"...Hold On Making things Perfect for You"} />
    }

    return (
        <div style={{ width: "50%" }}>
            <Form onFinish={handleLoginChange} form={form}>
                <Form.Item
                    label={<CustomLabel label={"Email"} required={true} />}
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
                        type={"email"}
                        placeholder="Email"
                        size={"large"}
                    />
                </Form.Item>
                <Form.Item
                    label={<CustomLabel label={"Password"} required={true} />}
                    labelAlign="left"
                    name={"password"}
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeHolder="password"
                        size="large"
                    />
                </Form.Item>

                <Row justify={"center"}>
                    <Col xs={24} sm={24} md={12} lg={24} xl={24}>
                        <Form.Item name={"remember"}>
                            <Checkbox onChange={handleCheckBoxChange}>
                                Remember-Me
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Link to={"/forgotPassword"}>Forgot Password</Link>
                    </Col>
                </Row>
                <Row justify={"center"} style={{ margin: "1rem" }}>
                    <Col>New to Myfac8ry - </Col>
                    <Col>
                        <Text type="success">
                            <Link to={"/register"}>Register</Link>
                        </Text>
                    </Col>
                </Row>
                <Form.Item>
                    <Row justify={"center"}>
                        <CoustomButton htmlType="submit" text={"LOGIN"} />
                    </Row>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
