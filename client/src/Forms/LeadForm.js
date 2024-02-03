import React, { useState } from "react";
import { Form, Select, Divider, Space, Input, Button,Row, Col } from "antd";
import { LeadOption, companyDetails, leadStatus } from "Data/LeadData";
import DropDownCoustom from "components/DropDownCoustom";
import { useAuth } from "state/AuthProvider";
import { PlusOutlined,DeleteOutlined } from "@ant-design/icons";
const LeadForm = ({ current }) => {
    const [compnayDetails, setCompanyDetails] = useState([]);
    const { getDropDownData } = useAuth();
    const handleInputChange = async (value) => {};
    const handelDropDownClick = async () => {
        let entity = "customer";
        let fieldName = "customerName";
        let data = await getDropDownData(entity, fieldName);
        setCompanyDetails(data);
    };

    const handleCustomerChange = (value, option) => {
        const { customer } = current.getFieldsValue(["customer"]);
        current.setFieldsValue({ customer: option.value });
    };
    return (
        <div>
            <Form.Item
                label="Source"
                name="source"
                hasFeedback
                allowClear={true}
                rules={[
                    {
                        required: true,
                        message: "Please Select Source",
                    },
                ]}
            >
                <Select>
                    {LeadOption.map((item) => {
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
            <Form.Item
                label={"Select Customer"}
                name={"customer"}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Plese Select Customer",
                    },
                ]}
            >
                <Select
                    labelInValue
                    allowClear={true}
                    options={compnayDetails}
                    onClick={handelDropDownClick}
                    onChange={handleCustomerChange}
                    dropdownRender={(menu) => (
                        <DropDownCoustom
                            option={menu}
                            placeHolder="Search New Coustomer"
                            buttonName="Add New"
                            onInputChange={handleInputChange}
                        />
                    )}
                />
            </Form.Item>
            <Form.Item
                label="Status"
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
            <Form.List name={"comments"}>
                {(subFileds, subOpt) => (
                    <div>
                        {subFileds.map((subField,index) => (
                            <Row justify={"center"} align={"middle"}>
                                <Col span={16}>
                                <Form.Item
                                    label="Add Remark"
                                    name={[subField.name ,"comment"]}
                                    key={subField.name}
                                >
                                <Input.TextArea style={{width:200}} />
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
                                    comment:""
                                }); // Use srNo instead of srN
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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </div>
    );
};

export default LeadForm;
