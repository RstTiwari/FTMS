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
import ProductModal from "components/ProductModal";
import FormItemCol from "components/SmallComponent/FormItemCol";
import Taglabel from "components/SmallComponent/Taglabel";
import { genTreeStyle } from "antd/es/tree/style";


const QuotationForm = ({ form }) => {
    const handleCustomerUpdate = (result) => {
        form.setFieldsValue({ customer: result });
    };
    const handleQuotationNumUpdate = (value) => {
        form.setFieldsValue({ quoteNo: value });
    };

    const handleItemsUpdate = (value, filedName, rowName) => {
        const items = form.getFieldValue("items");
        let temObj = items[rowName];
         console.log(items,rowName);
        if (filedName === "description") {
            let { description, rate, hsnCode } = value;
            console.log(description, rate, hsnCode);
            temObj.description = description;
            temObj.rate = Math.ceil(rate);
            temObj.finalAmount = Math.ceil(temObj.qty * rate);
        } else if (filedName === "rate") {
            temObj.rate = value;
            temObj.finalAmount = Math.ceil(temObj.qty * value);
        } else if (filedName === "qty") {
            temObj.qty = value;
            temObj.finalAmount = Math.ceil(value * temObj.finalAmount);
        }
        items[rowName] = temObj;
        form.setFieldsValue({ items: items });

        // Tax Calculator
        let grossTotal = items.reduce((a,b)=>{a.finalAmount + b.finalAmount},0)
        let taxPercent = form.getFieldValue("taxPercent")
        let taxOnProducts = calculateTax(taxPercent,total) 
        let transportAmount = form.getFieldValue("transportAmount") || 0
        let taxAmount = Math.ceil(taxOnProducts + transportAmount)
        let grandTotal = grossTotal+ taxAmount
        form.setFieldsValue({grossTotal:grossTotal,})
        
    };

    function calculateTax(taxPercent = 0, total) {
        let amount = (taxPercent * total) / 100;
        return Math.ceil(amount);
    }

    const onProductChange = (value, subField) => {
        // const formData = form.getFieldValue("items");
        // const items = [...formData];
        // const index = subField.key; // Use subField.name to get the index
        // const rowManipulated = items[index];
        // rowManipulated.description = value.productName;
        // rowManipulated.rate = Math.ceil(value.rate);
        // rowManipulated.finalAmount = Math.ceil(
        //     rowManipulated.rate * rowManipulated.qty
        // );
        // items[index] = rowManipulated;
        // form.setFieldsValue({ items: items });
        // // now updataing grossTotal ,grandTotal
        // let { grossTotal, grandTotal, taxPercent, transPortAmount } =
        //     form.getFieldsValue([
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
        // form.setFieldsValue({ grossTotal: Math.ceil(grossSum) });
        // form.setFieldsValue({ grandTotal: Math.ceil(grandSum) });
    };

    const onRateChange = async (value, subField) => {
        // const formData = form?.getFieldValue("items");
        // const items = [...formData];
        // const rowManipulated = items[subField.key];
        // rowManipulated.finalAmount = Math.ceil(
        //     rowManipulated.rate * rowManipulated.qty
        // );
        // items[subField.key] = rowManipulated;
        // form.setFieldsValue({ items: items });
        // // now updataing grossTotal ,grandTotal
        // let { grossTotal, grandTotal, taxPercent, transPortAmount } =
        //     form.getFieldsValue([
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
        // form.setFieldsValue({ grossTotal: Math.ceil(grossSum) });
        // form.setFieldsValue({ grandTotal: Math.ceil(grandSum) });
    };

    const onQtyChange = async (value, subField) => {
        // const formData = form?.getFieldsValue(["items"]);
        // const items = [...formData];
        // const rowManipulated = items[subField.key];
        // rowManipulated.qty = value;
        // rowManipulated.finalAmount = Math.ceil(
        //     rowManipulated.rate * rowManipulated.qty
        // );
        // form?.setFieldsValue({ items: items });
        // let { grossTotal, grandTotal, taxPercent, transPortAmount } =
        //     form.getFieldsValue([
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
        // form.setFieldsValue({ grossTotal: grossSum });
        // form.setFieldsValue({ grandTotal: grandSum });
    };

    const onTaxPercentChange = async (value) => {
        let { grossTotal, grandTotal, taxPercent, transPortAmount } =
            form.getFieldsValue([
                "grossTotal",
                "grandTotal",
                "taxPercent",
                "transPortAmount",
            ]);
        const taxAmount = Math.floor((grossTotal * value) / 100);
        const grandSum = grossTotal + taxAmount + transPortAmount;
        form.setFieldsValue({ grandTotal: Math.ceil(grandSum) });
    };

    const onTransportAmountChange = (value) => {
        let { grossTotal, grandTotal, taxPercent, transPortAmount } =
            form?.getFieldsValue([
                "grossTotal",
                "grandTotal",
                "taxPercent",
                "transPortAmount",
            ]);
        const taxAmount = Math.floor((grossTotal * taxPercent) / 100);
        const grandSum = grossTotal + taxAmount + value;
        form.setFieldsValue({ grandTotal: Math.ceil(grandSum) });
    };

    const addNewRow = (subOpt) => {
        subOpt.add({
            description:"",
            finalAmount: 0,
            qty: 1,
            rate: 0,
        });
    };

    const items = form?.getFieldsValue(["items"]);
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
                updateInForm={handleCustomerUpdate}
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
                updateInForm={handleQuotationNumUpdate}
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
                            {subFields.map(({key,name,...restField}) => (
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
                                            name={[
                                                name,
                                                "description",
                                            ]}
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
                                            name={[
                                                name,
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
                                                        name
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
                                        subOpt.add({
                                            description:"",
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
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Transport(Rs)"
                    name={"transportAmount"}
                    labelAlign="left"
                    type={"number"}
                    labelCol={{ span: 8 }}
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
