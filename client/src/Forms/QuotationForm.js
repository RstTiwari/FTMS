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
import CustomerModal from "components/CustomerModal";
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
                labelCol={{ span: 6 }}
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
                label={"#Quote"}
                name={"quoteNo"}
                labelAlign="left"
                labelCol={{ span: 6 }}
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
            <Row  justify={"center"} style={{marginBottom:"10px"}}>
                <Taglabel text={"Item Table"} weight={1000} />
            </Row>
            <Row style={{ position: "relative" }}>
                <Col className="gutter-row" span={7}>
                    <Taglabel text={"ITEM DESCRIPTION"} weight={700} />
                </Col>
                <Col className="gutter-row" span={4}>
                    <Taglabel text={"rate"} />
                </Col>
                <Col className="gutter-row" span={4}>
                    <Taglabel text={"qty"} />
                </Col>
                <Col className="gutter-row" span={4}>
                    <Taglabel text={"final Amount"} />
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
                            <Row key={subField.key} align={"middle"}>
                                <Col className="gutter-row" span={7}>
                                    <Form.Item
                                        name={[subField.name, "description"]}
                                    >
                                        <ProductModal
                                            productSelect={(label) =>
                                                onProductChange(label, subField)
                                            }
                                            // productValue={
                                            //     // current.getFieldValue("")[subField.key]
                                            // }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item name={[subField.name, "rate"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(value) =>
                                                onRateChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item name={[subField.name, "qty"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(value) =>
                                                onQtyChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        name={[subField.name, "finalAmount"]}
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            min={0}
                                            controls={false}
                                            style={{ width: 75 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Form.Item>
                                    <DeleteOutlined
                                        disabled
                                        style={{ color: "red" }}
                                        onClick={() => {
                                            subOpt.remove(subField.name);
                                        }}
                                    />
                                </Form.Item>
                            </Row>
                        ))}

                        {/* <CoustomButton onClick={addNewRow(subOpt)} text={"Add Row"} /> */}
                        <Button
                            type="primary"
                            onClick={() => {
                                subOpt.add(); // Use srNo instead of srN
                            }}
                            icon={<PlusOutlined />}
                            style={{
                                marginBottom: "1rem",
                                background: "green",
                                width: "20%",
                            }}
                        >
                            Add Item
                        </Button>
                    </div>
                )}
            </Form.List>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Gross Total"
                    name={"grossTotal"}
                    labelAlign="left"
                    type={"number"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax(%)"
                    name={"taxPercent"}
                    labelAlign="left"
                    type={"number"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Transport(Rs)"
                    name={"transPortAmount"}
                    labelAlign="left"
                    type={"number"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Grand Total"
                    name={"grandTotal"}
                    labelAlign="left"
                    type={"number"}
                    readOnly
                />
            </Row>
            <Row justify={"center"} style={{ padding: "1rem" }}>
                <Taglabel text={" Term & Conditions"} weight={1000} />
            </Row>
            <Row justify={"start"}>
                <Col span={10}>
                    <Form.Item
                        label={<CustomLabel label={"Delivery"} />}
                        name={"deliveryCondition"}
                    >
                        <Input
                            type="text"
                            style={{
                                width: inputWidth,
                                fontSize: inputFontSize,
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"start"}>
                <Col span={10}>
                    <Form.Item
                        label={<CustomLabel label={"Validity"} />}
                        name={"validityCondition"}
                    >
                        <Input
                            type="text"
                            style={{
                                width: inputWidth,
                                fontSize: inputFontSize,
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"start"}>
                <Col span={10}>
                    <Form.Item
                        label={<CustomLabel label="Payments" />}
                        name={"paymentsCondition"}
                    >
                        <Input
                            type="text"
                            style={{
                                width: inputWidth,
                                fontSize: inputFontSize,
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"start"}>
                <Col span={10}>
                    <Form.Item
                        label={<CustomLabel label="Cancellation" />}
                        name={"cancellationCondition"}
                    >
                        <Input
                            type="text"
                            style={{
                                width: inputWidth,
                                fontSize: inputFontSize,
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
};

export default QuotationForm;
