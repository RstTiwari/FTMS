import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    InputNumber,
    Button,
    Space,
    Select,
    Divider,
    Row,
    Col,
    DatePicker,
} from "antd";
import {
    MinusCircleOutlined,
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useMediaQuery } from "@mui/material";
import { epochConveter } from "Helper/EpochConveter";
import CustomerModal from "components/CustomerModal";
import ProductModal from "components/ProductModal";

const UpdateInvoiceForm = ({ initialValues, id }) => {
    const [form] = Form.useForm();
    const { getDropDownData, createData, updateData } = useAuth();
    const [product, setProduct] = useState([]);
    const [company, setCompany] = useState([]);
    const [toUpdate, setToUpdate] = useState(false);
    const isLaptop = useMediaQuery("(min-width:1000px)");

    const onFinish = async (value) => {
        if (!toUpdate) return NotificationHandler.error("Nothing to Update");
        value.invoiceDate = epochConveter(value.invoiceDate.$d);
        value.invoiceExpiredDate = epochConveter(value.invoiceExpiredDate.$d);
        value._id = id;
        let payload = { entity: "invoice", value };
        const { success, result, message } = await updateData(payload);
        if (success) {
            return NotificationHandler.success(message);
        } else {
            return NotificationHandler.error(message);
        }
    };
    const handleValueChange = () => {
        setToUpdate(true);
    };
    const handleDescriptionClick = async () => {
        let entity = "product";
        let fieldName = "productName";
        const dropDownData = await getDropDownData(entity, fieldName);
        setProduct(dropDownData);
    };

    const handelCustomerClick = async (value) => {
        let entity = "customer";
        let fieldName = "customerName";
        let data = await getDropDownData(entity, fieldName);
        setCompany(data);
    };
    const handleCustomerChange = (value, label) => {
        form.setFieldsValue({ customer: value });
    };

    const onItemChange = (value, label = {}, index, subField) => {
        let { items } = form.getFieldsValue(["items"]);
        let data = [...items];
        const rowManipulated = data[index];
        if (subField === "description") {
            rowManipulated.description = value.productName;
            rowManipulated.rate = Math.ceil(value.rate);
            rowManipulated.hsnCode = value.hsnCode;
        } else if (subField === "qty") {
            rowManipulated.qty = value;
        } else if (subField === "rate") {
            rowManipulated.rate = Math.ceil(value);
        } else if (subField === "sgstPercent") {
            rowManipulated.sgstPercent = value;
        } else if (subField === "cgstPercent") {
            rowManipulated.cgstPercent = value;
        } else if (subField === "igstPercent") {
            rowManipulated.igstPercent = value;
        } else {
            NotificationHandler.error("somthing went wrong");
        }

        rowManipulated.taxableAmount = Math.ceil(
            rowManipulated.rate * rowManipulated.qty
        );
        rowManipulated.finalAmount = getFinalAmount(
            rowManipulated.sgstPercent,
            rowManipulated.cgstPercent,
            rowManipulated.igstPercent,
            rowManipulated.taxableAmount
        );

        data[index] = rowManipulated;
        form.setFieldsValue({ items: data });

        let amountBeforeTax = items.reduce((a, b) => a + b.taxableAmount, 0);
        let amountAfterTax = items.reduce((a, b) => a + b.finalAmount, 0);
        const totalTaxAmount = amountAfterTax - amountBeforeTax;
        form.setFieldsValue({ grossTotal: Math.ceil(amountBeforeTax) });
        form.setFieldsValue({ grandTotal: Math.ceil(amountAfterTax) });
        form.setFieldsValue({ totalTaxAmount: Math.ceil(totalTaxAmount) });
    };

    /**Function for Calculating the Final Amount */
    const getFinalAmount = (sgst, cgst, igst, taxableAmount) => {
        let sgstAmount = Math.floor((sgst * taxableAmount) / 100);
        let cgstAmount = Math.floor((cgst * taxableAmount) / 100);
        let igstAmount = Math.floor((igst * taxableAmount) / 100);
        return Math.ceil(taxableAmount + sgstAmount + igstAmount + cgstAmount);
    };
    useEffect(() => {
        handleDescriptionClick();
        handelCustomerClick();
    }, []);

    return (
        <Form
            name="update_invoice"
            initialValues={initialValues}
            onFinish={onFinish}
            onValuesChange={handleValueChange}
            form={form}
        >
            <Col span={10}>
                <Form.Item
                    label={"Select Coustomer"}
                    name={`customer`}
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
                        customerId={initialValues.customer}
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
                    <Input disabled />
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
            <Row>
                <h3>Item Table</h3>
            </Row>
            <Divider dashed />
            <Row gutter={[12, 12]} style={{ position: "relative" }}>
                <Col className="gutter-row" span={5}>
                    <p>{"Description"}</p>
                </Col>
                <Col className="gutter-row" span={2}>
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
            <Form.List name={"items"}>
                {(subFields, subOpt) => (
                    <div>
                        {subFields.map((subField, index) => (
                            <Row
                                gutter={[12, 12]}
                                key={subField.key}
                                align={"middle"}
                            >
                                <Col className="gutter-row" span={5}>
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
                                            productSelect={(
                                                label,
                                                value = {},
                                                subField = "description"
                                            ) =>
                                                onItemChange(
                                                    label,
                                                    value,
                                                    index,
                                                    subField
                                                )
                                            }
                                            productValue={
                                                form.getFieldValue("items")[
                                                    subField.key
                                                ]
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "hsnCode"]}
                                    >
                                        <Input style={{ width: 75 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item name={[subField.name, "rate"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(
                                                value,
                                                label = {},
                                                subField = "rate"
                                            ) =>
                                                onItemChange(
                                                    value,
                                                    label,
                                                    index,
                                                    subField
                                                )
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item name={[subField.name, "qty"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(
                                                value,
                                                label = {},
                                                subField = "qty"
                                            ) =>
                                                onItemChange(
                                                    value,
                                                    label,
                                                    index,
                                                    subField
                                                )
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
                                            style={{ width: 75 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "sgstPercent"]}
                                    >
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(
                                                value,
                                                label,
                                                subField = "sgstPercent"
                                            ) =>
                                                onItemChange(
                                                    value,
                                                    label,
                                                    index,
                                                    subField
                                                )
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
                                            style={{ width: 75 }}
                                            onChange={(
                                                value,
                                                label = {},
                                                subField = "cgstPercent"
                                            ) =>
                                                onItemChange(
                                                    value,
                                                    label,
                                                    index,
                                                    subField
                                                )
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
                                            style={{ width: 75 }}
                                            onChange={(
                                                value,
                                                label = {},
                                                subField = "igstPercent"
                                            ) =>
                                                onItemChange(
                                                    value,
                                                    label,
                                                    index,
                                                    subField
                                                )
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
                                            style={{ width: 75 }}
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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update Invoice
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateInvoiceForm;
