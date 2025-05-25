import React, { useState } from "react";
import { Form, Input, Typography, Row,} from "antd";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import CoustomButton from "components/Comman/CoustomButton";
import useAuthApiCall from "Hook/useAuthApiCall";
import PageLoader from "pages/PageLoader";
const { Text, Title } = Typography;


const ForgetPassword = () => {
    const [form] = Form.useForm()
const { isLoading, handleAuthApi } = useAuthApiCall("forgetPassword");
        
        const handleForgotPassword = async (values) => {
          await handleAuthApi(values);
        };

        if(isLoading){
            return <PageLoader  isLoading={true} text={"Hold .. on"}
            />
        }
   

    return (
        <Form name="forgetPassword" form={form} onFinish={handleForgotPassword}>
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
