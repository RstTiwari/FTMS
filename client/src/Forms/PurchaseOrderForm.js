import React, { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";
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
import VendorModal from "components/VendorModal";
import SaveBottmComponent from "components/SaveBottomComponent";
import { epochInDDMMYY ,convertUnixTimestampToDate} from "Helper/EpochConveter";
import dayjs from 'dayjs';


const PurchaseOrder = ({ handleFormFinish, value, disabled,submitText }) => {
    const [form] = Form.useForm();

    const handleVendorChange = (value, lable) => {
        form.setFieldsValue({ vendor: value });
    };

    const onItemChange = (value, label, index, subFiled) => {
        const items = form.getFieldValue("items");
        const currentObj = items[index];
        if (subFiled === "rate") {
            currentObj.rate = value;
            currentObj.finalAmount = Math.ceil(value * currentObj.qty);
        } else if (subFiled === "qty") {
            currentObj.qty = value;
            currentObj.finalAmount = Math.ceil(value * currentObj.rate);
        } else {
        }

        items[index] = currentObj;
        form.setFieldsValue({ items: items });

        const grossTotal = items.reduce(
            (total, currentItem) => total + currentItem.finalAmount,
            0
        );
        form.setFieldsValue({ grossTotal: grossTotal });
        form.setFieldsValue({ grandTotal: grossTotal });

        if (subFiled === "taxPercent") {
            form.setFieldsValue({ taxPercent: Math.ceil(value) });
        } else if (subFiled === "transPortAmount") {
            form.setFieldsValue({ transPortAmount: Math.ceil(value) });
        }
        const taxAmount = Math.ceil(
            (form.getFieldValue("taxPercent") * grossTotal) / 100
        );
        form.setFieldsValue({
            taxAmount: taxAmount ? Math.ceil(taxAmount) : 0,
        });

        const totalTaxAmount = form.getFieldValue("taxAmount")
            ? form.getFieldValue("taxAmount")
            : 0;
        const totalTranportAmount = form.getFieldValue("transPortAmount")
            ? form.getFieldValue("transPortAmount")
            : 0;
        const totalGross = form.getFieldValue("grossTotal")
            ? form.getFieldValue("grossTotal")
            : 0;

        const grandTotal = totalTaxAmount + totalTranportAmount + totalGross;
        form.setFieldsValue({ grandTotal: Math.ceil(grandTotal) });
    };
    const {vendor,purchaseNo,purchaseDate,items} = value
    return (
        <Form
            onFinish={handleFormFinish}
            form={form}
            initialValues={{
                vendor: vendor ? vendor : "",
                purchaseNo: purchaseNo ? purchaseNo : "",
                purchaseDate: purchaseDate
                    ? epochInDDMMYY(value.purchaseDate)
                    : "",
                items: items
                    ? items
                    : [{ description: "", rate: 0, qty: 0, finalAmount: 0 }],
            }}
        >
            <Form.Item
                label={"Select Vendor"}
                name={"vendor"}
                labelAlign="left"
                labelCol={{ span: 6 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Select Vendor",
                    },
                ]}
            >
                <VendorModal
                    vendorSelect={handleVendorChange}
                    vendorId={vendor ? vendor.vendorName : ""}
                    disabled={disabled}
                />
            </Form.Item>
            <Form.Item
                label={"PURCHASE #"}
                name={"purchaseNo"}
                labelAlign="left"
                labelCol={{ span: 6 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
            >
                <Input disabled={disabled} />
            </Form.Item>
            <Row>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                        label={"Purchase Date"}
                        name={"purchaseDate"}
                        rules={[
                            {
                                required: true,
                                message: "Please Select Purchase Date",
                            },
                        ]}
                        labelAlign="left"
                        labelCol={{ span: 12 }}
                    >
                        <DatePicker
                            placeholder="Purchase Date"
                            format={"DD/MM/YYYY"}
                            disabled={disabled}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Divider dashed />
            <Row gutter={[12, 12]} style={{ position: "relative" }}>
                <Col className="gutter-row" span={7}>
                    <p>{"Description"}</p>
                </Col>
                <Col className="gutter-row" span={4}>
                    <p>{"Rate"}</p>
                </Col>
                <Col className="gutter-row" span={4}>
                    <p>{"Qty"}</p>
                </Col>
                <Col className="gutter-row" span={4}>
                    <p>{"Final Amount"}</p>
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
                        {subFields.map((subField, index) => (
                            <Row
                                gutter={[12, 12]}
                                key={subField.key}
                                align={"middle"}
                            >
                                <Col className="gutter-row" span={7}>
                                    <Form.Item
                                        name={[subField.name, "description"]}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "PLease Fill Description",
                                            },
                                        ]}
                                    >
                                        <Input disabled={disabled} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        name={[subField.name, "rate"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "PLease Fill rate",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(
                                                value,
                                                subField = "rate"
                                            ) =>
                                                onItemChange(
                                                    value,
                                                    {},
                                                    index,
                                                    subField
                                                )
                                            }
                                            disabled={disabled}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        name={[subField.name, "qty"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "PLease Fill qty",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(
                                                value,
                                                subField = "qty"
                                            ) =>
                                                onItemChange(
                                                    value,
                                                    {},
                                                    index,
                                                    subField
                                                )
                                            }
                                            disabled={disabled}
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
                                            disabled
                                        />
                                    </Form.Item>
                                </Col>
                                <Form.Item>
                                    <DeleteOutlined
                                        disabled={disabled}
                                        onClick={() => {
                                            subOpt.remove(subField.name);
                                        }}
                                    />
                                </Form.Item>
                            </Row>
                        ))}

                        <Button
                            type="primary"
                            disabled={disabled}
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
                                marginBottom: "1rem",
                                background: "green",
                            }}
                            block
                        >
                            Add Item
                        </Button>
                    </div>
                )}
            </Form.List>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item
                        label="Gross Total"
                        name={"grossTotal"}
                        labelAlign="left"
                        labelCol={{ span: 10 }}
                    >
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            style={{ width: 150 }}
                            controls={false}
                            disabled={disabled}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item
                        label="Tax(%)"
                        name={"taxPercent"}
                        labelCol={{ span: 10 }}
                        labelAlign="left"
                    >
                        <InputNumber
                            style={{ width: 150 }}
                            onChange={(value, subField = "taxPercent") => {
                                onItemChange(value, subField);
                            }}
                            disabled={disabled}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item
                        label="Tax Amount"
                        name={"taxAmount"}
                        labelCol={{ span: 10 }}
                        labelAlign="left"
                    >
                        <InputNumber
                            readOnly
                            style={{ width: 150 }}
                            disabled={disabled}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item
                        label="Transport(Rs)"
                        name={"transPortAmount"}
                        labelCol={{ span: 10 }}
                        labelAlign="left"
                    >
                        <InputNumber
                            style={{ width: 150 }}
                            onChange={(value, subField = "transPortAmount") => {
                                onItemChange(value, subField);
                            }}
                            disabled={disabled}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item
                        label="Grand Total"
                        name={"grandTotal"}
                        labelCol={{ span: 10 }}
                        labelAlign="left"
                    >
                        <InputNumber
                            readOnly
                            style={{ width: 150 }}
                            controls={false}
                            disabled={disabled}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Form.Item>
                    <SaveBottmComponent
                        buttonText={submitText}
                        cancelRoute={"purchaseorder"}
                    />
                </Form.Item>
            </Row>
        </Form>
    );
};

export default PurchaseOrder;
