import React, { useState } from "react";
import { Form, Select, Divider, Space, Input, Button, Row, Col } from "antd";
import { sourceOptions, companyDetails, leadStatus } from "Data/LeadData";
import { useAuth } from "state/AuthProvider";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomerModal from "components/CustomerModal";
import CustomLabel from "components/SmallComponent/CustomLabel";
import FormItemCol from "components/SmallComponent/FormItemCol";
const LeadForm = ({ current }) => {
    const handleCustomerChange = (value) => {
        current.setFieldsValue({ customer: value });
    };
    // const customerId = current.getFieldValue("customer");
    return (
        <div style={{height:"100vh"}}>
           <Col span={8}>
           <Form.Item
                label={<CustomLabel label={"Source"} />}
                name="source"
                hasFeedback
                labelCol={{span:10}}
                labelAlign="left"
                allowClear={true}
                rules={[
                    {
                        required: true,
                        message: "Please Select Source",
                    },
                ]}
            >
                <Select>
                    {sourceOptions.map((item) => {
                        const { label, value } = item;
                        return (
                            <>
                                <Select.Option value={value}>
                                    {label}
                                </Select.Option>
                            </>
                        );
                    })}
                </Select>
            </Form.Item>
           </Col>
          
            <FormItemCol
                label={"Select Customer"}
                name={"customer"}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Plese Select Customer",
                    },
                ]}
                customerSelect={handleCustomerChange}
                type={"model"}
            />
             <Col span={8}>
             <Form.Item
                label={<CustomLabel label={"Status"} />}
                name="status"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Plese Select Status",
                    },
                ]}
            >
                <Select options={leadStatus} />
            </Form.Item>
             </Col>

            <Form.List name={"comments"}>
                {(subFileds, subOpt) => (
                    <div>
                        {subFileds.map((subField, index) => (
                            <Row justify={"center"} align={"middle"}>
                                <Col span={16}>
                                    <Form.Item
                                        label="Add Remark"
                                        name={[subField.name, "comment"]}
                                        key={subField.name}
                                    >
                                        <Input.TextArea
                                            style={{ width: 200 }}
                                        />
                                    </Form.Item>
                                </Col>

                                <Form.Item>
                                    <DeleteOutlined
                                        disabled
                                        onClick={() => {
                                            subOpt.remove(index);
                                        }}
                                    />
                                </Form.Item>
                            </Row>
                        ))}
                        <Row justify={"center"}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    subOpt.add({
                                        comment: "",
                                    });
                                }}
                                icon={<PlusOutlined />}
                                style={{
                                    marginBottom: "1rem",
                                    background: "green",
                                }}
                            >
                                Add Remark
                            </Button>
                        </Row>
                    </div>
                )}
            </Form.List>
        </div>
    );
};

export default LeadForm;
