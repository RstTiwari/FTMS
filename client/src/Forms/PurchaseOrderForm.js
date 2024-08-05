import React, { useState, useRef, useEffect } from "react";
import Taglabel from "components/Comman/Taglabel";
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
    Checkbox,
} from "antd";

import { PlusOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";

import FormItemCol from "components/Comman/FormItemCol";
import CustomSelect from "components/Comman/CustomSelect";
import CustomModel from "components/CustomModal";
import NotificationHandler from "EventHandler/NotificationHandler";
import AddressDetails from "components/Comman/AddressDetails";

const PurchaseOrder = ({ form, value, disabled, isModel }) => {
    const [isOrganizationChecked, setIsOrganizationChecked] = useState(false);
    const [isCustomerChecked, setIsCustomerChecked] = useState(false);
    const [deliveryAddress,setDeliveryAddress ]  = useState("")
    const updateDeliveryAddress = (values)=>{
             form.setFieldsValue({deliveryAddress:values})
    } 
    const handleCheckboxChange = (type) => {
        if (type === "organization") {
            const response = { street1: "A-1o near gorai pada vasai virat", street2: "near Sb road cap", city: "vasai", state: "Maharastra", pincode: 401209 }
            setDeliveryAddress(response)
            form.setFieldsValue({deliveryAddress:response})
            setIsOrganizationChecked(true);
            setIsCustomerChecked(false);
        } else if (type === "customer") {
            setIsOrganizationChecked(false);
            setIsCustomerChecked(true);
        }
    };

    const handleItemsUpdate = (value, fieldName, rowName) => {
        const items = form.getFieldValue("items");
        const temObj = items[rowName];
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
        } else if (fieldName === "gstPercent") {
            temObj.gstPercent = Number(value);
        } else {
            return NotificationHandler.error("invalid changes");
        }

        items[rowName] = temObj;
        const grossTotal = items.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.finalAmount;
        }, 0);

        let temArray = items.map((item) => ({
            ...item,
            taxAmount: item.finalAmount * (item.gstPercent / 100) || 0,
        }));

        const totalTaxAmount = temArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.taxAmount;
        }, 0);

        let grandTotal = totalTaxAmount + grossTotal;
        form.setFieldsValue({
            items: items,
            grossTotal: Math.ceil(grossTotal),
            taxAmount: Math.ceil(totalTaxAmount),
            grandTotal: Math.ceil(grandTotal),
        });
    };
    return (
        <div>
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
                fieldName={"name"}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "vendorName");
                }}
            />
            <FormItemCol
                label={"#PURCHASE"}
                name={"purchaseNo"}
                labelAlign="left"
                required={true}
                type={"counters"}
                labelCol={{ span: 8 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "purchaseNo");
                }}
            />
            <Row>
                <FormItemCol
                    label={"Purchase Date"}
                    name={"purchaseDate"}
                    labelAlign="left"
                    type={"date"}
                    labelCol={{ span: 8 }}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Delivery Date",
                        },
                    ]}
                />
            </Row>
            <Row>
                <FormItemCol
                    label={"Delivery Date"}
                    name={"deliveryDate"}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Delivery Date",
                        },
                    ]}
                    labelAlign="left"
                    type={"date"}
                    labelCol={{ span: 8 }}
                />
            </Row>
            <div>
                <Row>
                    <Col
                        xs={24}
                        sm={24}
                        md={{ span: 12}}
                        lg={{ span: 8 }}
                        xl={{ span: 8}}
                    >
                        <Form.Item
                            label={<Taglabel text={"Deliver Address"} />}
                            labelCol={{ span: 8 }}
                            labelAlign="left"
                            name={"deliveryAddress"}
                            rules={[{ required: true, message: "Delivery Address Required" }]}
                        >
                            <Checkbox
                                checked={isOrganizationChecked}
                                onChange={() =>
                                    handleCheckboxChange("organization")
                                }
                            >
                                ORGANIZATION
                            </Checkbox>
                            <Checkbox
                                checked={isCustomerChecked}
                                onChange={() =>
                                    handleCheckboxChange("customer")
                                }
                            >
                                CUSTOMER
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={24}
                        sm={24}
                        md={{ span: 24, offset: 3 }}
                        lg={{ span: 24, offset: 3}}
                        xl={{ span: 24, offset: 3}}
                    >
                        {isOrganizationChecked && (
                               <AddressDetails id={"orinization"} initialRender={true} entityName={"Delivery Address"} address={deliveryAddress}  />
                        )}

                        {isCustomerChecked && (
                            <FormItemCol
                                label={"Select Customer"}
                                name={"customer"}
                                labelAlign="left"
                                type={"model"}
                                entity={"customers"}
                                fieldName={"name"}
                                isForAddress = {true}
                                updateInForm ={updateDeliveryAddress}

                            />
                        )}
                    </Col>
                </Row>
            </div>

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
                        <Taglabel text={"GST Tax %"} />
                    </Col>
                    <Col
                        className="gutter-row"
                        style={{ textAlign: "center" }}
                        span={5}
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
                            gstPercent: 0,
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
                                                        fieldName={
                                                            "productName"
                                                        }
                                                        updateInForm={(
                                                            value
                                                        ) => {
                                                            handleItemsUpdate(
                                                                value,
                                                                "description",
                                                                name
                                                            );
                                                        }}
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
                                            <Col span={4}>
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
                                            <Col span={4}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "taxPercent"]}
                                                >
                                                    <CustomSelect
                                                        updateInForm={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "gstPercent",
                                                                name
                                                            )
                                                        }
                                                        width = {"100%"}

                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                        entity={"gstPercent"}
                                                        entityName={
                                                            "gstPercent"
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                span={4}
                                                style={{ textAlign: "center" }}
                                            >
                                                <Form.Item
                                                    {...restField}
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
                                                        disabled={disabled}
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
                            <Row justify="start">
                                <Button
                                    type="primary"
                                    disabled={disabled}
                                    onClick={() => {
                                        subOpt.add({
                                            description: "",
                                            finalAmount: 0,
                                            qty: 1,
                                            gstPercent: 0,
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
