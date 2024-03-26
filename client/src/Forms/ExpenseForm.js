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
import SaveBottmComponent from "components/SaveBottomComponent";

const ExpenseForm = ({handleFormFinish}) => {
    const [form] = Form.useForm();
    
    const handleValueChange = () => {

    };
    const handleSubmit =(value)=>{
        handleFormFinish(value)
    }
    const handleCustomerSelect = (value) => {
        form.setFieldValue({ customer: value });
    };
    return (
        <Form
            name="expnseForm"
            form={form}
            onFinish={handleSubmit}
            layout="horizontal"
        >
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Form.Item
                    label={"Category  Name"}
                    name={"categoryName"}
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
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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

            {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Form.Item
                    label={"Invoice #"}
                    name={"invoice"}
                    labelAlign="left"
                    labelCol={{ span: 12 }}
                >
                    <Input />
                </Form.Item>
            </Col> */}
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Form.Item
                    label={"Note"}
                    name={"note"}
                    labelAlign="left"
                    labelCol={{ span: 12 }}
                >
                    <Input.TextArea placeholder="Max. 500 characters" />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Form.Item
                    label={"Customer"}
                    name={"customer"}
                    labelAlign="left"
                    labelCol={{ span: 12 }}
                >
                    <CustomerModal customerSelect={handleCustomerSelect} />
                </Form.Item>
            </Col>
            <Form.Item>
            <SaveBottmComponent  buttonText={"SAVE EXPESNES "}  cancelRoute={"expenses"}/>

            </Form.Item>
        </Form>
    );
};

export default ExpenseForm;
