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
import CustomModel from "components/CustomModal";
import NotificationHandler from "EventHandler/NotificationHandler";

const PurchaseOrder = ({ form, value, disabled, isModel }) => {

    const handleItemsUpdate = (value,fieldName,rowName)=>{
        const items = form.getFieldValue("items")
        const temObj = items[rowName]
        if (fieldName === "vendorName") {
            form.setFieldsValue({ vendor: value });
        } else if (fieldName === "purchaseNo") {
            form.setFieldsValue({ purchaseNo: value });
        } else if (fieldName === "description") {
            let { description, rate, hsnCode } = value;
            temObj.description = description;
            temObj.rate = rate;
            temObj.finalAmount = temObj.qty * temObj.rate;
        } else if (fieldName === "rate") {
            temObj.rate = value;
            temObj.finalAmount = temObj.rate * temObj.qty;
        } else if (fieldName === "qty") {
            temObj.qty = value;
            temObj.finalAmount = temObj.rate * temObj.qty;
        } else if (fieldName === "taxPercent") {
            temObj.taxPercent = Number(value);
        } else {
            return NotificationHandler.error("invalid changes")
        }


        items[rowName] = temObj
        let grossTotal = items.reduce(
            (cur, acc) => cur + acc.finalAmount || 0,
            0
        );
        
        let temArray = items.map((item) => ({
            ...item,
            taxAmount: item.finalAmount * (item.taxPercent / 100) || 0
        }));

        let taxAmount = temArray.reduce(
            (cur, acc) => (cur + acc.taxAmount || 0, 0)
        );
        let grandTotal = taxAmount+ grossTotal
         form.setFieldsValue({
             items: items,
             grossTotal: Math.ceil(grossTotal),
             taxAmount: Math.ceil(taxAmount),
             grandTotal: Math.ceil(grandTotal),
         });

    }
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
                fieldName={"vendorName"}
                updateInForm ={(value)=>{handleItemsUpdate(value,"vendorName",)}}

            />
            <FormItemCol
                label={"#PURCHASE"}
                name={"purchaseNo"}
                labelAlign="left"
                required={true}
                type={"counters"}
                labelCol={{ span: 8}}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
                updateInForm ={(value)=>{handleItemsUpdate(value,"purchaseNo",)}}
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
                        <Taglabel text={"Total Amount(Before tax)"} />
                    </Col>
                </Row>
                <Form.List
                    name={"items"}
                    initialValue={[
                        {
                            description: "",
                            rate: 0,
                            qty: 1,
                            taxPercent:0,
                            finalAmount: 0,
                        },
                    ]}
                >
                    {(subFields, subOpt) => (
                        <div>
                            {subFields.map(({key,name ,...restField}) => (
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
                                            name={[
                                                name,
                                                "description",
                                            ]}
                                        >
                                            <CustomModel 
                                            entity={"products"}
                                            fieldName={"productName"}
                                            updateInForm={(value)=>{handleItemsUpdate(value,"description",name)}}
                                             />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "rate"]}
                                        >
                                            <InputNumber
                                                onChange={(value)=>handleItemsUpdate(value,"rate",name)}
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
                                                    handleItemsUpdate(value, "qty",name)
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
                                            {...restField}
                                            name={[name, "taxPercent"]}
                                        >
                                            <CustomSelect
                                                updateInForm={(value) =>
                                                    handleItemsUpdate(value, "taxPercent",name)
                                                }
                                                style={{
                                                    width: "100%",
                                                    textAlign: "center",
                                                }}
                                                entity={"taxPercent"}
                                                entityName={"taxPercent"}
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
                                                disabled={disabled}
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
                            <Row justify="start">
                                <Button
                                    type="primary"
                                    disabled={disabled}
                                    onClick={() => {
                                        subOpt.add({
                                            description: "",
                                            finalAmount: 0,
                                            qty: 1,
                                            taxPercent:0,
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
                    readOnly={true}
                    
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax Amount(Rs)"
                    name={"taxAmount"}
                    labelCol={{ span: 10 }}
                    labelAlign="left"
                    tooltip={"Tax Amount on Gross Total"}
                    type={"number"}
                    readOnly={true}

                />
            </Row>
            {/* <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Transport(Rs)"
                    name={"transPortAmount"}
                    labelCol={{ span: 10 }}
                    updateInForm ={(value)=>{handleItemsUpdate(value,"transPortAmount")}}
                    labelAlign="left"
                    type={"number"}
                />
               
            </Row> */}
            <Row align={"middle"} justify={"end"}>
                <FormItemCol 
                 label="Grand Total"
                 tooltip={"Amount After Tax"}
                 name={"grandTotal"}
                 labelCol={{ span: 10 }}
                 readOnly={true}
                 labelAlign="left"
                 type={"number"}
                />
                
            </Row>
        </div>
    );
};

export default PurchaseOrder;
