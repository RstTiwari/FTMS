import {
    Flex,
    Form,
    Input,
    Col,
    Row,
    Button,
    Typography,
    Select,
    Tabs,
} from "antd";
import { useMediaQuery } from "@mui/material";
import TabPane from "antd/es/tabs/TabPane";
import React, { useState } from "react";
import CustomLabel from "components/Comman/CustomLabel";
import CustomInput from "components/Comman/CustomInput";
import FormItemCol from "components/Comman/FormItemCol";
import CustomerData from "Data/CoustomerData";

const { Text } = Typography;

const VendorsForm = ({ form, disabled, isModal }) => {
    const handeCopyBillingAddress = () => {
        const { billingAddress } = form.getFieldsValue(["billingAddress"]);
        form.setFieldsValue({ shippingAddress: billingAddress });
    };

    return (
      <div>
        <FormItemCol
          label={"Vendors Name"}
          labelAlign="left"
          name="name"
          width={"30vw"}
          required={true}
          labelCol={{ span: isModal ? 18 : 8 }}
          rules={[
            {
              required: true,
              message: "Please Provide Vendors Name",
            },
          ]}
          type={"text"}
        />
        <FormItemCol
          label={"Vendors Phone"}
          required={true}
          labelAlign="left"
          width={"30vw"}
          name="phone"
          labelCol={{ span: isModal ? 18 : 8 }}
          rules={[
            {
              required: true,
              message: "Please Provide Vendors Phone",
            },
          ]}
          type={"text"}
        />
        <FormItemCol
          label={"Vendors Email"}
          labelAlign="left"
          name="email"
          labelCol={{ span: isModal ? 18 : 8 }}
          required={true}
          width={"30vw"}
          rules={[
            {
              required: true,
              message: "Please Provide Vendors Email",
            },
          ]}
          type={"text"}
        />
        <Tabs>
          <TabPane tab="Address Details" key={1}>
            <Row style={{ display: "flex", padding: 5 }}>
              <Col sm={24} xs={24} md={24} lg={8} style={{ padding: 10 }}>
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
                      labelCol={{ span: isModal ? 8 : 5 }}
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
                      labelCol={{ span: isModal ? 8 : 5 }}
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
                      labelCol={{ span: isModal ? 8 : 5 }}
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
                      labelCol={{ span: isModal ? 8 : 5 }}
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
                      labelCol={{ span: isModal ? 8 : 5 }}
                    >
                      <Select
                        options={CustomerData.states}
                        style={{
                          width: isModal ? "100%" : "100%",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col sm={24} xs={24} md={12} lg={8} style={{ padding: 10 }}>
                <Row style={{ paddingBottom: 25 }}>
                  <Text type="secondary" style={{ fontWeight: 900 }}>
                    Shipping Address
                  </Text>
                  {!disabled ? (
                    <Button
                      onClick={handeCopyBillingAddress}
                      style={{
                        color: "green",
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                    >
                      COPY
                    </Button>
                  ) : (
                    ""
                  )}
                </Row>

                <Row>
                  <Col xs={24} sm={24} lg={24} xl={24}>
                    <Form.Item
                      label={<CustomLabel label={"Street1"} />}
                      name={["shippingAddress", "street1"]}
                      labelAlign="left"
                      labelCol={{ span: isModal ? 8 : 5 }}
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} lg={24} xl={24}>
                    <Form.Item
                      label={<CustomLabel label={"Street2"} />}
                      name={["shippingAddress", "street2"]}
                      labelAlign="left"
                      labelCol={{ span: isModal ? 8 : 5 }}
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col xs={24} sm={24} lg={24} xl={24}>
                    <Form.Item
                      label={<CustomLabel label={"City"} />}
                      name={["shippingAddress", "city"]}
                      labelAlign="left"
                      labelCol={{ span: isModal ? 8 : 5 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} lg={24} xl={24}>
                    <Form.Item
                      label={<CustomLabel label={"Pincode"} />}
                      name={["shippingAddress", "pincode"]}
                      labelAlign="left"
                      labelCol={{ span: isModal ? 8 : 5 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col xs={24} sm={24} lg={24} xl={24}>
                    <Form.Item
                      label={<CustomLabel label={"State"} />}
                      name={["shippingAddress", "state"]}
                      labelAlign="left"
                      labelCol={{ span: isModal ? 8 : 5 }}
                    >
                      <Select
                        options={CustomerData.states}
                        style={{
                          width: isModal ? "100%" : "100%",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Other Details">
            <FormItemCol
              label={"Contact Person"}
              name={"contactPerson"}
              labelAlign="left"
              labelCol={{ span: isModal ? 18 : 8 }}
              type={"text"}
              width={"30vw"}
            />

            <FormItemCol
              label={"Pan No"}
              labelAlign="left"
              tooltip="this data  will be Encrypted then stored not visible to other people  accept access given  "
              name="panNo"
              labelCol={{ span: isModal ? 18 : 8 }}
              type={"text"}
              width={"30vw"}
            />

            <FormItemCol
              label={"Gst No"}
              labelAlign="left"
              tooltip="this data  will be Encripted then stored not visible to other pepole  accept acces given  "
              name="gstNo"
              labelCol={{ span: isModal ? 18 : 8 }}
              width={"30vw"}
            />
          </TabPane>
        </Tabs>
      </div>
    );
};

export default VendorsForm;
