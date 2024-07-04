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

const QuotationForm = ({ current }) => {
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
                entity={"customers"}
                customerSelect=""
                handleCustomerChange={handleCustomerChange}
            />
            <FormItemCol
                label={"#Quote"}
                name={"quoteNo"}
                labelAlign="left"
                required={true}
                labelCol={{ span: 8 }}
                type={"entityNo"}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
            />
            <Row>
                <FormItemCol
                    label={"Quote Date"}
                    name={"quoteDate"}
                    required ={true}
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
                    required ={true}
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
                            {subFields.map((subField) => (
                                <Row
                                    key={subField.key}
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
                                            name={[
                                                subField.name,
                                                "description",
                                            ]}
                                        >
                                            <ProductModal
                                                productSelect={(label) =>
                                                    onProductChange(
                                                        label,
                                                        subField
                                                    )
                                                }
                                                // productValue={ current.getFieldValue("")[subField.key]
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
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
                                    <Col span={5}>
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
                    tooltip={"Amount before Tax"}
                    name={"grossTotal"}
                    labelAlign="left"
                    labelCol={{span:8}}
                    type={"number"}
                    width={150}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax(%)"
                    name={"taxPercent"}
                    labelCol={{span:8}}
                    labelAlign="left"
                    type={"select"}
                    width={150}
                    entity={"Tax Percent"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Transport(Rs)"
                    name={"transPortAmount"}
                    labelAlign="left"
                    type={"number"}
                    labelCol={{span:8}}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax Amount"
                    name={"taxAmount"}
                    labelCol={{span:8}}
                    labelAlign="left"
                    tooltip={"Tax Amount on total + transport"}
                    type={"number"}
                    entity={"Tax Percent"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Grand Total"
                    name={"grandTotal"}
                    labelCol={{span:8}}
                    labelAlign="left"
                    tooltip={"Total Amount including Tax + total"}
                    type={"number"}
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
                <FormItemCol
                    label={"Validity"}
                    name={"validityCondition"}
                    type={"select"}
                    width={500}
                    entity={"Validity Condition"}
                />
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

export default QuotationForm;
