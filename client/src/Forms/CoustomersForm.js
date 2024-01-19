import { Flex, Form, Input,Col } from "antd";
import React from "react";

const CoustomersForm = ({ current }) => {
    return (
        <Form.Item label={"Customer Name"} name={"customerName"}>
            <Col xs={24} sm={24} md={12} lg={24}
            >
                <Input />
            </Col>
        </Form.Item>
    );
};

export default CoustomersForm;
