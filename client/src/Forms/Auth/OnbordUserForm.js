import React, { useState } from "react";
import { Input, Button, Form, message, Row } from "antd";
import axios from "axios";
import CoustomButton from "components/Comman/CoustomButton";
import Taglabel from "components/Comman/Taglabel";
import { useAuth } from "state/AuthProvider";
import { useParams } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import useAuthApiCall from "Hook/useAuthApiCall";
import PageLoader from "pages/PageLoader";
const OnboardUser = () => {
    const [form] = Form.useForm();
    const { token } = useParams();
    const { isLoading, handleAuthApi } = useAuthApiCall("onboardUser");

    const onFinish = async (values) => {
      await handleAuthApi(values,{token:token});
    };


   if(isLoading){
    return <PageLoader isLoading={true} text={"Hold On Boarding You"} />
   }

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row justify={"center"}>
                <Taglabel text={"Hey there Welcome to FTMS..."} />
            </Row>
            <Row justify={"center"}>
                <Taglabel text={"before going ahead, Fill Your Details"} />
            </Row>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
            >
                <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
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
                <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item>
                <CoustomButton text={"Confirm "} htmlType="submit" />
            </Form.Item>
        </Form>
    );
};

export default OnboardUser;
