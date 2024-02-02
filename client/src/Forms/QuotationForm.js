import React, { useState, useRef, useEffect } from "react";
import {debounce}  from "lodash"
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
import DropDownCoustom from "components/DropDownCoustom";
import TextArea from "antd/es/input/TextArea";
import { companyDetails } from "../Data/LeadData";
import { quoteAddProductColumn } from "../Data/QuotationData";
import { productOption } from "Data/ProductData";
import { useMediaQuery } from "@mui/material";
import { useAuth } from "state/AuthProvider";
import debounceHandler from "EventHandler/DebounceHandler";
const { Text } = Typography;

const QuotationForm = ({ current }) => {
    const [company, setCompany] = useState([]);
    const [product, setProduct] = useState([]);
    const { getDropDownData } = useAuth();
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const inputWidth = isLaptop ? 700 : 350;
    const inputFontSize = isLaptop ? "1rem" : "0.4rem";

    // state for Item
    const [bestOffer, setBestOffer] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [grossAmount, setGrossAmount] = useState(0);
    const [grandAmount, setGrandAmount] = useState(0);

    const handelCustomerClick = async (value) => {
        let entity = "customer";
        let fieldName = "customerName";
        let data = await getDropDownData(entity, fieldName);
        setCompany(data);
    };
    const handleCustomerChange = (value, label) => {
        current.setFieldsValue({ customer: value });
    };

    const handleDescriptionClick = async () => {
        let entity = "product";
        let fieldName = "productName";
        const dropDownData = await getDropDownData(entity, fieldName);
        setProduct(dropDownData)
    };
    const onDescriptionChange = (value, label, subField) => {
        const formData = current.getFieldValue("items");
        const items = [...formData];
        const rowManipulated = items[subField.key];
        rowManipulated.rate = label.rate;
        const discountAmount = Math.floor(
            (rowManipulated.rate * rowManipulated.percentDiscount) / 100
        );
        rowManipulated.bestOffer = rowManipulated.rate - discountAmount;
        rowManipulated.finalAmount =
            rowManipulated.bestOffer * rowManipulated.qty;
        items[subField.key] = rowManipulated;
        setBestOffer(rowManipulated.bestOffer);
        setFinalAmount(rowManipulated.finalAmount);

        current.setFieldsValue({ items: items });

        // now updataing grossTotal ,grandTotal
        let { grossTotal, grandTotal, taxPercent, transPortAmount } =
            current.getFieldsValue([
                "grossTotal",
                "grandTotal",
                "taxPercent",
                "transPortAmount",
            ]);
        const grossSum = items.reduce(
            (accumulator, currentValue) =>
                accumulator + currentValue.finalAmount,
            0
        );

        setGrossAmount(grossSum);
        const taxAmount = Math.floor((grossSum * taxPercent) / 100);
        const grandSum = grossSum + taxAmount + transPortAmount;
        setGrandAmount(grandSum);
        console.log(grandSum, taxAmount, transPortAmount);
        current.setFieldsValue({ grossTotal: grossSum });
        current.setFieldsValue({ grandTotal: grandSum });
    };

    const onRateChange = async (value, subField) => {
        const formData = current.getFieldValue("items");
        const items = [...formData];
        const rowManipulated = items[subField.key];
        const discountAmount = Math.floor(
            (value * rowManipulated.percentDiscount) / 100
        );
        rowManipulated.bestOffer = value - discountAmount;
        rowManipulated.finalAmount =
            rowManipulated.bestOffer * rowManipulated.qty;
        items[subField.key] = rowManipulated;
        setBestOffer(rowManipulated.bestOffer);
        setFinalAmount(rowManipulated.finalAmount);
        current.setFieldsValue({ items: items });
        // now updataing grossTotal ,grandTotal
        let { grossTotal, grandTotal, taxPercent, transPortAmount } =
            current.getFieldsValue([
                "grossTotal",
                "grandTotal",
                "taxPercent",
                "transPortAmount",
            ]);
        const grossSum = items.reduce(
            (accumulator, currentValue) =>
                accumulator + currentValue.finalAmount,
            0
        );

        setGrossAmount(grossSum);
        const taxAmount = Math.floor((grossSum * taxPercent) / 100);
        const grandSum = grossSum + taxAmount + transPortAmount;
        setGrandAmount(grandSum);
        console.log(grandSum, taxAmount, transPortAmount);
        current.setFieldsValue({ grossTotal: grossSum });
        current.setFieldsValue({ grandTotal: grandSum });
    };

    const onDiscountChange = (value, subField) => {
        const formData = current.getFieldValue("items");
        const items = [...formData];
        const rowManipulated = items[subField.key];
        rowManipulated.percentDiscount = value;
        const discountAmount = Math.floor(
            (rowManipulated.rate * rowManipulated.percentDiscount) / 100
        );
        rowManipulated.bestOffer = rowManipulated.rate - discountAmount;
        setBestOffer(rowManipulated.bestOffer);
        rowManipulated.finalAmount =
            rowManipulated.bestOffer * rowManipulated.qty;
        setFinalAmount(rowManipulated.finalAmount);
        current.setFieldsValue({ items: items });

        let { grossTotal, grandTotal, taxPercent, transPortAmount } =
            current.getFieldsValue([
                "grossTotal",
                "grandTotal",
                "taxPercent",
                "transPortAmount",
            ]);
        const grossSum = items.reduce(
            (accumulator, currentValue) =>
                accumulator + currentValue.finalAmount,
            0
        );

        setGrossAmount(grossSum);
        const taxAmount = Math.floor((grossSum * taxPercent) / 100);
        const grandSum = grossSum + taxAmount + transPortAmount;
        setGrandAmount(grandSum);
        console.log(grandSum, taxAmount, transPortAmount);
        current.setFieldsValue({ grossTotal: grossSum });
        current.setFieldsValue({ grandTotal: grandSum });
    };

    const onQtyChange = async (value, subField) => {
        const formData = current.getFieldValue("items");
        const items = [...formData];
        const rowManipulated = items[subField.key];
        rowManipulated.qty = value;
        rowManipulated.finalAmount =
            rowManipulated.bestOffer * rowManipulated.qty;
        setFinalAmount(rowManipulated.finalAmount);
        current.setFieldsValue({ items: items });

        let { grossTotal, grandTotal, taxPercent, transPortAmount } =
            current.getFieldsValue([
                "grossTotal",
                "grandTotal",
                "taxPercent",
                "transPortAmount",
            ]);
        const grossSum = items.reduce(
            (accumulator, currentValue) =>
                accumulator + currentValue.finalAmount,
            0
        );

        setGrossAmount(grossSum);
        const taxAmount = Math.floor((grossSum * taxPercent) / 100);
        const grandSum = grossSum + taxAmount + transPortAmount;
        setGrandAmount(grandSum);
        console.log(grandSum, taxAmount, transPortAmount);
        current.setFieldsValue({ grossTotal: grossSum });
        current.setFieldsValue({ grandTotal: grandSum });
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
        setGrandAmount(grandSum);
        current.setFieldsValue({ grandTotal: grandSum });
    };

    const onTransportAmountChange = (value) => {
        let { grossTotal, grandTotal, taxPercent, transPortAmount } =
            current.getFieldsValue([
                "grossTotal",
                "grandTotal",
                "taxPercent",
                "transPortAmount",
            ]);
        const taxAmount = Math.floor((grossTotal * taxPercent) / 100);
        const grandSum = grossTotal + taxAmount + value;
        setGrandAmount(grandSum);
        current.setFieldsValue({ grandTotal: grandSum });
    };
    useEffect(()=>{
        handleDescriptionClick()
        handelCustomerClick()
    },[])
    return (
        <div>
            <Form.Item
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
            >
                <Select
                    options={company}
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => {
                        return (
                            <div>
                                {menu}
                                <Divider />
                                <Button
                                    type="primary"
                                    style={{
                                        margin: "0.1rem",
                                    }}
                                >
                                    Add New
                                </Button>
                            </div>
                        );
                    }}
                    onChange={handleCustomerChange}
                />
            </Form.Item>
            <Form.Item
                label={"Quote#"}
                name={"quoteNo"}
                labelAlign="left"
                labelCol={{ span: 6 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Row>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                        label={"Quote Date"}
                        name={"quoteDate"}
                        rules={[
                            {
                                required: true,
                                message: "Please Select Quote Date",
                            },
                        ]}
                        labelAlign="left"
                        labelCol={{ span: 12 }}
                    >
                        <DatePicker
                            placeholder="Quote Date"
                            format={"DD/MM/YY"}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                        label={"Expiry Date"}
                        name={"quoteExpiryDate"}
                        rules={[
                            {
                                required: true,
                                message: "Please Select Quote Expiry Date",
                            },
                        ]}
                        labelAlign="left"
                        labelCol={{ span: 6 }}
                    >
                        <DatePicker
                            placeholder="Expiry Date"
                            format={"DD/MM/YY"}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label="Atten Per"
                name={"attenPerson"}
                labelAlign="left"
                labelCol={{ span: 6 }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Sub"
                name={"subject"}
                labelAlign="left"
                labelCol={{ span: 6 }}
            >
                <Input size="large" maxLength={100} />
            </Form.Item>
            <Form.Item
                label="Message"
                name={"message"}
                labelAlign="left"
                labelCol={{ span: 6 }}
            >
                <Input.TextArea style={{ width: "100%" }} />
            </Form.Item>
            <Divider dashed />
            <Row gutter={[12, 12]} style={{ position: "relative" }}>
                <Col className="gutter-row" span={7}>
                    <p>{"Description"}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"Rate"}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"Discount %"}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"Best Offer"}</p>{" "}
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"Qty"}</p>
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
                        percentDiscount: 0,
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
                                <Col className="gutter-row" span={7}>
                                    <Form.Item
                                        name={[subField.name, "description"]}
                                    >
                                        <Select
                                            style={{
                                                width: 250,
                                            }}
                                            options={product}
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? "")
                                                    .toLowerCase()
                                                    .includes(
                                                        input.toLowerCase()
                                                    )
                                            }
                    
                                            dropdownRender={(menu) => {
                                                return (
                                                    <div>
                                                        {menu}
                                                        <Divider />
                                                        <Button
                                                            type="primary"
                                                            style={{
                                                                margin: "0.1rem",
                                                            }}
                                                        >
                                                            Add New
                                                        </Button>
                                                    </div>
                                                );
                                            }}
                                            onChange={(value, option) => {
                                                onDescriptionChange(
                                                    value,
                                                    option,
                                                    subField
                                                );
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={[subField.name, "rate"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(value) =>
                                                onRateChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item
                                        name={[
                                            subField.name,
                                            "percentDiscount",
                                        ]}
                                    >
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(value) =>
                                                onDiscountChange(
                                                    value,
                                                    subField
                                                )
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item
                                        name={[subField.name, "bestOffer"]}
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            value={bestOffer}
                                            min={0}
                                            controls={false}
                                            style={{ width: 75 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={[subField.name, "qty"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(value) =>
                                                onQtyChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item
                                        name={[subField.name, "finalAmount"]}
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            value={finalAmount}
                                            min={0}
                                            controls={false}
                                            style={{ width: 75 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Form.Item>
                                    <DeleteOutlined
                                        onClick={() => {
                                            subOpt.remove(subField.name);
                                        }}
                                    />
                                </Form.Item>
                            </Row>
                        ))}

                        <Button
                            type="primary"
                            onClick={() => {
                                subOpt.add({
                                    bestOffer: 0,
                                    finalAmount: 0,
                                    qty: 1,
                                    rate: 0,
                                    percentDiscount: 0,
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
                            value={grossAmount}
                            style={{ width: 150 }}
                            controls={false}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item
                        label="Tax(%)"
                        name={"taxPercent"}
                        labelAlign="center"
                    >
                        <InputNumber
                            style={{ width: 150 }}
                            onChange={onTaxPercentChange}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item
                        label="Transport(Amount)"
                        name={"transPortAmount"}
                        labelAlign="center"
                    >
                        <InputNumber
                            style={{ width: 150 }}
                            onChange={onTransportAmountChange}
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
                            style={{ width: 150 }}
                            value={grandAmount}
                            controls={false}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"} style={{ padding: "1rem" }}>
                Term & Conditions
            </Row>
            <Row justify={"start"}>
                <Col span={10}>
                    <Form.Item label="Delivery" name={"deliveryCondition"}>
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
                    <Form.Item label="Validity" name={"validityCondition"}>
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
                    <Form.Item label="Payments" name={"paymentsCondition"}>
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
                        label="Cancellation"
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
            <Row justify={"start"}>
                <Col span={10}>
                    <Form.Item
                        label="Installation"
                        name={"installationCondition"}
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
                    <Form.Item label="Faciltity" name={"facilityCondition"}>
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
            <Col className="gutter-row">
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<PlusOutlined />}
                        block
                    >
                        Save
                    </Button>
                </Form.Item>
            </Col>
        </div>
    );
};

export default QuotationForm;
