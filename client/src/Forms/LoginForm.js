import React, { useState } from "react";
import { Form, Input, Checkbox, Col, Row, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import CustomLabel from "components/SmallComponent/CustomLabel";

const { Text } = Typography;

const LoginForm = ({ handleLoginChange }) => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleLoginClick = () => {
        handleLoginChange(login);
    };
    return (
        <div>

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
                    onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                    }
                />
            </Form.Item>
            <Col xs={24} sm={24} lg={12} xl={24} md={24}>
                <Form.Item
                    label={<CustomLabel label={"Password"} required={true} />}
                    labelAlign="left"
                    labelCol={{ span: 6 }}
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
            </Col>

            <Form.Item>
                <Row align={"middle"}>
                    <Col span={12}>
                        <Checkbox
                            onChange={(e) =>
                                setLogin({
                                    ...login,
                                    remember: e.target.checked,
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
            <Row justify={"center"} style={{ margin: "1rem" }}>
                <Col span={6}>New to Myfac8ry</Col>
                <Col>
                    <Text type="success">
                        <Link to={"/register"}>Register</Link>
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

export default LoginForm;
