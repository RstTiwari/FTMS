import React from "react";
import { Flex, Form, Select, Row, Col,Button } from "antd";
import LeadForm from "Forms/LeadForm";
import Header from "components/Header";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import SaveBottmComponent from "components/SaveBottomComponent";
import { pageLayout } from "theme";

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
            style={pageLayout}
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
                <SaveBottmComponent buttonText={"SUBMIT"} cancelRoute={"lead"} />
            </Form.Item>
            </Form>
        </Flex>
    );
};

export default NewLead;
