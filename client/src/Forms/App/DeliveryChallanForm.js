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
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import CustomSelect from "components/Comman/CustomSelect";
import CustomModel from "components/CustomModal";
import TaxPercent from "components/Comman/TaxPercent";

const DeliveryChallan = ({ form }) => {
    const isLaptop = useMediaQuery("(min-width:1000px)");

    const handleItemUpdate = (value, filedName, rowName) => {
        const items = form.getFieldValue("items");
        let temObj = items[rowName];
        if (filedName === "description") {
            let { description, rate, hsnCode } = value;
            temObj.description = description;
            temObj.rate = Math.ceil(rate);
            temObj.finalAmount = Math.ceil(temObj.qty * Number(rate));
        } else if (filedName === "rate") {
            temObj.rate = value;
            temObj.finalAmount = Number(Math.ceil(temObj.qty * value));
        } else if (filedName === "qty") {
            temObj.qty = value;
            temObj.finalAmount = Number(Math.ceil(temObj.qty * temObj.rate));
        } else if (filedName === "customer") {
            form.setFieldsValue({ customer: value });
        } else if (filedName === "no") {
            form.setFieldsValue({ no: value });
        } else if (filedName === "challanDate") {
            form.setFieldsValue({ challanDate: value });
        } else if (filedName === "transportAmount") {
            form.setFieldsValue({ transportAmount: value });
        } else if (filedName === "gstPercent") {
            temObj.gstPercent = value;
        } else if (filedName === "challanType") {
            form.setFieldsValue({ challanType: value });
        }

        items[rowName] = temObj;
        form.setFieldsValue({ items: items });

        // Tax Calculator
        let grossTotal = items.reduce((sum, item) => sum + item.finalAmount, 0);
        const temItems = items.map((item) => ({
            ...item,
            taxAmount: item.finalAmount * (item.gstPercent / 100),
        }));

        let taxAmount = temItems.reduce(
            (acc, item) => acc + (item.taxAmount || 0),
            0
        );
        let totalWithTax = grossTotal + taxAmount;
        let grandTotal = totalWithTax;
        // Calculate grandTotal based on otherCharges
        let otherCharges = form.getFieldValue("otherCharges") || [];
        otherCharges.forEach((charge) => {
            if (charge.rsOrPercent === "percent") {
                const amountToAdjust =
                    (totalWithTax * (charge.amount || 0)) / 100;
                if (charge.action === "add") {
                    grandTotal += amountToAdjust;
                } else {
                    grandTotal -= amountToAdjust;
                }
            } else {
                if (charge.action === "add") {
                    grandTotal += charge.amount || 0;
                } else {
                    grandTotal -= charge.amount || 0;
                }
            }
        });
        form.setFieldsValue({
            grossTotal: grossTotal,
            taxAmount: taxAmount,
            totalWithTax: totalWithTax,
            grandTotal: grandTotal,
        });
    };

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
                width={"30vw"}
                entity={"customers"}
                fieldName={"name"}
                onlyShippingAddress={true}
                updateInForm={(value) => handleItemUpdate(value, "customer")}
                preFillValue={form.getFieldValue("customer")?.name}
            />
            <FormItemCol
                label={"#Delivery Challan"}
                name={"no"}
                labelAlign="left"
                required={true}
                labelCol={{ span: 8 }}
                type={"counters"}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Challan No",
                    },
                ]}
                updateInForm={(value) => handleItemUpdate(value, "no")}
                preFillValue={form.getFieldValue("no")}
                width={"30vw"}
            />
            <Row>
                <FormItemCol
                    label={"Challan Date"}
                    name={"challanDate"}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Challan Date",
                        },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    type={"date"}
                    preFillValue={form.getFieldValue("challanDate")}
                    updateInForm={(value) =>
                        handleItemUpdate(value, "challanDate")
                    }
                />
                <FormItemCol
                    label={"Challan Type"}
                    name={"challanType"}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Challan Type",
                        },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    type={"select"}
                    entity={"Challan Type"}
                    entityName={"challanType"}
                    updateInForm={(value) =>
                        handleItemUpdate(value, "challanType")
                    }
                    preFillValue={form.getFieldValue("challanType")}
                />
            </Row>

            <FormItemCol
                label={"Vehicle No"}
                name={"vehicleNo"}
                labelCol={{ span: 8 }}
                labelAlign="left"
                type={"input"}
                width={"30vw"}
            />
            <FormItemCol
                label={"Contact No"}
                name={"contactNo"}
                labelCol={{ span: 8 }}
                labelAlign="left"
                type={"input"}
                width={"30vw"}
            />

            <Divider dashed />
            <Row justify={"center"} style={{ marginBottom: "10px" }}>
                <Taglabel text={"ITEM TABLE"} weight={1000} />
            </Row>
            <div
                style={{
                    position: "relative",
                    border: "2px solid #bfbfbb",
                    margin: "20px",
                    marginBottom: "20px",
                    overflow: "auto",
                }}
            >
                <div
                    style={{
                        overflow: "auto",
                        minWidth: 1200,
                    }}
                >
                    <Row
                        style={{
                            position: "relative",
                            border: "1px solid #bfbfbb",
                        }}
                    >
                        <Col
                            className="gutter-row"
                            span={7}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text={"ITEM DESCRIPTION"} weight={700} />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={4}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text={"Rate"} />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={4}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text={"Qty"} />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={4}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text={"GST(%)"} />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={4}
                            style={{ textAlign: "center" }}
                        >
                            <Taglabel text={"Final Amount"} />
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
                                    overflow: "auto",
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
                                                span={7}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "description"]}
                                                >
                                                    <CustomModel
                                                        entity={"products"}
                                                        fieldName={"name"}
                                                        updateInForm={(value) =>
                                                            handleItemUpdate(
                                                                value,
                                                                "description",
                                                                name
                                                            )
                                                        }
                                                        preFillValue={
                                                            form.getFieldValue(
                                                                "items"
                                                            )?.[name]
                                                                .description
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "rate"]}
                                                >
                                                    <InputNumber
                                                        onChange={(value) =>
                                                            handleItemUpdate(
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
                                            <Col span={4}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "qty"]}
                                                >
                                                    <InputNumber
                                                        onChange={(value) =>
                                                            handleItemUpdate(
                                                                value,
                                                                "qty",
                                                                name
                                                            )
                                                        }
                                                        controls={false}
                                                        min={0}
                                                        style={{
                                                            width: "100%",
                                                            textAlign: "center",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item
                                                    name={[name, "gstPercent"]}
                                                >
                                                    <TaxPercent
                                                        updateInForm={(value) =>
                                                            handleItemUpdate(
                                                                value,
                                                                "gstPercent",
                                                                name
                                                            )
                                                        }
                                                        entity={"Gst Percent"}
                                                        entityName={
                                                            "gstPercent"
                                                        }
                                                        width="100%"
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                        preFillValue={
                                                            form.getFieldValue(
                                                                "items"
                                                            )?.[name]
                                                                ?.gstPercent
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                span={4}
                                                style={{ textAlign: "center" }}
                                            >
                                                <Form.Item
                                                    name={[name, "finalAmount"]}
                                                >
                                                    <InputNumber
                                                        readOnly
                                                        className="moneyInput"
                                                        min={0}
                                                        controls={false}
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
                                            rate: 0,
                                            qty: 1,
                                            finalAmount: 0,
                                        }); // Use srNo instead of srN
                                    }}
                                    icon={<PlusOutlined />}
                                    style={{
                                        marginTop: "1rem",
                                        background: "#22b378",
                                        width: "200px",
                                    }}
                                >
                                    Add Item
                                </Button>
                            </Row>
                        </div>
                    )}
                </Form.List>
            </div>
            <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <FormItemCol form={form} type={"notes"} width={"50vw"} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Row align={"middle"} justify={"end"}>
                        <FormItemCol
                            label="Total(Before Tax)"
                            name={"grossTotal"}
                            labelAlign="left"
                            type={"number"}
                            disabled={true}
                            labelCol={{ span: 12 }}
                        />
                    </Row>
                    <Row align={"middle"} justify={"end"}>
                        <FormItemCol
                            label="Tax Amount"
                            name={"taxAmount"}
                            labelAlign="left"
                            disabled={true}
                            type={"number"}
                            labelCol={{ span: 12 }}
                        />
                    </Row>
                    <Row align={"middle"} justify={"end"}>
                        <FormItemCol
                            label="Total(After Tax)"
                            name={"totalWithTax"}
                            labelAlign="left"
                            disabled={true}
                            type={"number"}
                            labelCol={{ span: 12 }}
                        />
                    </Row>
                    <Row
                        span={24}
                        justify={"end"}
                        style={{ marginRight: "150px" }}
                    >
                        <FormItemCol
                            type={"othercharges"}
                            form={form}
                            tooltip={"Charges with no tax"}
                            width={"400px"}
                            updateInForm={() => handleItemUpdate()}
                        />
                    </Row>

                    <Row align={"middle"} justify={"end"}>
                        <FormItemCol
                            label="GrandTotal"
                            name={"grandTotal"}
                            labelAlign="left"
                            type={"number"}
                            disabled={true}
                            labelCol={{ span: 12 }}
                        />
                    </Row>
                </Col>
            </Row>
            <FormItemCol form={form} type={"terms"} />
        </div>
    );
};

export default DeliveryChallan;
