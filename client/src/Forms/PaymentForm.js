import React, { useState } from "react";
import { Formik, Field } from "formik";
import {
    Form,
    Row,
    Col,
    Input,
    DatePicker,
    Select,
    Button,
    Typography,
} from "antd";
import { useParams } from "react-router-dom";
import PaymentHistoryList from "pages/Payments/PaymentHistory";
import { epochConveter } from "Helper/EpochConveter";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import { paymentMode } from "Data/PaymentData";
import SaveBottmComponent from "components/SaveBottomComponent";
const { Text } = Typography;

const { Option } = Select;
const entity = "payments";

const PaymentForm = ({ initialValue }) => {
    const [form] = Form.useForm();
    const { _id, customer, payment } = initialValue;
    const { createData, patchData } = useAuth();
    const navigate = useNavigate();
    const [value, setValue] = useState({
        paymentDate: null,
        refer: "",
        amount: "",
        customerName: customer ? customer.customerName : "",
        paymentMode: "",
        payment: payment,
    });

    const onFinish = async (value) => {
        value.paymentDate = epochConveter(value.paymentDate.$d);
        value.invoice = _id;
        const payload = { entity: entity, value };
        // First Create Paymnet Object
        const { success, result, message } = await createData(payload);
        const paymentId = success ? result._id : "";
        if (!success) {
            NotificationHandler.error(message);
        } else {
            const upDateObj = {
                payment: { $each: [paymentId] },
            };
            const payload = { entity: "invoice", value: upDateObj ,_id:_id};
            const { success, result, message } = await patchData(payload);
            if (!success) {
                return NotificationHandler.error(message);
            } else {
                navigate("/payments");
            }
        }
    };

    return (
        <>
            <Form
                name={"paymentForm"}
                initialValues={value}
                form={form}
                onFinish={onFinish}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Customer Name"
                            name="customerName"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            labelAlign="left"
                            labelCol={{ span: 4 }}
                        >
                            <Input disabled style={{ width: "50%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Payment Date"
                            name="paymentDate"
                            labelAlign="left"
                            labelCol={{ span: 4 }}
                        >
                            <DatePicker style={{ width: "50%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={24} labelAlign="left" labelCol={{ span: 4 }}>
                        <Form.Item
                            label="Payment Mode"
                            name="paymentMode"
                            labelAlign="left"
                            labelCol={{ span: 4 }}
                        >
                            <Select
                                style={{ width: "50%" }}
                                placeholder="Select payment mode"
                                options={paymentMode}
                            >
                                
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24} labelAlign="left" labelCol={{ span: 4 }}>
                        <Form.Item
                            label="Reference(Check No etc)"
                            name="refer"
                            labelAlign="left"
                            labelCol={{ span: 4 }}
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={24} labelAlign="left" labelCol={{ span: 4 }}>
                        <Form.Item
                            label="Amount(Rs)"
                            name="amount"
                            labelAlign="left"
                            labelCol={{ span: 4 }}
                            rules={[
                                {
                                    required:true,
                                    message:"Amount need to specified"
                                }
                            ]}
                        >
                            <Input type="number" style={{ width: "50%" }} />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label={"NOTE"}
                            name={"note"}
                            labelAlign="left"
                            labelCol={{ span: 4 }}
                        >
                            <Input style={{ width: "50%" }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
            <SaveBottmComponent buttonText={"UPDATE PAYMENT"} cancelRoute={"payments"} />

                </Form.Item>
            </Form>
            <PaymentHistoryList data = {initialValue.payment} />
        </>
    );
};

export default PaymentForm;
