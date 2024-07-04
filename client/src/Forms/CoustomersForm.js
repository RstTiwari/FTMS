import { Flex, Form, Input, Col, Row, Button, Typography, Select } from "antd";
import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import CustomLabel from "components/SmallComponent/CustomLabel";
import CustomInput from "components/SmallComponent/CustomInput";
import FormItemCol from "components/SmallComponent/FormItemCol";
import CustomerData from "Data/CoustomerData";
import CustomTable from "components/CustomTable";

const { Text } = Typography;

const CoustomersForm = ({ current, disabled,isModal }) => {
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
        < >
            <FormItemCol
                label={"Customer Name"}
                labelAlign="left"
                name="customerName"
                required={true}
                labelCol={{ span: isModal ? 18:8}}
                rules={[
                    {
                        required: true,
                        message: "Please Provide Customer Name",
                    },
                ]}
                type={"input"}
            />
            <FormItemCol
                label={"Customer Phone"}
                required={true}
                labelAlign="left"
                name="customerPhone"
                labelCol={{span: isModal ? 18:8}}
                rules={[
                    {
                        required: true,
                        message: "Please Provide Customer Phone",
                    },
                ]}
                type={"input"}
            />
            <FormItemCol
                label={"Customer Email"}
                labelAlign="left"
                name="customerEmail"
                labelCol={{span: isModal ? 18:8}}
                required={true}
                rules={[
                    {
                        required: true,
                        message: "Please Provide Customer Email",
                    },
                ]}
                type={"input"}
            />
            <FormItemCol
                label={"Contact Person"}
                name={"contactPerson"}
                labelAlign="left"
                labelCol={{span: isModal ? 18:8}}
                type={"input    "}
            />

            <FormItemCol
                label={"Pan No"}
                labelAlign="left"
                tooltip="this data  will be Encrypted then stored not visible to other people  accept access given  "
                name="panNo"
                labelCol={{span: isModal ? 18:8}}
                type={"input"}
            />

            <FormItemCol
                label={"Gst No"}
                labelAlign="left"
                tooltip="this data  will be Encripted then stored not visible to other pepole  accept acces given  "
                name="gstNo"
                labelCol={{span: isModal ? 18:8}}
            />
            <Row style={{ padding: 20 }}>
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
                                name={["billingAddress", "street1"]}
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
                                name={["billingAddress", "street2"]}
                                labelAlign="left"
                                labelCol={{ span: isModal? 8: 5 }}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} lg={12} xl={12}>
                            <Form.Item
                                label={<CustomLabel label={"City"} />}
                                name={["billingAddress", "city"]}
                                labelAlign="left"
                                labelCol={{span: isModal? 8: 5}}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} lg={12} xl={12}>
                            <Form.Item
                                label={<CustomLabel label={"Pincode"} />}
                                name={["billingAddress", "pincode"]}
                                labelAlign="left"
                                labelCol={{span: isModal? 8: 5 }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} lg={12} xl={12}>
                            <Form.Item
                                label={<CustomLabel label={"State"} />}
                                name={["billingAddress", "state"]}
                                labelAlign="left"
                                labelCol={{span: isModal? 8: 5}}
                            >
                                <Select
                                    options={CustomerData.states}
                                    style={{ width: "150px" }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col sm={24} xs={12} md={12} lg={12}>
                    <Row style={{ paddingBottom: 25 }}>
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
                        <Col xs={24} sm={24} lg={12} xl={12}>
                            <Form.Item
                                label={<CustomLabel label={"Street1"} />}
                                name={["shippingAddress", "street1"]}
                                labelAlign="left"
                                labelCol={{ span: isModal? 8: 5 }}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} lg={12} xl={12}>
                            <Form.Item
                                label={<CustomLabel label={"Street2"} />}
                                name={["shippingAddress", "street2"]}
                                labelAlign="left"
                                labelCol={{ span: isModal? 8: 5}}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} lg={12} xl={12}>
                            <Form.Item
                                label={<CustomLabel label={"City"} />}
                                name={["shippingAddress", "city"]}
                                labelAlign="left"
                                labelCol={{span: isModal? 8: 5}}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} lg={12} xl={12}>
                            <Form.Item
                                label={<CustomLabel label={"Pincode"} />}
                                name={["shippingAddress", "pincode"]}
                                labelAlign="left"
                                labelCol={{ span: isModal? 8: 5 }}
                            >
                                <Input value={billing.pincode} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} lg={12} xl={12}>
                            <Form.Item
                                label={<CustomLabel label={"State"} />}
                                name={["shippingAddress", "state"]}
                                labelAlign="left"
                                labelCol={{span: isModal? 8: 5 }}
                            >
                                <Select
                                    options={CustomerData.states}
                                    style={{ width: "150px" }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default CoustomersForm;
