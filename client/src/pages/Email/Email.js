import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Row, Tooltip, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import useInitialFormValues from "Hook/useIntialFormValues";
import PageLoader from "pages/PageLoader";
import Taglabel from "components/Comman/Taglabel";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import getCustomMessage from "Helper/getCustomMessage";

const EmailForm = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(null);
    const history = useNavigate();
    const { pdfGenerate, appApiCall } = useAuth();
    const { entity, id, tenantId } = useParams();

    // Custom hook to fetch initial form values
    let { initialValues, isFetching, fetchInitialValues } =
        useInitialFormValues(entity, "emailData", id);

    useEffect(() => {
        fetchInitialValues(); // Fetch initial values on component mount
    }, [fetchInitialValues]);

    useEffect(() => {
        if (initialValues) {
            setName(initialValues?.name);
            form.setFieldsValue({
                from: initialValues?.from,
                to: initialValues?.to,
                sub: initialValues?.sub,
                content: getCustomMessage(
                    entity,
                    initialValues?.entityData,
                    initialValues?.name,
                    tenantId,
                    id
                ),
            });
        }
    }, [initialValues, form]);

    if (isFetching || loading) {
        return (
            <PageLoader isLoading={true} text={"Wait Prparing to Send mail"} />
        );
    }

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("from", values.from);
            formData.append("to", values.to);
            formData.append("cc", values.cc);
            formData.append("sub", values.sub);
            formData.append("content", values.content);

            fileList.forEach((file) => {
                formData.append("attachments", file.originFileObj);
            });
            let response = await appApiCall("post", "sendEmail", formData, {
                entity,
                id,
            });

            if (!response.success) {
                return NotificationHandler.error(response.message);
            }
            return history(-1);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        history(-1);
    };

    return (
        <div>
            <Row justify={"start"} style={{ margin: "5px" }}>
                EMAIL TO - <Taglabel text={name} weight={1000} />
            </Row>
            <Form
                form={form}
                layout="horizontal"
                onFinish={onFinish}
                style={{
                    flex: "1",
                    padding: "20px",
                    maxWidth: 800,
                    border: "solid 1px ",
                    margin: "10px",
                }}
            >
                <Form.Item
                    name="from"
                    label="From"
                    labelAlign="left"
                    labelCol={{ span: 3 }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter the sender's email address",
                        },
                    ]}
                >
                    <Input placeholder="From" />
                </Form.Item>

                <Form.Item
                    name="to"
                    label="To"
                    labelAlign="left"
                    labelCol={{ span: 3 }}
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter the recipient's email address",
                        },
                    ]}
                >
                    <Input placeholder="To" />
                </Form.Item>
                <Form.Item
                    name="cc"
                    label="CC"
                    labelAlign="left"
                    labelCol={{ span: 3 }}
                >
                    <Input placeholder="cc" />
                </Form.Item>

                <Form.Item
                    name="sub"
                    label="SUB"
                    labelAlign="left"
                    labelCol={{ span: 3 }}
                >
                    <Input placeholder="Subject" />
                </Form.Item>

                <Form.Item
                    name="content"
                    labelAlign="left"
                    labelCol={{ span: 3 }}
                >
                    <Input.TextArea
                        rows={10}
                        placeholder="Write your message..."
                    />
                </Form.Item>

                {/* File Upload
                <Form.Item labelAlign="left" labelCol={{ span: 3 }}>
                    <Upload
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleFileChange}
                        multiple
                    >
                        <Button icon={<UploadOutlined />}>Attach Files</Button>
                    </Upload>
                </Form.Item> */}

                <div
                    style={{
                        borderTop: "1px solid #e8e8e8",
                        padding: "10px 20px",
                        background: "#fff",
                        textAlign: "right",
                        position: "sticky",
                        bottom: 0,
                        width: "100%",
                    }}
                >
                    <Row justify="start" gutter={16}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ background: "#22b378" }}
                            >
                                Send
                            </Button>
                            <Button type="text" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Row>
                </div>
            </Form>
        </div>
    );
};

export default EmailForm;
