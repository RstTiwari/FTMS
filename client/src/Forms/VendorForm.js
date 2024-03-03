import { ArrowDropDown } from "@mui/icons-material";
import { Flex, Form, Input, Col, Row, Button } from "antd";
import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";

const VendorForm = ({ handleFormFinish, value, disabled }) => {
    const [form] = Form.useForm();
    const isLaptop = useMediaQuery("(min-width:600px)");
    const [billing, setBilling] = useState({
        street: "",
        city: "",
        state: "",
        pincode: "",
    });
    const handeCopyBillingAddress = () => {
        const { billingStreet, billingCity, billingState, billingPincode } =
            form.getFieldsValue([
                "billingStreet",
                "billingCity",
                "billingState",
                "billingPincode",
            ]);
        form.setFieldsValue({ shippingStreet: billing.street });
        form.setFieldsValue({ shippingCity: billing.city });
        form.setFieldsValue({ shippingState: billing.state });
        form.setFieldsValue({ shippingPincode: billing.pincode });
    };

    return (
        <Form name={"venordForm"} form={form} initialValues={value} onFinish={handleFormFinish}>
            <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                    label={"Vendor Name "}
                    name={"vendorName"}
                    labelAlign="left"
                    labelCol={{ span: 8}}
                    rules={[
                        {
                            required: true,
                            message: "Please Provide Vendor Name",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                    label={"Vendor Phone"}
                    labelAlign="left"
                    name="vendorPhone"
                    labelCol={{ span: 8}}
                    rules={[
                        {
                            required: true,
                            message: "Please Provide Vendor Phone",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                    label={"Vendor Email"}
                    labelAlign="left"
                    name="vendorEmail"
                    labelCol={{ span: 8}}
                    rules={[
                        {
                            required: true,
                            message: "Please Provide Vendor Email",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                    label={"Contact Person"}
                    name={"contactPerson"}
                    labelAlign="left"
                    labelCol={{ span: 8}}
                >
                    <Input />
                </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                    label={"PAN NO"}
                    labelAlign="left"
                    tooltip="this data  will be Encripted then stored not visible to other pepole accpet accept acces given  "
                    name="panNo"
                    labelCol={{ span: 8}}
                >
                    <Input />
                </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                    label={"GST NO"}
                    labelAlign="left"
                    tooltip="this data  will be Encripted then stored not visible to other pepole accpet accept acces given  "
                    name="gstNo"
                    labelCol={{ span: 8}}
                >
                    <Input />
                </Form.Item>
            </Col>

            <Row justify={"center"}>
                <h2>Address & Details</h2>
            </Row>
            <Row xs={24} sm={24} md={24} lg={24}>
                <Col sm={24} xs={24} md={12} lg={12}>
                    <Row>Billing Address</Row>
                    <Row>
                        <Form.Item
                            label={"`Address"}
                            labelAlign="left"
                            name="billingStreet"
                            style={{
                                marginTop: "1rem",
                            }}
                        >
                            <Input.TextArea
                                style={{
                                    width: isLaptop ? 300 : 250,
                                    height: 100,
                                }}
                                onChange={(e) =>
                                    setBilling({
                                        ...billing,
                                        street: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label="City"
                            name={"billingCity"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Input
                                onChange={(e) =>
                                    setBilling({
                                        ...billing,
                                        city: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label="State"
                            name={"billingState"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Input
                                onChange={(e) =>
                                    setBilling({
                                        ...billing,
                                        state: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label="Pin Code"
                            name={"billingPincode"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Input
                                onChange={(e) =>
                                    setBilling({
                                        ...billing,
                                        pincode: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </Row>
                </Col>
                <Col sm={12} md={12} lg={12}>
                    <Row>
                        Shipping Address
                        {!disabled ? (
                            <Col
                                style={{ color: "blue", cursor: "pointer" }}
                                onClick={handeCopyBillingAddress}
                            >
                                (Copy Billing Address)
                            </Col>
                        ) : (
                            ""
                        )}
                    </Row>

                    <Row>
                        <Form.Item
                            label={"`Address"}
                            labelAlign="left"
                            name="shippingStreet"
                            style={{
                                marginTop: "1rem",
                            }}
                        >
                            <Input.TextArea
                                controls={false}
                                style={{
                                    width: isLaptop ? 300 : 250,
                                    height: 100,
                                }}
                                value={billing.street}
                            />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label="City"
                            name={"shippingCity"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Input value={billing.city} />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label="State"
                            name={"shippingState"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Input value={billing.state} />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label="Pin Code"
                            name={"shippingPincode"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Input value={billing.pincode} />
                        </Form.Item>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Button type="primary" htmlType="submit">
                   SAVE 
                </Button>
            </Row>
        </Form>
    );
};

export default VendorForm;
