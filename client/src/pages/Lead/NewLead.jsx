import React from "react";
import { Flex, Form, Select, Row, Col,Button } from "antd";
import LeadForm from "Forms/LeadForm";
import Header from "components/Header";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import SaveBottmComponent from "components/SaveBottomComponent";

const NewLead = () => {
    const [form] = Form.useForm();
    const { createData } = useAuth();
    const navigate = useNavigate()
    const handleLeadFormFinish = async (value) => {
        let payload = { entity: "lead", value: value };
        const { success, result, message } = await createData(payload);
        if (success) {
            navigate("/lead")
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
                name="leadForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remeber: true }}
                onFinish={handleLeadFormFinish}
                form={form}
            >
                <Header title={"New Lead"} cancelRoute={"lead"}  />
                <LeadForm current={form} />
                <Form.Item>
                <Button type="primary" htmlType="submit">
                    SAVE AS DRAFT
                </Button>
            </Form.Item>
            </Form>
        </Flex>
    );
};

export default NewLead;
