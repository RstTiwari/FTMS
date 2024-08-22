import React from "react";
import { Form, Row, Col, Input, InputNumber, Button, Divider } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import CustomSelect from "components/Comman/CustomSelect";
import CustomModel from "components/CustomModal";
import NotificationHandler from "EventHandler/NotificationHandler";
import TaxPercent from "components/Comman/TaxPercent";

const QuotationForm = ({ form }) => {
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const inputWidth = isLaptop ? 700 : 350;
    const inputFontSize = isLaptop ? "1rem" : "0.4rem";

    const handleItemsUpdate = (value, fieldName, rowName) => {
        const items = form.getFieldValue("items");
        let temObj = items[rowName];

        if (fieldName === "customer") {
            form.setFieldsValue({ customer: value });
        } else if (fieldName === "no") {
            form.setFieldsValue({ no: value });
        } else if (fieldName === "description") {
            let { description, rate, hsnCode } = value;
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
        } else if (fieldName === "gstPercent") {
            value = Number(value);
            temObj.gstPercent = value;
        } else if (fieldName === "invoiceDate") {
            form.setFieldsValue({ invoiceDate: value });
        } else if (fieldName === "dueDate") {
            form.setFieldsValue({ dueDate: value });
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
        <div>
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
                width={"25vw"}
                customerSelect=""
                fieldName={"name"}
                updateInForm={(value) => handleItemsUpdate(value, "customer")}
                preFillValue={form.getFieldValue("customer")?.name}
            />

            <FormItemCol
                label={"Invoice#"}
                name={"no"}
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
                updateInForm={(value) => handleItemsUpdate(value, "no")}
                preFillValue={form.getFieldValue("no")}
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
                    preFillValue={form.getFieldValue("invoiceDate")}
                    updateInForm={(value) =>
                        handleItemsUpdate(value, "invoiceDate")
                    }
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
                    preFillValue={form.getFieldValue("dueDate")}
                    updateInForm={(value) =>
                        handleItemsUpdate(value, "dueDate")
                    }
                />
            </Row>

            <Divider dashed />
            <Row justify={"center"}>
                <Taglabel text={"ITEM TABLE"} />
            </Row>
            <div
                style={{
                    position: "relative",
                    border: "2px solid #bfbfbb",
                    marginBottom: "20px",
                    margin: "20px",
                    overflow: "auto",
                }}
            >
                <div
                    style={{
                        minWidth: 1200,
                        overflow: "auto",
                    }}
                >
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
                </div>
                <Form.List
                    name={"items"}
                    initialValue={[
                        {
                            finalAmount: 0,
                            qty: 1,
                            rate: 0,
                            gstPercent: 0,
                            finalAmount: 0,
                            description: "",
                        },
                    ]}
                >
                    {(subFields, subOpt) => (
                        <div>
                            <div
                                style={{
                                    overflowX: "auto",
                                    overflow: "auto",
                                    minHeight: "10vh",
                                    maxHeight: "40vh",
                                    minWidth: 1200,
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
                                                        preFillValue={
                                                            form.getFieldValue(
                                                                "items"
                                                            )?.[name]
                                                                ?.description
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
                                                        controls={false}
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
                                                        controls={false}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                className="gutter-row"
                                                span={4}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "gstPercent"]}
                                                >
                                                    <TaxPercent
                                                        updateInForm={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "gstPercent",
                                                                name
                                                            )
                                                        }
                                                        min={false}
                                                        controls={false}
                                                        width="100%"
                                                        style={{
                                                            width: "100%",
                                                            textAlign: "center",
                                                        }}
                                                        preFillValue={form.getFieldValue(
                                                            "gstPercent"
                                                        )}
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
                                        gstPercent: 0,
                                    });
                                }}
                                icon={<PlusOutlined />}
                                style={{
                                    marginTop: "1rem",
                                    background: "green",
                                    width: "200px",
                                }}
                                block
                            >
                                Add Item
                            </Button>
                        </div>
                    )}
                </Form.List>
            </div>
            <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <FormItemCol form={form} type={"notes"} width={"50vw"} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Row align={"middle"} justify={"end"}>
                        <FormItemCol
                            label="Total(Before Tax)"
                            name={"grossTotal"}
                            labelAlign="left"
                            type={"number"}
                            disabled={true}
                            labelCol={{ span: 12 }}
                        />
                    </Row>
                    <Row align={"middle"} justify={"end"}>
                        <FormItemCol
                            label="Tax Amount"
                            name={"taxAmount"}
                            labelAlign="left"
                            disabled={true}
                            type={"number"}
                            labelCol={{ span: 12 }}
                        />
                    </Row>
                    <Row align={"middle"} justify={"end"}>
                        <FormItemCol
                            label="Total(After Tax)"
                            name={"taxAmount"}
                            labelAlign="left"
                            disabled={true}
                            type={"number"}
                            labelCol={{ span: 12 }}
                        />
                    </Row>
                    <Row>
                        <FormItemCol
                            form={form}
                            type={"othercharges"}
                            width={"400px"}
                        />
                    </Row>
                    <Row align={"middle"} justify={"end"}>
                        <FormItemCol
                            label="GrandTotal"
                            name={"grandTotal"}
                            labelAlign="left"
                            type={"number"}
                            disabled={true}
                            labelCol={{ span: 12 }}
                        />
                    </Row>
                </Col>
            </Row>
            <FormItemCol form={form} type={"terms"} />
            {/* Other form items go here */}
        </div>
    );
};

export default QuotationForm;
