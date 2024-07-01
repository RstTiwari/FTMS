import React from "react";
import { Col, Form } from "antd";
import CustomLabel from "../SmallComponent/CustomLabel"; // Assuming you have created CustomLabel component
import CustomInput from "../SmallComponent/CustomInput"; // Assuming you have created CustomInput component
import CustomTable from "components/CustomTable";

const FormItemCol = ({ label, name, required, rules,tooltip,readOnly, type, ...restProps }) => (
    <Col xs={24} sm={24} md={8} lg={8}>
        <Form.Item
            label={<CustomLabel required={required} label={label} />}
            name={name}
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={rules}
            tooltip ={tooltip}
        >
            <CustomInput type={type} readOnly restProps={restProps} />
        </Form.Item>
    </Col>
);

export default FormItemCol;
