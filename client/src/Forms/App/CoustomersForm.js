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
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import CustomLabel from "components/Comman/CustomLabel";
import FormItemCol from "components/Comman/FormItemCol";
import CustomerData from "Data/CoustomerData";
import TabPane from "antd/es/tabs/TabPane";

const { Text } = Typography;

const CoustomersForm = ({ form, disabled, isModal, style }) => {
  const handelCopyBillingAddress = () => {
    const { billingAddress } = form.getFieldsValue(["billingAddress"]);
    form.setFieldsValue({ shippingAddress: billingAddress });
  };
  const [demo,setDemo] = useState(false)
  const handleDemoCustomer = (demo, isDemo) => {
    form.resetFields();
    setDemo(demo);
    form.setFieldValue("isDemo", isDemo);
  };
  

  return (
      <div>
          {isModal &&
              (demo ? (
                  <Button onClick={() => handleDemoCustomer(false, false)}>
                      Add Regular Customer
                  </Button>
              ) : (
                  <Button onClick={() => handleDemoCustomer(true, true)}>
                      Add Demo Customer
                  </Button>
              ))}
          {demo ? (
              <div style={{ margin: "20px" }}>
                  <FormItemCol
                      label={"Name"}
                      labelAlign="left"
                      name="name"
                      width={"30vw"}
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
                      label={"Address"}
                      labelAlign="left"
                      name="address"
                      width={"30vw"}
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
                      label={"Phone"}
                      labelAlign="left"
                      width={"30vw"}
                      name="phone"
                      labelCol={{ span: 8 }}
                      maxLength={10}
                      type={"number"}
                  />
                  <FormItemCol
                      labelAlign="left"
                      name="isDemo"
                      width={"30vw"}
                      required={true}
                      labelCol={{ span: 8 }}
                      hidden={true}

                  />
              </div>
          ) : (
              <Tabs>
                  <TabPane tab="General Info" key={1}>
                      <FormItemCol
                          label={"Name"}
                          labelAlign="left"
                          name="name"
                          width={"30vw"}
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
                          label={"Name"}
                          labelAlign="left"
                          name="isDemo"
                          width={"30vw"}
                          required={true}
                          hidden={true}
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
                          label={"Phone"}
                          labelAlign="left"
                          width={"30vw"}
                          name="phone"
                          labelCol={{ span: 8 }}
                          maxLength={10}
                          type={"number"}
                      />
                      <FormItemCol
                          label={"Email"}
                          labelAlign="left"
                          name="email"
                          labelCol={{ span: 8 }}
                          width={"30vw"}
                          type={"text"}
                      />
                      <FormItemCol
                          label={"Alternate Email"}
                          labelAlign="left"
                          name="alternateEmail"
                          labelCol={{ span: 8 }}
                          width={"30vw"}
                          type={"text"}
                      />
                      <FormItemCol
                          label={"Pan No"}
                          labelAlign="left"
                          tooltip="this data  will be Encrypted then stored not visible to other people  accept access given  "
                          name="panNo"
                          labelCol={{ span: 8 }}
                          type={"text"}
                          width={"30vw"}
                      />

                      <FormItemCol
                          label={"Gst No"}
                          labelAlign="left"
                          tooltip="this data  will be Encripted then stored not visible to other pepole  accept acces given  "
                          name="gstNo"
                          labelCol={{ span: 8 }}
                          width={"30vw"}
                      />
                      <FormItemCol
                          label={"Contact Person"}
                          name={"contactPerson"}
                          labelAlign="left"
                          labelCol={{ span: 8 }}
                          type={"text"}
                          width={"30vw"}
                      />
                  </TabPane>
                  <TabPane tab="Address Details" key={2}>
                      <Row justify={"start"}>
                          <Col span={10}>
                              <Text
                                  type="secondary"
                                  style={{ fontWeight: 900 }}
                              >
                                  BILLING ADDRESS
                              </Text>
                          </Col>
                          <Col span={10} style={{ textAlign: "left" }}>
                              <Text
                                  type="secondary"
                                  style={{ fontWeight: 900 }}
                              >
                                  SHIPPING ADDRESS
                              </Text>
                              <Text
                                  onClick={handelCopyBillingAddress}
                                  style={{
                                      color: "green",
                                      cursor: "pointer",
                                      fontWeight: 500,
                                      marginLeft: 3,
                                  }}
                              >
                                  COPY
                                  <Tooltip title={"Copy Billing Address"}>
                                      <span
                                          style={{
                                              cursor: "pointer",
                                              color: "red   ",
                                              fontSize: "1rem",
                                          }}
                                      >
                                          {" "}
                                          *
                                      </span>
                                  </Tooltip>
                              </Text>
                          </Col>
                      </Row>
                      <Row style={{ display: "flex" }} gutter={[20]}>
                          <Col
                              sm={24}
                              xs={24}
                              md={24}
                              lg={10}
                              style={{ padding: 10 }}
                          >
                              <Row style={{ paddingBottom: 10 }}></Row>
                              <Row>
                                  <Col xs={24} sm={24} lg={24} xl={24}>
                                      <Form.Item
                                          label={
                                              <CustomLabel label={"Street1"} />
                                          }
                                          name={["billingAddress", "street1"]}
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
                                          label={
                                              <CustomLabel label={"Street2"} />
                                          }
                                          name={["billingAddress", "street2"]}
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
                                          label={
                                              <CustomLabel label={"Pincode"} />
                                          }
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
                                          label={
                                              <CustomLabel label={"State"} />
                                          }
                                          name={["billingAddress", "state"]}
                                          labelAlign="left"
                                          labelCol={{ span: isModal ? 8 : 5 }}
                                      >
                                          <Select
                                              options={CustomerData.states}
                                              style={{
                                                  width: isModal
                                                      ? "100%"
                                                      : "100%",
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
                              lg={10}
                              style={{ padding: 10 }}
                          >
                              <Row style={{ paddingBottom: 10 }}></Row>
                              <Row>
                                  <Col xs={24} sm={24} lg={24} xl={24}>
                                      <Form.Item
                                          label={
                                              <CustomLabel label={"Street1"} />
                                          }
                                          name={["shippingAddress", "street1"]}
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
                                          label={
                                              <CustomLabel label={"Street2"} />
                                          }
                                          name={["shippingAddress", "street2"]}
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
                                          label={
                                              <CustomLabel label={"Pincode"} />
                                          }
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
                                          label={
                                              <CustomLabel label={"State"} />
                                          }
                                          name={["shippingAddress", "state"]}
                                          labelAlign="left"
                                          labelCol={{ span: isModal ? 8 : 5 }}
                                      >
                                          <Select
                                              options={CustomerData.states}
                                              style={{
                                                  width: isModal
                                                      ? "100%"
                                                      : "100%",
                                              }}
                                          />
                                      </Form.Item>
                                  </Col>
                              </Row>
                          </Col>
                      </Row>
                  </TabPane>
                  <TabPane tab="Other Details" key={3}>
                      <FormItemCol
                          label={"MFG No"}
                          labelAlign="left"
                          tooltip="registered manufacturing no "
                          name="mfgNo"
                          labelCol={{ span: 8 }}
                          width={"30vw"}
                      />
                      <FormItemCol
                          label={"MSMEB REG NO"}
                          labelAlign="left"
                          name="msmebNo"
                          labelCol={{ span: 8 }}
                          width={"30vw"}
                      />
                  </TabPane>
              </Tabs>
          )}
      </div>
  );
};

export default CoustomersForm;
