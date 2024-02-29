import React from "react";
import {
    Form,
    Row,
    Col,
    DatePicker,
    Select,
    Input,
    Button,
    Upload,
} from "antd";
import { categoryOption } from "../Data/ExpensesData";
import CustomerModal from "components/CustomerModal";
import UploadImage from "components/UploadImage";

const ExpenseForm = () => {
    const [form] = Form.useForm();
    const handleFinish = (value) => {
        console.log(value);
    };
    const handleValueChange = () => {};
    const handleCustomerSelect = (value) => {
        form.setFieldValue({ customer: value });
    };
    return (
        <Form
            name="expnseForm"
            form={form}
            onFinish={handleFinish}
            onValuesChange={handleValueChange}
        >
            <Col span={8}>
                <Form.Item
                    label={"Expense Date"}
                    name={"expenseDate"}
                    labelAlign="left"
                    labelCol={{ span: 12 }}
                    rules={[
                        { required: true, message: "Expense Date is Required" },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
            </Col>
                <Col span={8}>
                    <Form.Item
                        label={"Category  Name"}
                        name={"expenseDate"}
                        labelAlign="left"
                        labelCol={{ span: 12 }}
                        rules={[
                            {
                                required: true,
                                message: "Expense Date is Required",
                            },
                        ]}
                    >
                        <Select options={categoryOption} />
                    </Form.Item>
                    </Col>
            <Col span={8}>
                <Form.Item
                    label={"Amount"}
                    name={"amount"}
                    labelAlign="left"
                    labelCol={{ span: 12 }}
                    rules={[{ required: true, message: "Amount is Required" }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={"Invoice #"}
                        name={"invoice"}
                        labelAlign="left"
                        labelCol={{ span: 12 }}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Col span={8}>
                <Form.Item
                    label={"Note"}
                    name={"note"}
                    labelAlign="left"
                    labelCol={{ span: 12 }}
                >
                    <Input.TextArea placeholder="Max. 500 characters" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={"Customer"}
                    name={"customer"}
                    labelAlign="left"
                    labelCol={{ span: 12 }}
                >
                    <CustomerModal customerSelect={handleCustomerSelect} />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    label={""}
                    name={"customer"}
                    labelAlign="left"
                    labelCol={{ span: 12 }}
                >
            <UploadImage />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item labelAlign="left" labelCol={{ span: 12 }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Col>
        </Form>
    );
};

export default ExpenseForm;
