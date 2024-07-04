import React from "react";
import { Col, Form } from "antd";
import CustomLabel from "../SmallComponent/CustomLabel"; // Assuming you have created CustomLabel component
import CustomInput from "../SmallComponent/CustomInput"; // Assuming you have created CustomInput component
import CustomTable from "components/CustomTable";

const FormItemCol = ({ label, name, required =false,labelCol, rules =[],tooltip,readOnly, type,entity, width,...restProps }) => (
    <Col xs={24} sm={24} md={8} lg={8}>
        <Form.Item
            label={<CustomLabel required={required} label={label} />}
            name={name}
            labelAlign="left"
            rules={rules}
            labelCol={labelCol}
            tooltip ={tooltip}
            valuePropName={type === "image" ? "file" : "value"}
            getValueFromEvent={type === "image" ? (e) => e : undefined}
        >
            <CustomInput type={type} readOnly entity={entity} width ={width}  {...restProps} />
        </Form.Item>
    </Col>
);

export default FormItemCol;
