import { ArrowDropDown } from "@mui/icons-material";
import { Flex, Form, Input, Col, Row, Button } from "antd";
import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";

const CoustomersForm = ({ current }) => {
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
        <div>
            <Form.Item
                label={"Customer Name"}
                name={"customerName"}
                labelAlign="left"
                labelCol={{ span: 3 }}
                rules={[
                    {
                        required: true,
                        message: "Please Provide Customer Name",
                    },
                ]}
            >
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input />
                </Col>
            </Form.Item>
            <Form.Item
                label={"Contact Person"}
                name={"contactPerson"}
                labelAlign="left"
                labelCol={{ span: 3 }}
            >
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input />
                </Col>
            </Form.Item>
            <Form.Item
                label={"Customer Phone"}
                labelAlign="left"
                name="customerPhone"
                labelCol={{ span: 3 }}
                
                rules={[
                    {
                        required: true,
                        message: "Please Provide Customer Phone",
                    },
                    {
                        max: 10,
                        message: "Phone must be at most 10 characters",
                    },
                ]}
            >
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input />
                </Col>
            </Form.Item>
            <Form.Item
                label={"Customer Email"}
                labelAlign="left"
                name="customerEmail"
                labelCol={{ span: 3 }}
                rules={[
                    {
                        required: true,
                        message: "Please Provide Customer Email",
                    },
                ]}
            >
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input />
                </Col>
            </Form.Item>
            <Form.Item
                label={"PAN NO"}
                labelAlign="left"
                tooltip="this data  will be Encripted then stored not visible to other pepole accpet accept acces given  "
                name="panNo"
                labelCol={{ span: 3 }}
            >
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input />
                </Col>
            </Form.Item>
            <Form.Item
                label={"GST NO"}
                labelAlign="left"
                tooltip="this data  will be Encripted then stored not visible to other pepole accpet accept acces given  "
                name="gstNo"
                labelCol={{ span: 3 }}
                rules={[
                    {
                        required: true,
                        message: "Please Provide GST No",
                    },
                    {
                        max: 15,
                        message: "GST  must be at most 15 characters",
                    },
                ]}
            >
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input />
                </Col>
            </Form.Item>
            <Row justify={"center"}>
                <h2>Other Details</h2>
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
                                placeholder="street1"
                                style={{
                                    width: isLaptop ? 300 : 250,
                                    height: 100,
                                }}
                                onChange={(e)=>setBilling({...billing,street:e.target.value})}
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
                            <Input   onChange={(e)=>setBilling({...billing,city:e.target.value})} />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label="State"
                            name={"billingState"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Input  onChange={(e)=>setBilling({...billing,state:e.target.value})} />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label="Pin Code"
                            name={"billingPincode"}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                        >
                            <Input  onChange={(e)=>setBilling({...billing,pincode:e.target.value})} />
                        </Form.Item>
                    </Row>
                </Col>
                <Col sm={12} md={12} lg={12}>
                    <Row>
                        Shipping Address (
                        <Col
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={handeCopyBillingAddress}
                        >
                            Copy Billing Address
                        </Col>
                        )
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
                                placeholder="street1"
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
        </div>
    );
};

export default CoustomersForm;
