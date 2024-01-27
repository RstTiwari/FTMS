import { Flex, Form,Button,Col } from "antd";
import Header from "components/Header";
import {React} from "react";
import { PlusOutlined } from "@ant-design/icons";
import InvoiceFrom from "../../Forms/Invoice";
import { epochConveter } from "Helper/EpochConveter";
import { createData } from "Helper/ApiHelper";

const NewInvoice = () => {
    const [form] = Form.useForm();
    const handleInvoiceFormFinish = async (value) => {
        let epochQuoteDate = epochConveter(value.invoiceDate.$d);
        let epochExpiryDate = epochConveter(value.invoiceExpiredDate.$d);
        value.invoiceDate = epochQuoteDate;
        value.invoiceExpiredDate = epochExpiryDate;
        let payload = { entity: "invoice", value };
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
        >
            <Header title={"NEW INVOICE"} />
            <Form name="newInvoiceForm" form={form} layout="horizontal" onFinish={handleInvoiceFormFinish}>
                <InvoiceFrom current={form} />
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

export default NewInvoice;
