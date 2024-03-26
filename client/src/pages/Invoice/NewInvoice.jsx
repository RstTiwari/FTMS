import { Flex, Form, Button, Col } from "antd";
import Header from "components/Header";
import { React } from "react";
import { PlusOutlined } from "@ant-design/icons";
import InvoiceFrom from "../../Forms/Invoice";
import { epochConveter } from "Helper/EpochConveter";
import { useAuth } from "state/AuthProvider.js";
import NotificationHandler from "EventHandler/NotificationHandler";
import SaveBottmComponent from "components/SaveBottomComponent";
import { useNavigate } from "react-router-dom";
import { pageLayout } from "theme";

const NewInvoice = () => {
    const [form] = Form.useForm();
    const { createData } = useAuth();
    const navigate = useNavigate()
    const handleInvoiceFormFinish = async (value) => {
        let epochQuoteDate = epochConveter(value.invoiceDate.$d);
        let epochExpiryDate = epochConveter(value.invoiceExpiredDate.$d);
        value.invoiceDate = epochQuoteDate;
        value.invoiceExpiredDate = epochExpiryDate;
        let payload = { entity: "invoice", value };
        const { success, result, message } = await createData(payload);
        if (success) {
            navigate("/invoice")
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
        >
            <Header title={"NEW INVOICE"} cancelRoute={"invoice"} />
            <Form
                name="newInvoiceForm"
                form={form}
                layout="horizontal"
                onFinish={handleInvoiceFormFinish}
            >
                <InvoiceFrom current={form} />
                <Col className="gutter-row" span={6}>
                 <SaveBottmComponent buttonText={"SAVE AS DRAFT"} cancelRoute={"invoice"}/>
                </Col>
            </Form>
        </Flex>
    );
};

export default NewInvoice;
