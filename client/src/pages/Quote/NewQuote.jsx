import React, { useState } from "react";
import { Flex, Form, Select } from "antd";
import Header from "components/Header";
import QuotationForm from "../../Forms/QuotationForm.js";
import { epochConveter } from "Helper/EpochConveter.js";
import {
    cancellationCondition,
    deliveryCondition,
    facilityCondition,
    installationCondition,
    paymentsCondition,
    quoteMessage,
    validityCondition,
} from "Data/QuotationData.js";
import { useForm } from "antd/es/form/Form.js";
import { useAuth } from "state/AuthProvider.js";
import NotificationHandler from "EventHandler/NotificationHandler.jsx";

const NewQuote = () => {
    const [form] = Form.useForm();
    const [quoteNo, setQuoteNo] = useState("123456");
    const { createData } = useAuth();
    const onQuoteFormFinish = async (value) => {
        let epochQuoteDate = epochConveter(value.quoteDate.$d);
        let epochExpiryDate = epochConveter(value.quoteDate.$d);
        value.quoteDate = epochQuoteDate;
        value.quoteExpiryDate = epochExpiryDate;
        let payload = { entity: "quote", value };
        const { success, result, message } = await createData(payload);
        if (success) {
            return NotificationHandler.success(message);
        } else {
            return NotificationHandler.error(message);
        }
    };

    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                margin: "1.5rem 2rem",
                padding: "2rem",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <Form
                form={form}
                name="qouteForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{
                    remeber: true,
                    quoteNo: quoteNo,
                    message: quoteMessage,
                    taxPercent: 0,
                    transPortAmount: 0,
                    grossTotal: 0,
                    grandTotal: 0,
                    deliveryCondition: deliveryCondition,
                    validityCondition: validityCondition,
                    paymentsCondition: paymentsCondition,
                    cancellationCondition: cancellationCondition,
                    installationCondition: installationCondition,
                    facilityCondition: facilityCondition,
                }}
                onFinish={onQuoteFormFinish}
                layout="horizontal"
            >
                <Header title={"New Quotation"} cancelRoute={"quotation"} />
                <QuotationForm current={form} />
            </Form>
        </Flex>
    );
};

export default NewQuote;
