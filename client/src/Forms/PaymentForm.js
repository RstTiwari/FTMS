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

const PaymentForm = ({form, initialValue = {} }) => {
 
    const handleItemUpdate = (value,fieldName)=>{
        if(fieldName ==="customer"){
            form.setFieldsValue({customer:value})
        }else if(fieldName ==="paymentMode"){
            form.setFieldsValue({paymentMode:value})
        }else{

        }
    }


    return (
        <div style={{ height: "100vh" }}>
            <Row>
                <Col span={24}>
                    <FormItemCol
                        label="Select Customer"
                        name="customer"
                        required={true}
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Plese Select Customer",
                            },
                        ]}
                        labelAlign="left"
                        entity={"customers"}
                        fieldName={"customerName"}
                        updateInForm ={(value)=>{
                               handleItemUpdate(value,"customer")
                        }}
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
                        entityName={"paymentMode"}
                        updateInForm ={(value)=>{
                            handleItemUpdate(value,'paymentMode')
                        }}
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
                        type={"number"}
                        width={250}
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
