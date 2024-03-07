import React from "react";
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
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import SaveBottmComponent from "components/SaveBottomComponent";
import { industryType, stateData } from "Data/OrgnizationData";

const { Dragger } = Upload;
const { Text, Title } = Typography;

const OrganizationForm = ({ value, handleFormSubmit, handleValueChange }) => {
    const [form] = Form.useForm();
    console.log(value, "--");
    const { companyName, logo, email, phone, address ,panNo,gstNo,industry} = value;
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
                panNo:panNo ? panNo:"",
                gstNo:gstNo ? gstNo :"",
                industry:industry ? industry :""
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
                        <Dragger>
                            <h2>COMPANY LOGO</h2>
                            {/* <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" style={{width:"5rem"}}/> */}
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag Company Logo to this area to
                                upload
                            </p>
                            <p className="ant-upload-hint">
                                This logo will be displayed in transaction PDFs
                                and email notifications. Preferred Image
                                Dimensions: 240 x 240 pixels @ 72 DPI Maximum
                                File Size: 1MB
                            </p>
                        </Dragger>
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
            <Row>
                <Text type="success">COMPANY DETAILS</Text>
            </Row>

            <Col span={12}>
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
            <SaveBottmComponent
                buttonText={"UPDATE ORGNIZATION DETAILS"}
                cancelRoute={"dashboard"}
            />
        </Form>
    );
};

export default OrganizationForm;
