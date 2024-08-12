import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    Upload,
    Row,
    Col,
    Select,
    Divider,
    Typography,
} from "antd";
import CustomLabel from "components/Comman/CustomLabel";
import FormItemCol from "components/Comman/FormItemCol";
import CustomerData from "Data/CoustomerData";
import Taglabel from "components/Comman/Taglabel";

const { Dragger } = Upload;
const { Text, Title } = Typography;

const OrganizationForm = ({ form }) => {
    const handleImageUpdate = (value) => {
        form.setFieldsValue({ logo: value });
    };

    return (
        <div>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <FormItemCol
                                label={"Orgnization Logo"}
                                required={true}
                                name={"logo"}
                                labelCol={{ span: 24 }}
                                type={"image"}
                                tooltip={`This logo will be displayed in transaction PDFs and email notifications \n.Preferred Image Dimensions: 240 x 240 pixels \n Maximum File Size: 1MB`}
                                updateImageInForm={handleImageUpdate}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Provide Company logo",
                                    },
                                ]}
                            />
                        </Col>
                    </Row>

                    <FormItemCol
                        label={"Orgnization Name"}
                        required={true}
                        name={"companyName"}
                        labelCol={{ span: 8 }}
                        type={"text"}
                        width={"25vw"}
                        rules={[
                            {
                                required: true,
                                message: "Please Provide companyName",
                            },
                        ]}
                    />
                    <FormItemCol
                        label={"Email"}
                        required={true}
                        name={"Email"}
                        type={"text"}
                        labelCol={{ span: 8 }}
                    />
                    <FormItemCol
                        label={"Phone"}
                        required={true}
                        name={"phone"}
                        type={"text"}
                        labelCol={{ span: 8 }}
                    />
                    <FormItemCol
                        label={"Bank Name"}
                        required={true}
                        name={"bankName"}
                        type={"text"}
                        labelCol={{ span: 8 }}
                    />
                    <FormItemCol
                        label={"Account No"}
                        required={true}
                        name={"account"}
                        type={"text"}
                        labelCol={{ span: 8 }}
                    />
                    <FormItemCol
                        label={"IFSC Code"}
                        required={true}
                        name={"account"}
                        type={"text"}
                        labelCol={{ span: 8 }}
                    />
                </Col>
            </Row>

            <Row style={{ display: "flex", padding: 5 }}>
                <Col
                    sm={24}
                    xs={24}
                    md={12}
                    lg={6}
                    xl={6}
                    style={{ padding: 10 }}
                >
                    <Row style={{ paddingBottom: 25 }}>
                        <Text type="secondary" style={{ fontWeight: 900 }}>
                            Billing Address
                        </Text>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} lg={24} xl={24}>
                            <Form.Item
                                label={<CustomLabel label={"Street1"} />}
                                name={["billingAddress", "street1"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} lg={24} xl={24}>
                            <Form.Item
                                label={<CustomLabel label={"Street2"} />}
                                name={["billingAddress", "street2"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} lg={24} xl={24}>
                            <Form.Item
                                label={<CustomLabel label={"City"} />}
                                name={["billingAddress", "city"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} lg={24} xl={24}>
                            <Form.Item
                                label={<CustomLabel label={"Pincode"} />}
                                name={["billingAddress", "pincode"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} lg={24} xl={24}>
                            <Form.Item
                                label={<CustomLabel label={"State"} />}
                                name={["billingAddress", "state"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                            >
                                <Select
                                    options={CustomerData.states}
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col
                    sm={24}
                    xs={24}
                    md={12}
                    lg={6}
                    xl={6}
                    style={{ padding: 10 }}
                >
                    <Row style={{ paddingBottom: 25 }}>
                        <Text type="secondary" style={{ fontWeight: 900 }}>
                            Delivery Address
                        </Text>
                        <Col
                            style={{
                                color: "green",
                                cursor: "pointer",
                                fontWeight: 500,
                            }}
                            onClick={() => {}}
                        >
                            (Copy Billing Address)
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} lg={24} xl={24}>
                            <Form.Item
                                label={<CustomLabel label={"Street1"} />}
                                name={["deliveryAddress", "street1"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} lg={24} xl={24}>
                            <Form.Item
                                label={<CustomLabel label={"Street2"} />}
                                name={["deliveryAddress", "street2"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} lg={24} xl={24}>
                            <Form.Item
                                label={<CustomLabel label={"City"} />}
                                name={["deliveryAddress", "city"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} lg={24} xl={24}>
                            <Form.Item
                                label={<CustomLabel label={"Pincode"} />}
                                name={["deliveryAddress", "pincode"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} lg={24} xl={24}>
                            <Form.Item
                                label={<CustomLabel label={"State"} />}
                                name={["deliveryAddress", "state"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                            >
                                <Select
                                    options={CustomerData.states}
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default OrganizationForm;
