import { Flex, Form } from "antd";
import Header from "components/Header";
import React from "react";
import CoustomerForm from "../../Forms/CoustomersForm.js"

const NewCustomer = () => {
    const [form] = Form.useForm()
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
            <Form>
                <CoustomerForm  current ={form} />
            </Form>
        </Flex>
    );
};

export default NewCustomer;
