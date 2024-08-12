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
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import { jsDateIntoDayjsDate } from "Helper/EpochConveter";

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
        } else if (filedName === "gstPercent") {
            value = Number(value);
            form.setFieldsValue({ gstPercent: value });
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
        } else if (filedName === "no") {
            form.setFieldsValue({ no: value });
        } else if (filedName === "sub") {
            form.setFieldsValue({ sub: value });
        } else if (filedName === "salesPerson") {
            form.setFieldsValue({ salesPerson: value });
        } else if (filedName === "quoteDate") {
            form.setFieldsValue({ quoteDate: value });
        } else if (filedName === "expiryDate") {
            form.setFieldsValue({ expiryDate: value });
        }

        items[rowName] = temObj;
        form.setFieldsValue({ items: items });

        // Tax Calculator
        let grossTotal = items.reduce((a, b) => a + b.finalAmount, 0);
        let gstPercent = form.getFieldValue("gstPercent") || 0;
        let transportAmount = form.getFieldValue("transportAmount") || 0;
        let taxAmount = Math.ceil(
            calculateTax(gstPercent, grossTotal + transportAmount)
        );
        let grandTotal = grossTotal + taxAmount + transportAmount;
        form.setFieldsValue({
            grossTotal: grossTotal,
            grandTotal: grandTotal,
            transportAmount: transportAmount,
            taxAmount: taxAmount,
        });
    };

    function calculateTax(gstPercent = 0, total) {
        let amount = (gstPercent * total) / 100;
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
                width={"25vw"}
                entity={"customers"}
                fieldName="name" // filed name form customer modal
                updateInForm={(value) => {
                    handleItemsUpdate(value, "customer");
                }}
                preFillValue={form.getFieldValue("customer")?.name}
            />
            <FormItemCol
                label={"#Quote"}
                name={"no"}
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
                    handleItemsUpdate(value, "no");
                }}
                preFillValue={form.getFieldValue("no")}
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
                    preFillValue={form.getFieldValue("quoteDate")}
                    updateInForm={(value) => {
                        handleItemsUpdate(value, "quoteDate");
                    }}
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
                    preFillValue={form.getFieldValue("expiryDate")}
                    updateInForm={(value) => {
                        handleItemsUpdate(value, "expiryDate");
                    }}
                />
            </Row>
            <FormItemCol
                label={"Sub"}
                name={"sub"}
                type={"select"}
                tooltip={"Let your customer know what this quote is for"}
                width={"50vw"}
                entity={"Quotation Sub"}
                labelCol={{ span: 8 }}
                entityName="sub"
                updateInForm={(value) => {
                    handleItemsUpdate(value, "sub");
                }}
                preFillValue={form.getFieldValue("sub")}
            />
            <FormItemCol
                label={"Sales Person"}
                name={"salesPerson"}
                type={"select"}
                entity={"Sales Person"}
                entityName="salesPerson"
                width={"200px"}
                labelCol={{ span: 8 }}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "salesPerson");
                }}
                preFillValue={form.getFieldValue("salesPerson")}
            />
            <Divider dashed />
            <Row
                justify={"center"}
                style={{
                    marginBottom: "10px",
                    top: 0,
                    background: "#fff",
                    zIndex: 1,
                }}
            >
                <Taglabel text={"ITEM TABLE"} weight={1000} />
            </Row>
            <div
                style={{
                    position: "relative",
                    border: "2px solid #bfbfbb",
                    marginBottom: "20px",
                    zIndex: 10,
                    margin: "20px",
                    overflow: "auto",
                }}
            >
                <div
                    style={{
                        overflowX: "auto",
                        overflowY: "auto",
                        paddingBottom: "10px",
                        minWidth: 1200,
                    }}
                >
                    <Row
                        style={{
                            position: "sticky",
                            top: "30px", // Adjust according to the height of the Taglabel Row
                            background: "#fff",
                            border: "1px solid #bfbfbb",
                            zIndex: 1,
                        }}
                    >
                        <Col
                            className="gutter-row"
                            span={9}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                                minWidth: "300px",
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
                                minWidth: "200px",
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
                                minWidth: "200px",
                            }}
                        >
                            <Taglabel text={"Qty"} />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={5}
                            style={{ textAlign: "center", minWidth: "200px" }}
                        >
                            <Taglabel text={"Final Amount (Before Tax)"} />
                        </Col>
                    </Row>
                </div>

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
                            <div
                                style={{
                                    overflowX: "auto",
                                    overflowY: "auto",
                                    minHeight: "10vh",
                                    maxHeight: "40vh",
                                    minWidth: 1200,
                                }}
                            >
                                {subFields.map(
                                    ({ key, name, ...restField }) => (
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
                                                    minWidth: "300px",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "description"]}
                                                >
                                                    <CustomModal
                                                        entity={"products"}
                                                        fieldName={
                                                            "productName"
                                                        }
                                                        updateInForm={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "description",
                                                                name
                                                            )
                                                        }
                                                        preFillValue={
                                                            form.getFieldValue(
                                                                "items"
                                                            )?.[name]
                                                                ?.description
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                span={5}
                                                style={{ minWidth: "200px" }}
                                            >
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
                                                        controls={false}
                                                        min={0}
                                                        style={{
                                                            textAlign: "center",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                span={5}
                                                style={{ minWidth: "200px" }}
                                            >
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
                                                        min={false}
                                                        controls={false}
                                                        style={{
                                                            width: "100%",
                                                            textAlign: "center",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                span={4}
                                                style={{
                                                    textAlign: "center",
                                                    minWidth: "200px",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "finalAmount"]}
                                                >
                                                    <InputNumber
                                                        readOnly
                                                        className="moneyInput"
                                                        min={0}
                                                        controls={true}
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
                                    )
                                )}
                            </div>

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
                                        });
                                    }}
                                    icon={<PlusOutlined />}
                                    style={{
                                        marginTop: "1rem",
                                        background: "#22b378",
                                        width: "200px",
                                        position: "sticky",
                                        bottom: 0,
                                        zIndex: 10,
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
                    name={"gstPercent"}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    type={"select"}
                    width={150}
                    entity={"Tax Percent"}
                    entityName="gstPercent"
                    updateInForm={(value) => {
                        handleItemsUpdate(value, "gstPercent");
                    }}
                    preFillValue={form.getFieldValue("gstPercent")}
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
                width={"50vw"}
                labelCol={{ span: 8 }}
                entity={"Delivery Condition"}
                entityName={"deliveryCondition"}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "deliveryCondition");
                }}
                preFillValue={form.getFieldValue("deliveryCondition")}
            />
            <Row justify={"start"}>
                <FormItemCol
                    label={"Validity"}
                    name={"validityCondition"}
                    type={"select"}
                    labelCol={{ span: 8 }}
                    width={"50vw"}
                    entity={"Validity Condition"}
                    entityName={"validityCondition"}
                    updateInForm={(value) => {
                        handleItemsUpdate(value, "validityCondition");
                    }}
                    preFillValue={form.getFieldValue("validityCondition")}
                />
            </Row>
            <Row justify={"start"}>
                <FormItemCol
                    label={"Payments"}
                    name={"paymentsCondition"}
                    entityName={"paymentsCondition"}
                    labelCol={{ span: 8 }}
                    type={"select"}
                    width={"50vw"}
                    entity={"Payments Condition"}
                    updateInForm={(value) => {
                        handleItemsUpdate(value, "paymentsCondition");
                    }}
                    preFillValue={form.getFieldValue("paymentsCondition")}
                />
            </Row>
            <Row justify={"start"}>
                <FormItemCol
                    label={"Cancellation"}
                    name={"cancellationCondition"}
                    type={"select"}
                    labelCol={{ span: 8 }}
                    width={"50vw"}
                    entity={"Cancellation Condition"}
                    entityName={"cancellationCondition"}
                    updateInForm={(value) => {
                        handleItemsUpdate(value, "cancellationCondition");
                    }}
                    preFillValue={form.getFieldValue("cancellationCondition")}
                />
            </Row>
        </div>
    );
};

export default QuotationForm;
