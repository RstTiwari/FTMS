import React, { lazy, useEffect, useState } from "react";
import {
    Form,
    Select,
    Col,
    Input,
    Row,
    DatePicker,
    Divider,
    InputNumber,
    Button,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import DropDownCoustom from "components/DropDownCoustom";
import { useAuth } from "state/AuthProvider";
import PageLoader from "pages/PageLoader";
import CustomerModal from "components/CustomerModal";
import ProductModal from "components/ProductModal";
import { items } from "Data/LeadData";

const Invoice = ({ current }) => {
    const handleCustomerChange = async (value, label) => {
        current.setFieldsValue({ customer: value });
    };

    const onDescriptionChange = (label, subField) => {
        const formData = current.getFieldValue("items");
        const items = [...formData];
        const rowManipulated = items[subField.key];
        rowManipulated.description = label.productName;
        rowManipulated.rate = label.rate;
        rowManipulated.hsnCode = label.hsnCode;
        rowManipulated.taxableAmount = rowManipulated.rate * rowManipulated.qty;
        rowManipulated.finalAmount = getFinalAmount(
            rowManipulated.sgstPercent,
            rowManipulated.cgstPercent,
            rowManipulated.igstPercent,
            rowManipulated.taxableAmount
        );

        items[subField.key] = rowManipulated;
        current.setFieldsValue({ items: items });
        console.log(current.getFieldValue("items"));

        let amountBeforeTax = items.reduce((a, b) => a + b.taxableAmount, 0);
        let amountAfterTax = items.reduce((a, b) => a + b.finalAmount, 0);
        const totalTaxAmount = amountAfterTax - amountBeforeTax;
        current.setFieldsValue({ grossTotal: Math.ceil(amountBeforeTax) });
        current.setFieldsValue({ grandTotal: Math.ceil(amountAfterTax) });
        current.setFieldsValue({ totalTaxAmount: Math.ceil(totalTaxAmount) });
    };

    const onRateChange = (value, subField) => {
        const formData = current.getFieldValue("items");
        const items = [...formData];
        const rowManipulated = items[subField.key];
        rowManipulated.rate = value;
        rowManipulated.taxableAmount = rowManipulated.rate * rowManipulated.qty;
        rowManipulated.finalAmount = getFinalAmount(
            rowManipulated.sgstPercent,
            rowManipulated.cgstPercent,
            rowManipulated.igstPercent,
            rowManipulated.taxableAmount
        );

        current.setFieldsValue({ items: items });

        let amountBeforeTax = items.reduce((a, b) => a + b.taxableAmount, 0);
        let amountAfterTax = items.reduce((a, b) => a + b.finalAmount, 0);
        const totalTaxAmount = amountAfterTax - amountBeforeTax;
        current.setFieldsValue({ grossTotal: Math.ceil(amountBeforeTax) });
        current.setFieldsValue({ grandTotal: Math.ceil(amountAfterTax) });
        current.setFieldsValue({ totalTaxAmount: Math.ceil(totalTaxAmount) });
    };

    const onQtyChange = (value, subField) => {
        const formData = current.getFieldValue("items");
        const items = [...formData];
        const rowManipulated = items[subField.key];
        rowManipulated.qty = value;
        rowManipulated.taxableAmount = rowManipulated.rate * rowManipulated.qty;
        rowManipulated.finalAmount = getFinalAmount(
            rowManipulated.sgstPercent,
            rowManipulated.cgstPercent,
            rowManipulated.igstPercent,
            rowManipulated.taxableAmount
        );
        current.setFieldsValue({ items: items });

        let amountBeforeTax = items.reduce((a, b) => a + b.taxableAmount, 0);
        let amountAfterTax = items.reduce((a, b) => a + b.finalAmount, 0);
        const totalTaxAmount = amountAfterTax - amountBeforeTax;
        current.setFieldsValue({ grossTotal: Math.ceil(amountBeforeTax) });
        current.setFieldsValue({ grandTotal: Math.ceil(amountAfterTax) });
        current.setFieldsValue({ totalTaxAmount: Math.ceil(totalTaxAmount) });
    };

    const onSgstChange = (value, subField) => {
        const formData = current.getFieldValue("items");
        const items = [...formData];
        const rowManipulated = items[subField.key];
        rowManipulated.sgstPercent = value;
        rowManipulated.finalAmount = getFinalAmount(
            rowManipulated.sgstPercent,
            rowManipulated.cgstPercent,
            rowManipulated.igstPercent,
            rowManipulated.taxableAmount
        );
        current.setFieldsValue({ items: items });

        let amountBeforeTax = items.reduce((a, b) => a + b.taxableAmount, 0);
        let amountAfterTax = items.reduce((a, b) => a + b.finalAmount, 0);
        const totalTaxAmount = amountAfterTax - amountBeforeTax;
        current.setFieldsValue({ grossTotal: Math.ceil(amountBeforeTax) });
        current.setFieldsValue({ grandTotal: Math.ceil(amountAfterTax) });
        current.setFieldsValue({ totalTaxAmount: Math.ceil(totalTaxAmount) });
    };
    const onCgstChange = (value, subField) => {
        const formData = current.getFieldValue("items");
        const items = [...formData];
        const rowManipulated = items[subField.key];
        rowManipulated.cgstPercent = value;
        rowManipulated.finalAmount = getFinalAmount(
            rowManipulated.sgstPercent,
            rowManipulated.cgstPercent,
            rowManipulated.igstPercent,
            rowManipulated.taxableAmount
        );
        current.setFieldsValue({ items: items });

        let amountBeforeTax = items.reduce((a, b) => a + b.taxableAmount, 0);
        let amountAfterTax = items.reduce((a, b) => a + b.finalAmount, 0);
        const totalTaxAmount = amountAfterTax - amountBeforeTax;
        current.setFieldsValue({ grossTotal: Math.ceil(amountBeforeTax) });
        current.setFieldsValue({ grandTotal: Math.ceil(amountAfterTax) });
        current.setFieldsValue({ totalTaxAmount: Math.ceil(totalTaxAmount) });
    };
    const onIgstChange = (value, subField) => {
        const formData = current.getFieldValue("items");
        const items = [...formData];
        const rowManipulated = items[subField.key];
        rowManipulated.igstPercent = value;
        rowManipulated.finalAmount = getFinalAmount(
            rowManipulated.sgstPercent,
            rowManipulated.cgstPercent,
            rowManipulated.igstPercent,
            rowManipulated.taxableAmount
        );
        current.setFieldsValue({ items: items });

        let amountBeforeTax = items.reduce((a, b) => a + b.taxableAmount, 0);
        let amountAfterTax = items.reduce((a, b) => a + b.finalAmount, 0);
        const totalTaxAmount = amountAfterTax - amountBeforeTax;
        current.setFieldsValue({ grossTotal: Math.ceil(amountBeforeTax) });
        current.setFieldsValue({ grandTotal: Math.ceil(amountAfterTax) });
        current.setFieldsValue({ totalTaxAmount: Math.ceil(totalTaxAmount) });
    };

    /**Function for Calculating the Final Amount */
    const getFinalAmount = (sgst, cgst, igst, taxableAmount) => {
        let sgstAmount = Math.floor((sgst * taxableAmount) / 100);
        let cgstAmount = Math.floor((cgst * taxableAmount) / 100);
        let igstAmount = Math.floor((igst * taxableAmount) / 100);
        return taxableAmount + sgstAmount + igstAmount + cgstAmount;
    };

    useEffect(() => {}, []);
    const items = current.getFieldValue("items");
    return (
        <div>
            <Col span={10}>
                <Form.Item
                    label={"Select Coustomer"}
                    name={"customer"}
                    labelAlign="left"
                    labelCol={{ span: 8 }}
                    rules={[
                        {
                            required: "true",
                            message: "Please Select Coustomer",
                        },
                    ]}
                >
                    <CustomerModal
                        customerSelect={handleCustomerChange}
                        customerId={current.getFieldValue("customer")}
                    />
                </Form.Item>
            </Col>

            <Col span={10}>
                <Form.Item
                    label={"Invoice#"}
                    name={"invoiceNo"}
                    labelAlign="left"
                    labelCol={{ span: 8 }}
                    rules={[
                        {
                            required: "true",
                            message: "Please Fill InvoiceNo",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Col>

            <Row>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                        label={"Invoice Date"}
                        name={"invoiceDate"}
                        rules={[
                            {
                                required: true,
                                message: "Please Select Invocie Date",
                            },
                        ]}
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                    >
                        <DatePicker
                            placeholder="Invoice Date"
                            format={"DD/MM/YY"}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                        label={"Due Date"}
                        name={"invoiceExpiredDate"}
                        rules={[
                            {
                                required: true,
                                message: "Please Select Quote Expiry Date",
                            },
                        ]}
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                    >
                        <DatePicker
                            placeholder="Expiry Date"
                            format={"DD/MM/YY"}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Divider dashed />
            <Row justify={"center"} >
                <h4>ITEM TABLE</h4>
            </Row>
            <Row style={{ position: "relative" }}>
                <Col className="gutter-row" span={4}>
                    <p>{"Description"}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"HSN Code"}</p>
                </Col>
                <Col className="gutter-row" span={2}>
                    <p>{"Rate"}</p>
                </Col>
                <Col className="gutter-row" span={2}>
                    <p>{"Qty"}</p>
                </Col>

                <Col className="gutter-row" span={2}>
                    <p>{"Taxable Amount"}</p>
                </Col>
                <Col className="gutter-row" span={2}>
                    <p>{"SGST%"}</p>{" "}
                </Col>
                <Col className="gutter-row" span={2}>
                    <p>{"CGST%"}</p>{" "}
                </Col>
                <Col className="gutter-row" span={2}>
                    <p>{"IGST%"}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"Final Amount"}</p>
                </Col>
            </Row>
            <Form.List
                name={"items"}
                initialValue={[
                    {
                        bestOffer: 0,
                        finalAmount: 0,
                        qty: 1,
                        rate: 0,
                        sgstPercent: 0,
                        cgstPercent: 0,
                        igstPercent: 0,
                        taxableAmount: 0,
                        finalAmount: 0,
                    },
                ]}
            >
                {(subFields, subOpt) => (
                    <div>
                        {subFields.map((subField) => (
                            <Row
                                gutter={[12, 12]}
                                key={subField.key}
                                align={"middle"}
                            >
                                <Col className="gutter-row" span={4}>
                                    <Form.Item
                                        name={[subField.name, "description"]}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please Select the description",
                                            },
                                        ]}
                                    >
                                        <ProductModal
                                            productSelect={(label) =>
                                                onDescriptionChange(
                                                    label,
                                                    subField
                                                )
                                            }
                                            productValue={
                                                items ? items[subField.key] : ""
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "hsnCode"]}
                                    >
                                        <Input style={{ width: 60 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={2.5}>
                                    <Form.Item name={[subField.name, "rate"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(value) =>
                                                onRateChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item name={[subField.name, "qty"]}>
                                        <InputNumber
                                            style={{ width: 60 }}
                                            onChange={(value) =>
                                                onQtyChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "taxableAmount"]}
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            min={0}
                                            controls={false}
                                            style={{ width: 60 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "sgstPercent"]}
                                    >
                                        <InputNumber
                                            style={{ width: 40 }}
                                            onChange={(value) =>
                                                onSgstChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "cgstPercent"]}
                                    >
                                        <InputNumber
                                            className="moneyInput"
                                            min={0}
                                            style={{ width: 40 }}
                                            onChange={(value) =>
                                                onCgstChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "igstPercent"]}
                                    >
                                        <InputNumber
                                            className="moneyInput"
                                            min={0}
                                            style={{ width: 40}}
                                            onChange={(value) =>
                                                onIgstChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "finalAmount"]}
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            min={0}
                                            controls={false}
                                            style={{ width: 60 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item>
                                        <DeleteOutlined
                                            onClick={() => {
                                                subOpt.remove(subField.name);
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        ))}

                        <Button
                            type="primary"
                            onClick={() => {
                                subOpt.add({
                                    description: "",
                                    qty: 1,
                                    rate: 0,
                                    taxableAmount: 0,
                                    sgstPercent: 0,
                                    cgstPercent: 0,
                                    igstPercent: 0,
                                    finalAmount: 0,
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
                        labelAlign="center"
                    >
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            style={{ width: 150 }}
                            controls={false}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item
                        label="Tax Amount"
                        name={"totalTaxAmount"}
                        labelAlign="center"
                    >
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            style={{ width: 150 }}
                            controls={false}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item
                        label="Grand Total"
                        name={"grandTotal"}
                        labelAlign="center"
                    >
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            style={{ width: 150 }}
                            controls={false}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
};

export default Invoice;
