import React, { useState } from "react";
import {
    Form,
    Row,
    Col,
    Input,
    DatePicker,
    Select,
    Button,
    Typography,
    message,
} from "antd";
import FormItemCol from "components/Comman/FormItemCol";
const { Text } = Typography;

const { Option } = Select;
const entity = "payments";

const PaymentForm = ({ form, initialValue = {}, isUpdate }) => {
    const handleItemUpdate = (value, fieldName) => {
        if (fieldName === "customer") {
            form.setFieldsValue({ customer: value });
        } else if (fieldName === "paymentMode") {
            form.setFieldsValue({ paymentMode: value });
        } else if (fieldName === "paymentDate") {
            form.setFieldsValue({ paymentDate: value });
        } else {
        }
    };

    return (
        <div>
            <Row>
                <Col span={24}>
                    <FormItemCol
                        label="Select Customer"
                        name="customer"
                        required={true}
                        labelCol={{ span: 12 }}
                        rules={[
                            {
                                required: true,
                                message: "Plese Select Customer",
                            },
                        ]}
                        labelAlign="left"
                        width={"25vw"}
                        entity={"customers"}
                        fieldName={"name"}
                        updateInForm={(value) => {
                            handleItemUpdate(value, "customer");
                        }}
                        onlyShippingAddress={true}
                        preFillValue={form.getFieldValue("customer")?.name}
                        type={"model"}
                        disabled={form.getFieldValue("customer")?.name} // if value availbel mark as disabled
                    />
                </Col>
                <Col span={24}>
                    <FormItemCol
                        label="Payment Date"
                        name="paymentDate"
                        required={true}
                        rules={[
                            {
                                required: true,
                                message: "Please Select Date",
                            },
                        ]}
                        labelAlign="left"
                        labelCol={{ span: 12 }}
                        type={"date"}
                        updateInForm={(value) =>
                            handleItemUpdate(value, "paymentDate")
                        }
                        preFillValue={form.getFieldValue("paymentDate")}
                    />
                </Col>
                <Col span={24}>
                    <FormItemCol
                        label="Payment Mode"
                        name="paymentMode"
                        labelAlign="left"
                        labelCol={{ span: 12 }}
                        type={"select"}
                        entity="Payment Mode"
                        entityName={"paymentMode"}
                        updateInForm={(value) => {
                            handleItemUpdate(value, "paymentMode");
                        }}
                        preFillValue={form.getFieldValue("paymentMode")}
                    />
                </Col>
                <Col span={24}>
                    <FormItemCol
                        label="Reference"
                        name="ref"
                        tooltip={"Check No or UPI Transaction No"}
                        labelAlign="left"
                        labelCol={{ span: 12 }}
                        type={"input"}
                    />
                </Col>
                <Col span={24}>
                    <FormItemCol
                        label="Amount(Rs)"
                        name="amount"
                        labelAlign="left"
                        required={true}
                        type={"number"}
                        width={250}
                        labelCol={{ span: 12 }}
                        rules={[
                            {
                                required: true,
                                message: "Amount need to specified",
                            },
                        ]}
                        disabled={isUpdate}
                    />
                </Col>

                <Col span={24}>
                    <FormItemCol
                        label={"NOTE"}
                        name={"note"}
                        labelAlign="left"
                        tooltip={"Remark or Comment"}
                        labelCol={{ span: 12 }}
                        type={"input"}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default PaymentForm;
