import React, { useState } from "react";
import { Form, Input, Checkbox, Col, Row,Button ,Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "state/AuthProvider";

const {Text} = Typography

export const LoginForm = ({handleLoginChange}) => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
        remeber: false,
    });


    const handleLoginClick = () => {
        handleLoginChange(login);
    };
    return (
        <div>
            <Form.Item
                label={"Email"}
                name={"email"}
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
                    onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                    }
                />
            </Form.Item>
            <Form.Item
                label={"password"}
                name={"Password"}
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
                    <Col span={12}>
                        <Checkbox
                            onChange={(e) =>
                                setLogin({
                                    ...login,
                                    remeber: e.target.checked,
                                })
                            }
                        >
                            Remember me{" "}
                        </Checkbox>
                    </Col>
                    <Col>
                        <a className="login-form-forgot" href="/forgotPassword">
                            Forgot Password
                        </a>
                    </Col>
                </Row>
            </Form.Item>
            <Row justify={"center"} style={{margin:"1rem"}}>
                <Col span={6}>
                New to Myfac8ry
                </Col>
                <Col>
                <Text type="success">
                    <Link to={"/register"}>
                   Register

                    </Link>

                </Text>
                </Col>
            </Row>
            <Form.Item>
                <Row justify={"center"}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        size="large"
                        onClick={handleLoginClick}
                    >
                        Log in
                    </Button>
                </Row>
            </Form.Item>
          
        </div>
    );
};
