import { Flex, Form ,Col,Button} from "antd";
import Header from "components/Header";
import React from "react";
import CoustomerForm from "../../Forms/CoustomersForm.js"
import {PlusOutlined}  from "@ant-design/icons"


const NewCustomer = () => {
    const [form] = Form.useForm()
    const handelCustomerFormFinis =(value)=>{
        console.log(value,"Click");
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
            <Form name="coustomerForm" form={form} initialValues={{shippinStreet:""}} onFinish={handelCustomerFormFinis}>
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
