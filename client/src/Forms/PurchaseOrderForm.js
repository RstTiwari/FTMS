import React, { useState, useRef, useEffect } from "react";
import Taglabel from "components/SmallComponent/Taglabel";
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
import {
    epochInDDMMYY,
    convertUnixTimestampToDate,
} from "Helper/EpochConveter";
import dayjs from "dayjs";
import FormItemCol from "components/SmallComponent/FormItemCol";
import ProductModal from "components/ProductModal";
import CustomSelect from "components/SmallComponent/CustomSelect";

const PurchaseOrder = ({ handleFormFinish, value, disabled, isModel }) => {
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
    // const {vendor,purchaseNo,purchaseDate,items,grandTotal,grossTotal,taxPercent,transPortAmount,taxAmount} = value
    return (
        <div style={{ height: "100vh" }}>
            <FormItemCol
                label={"Select Vendor"}
                name={"vendor"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                required={true}
                rules={[
                    {
                        required: "true",
                        message: "Please Select Vendor",
                    },
                ]}
                type={"model"}
                entity={"vendors"}
            />
            <FormItemCol
                label={"#PURCHASE"}
                name={"purchaseNo"}
                labelAlign="left"
                required={true}
                type={"input"}
                labelCol={{ span: 8}}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
            />
            <Row>
                <FormItemCol
                    label={"Purchase Date"}
                    name={"purchaseDate"}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Purchase Date",
                        },
                    ]}
                    labelAlign="left"
                    type={"date"}
                    labelCol={{ span: 8 }}
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
                        <Taglabel text={"Tax%"} />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={4}
                        style={{ textAlign: "center" }}
                    >
                        <Taglabel text={"Total Amount(before tax)"} />
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
                                            <ProductModal />{" "}
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            name={[subField.name, "rate"]}
                                        >
                                            <InputNumber
                                                // onChange={(value) =>
                                                //     onItemChange(value, {}, index, "rate")
                                                // }
                                                // disabled={disabled}
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
                                                // onChange={(value) =>
                                                //     //onItemChange(value, {}, index, "qty")
                                                // }
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
                                                // onChange={(value) =>
                                                //     //onItemChange(value, {}, index, "qty")
                                                // }
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
                                                controls={false}
                                                style={{
                                                    width: "100%",
                                                    textAlign: "center",
                                                }}
                                                disabled
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        span={1}
                                        style={{ textAlign: "center" }}
                                    >
                                        <Form.Item>
                                            <DeleteOutlined
                                                disabled={disabled}
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
                            <Row justify="start">
                                <Button
                                    type="primary"
                                    disabled={disabled}
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
                    label="Grand Total"
                    name={"grossTotal"}
                    tooltip={"Amount Before Tax"}
                    labelAlign="left"
                    type={"number"}
                    labelCol={{ span: 10 }}
                    
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax Amount(Rs)"
                    name={"taxAmount"}
                    labelCol={{ span: 10 }}
                    labelAlign="left"
                    type={"number"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Transport(Rs)"
                    name={"transPortAmount"}
                    labelCol={{ span: 10 }}
                    labelAlign="left"
                    type={"number"}
                />
               
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol 
                 label="Grand Total"
                 tooltip={"Amount After Tax"}
                 name={"grandTotal"}
                 labelCol={{ span: 10 }}
                 labelAlign="left"
                 type={"number"}
                />
                
            </Row>
        </div>
    );
};

export default PurchaseOrder;
