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

const DeliveryChallanForm = ({ onFinish, value }) => {
    const [form] = Form.useForm();
    const items = form.getFieldValue("items");

    console.log(value);
    const handleFinish = (values) => {
        onFinish(values);
    };
    const handleCustomerChange = (value, label) => {
        console.log(value, label);
    };
    const handleValueChange = () => {};
    const onItemChange = () => {};

    return (
        <Form
            form={form}
            onFinish={handleFinish}
            initialValues={value}
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
                        <CustomerModal customerSelect={handleCustomerChange} />
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
                        <Input />
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
                        <DatePicker style={{ width: "100%" }} />
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
            <Form.List
                name={"items"}
                initialValue={[
                    {
                        bestOffer: 0,
                        qty: 1,
                        rate: 0,
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
                                            productSelect={(label) =>
                                                onItemChange(label, subField)
                                            }
                                            productValue={
                                                items ? items[subField.key] : ""
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item
                                        name={[subField.name, "hsnCode"]}
                                    >
                                        <Input style={{ width: 150 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item name={[subField.name, "qty"]}>
                                        <InputNumber
                                            style={{ width: 100 }}
                                            onChange={(value) =>
                                                onItemChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item name={[subField.name, "unit"]}>
                                        <Select
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
                            type="primary"
                            onClick={() => {
                                subOpt.add({
                                    description: "",
                                    qty: 1,
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
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DeliveryChallanForm;
