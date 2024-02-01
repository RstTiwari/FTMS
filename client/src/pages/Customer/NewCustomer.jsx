import { Flex, Form, Col, Button } from "antd";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import CoustomerForm from "../../Forms/CoustomersForm.js";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "state/AuthProvider.js";
import NotificationHandler from "ErrorHandler/NotificationHandler.jsx";
const NewCustomer = () => {
    const [payload, setPayload] = useState({});
    const [intialFormValue, setIntialFormValue] = useState();
    const { createData } = useAuth();
    const [form] = Form.useForm();
    const fomulatePayload = (value) => {
        value["billingAddress"] = {
            address: value.billingStreet,
            city: value.billingCity,
            state: value.billingState,
            pinCode: value.billingPincode,
        };
        value["shippingAddress"] = {
            address: value.shippingStreet,
            city: value.shippingCity,
            state: value.shippingState,
            pinCode: value.shippingPincode,
        };

        delete value.shippingStreet;
        delete value.shippingState;
        delete value.shippingCity;
        delete value.shippingPincode;
        delete value.billingStreet;
        delete value.billingState;
        delete value.billingCity;
        delete value.billingPincode;
        return { entity: "customer", value };
    };

    const handelCustomerFormFinish = async (value) => {
        setIntialFormValue(value);
        setPayload(fomulatePayload(value));
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
            <Header title={"New Customers"} subTitle={""} />
            <Form
                name="coustomerForm"
                form={form}
                initialValues={{ shippinStreet: "" }}
                onFinish={handelCustomerFormFinish}
            >
                <CoustomerForm current={form} />
                <Col className="gutter-row" span={6}>
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
            </Form>
        </Flex>
    );
};

export default NewCustomer;
