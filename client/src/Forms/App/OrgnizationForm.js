import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Upload,
    Row,
    Col,
    Select,
    Divider,
    Tabs,
    Typography,
    Space,
    message,
} from "antd";
import {
    DeleteColumnOutlined,
    DeleteOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import CustomLabel from "components/Comman/CustomLabel";
import FormItemCol from "components/Comman/FormItemCol";
import CustomerData from "Data/CoustomerData";
import Taglabel from "components/Comman/Taglabel";
import TabPane from "antd/es/tabs/TabPane";
import CoustomButton from "components/Comman/CoustomButton";
import NotificationHandler from "EventHandler/NotificationHandler";

const { Dragger } = Upload;
const { Text, Title } = Typography;

const OrganizationForm = ({ form }) => {
    const handleImageUpdate = (value) => {
        form.setFieldsValue({ logo: value });
    };

    const handleItemsUpdate = (value, fieldName, rowKey) => {
        const bankDetails = form.getFieldValue("bankDetails");
        if (fieldName == "deliveryAddress") {
            let billingAddress = form.getFieldValue("billingAddress");
            return form.setFieldsValue({ deliveryAddress: billingAddress });
        } else if (fieldName === "isPrimary" && value) {
            // If the checkbox for 'isPrimary' is checked, set all others to false
            const updatedDetails = bankDetails.map((item, idx) => ({
                ...item,
                isPrimary: idx === rowKey,
            }));
            form.setFieldsValue({ bankDetails: updatedDetails });
        }
    };

    return (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Row>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <FormItemCol
                            label={"Organization Logo"}
                            required={true}
                            name={"logo"}
                            labelCol={{ span: 24 }}
                            type={"image"}
                            tooltip={`This logo will be displayed in transaction PDFs and email notifications \n.Preferred Image Dimensions: 240 x 240 pixels \n Maximum File Size: 1MB`}
                            updateImageInForm={handleImageUpdate}
                            rules={[
                                {
                                    required: "true",
                                    message: "Please Provide Company logo",
                                },
                            ]}
                            preFillValue={form.getFieldValue("logo")}
                            imageType="logo"
                        />
                    </Col>
                </Row>

                <FormItemCol
                    label={"Company Name"}
                    name={"companyName"}
                    labelAlign="left"
                    labelCol={{ span: 8 }}
                    required={true}
                    width={"30vw"}
                    rules={[
                        {
                            required: "true",
                            message: "Please Write Company Name",
                        },
                    ]}
                    type="input"
                    fieldName={"companyName"}
                />
                <FormItemCol
                    label={"Email"}
                    required={true}
                    name={"email"}
                    type={"text"}
                    labelCol={{ span: 8 }}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Customer",
                        },
                    ]}
                    width={"30vw"}
                />
                <FormItemCol
                    label={"Phone"}
                    required={true}
                    name={"phone"}
                    type={"text"}
                    labelCol={{ span: 8 }}
                    rules={[
                        {
                            required: "true",
                            message: "Please Write Company Name",
                        },
                    ]}
                    width={"30vw"}
                />
                <Tabs>
                    <TabPane tab="Bank Details" key="1">
                        <Form.List
                            name="bankDetails"
                            initialValue={[
                                {
                                    isPrimary: true,
                                    bankName: "",
                                    accountNo: "",
                                    ifscCode: "",
                                },
                            ]}
                        >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(
                                        ({
                                            key,
                                            name,
                                            fieldKey,
                                            ...restField
                                        }) => (
                                            <Row>
                                                <Divider>
                                                    {`${key + 1} BANK ACCOUNT`}
                                                </Divider>
                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={24}
                                                    xl={24}
                                                >
                                                    <Row align={"middle"}>
                                                        <Col
                                                            xs={12}
                                                            sm={12}
                                                            md={12}
                                                            lg={12}
                                                            xl={12}
                                                        >
                                                            <FormItemCol
                                                                label={
                                                                    "Primary Bank Account"
                                                                }
                                                                required={true}
                                                                name={[
                                                                    name,
                                                                    "isPrimary",
                                                                ]}
                                                                fieldKey={[
                                                                    fieldKey,
                                                                    "isPrimary",
                                                                ]}
                                                                type={
                                                                    "checkbox"
                                                                }
                                                                labelCol={{
                                                                    span: 20,
                                                                }}
                                                                updateInForm={(
                                                                    value
                                                                ) =>
                                                                    handleItemsUpdate(
                                                                        value,
                                                                        "isPrimary",
                                                                        name
                                                                    )
                                                                }
                                                                preFillValue={
                                                                    form.getFieldValue(
                                                                        "bankDetails"
                                                                    )?.[name]
                                                                        ?.isPrimary
                                                                }
                                                            />
                                                        </Col>

                                                        <Col xs={4}>
                                                            <DeleteOutlined
                                                                style={{
                                                                    color: "black",
                                                                }}
                                                                onClick={() => {
                                                                    const isPrimary =
                                                                        form.getFieldValue(
                                                                            [
                                                                                "bankDetails",
                                                                                name,
                                                                                "isPrimary",
                                                                            ]
                                                                        );
                                                                    if (
                                                                        isPrimary
                                                                    ) {
                                                                        return NotificationHandler.error(
                                                                            "Change Primary bank Account before Deleting It"
                                                                        );
                                                                    } else {
                                                                        remove(
                                                                            name
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <FormItemCol
                                                        label={"Bank Name"}
                                                        required={true}
                                                        name={[
                                                            name,
                                                            "bankName",
                                                        ]}
                                                        fieldKey={[
                                                            fieldKey,
                                                            "bankName",
                                                        ]}
                                                        type={"text"}
                                                        labelCol={{
                                                            span: 8,
                                                        }}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    " Bank Name is Required",
                                                            },
                                                        ]}
                                                        width={"30vw"}
                                                    />
                                                    <FormItemCol
                                                        label={"Account No"}
                                                        required={true}
                                                        name={[
                                                            name,
                                                            "accountNo",
                                                        ]}
                                                        fieldKey={[
                                                            fieldKey,
                                                            "accountNo",
                                                        ]}
                                                        type={"text"}
                                                        labelCol={{
                                                            span: 8,
                                                        }}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Account No code Required",
                                                            },
                                                        ]}
                                                        width={"30vw"}
                                                    />
                                                    <FormItemCol
                                                        label={"IFSC Code"}
                                                        required={true}
                                                        name={[
                                                            name,
                                                            "ifscCode",
                                                        ]}
                                                        fieldKey={[
                                                            fieldKey,
                                                            "ifscCode",
                                                        ]}
                                                        type={"text"}
                                                        labelCol={{
                                                            span: 8,
                                                        }}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "IFSC code Required",
                                                            },
                                                        ]}
                                                        width={"30vw"}
                                                    />
                                                    <FormItemCol
                                                        label={"UPI Details"}
                                                        name={[name, "upi"]}
                                                        fieldKey={[
                                                            fieldKey,
                                                            "upi",
                                                        ]}
                                                        type={"text"}
                                                        labelCol={{
                                                            span: 8,
                                                        }}
                                                        width={"30vw"}
                                                    />
                                                </Col>
                                            </Row>
                                        )
                                    )}
                                    <Col span={6}>
                                        <Form.Item>
                                            <CoustomButton
                                                text={" Add New"}
                                                onClick={() => add()}
                                                details={true}
                                                withIcon={true}
                                            />
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                        </Form.List>
                    </TabPane>
                    <TabPane tab="Address Details" key={"2"}>
                        <Row style={{ display: "flex", padding: 5 }}>
                            <Col
                                sm={24}
                                xs={24}
                                md={12}
                                lg={8}
                                xl={8}
                                style={{ padding: 10 }}
                            >
                                <Row style={{ paddingBottom: 25 }}>
                                    <Text
                                        type="secondary"
                                        style={{ fontWeight: 900 }}
                                    >
                                        Billing Address
                                    </Text>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} lg={24} xl={24}>
                                        <Form.Item
                                            label={
                                                <CustomLabel
                                                    label={"Street1"}
                                                />
                                            }
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
                                            label={
                                                <CustomLabel
                                                    label={"Street2"}
                                                />
                                            }
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
                                            label={
                                                <CustomLabel label={"City"} />
                                            }
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
                                            label={
                                                <CustomLabel
                                                    label={"Pincode"}
                                                />
                                            }
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
                                            label={
                                                <CustomLabel label={"State"} />
                                            }
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
                                lg={8}
                                xl={8}
                                style={{ padding: 10 }}
                            >
                                <Row style={{ paddingBottom: 25 }}>
                                    <Text
                                        type="secondary"
                                        style={{ fontWeight: 900 }}
                                    >
                                        Delivery Address
                                    </Text>
                                    <Col
                                        style={{
                                            color: "green",
                                            cursor: "pointer",
                                            fontWeight: 500,
                                        }}
                                        onClick={(value) => {
                                            handleItemsUpdate(
                                                value,
                                                "deliveryAddress"
                                            );
                                        }}
                                    >
                                        (Copy Billing Address)
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={24} sm={24} lg={24} xl={24}>
                                        <Form.Item
                                            label={
                                                <CustomLabel
                                                    label={"Street1"}
                                                />
                                            }
                                            name={[
                                                "deliveryAddress",
                                                "street1",
                                            ]}
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
                                            label={
                                                <CustomLabel
                                                    label={"Street2"}
                                                />
                                            }
                                            name={[
                                                "deliveryAddress",
                                                "street2",
                                            ]}
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
                                            label={
                                                <CustomLabel label={"City"} />
                                            }
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
                                            label={
                                                <CustomLabel
                                                    label={"Pincode"}
                                                />
                                            }
                                            name={[
                                                "deliveryAddress",
                                                "pincode",
                                            ]}
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
                                            label={
                                                <CustomLabel label={"State"} />
                                            }
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
                    </TabPane>
                    <TabPane tab="Other Details" key={"3"}>
                        <FormItemCol
                            label={"Gst No"}
                            required={true}
                            name={"gstNo"}
                            type={"text"}
                            rules={[
                                {
                                    required: true,
                                    message: "Fill Gst No Details ",
                                },
                            ]}
                            labelCol={{ span: 8 }}
                            width={"30vw"}
                        />
                        <FormItemCol
                            label={"Pan No"}
                            required={true}
                            name={"panNo"}
                            type={"text"}
                            labelCol={{ span: 8 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Fill Gst No Details ",
                                },
                            ]}
                            width={"30vw"}
                        />
                        <FormItemCol
                            label={"Company Website"}
                            name={"website"}
                            type={"text"}
                            labelCol={{ span: 8 }}
                            width={"30vw"}
                        />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    );
};

export default OrganizationForm;
