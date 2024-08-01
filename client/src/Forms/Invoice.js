import React from "react";
import { Form, Row, Col, Input, InputNumber, Button, Divider } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import CustomSelect from "components/Comman/CustomSelect";
import CustomModel from "components/CustomModal";
import NotificationHandler from "EventHandler/NotificationHandler";

const QuotationForm = ({ form }) => {
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const inputWidth = isLaptop ? 700 : 350;
    const inputFontSize = isLaptop ? "1rem" : "0.4rem";

    const handleItemsUpdate = (value, fieldName, rowName) => {
        const items = form.getFieldValue("items");
        let temObj = items[rowName];

        if (fieldName === "customer") {
            form.setFieldsValue({ customer: value });
        } else if (fieldName === "invoiceNo") {
            form.setFieldsValue({ invoiceNo: value });
        } else if (fieldName === "description") {
            let { description, rate, hsnCode } = value;
            console.log(description, rate, hsnCode);
            temObj.description = description;
            temObj.hsnCode = hsnCode;
            temObj.rate = rate;
            temObj.finalAmount = temObj.rate * temObj.qty;
        } else if (fieldName === "qty") {
            temObj.qty = value;
            temObj.finalAmount = temObj.rate * value;
        } else if (fieldName === "rate") {
            temObj.rate = value;
            temObj.finalAmount = temObj.qty * value;
        } else if (fieldName === "taxPercent") {
            value = Number(value);
            temObj.taxPercent = value;
        } else {
            return NotificationHandler.error("Invalid");
        }

        items[rowName] = temObj;
        let grossTotal = items.reduce(
            (acc, item) => acc + (item.finalAmount || 0),
            0
        );
        const temItems = items.map((item) => ({
            ...item,
            taxAmount: item.finalAmount * (item.taxPercent / 100),
        }));

        let taxAmount = temItems.reduce(
            (acc, item) => acc + (item.taxAmount || 0),
            0
        );
        let grandTotal = taxAmount + grossTotal;
        form.setFieldsValue({
            items: items,
            grandTotal: Math.ceil(grandTotal),
            grossTotal: Math.ceil(grossTotal),
            taxAmount: Math.ceil(taxAmount),
        });
    };

    return (
        <div style={{ height: "100vh" }}>
            <FormItemCol
                label={"Select Customer"}
                name={"customer"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                required={true}
                rules={[
                    {
                        required: "true",
                        message: "Please Select Customer",
                    },
                ]}
                type="model"
                entity="customers"
                width="35%"
                customerSelect=""
                fieldName={"customerName"}
                updateInForm={(value) => handleItemsUpdate(value, "customer")}
            />

            <FormItemCol
                label={"Invoice#"}
                name={"invoiceNo"}
                required={true}
                type={"counters"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
                updateInForm={(value) => handleItemsUpdate(value, "invoiceNo")}
            />

            <Row>
                <FormItemCol
                    label={"Invoice Date"}
                    name={"invoiceDate"}
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
                    label={"Due Date"}
                    name={"dueDate"}
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
                    marginBottom: "20px",
                }}
            >
                <Row justify={"center"}>
                    <Taglabel text={"ITEM TABLE"} />
                </Row>
                <Row
                    style={{
                        position: "relative",
                        border: "1px solid #bfbfbb",
                    }}
                >
                    <Col
                        className="gutter-row"
                        span={6}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="Description" />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={3}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="HSN CODE" />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={3}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="Qty" />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={4}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="Rate" />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={4}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="GST TAX%" />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={4}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="Final Amount" />
                    </Col>
                </Row>
                <Form.List
                    name={"items"}
                    initialValue={[
                        {
                            finalAmount: 0,
                            qty: 1,
                            rate: 0,
                            taxPercent: 0,
                            finalAmount: 0,
                            description: "",
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
                                            align="middle"
                                            style={{ marginTop: "5px" }}
                                        >
                                            <Col
                                                className="gutter-row"
                                                span={6}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "description"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please Select the description",
                                                        },
                                                    ]}
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
                                            <Col
                                                className="gutter-row"
                                                span={3}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "hsnCode"]}
                                                >
                                                    <Input
                                                        type="text"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                className="gutter-row"
                                                span={3}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "qty"]}
                                                >
                                                    <InputNumber
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "qty",
                                                                name
                                                            )
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                className="gutter-row"
                                                span={4}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "rate"]}
                                                >
                                                    <InputNumber
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "rate",
                                                                name
                                                            )
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                className="gutter-row"
                                                span={4}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "taxPercent"]}
                                                >
                                                    <CustomSelect
                                                        entity={"taxPercent"}
                                                        entityName={
                                                            "taxPercent"
                                                        }
                                                        updateInForm={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "taxPercent",
                                                                name
                                                            )
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                className="gutter-row"
                                                span={3}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "finalAmount"]}
                                                >
                                                    <InputNumber
                                                        readOnly
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        className="moneyInput"
                                                        min={0}
                                                        controls={false}
                                                        disabled={true}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                className="gutter-row"
                                                span={1}
                                                style={{ textAlign: "center" }}
                                            >
                                                <Form.Item>
                                                    <DeleteOutlined
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

                            <Button
                                type="primary"
                                onClick={() => {
                                    subOpt.add({
                                        description: "",
                                        qty: 1,
                                        hsnCode: "",
                                        rate: 0,
                                        taxPercent: 0,
                                    });
                                }}
                                icon={<PlusOutlined />}
                                style={{
                                    marginTop: "1rem",
                                    background: "green",
                                    width: "10%",
                                }}
                                block
                            >
                                Add Item
                            </Button>
                        </div>
                    )}
                </Form.List>
            </div>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Gross Total"
                    name={"grossTotal"}
                    labelAlign="left"
                    type={"number"}
                    readOnly={true}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax Amount"
                    name={"taxAmount"}
                    labelAlign="left"
                    readOnly={true}
                    type={"number"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="GrandTotal"
                    name={"grandTotal"}
                    labelAlign="left"
                    type={"number"}
                    readOnly={true}
                />
            </Row>

            {/* Other form items go here */}
        </div>
    );
};

export default QuotationForm;
