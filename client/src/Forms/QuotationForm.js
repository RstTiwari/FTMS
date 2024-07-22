import React, { useState, useRef, useEffect } from "react";
import {
    Form,
    Select,
    Divider,
    Space,
    Input,
    Button,
    Row,
    Col,
    DatePicker,
    InputNumber,
    Typography,
} from "antd";

import { PlusOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import { useAuth } from "state/AuthProvider";
import CustomModal from "components/CustomModal";
import FormItemCol from "components/SmallComponent/FormItemCol";
import Taglabel from "components/SmallComponent/Taglabel";

const QuotationForm = ({ form }) => {
    const handleItemsUpdate = (value, filedName, rowName) => {
        const items = form.getFieldValue("items");
        let temObj = items[rowName];
        if (filedName === "description") {
            let { description, rate, hsnCode } = value;
            temObj.description = description;
            temObj.rate = Math.ceil(rate);
            temObj.finalAmount = Math.ceil(temObj.qty * rate);
        } else if (filedName === "rate") {
            temObj.rate = value;
            temObj.finalAmount = Math.ceil(temObj.qty * value);
        } else if (filedName === "qty") {
            temObj.qty = value;
            temObj.finalAmount = Math.ceil(value * temObj.rate);
        } else if (filedName === "taxPercent") {
            value = Number(value);
            form.setFieldsValue({ taxPercent: value });
        } else if (filedName === "transportAmount") {
            form.setFieldsValue({ transportAmount: value });
        } else if (filedName === "paymentsCondition") {
            form.setFieldsValue({ paymentsCondition: value });
        } else if (filedName === "deliveryCondition") {
            form.setFieldsValue({ deliveryCondition: value });
        } else if (filedName === "cancellationCondition") {
            form.setFieldsValue({ cancellationCondition: value });
        } else if (filedName === "validityCondition") {
            form.setFieldsValue({ validityCondition: value });
        } else if (filedName === "customer") {
            form.setFieldsValue({ customer: value });
        } else if (filedName === "quoteNo") {
            form.setFieldsValue({ quoteNo: value });
        } else {
        }

        items[rowName] = temObj;
        form.setFieldsValue({ items: items });

        // Tax Calculator
        let grossTotal = items.reduce((a, b) => a + b.finalAmount, 0);
        let taxPercent = form.getFieldValue("taxPercent") || 0;
        let transportAmount = form.getFieldValue("transportAmount") || 0;
        let taxAmount = Math.ceil(
            calculateTax(taxPercent, grossTotal + transportAmount)
        );
        let grandTotal = grossTotal + taxAmount + transportAmount;
        form.setFieldsValue({
            grossTotal: grossTotal,
            grandTotal: grandTotal,
            transportAmount: transportAmount,
            taxAmount: taxAmount,
        });
    };

    function calculateTax(taxPercent = 0, total) {
        let amount = (taxPercent * total) / 100;
        return Math.ceil(amount);
    }

    useEffect(() => {}, []);
    return (
        <div>
            <FormItemCol
                label={"Select Customer"}
                name={"customer"}
                labelAlign="left"
                required={true}
                labelCol={{ span: 8 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Select Customer",
                    },
                ]}
                type="model"
                entity={"customers"}
                fieldName="customerName" // filed name form customer modal
                updateInForm={(value) => {
                    handleItemsUpdate(value, "customer");
                }}
            />
            <FormItemCol
                label={"#Quote"}
                name={"quoteNo"}
                labelAlign="left"
                required={true}
                labelCol={{ span: 8 }}
                type={"counters"}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "quoteNo");
                }}
            />
            <Row>
                <FormItemCol
                    label={"Quote Date"}
                    name={"quoteDate"}
                    required={true}
                    labelCol={{ span: 8 }}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Quote Date",
                        },
                    ]}
                    labelAlign="left"
                    type={"date"}
                />
                <FormItemCol
                    label={"Expiry Date"}
                    name={"expiryDate"}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Quote Expiry Date",
                        },
                    ]}
                    labelAlign="left"
                    labelCol={{ span: 6 }}
                    type={"date"}
                />
            </Row>
            <Divider dashed />
            <div
                style={{
                    position: "relative",
                    border: "1px solid #bfbfbb",
                    padding: "2px",
                    marginBottom: "20px",
                }}
            >
                <Row justify={"center"} style={{ marginBottom: "10px" }}>
                    <Taglabel text={"Item Table"} weight={1000} />
                </Row>
                <Row
                    style={{
                        position: "relative",
                        border: "1px solid #bfbfbb",
                    }}
                >
                    <Col
                        className="gutter-row"
                        span={9}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text={"ITEM DESCRIPTION"} weight={700} />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={5}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text={"Rate"} />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={5}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text={"Qty"} />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={5}
                        style={{ textAlign: "center" }}
                    >
                        <Taglabel text={"Final Amount(Before Tax)"} />
                    </Col>
                </Row>
                <Form.List
                    name={"items"}
                    initialValue={[
                        {
                            description: "",
                            rate: 0,
                            qty: 1,
                            finalAmount: 0,
                        },
                    ]}
                >
                    {(subFields, subOpt) => (
                        <div>
                            {subFields.map(({ key, name, ...restField }) => (
                                <Row
                                    key={key}
                                    align={"middle"}
                                    style={{ marginTop: "5px" }}
                                >
                                    <Col
                                        className="gutter-row"
                                        span={9}
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, "description"]}
                                        >
                                            <CustomModal
                                                entity={"products"}
                                                fieldName={"productName"}
                                                updateInForm={(value) =>
                                                    handleItemsUpdate(
                                                        value,
                                                        "description",
                                                        name
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "rate"]}
                                        >
                                            <InputNumber
                                                onChange={(value) =>
                                                    handleItemsUpdate(
                                                        value,
                                                        "rate",
                                                        name
                                                    )
                                                }
                                                style={{
                                                    textAlign: "center",
                                                    width: "100%",
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "qty"]}
                                        >
                                            <InputNumber
                                                onChange={(value) =>
                                                    handleItemsUpdate(
                                                        value,
                                                        "qty",
                                                        name
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                    textAlign: "center",
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        span={4}
                                        style={{ textAlign: "center" }}
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, "finalAmount"]}
                                        >
                                            <InputNumber
                                                readOnly
                                                className="moneyInput"
                                                min={0}
                                                style={{
                                                    width: "100%",
                                                    textAlign: "center",
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        span={1}
                                        style={{ textAlign: "center" }}
                                    >
                                        <Form.Item>
                                            <DeleteOutlined
                                                disabled
                                                style={{
                                                    color: "red",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    subOpt.remove(name);
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ))}

                            {/* Button to add new item */}
                            <Row justify="start">
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        subOpt.add({
                                            description: "",
                                            finalAmount: 0,
                                            qty: 1,
                                            rate: 0,
                                        }); // Use srNo instead of srN
                                    }}
                                    icon={<PlusOutlined />}
                                    style={{
                                        marginTop: "1rem",
                                        background: "#22b378",
                                        width: "15%",
                                    }}
                                >
                                    Add Item
                                </Button>
                            </Row>
                        </div>
                    )}
                </Form.List>
            </div>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Gross Total"
                    tooltip={"Amount before Tax"}
                    name={"grossTotal"}
                    labelAlign="left"
                    labelCol={{ span: 8 }}
                    type={"number"}
                    width={150}
                    readOnly={true}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Transport(Rs)"
                    name={"transportAmount"}
                    labelAlign="left"
                    type={"number"}
                    labelCol={{ span: 8 }}
                    onChange={(value) => {
                        handleItemsUpdate(value, "transportAmount");
                    }}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax(%)"
                    name={"taxPercent"}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    type={"select"}
                    width={150}
                    entity={"Tax Percent"}
                    entityName="taxPercent"
                    updateInForm={(value) => {
                        handleItemsUpdate(value, "taxPercent");
                    }}
                />
            </Row>

            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax Amount"
                    name={"taxAmount"}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    tooltip={"Tax Amount on total + transport"}
                    type={"number"}
                    entity={"Tax Percent"}
                    readOnly={true}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Grand Total"
                    name={"grandTotal"}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    tooltip={"Total Amount including Tax + total"}
                    type={"number"}
                    readOnly
                />
            </Row>
            <Row justify={"start"} style={{ marginBottom: 10 }}>
                <Taglabel text={" Term & Conditions"} weight={1000} />
            </Row>
            <FormItemCol
                label={"Delivery"}
                name={"deliveryCondition"}
                type={"select"}
                width={500}
                labelCol={{ span: 8 }}
                entity={"Delivery Condition"}
                entityName={"deliveryCondition"}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "deliveryCondition");
                }}
            />
            <Row justify={"start"}>
                <FormItemCol
                    label={"Validity"}
                    name={"validityCondition"}
                    type={"select"}
                    labelCol={{ span: 8 }}
                    width={500}
                    entity={"Validity Condition"}
                    entityName={"validityCondition"}
                    updateInForm={(value) => {
                        handleItemsUpdate(value, "validityCondition");
                    }}
                />
            </Row>
            <Row justify={"start"}>
                <FormItemCol
                    label={"Payments"}
                    name={"paymentsCondition"}
                    entityName={"paymentsCondition"}
                    labelCol={{ span: 8 }}
                    type={"select"}
                    width={500}
                    entity={"Payments Condition"}
                    updateInForm={(value) => {
                        handleItemsUpdate(value, "paymentsCondition");
                    }}
                />
            </Row>
            <Row justify={"start"}>
                <FormItemCol
                    label={"Cancellation"}
                    name={"cancellationCondition"}
                    type={"select"}
                    labelCol={{ span: 8 }}
                    width={500}
                    entity={"Cancellation Condition"}
                    entityName={"cancellationCondition"}
                    updateInForm={(value) => {
                        handleItemsUpdate(value, "cancellationCondition");
                    }}
                />
            </Row>
        </div>
    );
};

export default QuotationForm;
