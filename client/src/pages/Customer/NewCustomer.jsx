import { Flex, Form ,Col,Button} from "antd";
import Header from "components/Header";
import React from "react";
import CoustomerForm from "../../Forms/CoustomersForm.js"
import {PlusOutlined}  from "@ant-design/icons"
import { useAddDataQuery } from "state/api.js";


const NewCustomer = () => {
    const [form] = Form.useForm()
    const fomulatePayload = (value)=>{
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

        delete value.shippingStreet
        delete value.shippingState
        delete value.shippingCity
        delete value.shippingPincode
        delete value.billingStreet
        delete value.billingState
        delete value.billingCity
        delete value.billingPincode
        return { entity: "customer", value };

    }
    const handelCustomerFormFinish =(value)=>{
    let payload = fomulatePayload(value)
    }

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
            <Form name="coustomerForm" form={form} initialValues={{shippinStreet:""}} onFinish={handelCustomerFormFinish}>
                <CoustomerForm  current ={form} />
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
