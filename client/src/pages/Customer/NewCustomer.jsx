import { Flex, Form, Col, Button } from "antd";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import CoustomerForm from "../../Forms/CoustomersForm.js";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider.js";
import NotificationHandler from "EventHandler/NotificationHandler.jsx";

const NewCustomer = ({ checkHeader, afterAdd }) => {
    const entity = "customer";
    const [intialFormValue, setIntialFormValue] = useState();
    const navigate = useNavigate();
    const { createData } = useAuth();
    const [form] = Form.useForm();
    const fomulatePayload = (value) => {
        value["billingAddress"] = {
            street: value.billingStreet,
            city: value.billingCity,
            state: value.billingState,
            pinCode: value.billingPincode,
        };
        value["shippingAddress"] = {
            street: value.shippingStreet,
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
        return { entity: entity, value };
    };

    const handelCustomerFormFinish = async (value) => {
        setIntialFormValue(value);
        let data = fomulatePayload(value);
        const { success, result, message } = await createData(data);
        if (success && success === 1) {
            if (afterAdd) {
                afterAdd(result);
            } else {
                navigate("/customers");
            }
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
            {checkHeader ? (
                <Header
                    title={"New Customers"}
                    subTitle={""}
                    cancelRoute={"customers"}
                />
            ) : (
                ""
            )}
            <Form
                name="coustomerForm"
                form={form}
                initialValues={{}}
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
