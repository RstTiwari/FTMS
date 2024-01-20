import { Flex, Form } from "antd";
import Header from "components/Header";
import React from "react";
import InvoiceFrom from "../../Forms/Invoice";

const NewInvoice = () => {
    const [form] = Form.useForm();
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
        >
            <Header title={"NEW INVOICE"} />
            <Form name="newInvoiceForm" form={form} layout="horizontal">
                <InvoiceFrom current={form} />
            </Form>
        </Flex>
    );
};

export default NewInvoice;
