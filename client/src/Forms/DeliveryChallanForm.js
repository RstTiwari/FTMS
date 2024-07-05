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
import CustomerModal from "components/CustomModal";
import ProductModal from "components/ProductModal";
import FormItemCol from "components/SmallComponent/FormItemCol";
import Taglabel from "components/SmallComponent/Taglabel";
import CoustomButton from "components/SmallComponent/CoustomButton";
import CustomLabel from "components/SmallComponent/CustomLabel";
import CustomSelect from "components/SmallComponent/CustomDropDown";
import CustomModel from "components/CustomModal";

const DeliveryChallan = ({ current }) => {
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const inputWidth = isLaptop ? 700 : 350;
    const inputFontSize = isLaptop ? "1rem" : "0.4rem";

    const handleCustomerChange = (value) => {
        current.setFieldsValue({ customer: value });
    };

    const onProductChange = (value, subField) => {
        // const formData = current.getFieldValue("items");
        // const items = [...formData];
        // const index = subField.key; // Use subField.name to get the index
        // const rowManipulated = items[index];
        // rowManipulated.description = value.productName;
        // rowManipulated.rate = Math.ceil(value.rate);
        // rowManipulated.finalAmount = Math.ceil(
        //     rowManipulated.rate * rowManipulated.qty
        // );
        // items[index] = rowManipulated;
        // current.setFieldsValue({ items: items });
        // // now updataing grossTotal ,grandTotal
        // let { grossTotal, grandTotal, taxPercent, transPortAmount } =
        //     current.getFieldsValue([
        //         "grossTotal",
        //         "grandTotal",
        //         "taxPercent",
        //         "transPortAmount",
        //     ]);
        // const grossSum = items.reduce(
        //     (accumulator, currentValue) =>
        //         accumulator + currentValue.finalAmount,
        //     0
        // );
        // const taxAmount = Math.floor((grossSum * taxPercent) / 100);
        // const grandSum = grossSum + taxAmount + transPortAmount;
        // current.setFieldsValue({ grossTotal: Math.ceil(grossSum) });
        // current.setFieldsValue({ grandTotal: Math.ceil(grandSum) });
    };

    const onRateChange = async (value, subField) => {
        // const formData = current?.getFieldValue("items");
        // const items = [...formData];
        // const rowManipulated = items[subField.key];
        // rowManipulated.finalAmount = Math.ceil(
        //     rowManipulated.rate * rowManipulated.qty
        // );
        // items[subField.key] = rowManipulated;
        // current.setFieldsValue({ items: items });
        // // now updataing grossTotal ,grandTotal
        // let { grossTotal, grandTotal, taxPercent, transPortAmount } =
        //     current.getFieldsValue([
        //         "grossTotal",
        //         "grandTotal",
        //         "taxPercent",
        //         "transPortAmount",
        //     ]);
        // const grossSum = items.reduce(
        //     (accumulator, currentValue) =>
        //         accumulator + currentValue.finalAmount,
        //     0
        // );
        // const taxAmount = Math.floor((grossSum * taxPercent) / 100);
        // const grandSum = grossSum + taxAmount + transPortAmount;
        // current.setFieldsValue({ grossTotal: Math.ceil(grossSum) });
        // current.setFieldsValue({ grandTotal: Math.ceil(grandSum) });
    };

    const onQtyChange = async (value, subField) => {
        // const formData = current?.getFieldsValue(["items"]);
        // const items = [...formData];
        // const rowManipulated = items[subField.key];
        // rowManipulated.qty = value;
        // rowManipulated.finalAmount = Math.ceil(
        //     rowManipulated.rate * rowManipulated.qty
        // );
        // current?.setFieldsValue({ items: items });
        // let { grossTotal, grandTotal, taxPercent, transPortAmount } =
        //     current.getFieldsValue([
        //         "grossTotal",
        //         "grandTotal",
        //         "taxPercent",
        //         "transPortAmount",
        //     ]);
        // const grossSum = items.reduce(
        //     (accumulator, currentValue) =>
        //         accumulator + currentValue.finalAmount,
        //     0
        // );
        // const taxAmount = Math.floor((grossSum * taxPercent) / 100);
        // const grandSum = grossSum + taxAmount + transPortAmount;
        // current.setFieldsValue({ grossTotal: grossSum });
        // current.setFieldsValue({ grandTotal: grandSum });
    };

    const onTaxPercentChange = async (value) => {
        let { grossTotal, grandTotal, taxPercent, transPortAmount } =
            current.getFieldsValue([
                "grossTotal",
                "grandTotal",
                "taxPercent",
                "transPortAmount",
            ]);
        const taxAmount = Math.floor((grossTotal * value) / 100);
        const grandSum = grossTotal + taxAmount + transPortAmount;
        current.setFieldsValue({ grandTotal: Math.ceil(grandSum) });
    };

    const onTransportAmountChange = (value) => {
        let { grossTotal, grandTotal, taxPercent, transPortAmount } =
            current?.getFieldsValue([
                "grossTotal",
                "grandTotal",
                "taxPercent",
                "transPortAmount",
            ]);
        const taxAmount = Math.floor((grossTotal * taxPercent) / 100);
        const grandSum = grossTotal + taxAmount + value;
        current.setFieldsValue({ grandTotal: Math.ceil(grandSum) });
    };

    const addNewRow = (subOpt) => {
        subOpt.add({
            finalAmount: 0,
            qty: 1,
            rate: 0,
        });
    };

    const items = current?.getFieldsValue(["items"]);
    useEffect(() => {}, []);
    return (
        <div>
            <FormItemCol
                label={"Select Customer"}
                name={"customer"}
                labelAlign="left"
                required ={true}
                labelCol={{ span: 8 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Select Customer",
                    },
                ]}
                type="model"
                customerSelect=""
                handleCustomerChange={handleCustomerChange}
            />
            <FormItemCol
                label={"#Delivery Challan"}
                name={"challanNo"}
                labelAlign="left"
                required={true}
                labelCol={{ span: 8 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Challan No",
                    },
                ]}
            />
                <FormItemCol
                    label={"Challan Date"}
                    name={"challanDate"}
                    required ={true}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Challan Date",
                        },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    type={"date"}
                />
                 <FormItemCol
                    label={"Challan Type"}
                    name={"challanType"}
                    required ={true}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Challan Type",
                        },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    type={"select"}
                    entity ={"Challan Type"}
                />
              
            <Divider dashed />
            <div
                style={{
                    position: "relative",
                    border: "1px solid #bfbfbb",
                    padding: "2px",
                    marginBottom: "20px",
                    overflowY: "auto",
                    minWidth:700,
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
                        <Taglabel text={"Tax(%)"} />
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
                            {subFields.map((subField) => (
                                <Row
                                    key={subField.key}
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
                                            name={[
                                                subField.name,
                                                "description",
                                            ]}
                                        >
                                            <CustomModel  entity={"products"}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            name={[subField.name, "rate"]}
                                        >
                                            <InputNumber
                                                onChange={(value) =>
                                                    onRateChange(
                                                        value,
                                                        subField
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
                                            name={[subField.name, "qty"]}
                                        >
                                            <InputNumber
                                                onChange={(value) =>
                                                    onQtyChange(value, subField)
                                                }
                                                style={{
                                                    width: "100%",
                                                    textAlign: "center",
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            name={[subField.name, "taxPercent"]}
                                        >
                                            <CustomSelect
                                                onChange={(value) =>
                                                    onQtyChange(value, subField)
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
                                            name={[
                                                subField.name,
                                                "finalAmount",
                                            ]}
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
                                                    subOpt.remove(
                                                        subField.name
                                                    );
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
                                        subOpt.add(); // Use srNo instead of srN
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
                    labelCol={{span:8}}
                    tooltip={"Amount Before Tax"}
                    labelAlign="left"
                    type={"number"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax Amount"
                    name={"taxPercent"}
                    type={"number"}
                    width={150}
                    labelCol={{span:8}}
                    entity={"Tax Percent"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Transport(Rs)"
                    name={"transPortAmount"}
                    labelAlign="left"
                    width={150}
                    labelCol={{span:8}}
                    type={"number"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Grand Total"
                    tooltip={"Amount After Tax"}

                    name={"grandTotal"}
                    labelAlign="left"
                    type={"number"}
                    labelCol={{span:8}}
                    width={150}

                    readOnly
                />
            </Row>
            <Row justify={"start"} style={{ marginBottom:10 }}>
                <Taglabel text={" Term & Conditions"} weight={1000} />
            </Row>
            <FormItemCol
                label={"Delivery"}
                name={"deliveryCondition"}
                type={"select"}
                width={500}
                entity={"Delivery Condition"}
            />
            <Row justify={"start"}>
                <Col sm={24} xs={24} >
                <FormItemCol
                    label={"Validity"}
                    name={"validityCondition"}
                    type={"select"}
                    width={500}
                    entity={"Validity Condition"}
                />
                </Col>
             
            </Row>
            <Row justify={"start"}>
            <FormItemCol
                    label={"Payments"}
                    name={"paymentsCondition"}
                    type={"select"}
                    width={500}
                    entity={"Payments Condition"}
                />
            </Row>
            <Row justify={"start"}>
                <FormItemCol
                 label={"Cancellation"}
                 name={"cancellationCondition"}
                 type={"select"}
                 width={500}
                 entity={"Cancellation Condition"}
                 />
            </Row>
        </div>
    );
};

export default DeliveryChallan;
