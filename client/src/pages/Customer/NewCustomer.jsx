import { Flex, Form, Col, Button } from "antd";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import CoustomerForm from "../../Forms/CoustomersForm.js";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider.js";
import NotificationHandler from "EventHandler/NotificationHandler.jsx";
import SaveBottmComponent from "components/SaveBottomComponent.js";

const NewCustomer = ({ checkHeader, afterAdd }) => {
    const entity = "customer";
    const [intialFormValue, setIntialFormValue] = useState();
    const navigate = useNavigate();
    const { createData } = useAuth();
    const [form] = Form.useForm();
    const fomulatePayload = (value={}) => {
        const {
            billingStreet,
            billingCity,
            billingState,
            billingPincode,
            shippingStreet,
            shippingCity,
            shippingState,
            shippingPincode,
        } = value

        value["billingAddress"] = {
            street: billingStreet ? billingStreet : "",
            city: billingCity ? billingCity : "",
            state: billingState ? billingState : "",
            pinCode: billingPincode ? billingPincode : "",
        };
        value["shippingAddress"] = {
            street: shippingStreet ? shippingStreet : "",
            city: shippingCity ? shippingCity : "",
            state: shippingState ? shippingState : "",
            pinCode: shippingPincode ? shippingPincode : "",
        };

        return { entity: entity, value };
    };

    const handelCustomerFormFinish = async (value) => {
        console.log(value);
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
                <SaveBottmComponent
                    text1={"SAVE AS DRAFT"}
                    text3={"CANCEL"}
                    action1={handelCustomerFormFinish}
                    action3={"customers"}
                />
            </Form>
        </Flex>
    );
};

export default NewCustomer;
