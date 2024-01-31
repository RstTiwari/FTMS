import React from "react";
import { Flex, Form, Select, Row, Col } from "antd";
import LeadForm from "Forms/LeadForm";
import Header from "components/Header";
import { useAuth } from "state/AuthProvider";

const NewLead = () => {
    const [form] = Form.useForm();
    const {createData}  = useAuth()
    const handleLeadFormFinish = async (value) => {
        value["comments"] = [
            {
                comment: value.addComment,
                date: Math.floor(Date.now() / 1000),
            },
        ];
        delete value.addComment;
        let payload = { entity: "lead", value: value };
        const { success, result, message } = await createData(payload);
        
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
                name="leadForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remeber: true }}
                onFinish={handleLeadFormFinish}
                form={form}
            >
                <Header title={"New Lead"} cancelRoute={"lead"} />
                <LeadForm current={form} />
            </Form>
        </Flex>
    );
};

export default NewLead;
