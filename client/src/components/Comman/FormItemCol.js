import React from "react";
import { Col, Form } from "antd";
import CustomLabel from "./CustomLabel"; // Assuming you have created CustomLabel component
import CustomInput from "./CustomInput"; // Assuming you have created CustomInput component

const FormItemCol = ({
    label,
    name,
    required = false,
    labelCol,
    rules = [],
    tooltip,
    readOnly,
    type,
    entity,
    entityName,
    fieldName,
    width,
    preFillValue,
    ...restProps
}) => (
    <Col xs={24} sm={24} md={8} lg={8}>
        <Form.Item
            label={
                label ? <CustomLabel required={required} label={label} /> : null
            }
            name={name}
            labelAlign="left"
            rules={rules}
            labelCol={labelCol}
            tooltip={tooltip}
            valuePropName={type === "image" ? "file" : "value"}
            getValueFromEvent={type === "image" ? (e) => e : undefined}
        >
            <CustomInput
                type={type}
                readOnly={readOnly}
                entity={entity}
                entityName={entityName}
                fieldName={fieldName}
                width={width}
                preFillValue={preFillValue}
                {...restProps}
            />
        </Form.Item>
    </Col>
);

export default FormItemCol;
