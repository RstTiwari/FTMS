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
import SaveBottmComponent from "components/SaveBottomComponent";
import { industryType, stateData } from "Data/OrgnizationData";
import UploadImage from "components/UploadImage";

const { Dragger } = Upload;
const { Text, Title } = Typography;

const OrganizationForm = ({ value, handleFormSubmit, handleValueChange }) => {
    const [form] = Form.useForm();
    const { companyName, logo, email, phone, address, panNo, gstNo, industry ,bankDetails } =
        value;
    const handleImgeUpload = (imageUrl) => {
        form.setFieldsValue({ logo: imageUrl });
    };

    return (
        <Form
            form={form}
            onFinish={handleFormSubmit}
            initialValues={{
                companyName: companyName ? companyName : "",
                logo: logo ? logo : "",
                email: email ? email : "",
                phone: phone ? phone : "",
                address: address ? address : "",
                panNo: panNo ? panNo : "",
                gstNo: gstNo ? gstNo : "",
                industry: industry ? industry : "",
                bankDetails :bankDetails ? bankDetails :""
            }}
            onValuesChange={handleValueChange}
        >
            <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                        name="logo"
                        style={{ fontSize: "2rem" }}
                        getValueFromEvent={(e) => e && e.fileList}
                    >
                        <UploadImage
                            pageTitle={"ORGNIZATION LOGO"}
                            onUploadSuccess={handleImgeUpload}
                            logo={logo}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="companyName"
                        label="Company Name"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter company name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Primary Email"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please Enter email",
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Priamry Phone"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please Enter Phome",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="industry"
                        label="Industry Type"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter company name",
                            },
                        ]}
                    >
                        <Select options={industryType} />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row gutter={30}>
                <Col span={12}>
                    <Row>
                        <Text type="success">COMPANY DETAILS</Text>
                    </Row>
                    <Form.Item
                        name={"panNo"}
                        label="PAN No"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter Pan Details",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={"gstNo"}
                        label="GST NO"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter GST Details",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["address", "street"]}
                        label="Street"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter company name",
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        name={["address", "city"]}
                        label="City"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter company name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={["address", "state"]}
                        label="State"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter company name",
                            },
                        ]}
                    >
                        <Select options={stateData} />
                    </Form.Item>
                    <Form.Item
                        name={["address", "pinCode"]}
                        label="Pin Code"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter company name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Row>
                        <Text type="success">BANK DETAILS</Text>
                    </Row>
                    <Form.Item
                        name={["bankDetails", "bankName"]}
                        label="Bank Name"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter Bank Name Details",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={["bankDetails", "accountNo"]}
                        label="Account No"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter Account No  Details",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={["bankDetails", "branch"]}
                        label="Branch"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter  Branch Details",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={["bankDetails", "ifscCode"]}
                        label="IFSC Code"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        rules={[
                            {
                                required: true,
                                message: "Please enter Bank Name Details",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <SaveBottmComponent
                buttonText={"UPDATE ORGNIZATION DETAILS"}
                cancelRoute={"dashboard"}
            />
        </Form>
    );
};

export default OrganizationForm;
