import React, { useState } from "react";
import { Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    return (
        <div>
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
        </div>
    );
};

export default ForgetPassword;
