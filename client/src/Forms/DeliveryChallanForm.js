import React from "react";
import {
    Form,
    Input,
    DatePicker,
    Button,
    Row,
    Col,
    Divider,
    InputNumber,
    Select,
} from "antd";
import CustomerModal from "components/CustomerModal";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ProductModal from "components/ProductModal";
import { unitOptions } from "Data/Challan";
import { epochInDDMMYY } from "Helper/EpochConveter";

const DeliveryChallanForm = ({ onFinish, value, disabled }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onFinish(values);
    };
    const handleCustomerChange = (value, label) => {
        form.setFieldsValue({ customer: value });
    };
    const handleValueChange = (changeValue, allValue) => {};
    const onItemChange = (value, label, index, subField) => {
        const items = form.getFieldValue("items");
        const currentObject = items[index]; // Create a copy of the object to avoid mutating the original array

        if (subField === "description") {
            currentObject.description = value.productName;
            currentObject.hsnCode = value.hsnCode;
        } else if (subField === "hsnCode") {
            currentObject.hsnCode = value;
        } else if (subField === "qty") {
            currentObject.qty = Math.ceil(value);
        } else {
        }
        items[index] = currentObject;
        const totalQuantity = items.reduce(
            (total, currentItem) => total + currentItem.qty,
            0
        );
        form.setFieldsValue({ totalQuantity: Math.ceil(totalQuantity) });
        form.setFieldsValue({ items: items });
    };
    
    const {customer,challanNumber,challanDate, items,totalQuantity} = value
    return (
        <Form
            form={form}
            onFinish={handleFinish}
            initialValues={{
                customer:customer ? customer :"",
                challanNumber:challanNumber ? challanNumber :"",
                challanDate:challanDate ? epochInDDMMYY(challanDate):"",
                items:items ? items :[{}],
                totalQuantity: totalQuantity ? totalQuantity:"",
            }}
            onValuesChange={handleValueChange}
        >
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={"Customer"}
                        labelAlign="left"
                        labelCol={{ span: 4 }}
                        name={"customer"}
                        rules={[
                            {
                                required: "true",
                                message: "Please Select Customer",
                            },
                        ]}
                    >
                        <CustomerModal
                            customerSelect={handleCustomerChange}
                            customerId={
                                customer ? customer._id : ""
                            }
                            disabled={disabled}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Form.Item
                        label="Challan No"
                        name="challanNumber"
                        labelAlign="left"
                        rules={[
                            {
                                required: true,
                                message: "Please enter Challan No!",
                            },
                        ]}
                    >
                        <Input disabled= {disabled} style={{ width: 100 }} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Challan Date"
                        name="challanDate"
                        rules={[
                            {
                                required: true,
                                message: "Please select Challan Date!",
                            },
                        ]}
                    >
                         <DatePicker
                         disabled = {disabled}
                            placeholder="Challan Date"
                            format={"DD/MM/YY"}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Divider dashed />
            <Row justify={"center"}>
                <h3>ITEM TABLE</h3>
            </Row>
            <Row gutter={[12, 12]} style={{ position: "relative" }}>
                <Col className="gutter-row" span={5}>
                    <p>{"Description"}</p>
                </Col>
                <Col className="gutter-row" span={5}>
                    <p>{"HSN Code"}</p>
                </Col>

                <Col className="gutter-row" span={5}>
                    <p>{"Qty"}</p>
                </Col>

                <Col className="gutter-row" span={5}>
                    <p>{"Unit"}</p>
                </Col>
            </Row>
            <Form.List name={"items"} initialValue={[
               {
                description:"",
                hsnCode:"",
                qty:"",
                unit:''
               }
            ]}>
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
                                                items
                                                    ?items[index]
                                                    : ""
                                            }
                                            disabled={disabled}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item
                                        name={[subField.name, "hsnCode"]}
                                    >
                                        <Input
                                            disabled={disabled}
                                            style={{ width: 150 }}
                                            onChange={(
                                                value,
                                                subField = "hsnCode"
                                            ) =>
                                                onItemChange(
                                                    value,
                                                    {},
                                                    index,
                                                    subField
                                                )
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item name={[subField.name, "qty"]}>
                                        <InputNumber
                                            style={{ width: 100 }}
                                            disabled={disabled}
                                            onChange={(
                                                value,
                                                subField = "qty"
                                            ) => {
                                                onItemChange(
                                                    value,
                                                    {},
                                                    index,
                                                    subField
                                                );
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item name={[subField.name, "unit"]}>
                                        <Select
                                            disabled={disabled}
                                            options={unitOptions}
                                            style={{ width: 100 }}
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
                            disabled={disabled}
                            type="primary"
                            onClick={() => {
                                subOpt.add({
                                    description: "",
                                    hsnCode: "",
                                    qty: 1,
                                    unit:""
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
            <Row justify={"center"}>
                <Col span={6}>
                    <Form.Item
                        label={"Total Qty"}
                        name={"totalQuantity"}
                        labelAlign={"left"}
                        labelCol={{ span: 12 }}
                    >
                        <Input readOnly />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default DeliveryChallanForm;
