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
    message,
} from "antd";
import { useParams } from "react-router-dom";
import PaymentHistoryList from "pages/Payments/PaymentHistory";
import { epochConveter } from "Helper/EpochConveter";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import { paymentMode } from "Data/PaymentData";
import SaveBottmComponent from "components/SaveBottomComponent";
import FormItemCol from "components/SmallComponent/FormItemCol";
const { Text } = Typography;

const { Option } = Select;
const entity = "payments";

const PaymentForm = ({ initialValue = {} }) => {
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
            const payload = { entity: "invoice", value: upDateObj, _id: _id };
            const { success, result, message } = await patchData(payload);
            if (!success) {
                return NotificationHandler.error(message);
            } else {
                navigate("/payments");
            }
        }
    };

    return (
        <div style={{ height: "100vh" }}>
            <Row>
                <Col span={24}>
                    <FormItemCol
                        label="Select Customer"
                        name="customer"
                        required={true}
                        rules={[
                            {
                                required: true,
                                message: "Plese Select Customer",
                            },
                        ]}
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        type={"model"}
                    />
                </Col>
                <Col span={24}>
                    <FormItemCol
                        label="Payment Date"
                        name="paymentDate"
                        required={true}
                        rules={[
                            {
                                required: true,
                                message: "Please Select Date",
                            },
                        ]}
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        type={"date"}
                    />
                </Col>
                <Col span={24}>
                    <FormItemCol
                        label="Payment Mode"
                        name="paymentMode"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        type={"select"}
                        entity="Payment Mode"
                    />
                </Col>
                <Col span={24}>
                    <FormItemCol
                        label="Reference"
                        name="refer"
                        tooltip={"Check No or UPI Transaction No"}
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        type={"input"}
                    />
                </Col>
                <Col span={24}>
                    <FormItemCol
                        label="Amount(Rs)"
                        name="amount"
                        labelAlign="left"
                        required={true}
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Amount need to specified",
                            },
                        ]}
                    />
                </Col>

                <Col span={24}>
                    <FormItemCol
                        label={"NOTE"}
                        name={"note"}
                        labelAlign="left"
                        tooltip={"Remark or Comment"}
                        labelCol={{ span: 8 }}
                        type={"input"}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default PaymentForm;
