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

const DeliveryChallan = ({ form }) => {
    const isLaptop = useMediaQuery("(min-width:1000px)");

    const handleItemUpdate = (value, filedName, rowName) => {
        console.log("value", value, "fieldName", filedName);
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
            temObj.finalAmount = Math.ceil(temObj.qty * temObj.rate);
        } else if (filedName === "customer") {
            form.setFieldsValue({ customer: value });
        } else if (filedName === "no") {
            form.setFieldsValue({ no: value });
        }else if (filedName === "challanDate") {
            form.setFieldsValue({ challanDate: value });
        }
         else if (filedName === "transportAmount") {
            form.setFieldsValue({ transportAmount: value });
        }
        else if (filedName === "gstPercent") {
                   temObj.gstPercent = value

        } else if (filedName === "challanType") {
            form.setFieldsValue({ challanType: value });
        }

        items[rowName] = temObj;
        form.setFieldsValue({ items: items });

        // Tax Calculator
        let grossTotal = items.reduce((a, b) => a + b.finalAmount, 0);
        let transportAmount = form.getFieldValue("transportAmount") || 0;
        const temItems = items.map((item)=>({
            ...item,
            taxAmount:item.finalAmount*(item.gstPercent/100)
        }));

        let taxAmount = temItems.reduce((acc,item)=>acc + (item.taxAmount ||0),0)

        let grandTotal = Number(grossTotal) + Number(transportAmount) +Number(taxAmount);
        form.setFieldsValue({
            grossTotal: Math.ceil(grossTotal),
            grandTotal: Math.ceil(grandTotal),
            taxAmount:Math.ceil(taxAmount),
            transportAmount: Math.ceil(transportAmount),
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
                entity={"customers"}
                fieldName={"name"}
                customerSelect=""
                updateInForm={(value) => handleItemUpdate(value, "customer")}
                preFillValue = {form.getFieldValue("customer")?.name}
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
                preFillValue ={form.getFieldValue("no")}
            />
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
                preFillValue ={form.getFieldValue("challanDate")}
                updateInForm ={(value)=>handleItemUpdate(value,"challanDate")}
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
                updateInForm={(value) => handleItemUpdate(value, "challanType")}
                preFillValue ={form.getFieldValue("challanType")}
            />
            <FormItemCol
                label={"Vehicle No"}
                name={"vehicleNo"}
                labelCol={{ span: 8 }}
                labelAlign="left"
                type={"input"}
                width={"100px"}
            />
                <FormItemCol
                label={"Contact No"}
                name={"contactNo"}
                labelCol={{ span: 8 }}
                labelAlign="left"
                type={"input"}
                width={"100px"}
            />

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
                            <div style={{overflow:"auto",minHeight:"10vh"}}>
                            {subFields.map(({ key, name, ...restField }) => (
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
                                                fieldName={"productName"}
                                                updateInForm={(value) =>
                                                    handleItemUpdate(
                                                        value,
                                                        "description",
                                                        name
                                                    )
                                                }
                                                preFillValue={form.getFieldValue("items")?.[name].description}
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
                                                style={{
                                                    width: "100%",
                                                    textAlign: "center",
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item name={[name, "gstPercent"]}>
                                            <CustomSelect
                                                updateInForm={(value) =>
                                                    handleItemUpdate(
                                                        value,
                                                        "gstPercent",
                                                        name
                                                    )
                                                }
                                                entity={"Gst Percent"}
                                                entityName={"gstPercent"}
                                                width="100%"
                                                style={{
                                                    textAlign: "center",
                                                }}
                                                preFillValue={form.getFieldValue("items")?.[name]?.gstPercent}

                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        span={4}
                                        style={{ textAlign: "center" }}
                                    >
                                        <Form.Item name={[name, "finalAmount"]}>
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
                    name={"grossTotal"}
                    width={150}
                    labelCol={{ span: 8 }}
                    tooltip={"Amount Before Tax"}
                    labelAlign="left"
                    type={"number"}
                    readOnly={true}
                />
            </Row>
            {/* <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax Amount"
                    name={"taxPercent"}
                    type={"number"}
                    width={150}
                    labelCol={{ span: 8 }}
                    entity={"Tax Percent"}
                />
            </Row> */}
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Transport(Rs)"
                    name={"transportAmount"}
                    labelAlign="left"
                    width={150}
                    labelCol={{ span: 8 }}
                    type={"number"}
                    onChange={(value) =>
                        handleItemUpdate(value, "transportAmount")
                    }
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax Amount(Rs)"
                    name={"taxAmount"}
                    labelAlign="left"
                    width={150}
                    labelCol={{ span: 8 }}
                    type={"number"}
                    readOnly={true}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Grand Total"
                    tooltip={"Amount After Tax"}
                    name={"grandTotal"}
                    labelAlign="left"
                    type={"number"}
                    labelCol={{ span: 8 }}
                    width={150}
                    readOnly={true}
                />
            </Row>
            {/* <Row justify={"start"} style={{ marginBottom: 10 }}>
                <Taglabel text={" Term & Conditions"} weight={1000} />
            </Row>
            <FormItemCol
                label={"Delivery"}
                name={"deliveryCondition"}
                labelCol={{ span: 8 }}
                type={"select"}
                width={500}
                entity={"Delivery Condition"}
                entityName={"deliveryCondition"}
                updateInForm={(value) =>
                    handleItemUpdate(value, "deliveryCondition")
                }
            />
            <Row justify={"start"}>
                <Col sm={24} xs={24}>
                    <FormItemCol
                        label={"Validity"}
                        name={"validityCondition"}
                        labelCol={{ span: 8 }}
                        type={"select"}
                        width={500}
                        entity={"Validity Condition"}
                        entityName={"validityCondition"}
                        updateInForm={(value) =>
                            handleItemUpdate(value, "deliveryCondition")
                        }
                    />
                </Col>
            </Row>
            <Row justify={"start"}>
                <FormItemCol
                    label={"Payments"}
                    name={"paymentsCondition"}
                    labelCol={{ span: 8 }}
                    type={"select"}
                    width={500}
                    entity={"Payments Condition"}
                    entityName={"paymentsCondition"}
                    updateInForm={(value) =>
                        handleItemUpdate(value, "paymentsCondition")
                    }
                />
            </Row>
            <Row justify={"start"}>
                <FormItemCol
                    label={"Cancellation"}
                    name={"cancellationCondition"}
                    type={"select"}
                    width={500}
                    labelCol={{ span: 8 }}
                    entity={"Cancellation Condition"}
                    entityName={"cancellationCondition"}
                    updateInForm={(value) =>
                        handleItemUpdate(value, "cancellationCondition")
                    }
                />
            </Row> */}
        </div>
    );
};

export default DeliveryChallan;
