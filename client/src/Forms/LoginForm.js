import React, { useState } from "react";
import { Form, Input, Checkbox, Col, Row, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import CustomLabel from "components/SmallComponent/CustomLabel";
import CoustomButton from "components/SmallComponent/CoustomButton";

const { Text } = Typography;

const LoginForm = ({ handleLoginChange }) => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
        remember: false,
    });

    // const handleLoginClick = () => {
    //     handleLoginChange(login);
    // };
    return (
        <div style={{width:"50%"}}>
            <Form onFinish={handleLoginChange}>
            <Form.Item
                label={<CustomLabel label={"Email"} required={true} />}
                name={"email"}
                labelAlign="left"
                labelCol={{ span:6}}
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
                    onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                    }
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
                    onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                    }
                />
            </Form.Item>
                    

            <Form.Item>
                <Row align={"middle"}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Checkbox
                            onChange={(e) =>
                                setLogin({
                                    ...login,
                                    remember: e.target.checked,
                                })
                            }
                        >
                            Remember-Me
                        </Checkbox>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <a className="login-form-forgot" href="/forgotPassword">
                            Forgot Password
                        </a>
                    </Col>
                </Row>
            </Form.Item>
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
                    <CoustomButton 
                        htmlType="submit"
                        text={" Sign-In"}


                    />

                </Row>
            </Form.Item>
                
            </Form>
        
        </div>
    );
};

export default LoginForm;
