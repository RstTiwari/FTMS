import { Flex, Form, Input, Col, Row, Button, Typography, Select } from "antd";
import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import CustomLabel from "components/SmallComponent/CustomLabel";
import CustomInput from "components/SmallComponent/CustomInput";
import FormItemCol from "components/SmallComponent/FormItemCol";
import CustomerData from "Data/CoustomerData";
import CustomTable from "components/CustomTable";

const { Text } = Typography;

const CoustomersForm = ({ current, disabled }) => {
    const isLaptop = useMediaQuery("(min-width:600px)");
    const [billing, setBilling] = useState({
        street: "",
        city: "",
        state: "",
        pincode: "",
    });
    const handeCopyBillingAddress = () => {
        const { billingStreet, billingCity, billingState, billingPincode } =
            current.getFieldsValue([
                "billingStreet",
                "billingCity",
                "billingState",
                "billingPincode",
            ]);
        current.setFieldsValue({ shippingStreet: billing.street });
        current.setFieldsValue({ shippingCity: billing.city });
        current.setFieldsValue({ shippingState: billing.state });
        current.setFieldsValue({ shippingPincode: billing.pincode });
    };
    return (
        <div >
            <FormItemCol
                label={"Customer Name"}
                labelAlign="left"
                name="customerName"
                required={true}
                labelCol={{ span: 8 }}
                rules={[
                    {
                        required: true,
                        message: "Please Provide Customer Name",
                    },
                ]}
                type={"text"}
            />
            <FormItemCol
                label={"Customer Phone"}
                required={true}
                labelAlign="left"
                name="customerPhone"
                labelCol={{ span: 8 }}
                rules={[
                    {
                        required: true,
                        message: "Please Provide Customer Phone",
                    },
                ]}
                type={"text"}
            />
            <FormItemCol
                label={"Customer Email"}
                labelAlign="left"
                name="customerEmail"
                labelCol={{ span: 8 }}
                required={true}
                rules={[
                    {
                        required: true,
                        message: "Please Provide Customer Email",
                    },
                ]}
                type={"text"}
            />
            <FormItemCol
                label={"Contact Person"}
                name={"contactPerson"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                type={"text"}
            />

            <FormItemCol
                label={"Pan No"}
                labelAlign="left"
                tooltip="this data  will be Encrypted then stored not visible to other people  accept access given  "
                name="panNo"
                labelCol={{ span: 8 }}
            />

            <FormItemCol
                label={"Gst No"}
                labelAlign="left"
                tooltip="this data  will be Encripted then stored not visible to other pepole  accept acces given  "
                name="gstNo"
                labelCol={{ span: 8 }}
            />
            <Row xs={24} sm={24} md={24} lg={24}>
                <Col sm={24} xs={24} md={12} lg={12}>
                    <Row>
                        <Text type="secondary" style={{ fontWeight: 900 }}>
                            Billing Address
                        </Text>
                    </Row>
                    <Row>
                        <Col lg={22}>
                            <Form.Item
                                label={<CustomLabel label={"Address"} />}
                                name={"billingAddress.street"}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Item
                                label={<CustomLabel label={"City"} />}
                                name={"billingAddress.city"}
                                labelAlign="left"
                                labelCol={{ span: 7 }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item
                                label={<CustomLabel label={"Pin Code"} />}
                                name={"billingAddress.pincode"}
                                labelAlign="left"
                                labelCol={{ span: 7 }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Item
                            label={<CustomLabel label={"State"} />}
                            name={"billingAddress.state"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Select
                                options={CustomerData.states}
                                style={{ width: "150px" }}
                            />
                        </Form.Item>
                    </Row>
                </Col>
                <Col sm={24} xs={12} md={12} lg={12}>
                    <Row>
                        <Text type="secondary" style={{ fontWeight: 900 }}>
                            Shipping Address
                        </Text>
                        {!disabled ? (
                            <Col
                                style={{
                                    color: "green",
                                    cursor: "pointer",
                                    fontWeight: 500,
                                }}
                                onClick={handeCopyBillingAddress}
                            >
                                (Copy Billing Address)
                            </Col>
                        ) : (
                            ""
                        )}
                    </Row>

                    <Row>
                        <Col span={22}>
                            <Form.Item
                                label={<CustomLabel label={" Address"} />}
                                labelAlign="left"
                                name="shippingAddress.street"
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Item
                            label={<CustomLabel label={"City"} />}
                            name={"shippingAddress.city"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Input />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label={<CustomLabel label={"Pin Code"} />}
                            name={"shippingAddress.pincode"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Input value={billing.pincode} />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label={<CustomLabel label={"State"} />}
                            name={"shippingAddress.state"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Select
                                options={CustomerData.states}
                                style={{ width: "150px" }}
                            />
                        </Form.Item>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default CoustomersForm;
