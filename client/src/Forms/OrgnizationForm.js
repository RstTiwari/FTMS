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
import CustomLabel from "components/SmallComponent/CustomLabel";
import FormItemCol from "components/SmallComponent/FormItemCol";
import CustomerData from "Data/CoustomerData";

const { Dragger } = Upload;
const { Text, Title } = Typography;

const OrganizationForm = ({ form }) => {
    const handleImageUpdate = (value) => {
        form.setFieldsValue({ logo: value });
    };

    return (
        <div>
            <Row>
                <FormItemCol
                   label={"Company Logo"}
                    required={true}
                    name={"logo"}
                    type={"image"}
                    tooltip={"Company logo for showing in pdf"}
                    updateImageInForm={handleImageUpdate}
                    rules={[
                        {
                            required: true,
                            message: "Please Provide Company logo",
                        },
                    ]}
                />
             
            </Row>
            <FormItemCol
                    label={"Company Name"}  
                    required ={true}
                    name={"companyName"}
                    type={"text"}
                    rules={[
                        {
                            required: true,
                            message: "Please Provide companyName",
                        },
                    ]}
                />
                <FormItemCol label={"Email"}  required ={true} name={"Email"} type={"text"} />
                <FormItemCol label={"Phone"} required ={true}name={"phone"} type={"text"} />
            <Col sm={24} xs={24} md={12} lg={12}>
                <Row style={{ paddingBottom: 25 }}>
                    <Text type="secondary" style={{ fontWeight: 900 }}>
                        Billing Address
                    </Text>
                </Row>
                <Row>
                    <Col xs={24} sm={24} lg={12} xl={12}>
                        <Form.Item
                            label={<CustomLabel label={"Street1"} />}
                            name={["address", "street1"]}
                            labelAlign="left"
                            labelCol={{ span: 8 }}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} lg={12} xl={12}>
                        <Form.Item
                            label={<CustomLabel label={"Street2"} />}
                            name={["address", "street2"]}
                            labelAlign="left"
                            labelCol={{ span: 8 }}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} sm={24} lg={12} xl={12}>
                        <Form.Item
                            label={<CustomLabel label={"City"} />}
                            name={["address", "city"]}
                            labelAlign="left"
                            labelCol={{ span: 8 }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} lg={12} xl={12}>
                        <Form.Item
                            label={<CustomLabel label={"Pincode"} />}
                            name={["address", "pincode"]}
                            labelAlign="left"
                            labelCol={{ span: 8 }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} lg={12} xl={12}>
                        <Form.Item
                            label={<CustomLabel label={"State"} />}
                            name={["address", "state"]}
                            labelAlign="left"
                            labelCol={{ span: 8 }}
                        >
                            <Select
                                options={CustomerData.states}
                                style={{
                                    width: "250px",
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </div>
    );
};

export default OrganizationForm;
