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
    DatePicker
} from "antd";
import {
    MinusCircleOutlined,
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useMediaQuery } from "@mui/material";
import { epochConveter } from "Helper/EpochConveter"


const UpdateQuotationForm = ({ initialValues ,id}) => {
    const [form] = Form.useForm();
    const { getDropDownData,createData,updateData } = useAuth();
    const [product, setProduct] = useState([]);
    const [company, setCompany] = useState([]);
    const [toUpdate,setToUpdate] = useState(false)
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const inputWidth = isLaptop ? 700 : 350;
    const inputFontSize = isLaptop ? "1rem" : "0.4rem";

    const onFinish = async(value) => {
        if(!toUpdate) return NotificationHandler.error("Nothing to Update")
        let epochQuoteDate = epochConveter(value.quoteDate.$d);
        let epochExpiryDate = epochConveter(value.quoteDate.$d);
        value._id = id;
        value.quoteDate = epochQuoteDate;
        value.quoteExpiryDate = epochExpiryDate;
        let payload = { entity: "quote", value };
        const { success, result, message } = await updateData(payload);
        if (success) {
            return NotificationHandler.success(message);
        } else {
            return NotificationHandler.error(message);
        }
    };
    const handleValueChange = ()=>{
        setToUpdate(true)
    }
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

    const onItemChange = (value, label ={}, index,subField) => {
        let { items, grossTotal, grandTotal, taxPercent, transPortAmount } =
            form.getFieldsValue([
                "items",
                "grossTotal",
                "grandTotal",
                "taxPercent",
                "transPortAmount",
            ]);
        let data = [...items];
        const rowManipulated = data[index];
        if (subField === "description") {
            rowManipulated.description = label.label;
            rowManipulated.rate = Math.ceil(label.rate);
        } else if (subField === "qty") {
            rowManipulated.qty = value;
        } else if (subField === "rate") {
            rowManipulated.rate = Math.ceil(value);
        } else if (subField === "percentDiscount") {
            rowManipulated.percentDiscount = value;
        } else if (subField === "taxPercent") {
            taxPercent = value;
        } else if (subField === "transPortAmount") {
            transPortAmount = value;
        } else {
            NotificationHandler.error("somthing went wrong");
        }

  
        rowManipulated.finalAmount = Math.ceil(
            rowManipulated.rate * rowManipulated.qty
        );

        data[index] = rowManipulated; // Update the form with the new final amount value
        form.setFieldsValue({ items: data });
      
        const grossSum = items.reduce(
            (accumulator, currentValue) =>
                accumulator + currentValue.finalAmount,
            0
        );
        if (subField === "taxPercent") {
        }
        if (subField === "transPortAmount") {
        }
        const taxAmount = Math.floor((grossSum * taxPercent) / 100);
        const grandSum = grossSum + taxAmount + transPortAmount;
        form.setFieldsValue({ grossTotal: Math.ceil(grossSum) });
        form.setFieldsValue({ grandTotal: Math.ceil(grandSum) });
    };
  
    useEffect(() => {
        handleDescriptionClick();
        handelCustomerClick();
    }, []);

    return (
        <Form
            name="update_quotation"
            initialValues={initialValues}
            onFinish={onFinish}
            onValuesChange={handleValueChange}
            form={form}
        >
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

            <Divider dashed />
            <Row gutter={[12, 12]} style={{ position: "relative" }}>
                <Col className="gutter-row" span={7}>
                    <p>{"Description"}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"Rate"}</p>
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
                                            onChange={(
                                                value,
                                                option,
                                                subField = "description"
                                            ) => {
                                                onItemChange(
                                                    value,
                                                    option,
                                                    index,
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
        
                                <Col span={3}>
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
                                <Col span={3}>
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
                                <Form.Item>
                                    <DeleteOutlined
                                        disabled
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
                    <Form.Item label="Gross Total" name={"grossTotal"}>
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
                        label="Tax(%)"
                        name={"taxPercent"}
                        labelCol={{ span: 5 }}
                        labelAlign="left"
                    >
                        <InputNumber
                            style={{ width: 150 }}
                            onChange={(
                                value,
                                label = {},
                                index =0,
                                subField = "taxPercent"
                            ) => {
                                onItemChange(value, label, index, subField);
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item
                        label="Transport(Rs)"
                        name={"transPortAmount"}
                        labelCol={{ span: 8 }}
                        labelAlign="left"
                    >
                        <InputNumber
                            style={{ width: 150 }}
                            onChange={(
                                value,
                                label = {},
                                index = 0,
                                subField = "transPortAmount"
                            ) => {
                                onItemChange(value, label, index , subField);
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"middle"} justify={"end"}>
                <Col span={8}>
                    <Form.Item label="Grand Total" name={"grandTotal"}>
                        <InputNumber
                            readOnly
                            style={{ width: 150 }}
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
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update Quotation
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateQuotationForm;
