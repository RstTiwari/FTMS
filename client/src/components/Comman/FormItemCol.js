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
    labelAlign="left",
    tooltip,
    readOnly,
    type,
    entity,
    entityName,
    fieldName,
    width,
    preFillValue,
    xl = 12,
    lg = 12,
    md =12,
    sm = 24,
    xs = 24,
    hidden,
    ...restProps
}) => (
    <Col xs={xl} sm={lg} md={md} lg={lg} xl={lg}>
        <Form.Item
            label={
                label ? <CustomLabel required={required} label={label} /> : null
            }
            name={name}
            labelAlign= {labelAlign}
            rules={rules}
            labelCol={labelCol}
            tooltip={tooltip}
            valuePropName={type === "image" ? "file" : "value"}
            getValueFromEvent={type === "image" ? (e) => e : undefined}
            className="floating-label-input"
            hidden={hidden}
            style={{textAlign:"center"}}
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
