import React, { useState } from 'react'
import { Form ,Select,Divider,Space,Input,Button,Row,Col, DatePicker,InputNumber} from 'antd'
import {PlusOutlined,CloseOutlined,DeleteOutlined}  from "@ant-design/icons"
import DropDownCoustom from 'components/DropDownCoustom'
import TextArea from 'antd/es/input/TextArea'
import {companyDetails,items}  from "../Data/LeadData"
import { quoteAddProductColumn}  from "../Data/QuotationData"


const QuotationForm = () => {
  const [compnayDetails ,setCompanyDetails]  = useState([])
  const handleInputChange = async (value) => {
      setCompanyDetails(companyDetails);
  };
  
    return (
        <div>
            <Form.Item
                label={"Select Coustomer"}
                name={"coustomer"}
                labelAlign="left"
                labelCol={{ span: 6 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Select Coustomer",
                    },
                ]}
            >
                <Select
                    options={companyDetails}
                    dropdownRender={(menu) => (
                        <>
                            <DropDownCoustom
                                option={menu}
                                placeHolder={"Search Coustomer"}
                                buttonName={"Add New"}
                                onInputChange={handleInputChange}
                            />
                        </>
                    )}
                />
            </Form.Item>
            <Form.Item
                label={"Quote#"}
                name={"quoteNo"}
                labelAlign="left"
                labelCol={{ span: 6 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Row>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                        label={"Quote Date"}
                        name={"quoteDate"}
                        rules={[
                            {
                                required: true,
                                message: "Please Select Quote Date",
                            },
                        ]}
                        labelAlign="left"
                        labelCol={{ span: 12 }}
                    >
                        <DatePicker
                            placeholder="Quote Date"
                            format={"DD/MM/YY"}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                        label={"Expiry Date"}
                        name={"quoteExpiryDate"}
                        rules={[
                            {
                                required: true,
                                message: "Please Select Quote Expiry Date",
                            },
                        ]}
                        labelAlign="left"
                        labelCol={{ span: 6 }}
                    >
                        <DatePicker
                            placeholder="Expiry Date"
                            format={"DD/MM/YY"}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label="Atten Per"
                name={"attenPerson"}
                labelAlign="left"
                labelCol={{ span: 6 }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Sub"
                name={"subject"}
                labelAlign="left"
                labelCol={{ span: 6 }}
            >
                <Input size="large" maxLength={100} />
            </Form.Item>
            <Form.Item
                label="Message"
                name={"message"}
                labelAlign="left"
                labelCol={{ span: 6 }}
            >
                <Input.TextArea style={{ width: "100%" }} />
            </Form.Item>
            <Divider dashed />
            <Row gutter={[12, 12]} style={{ position: "relative" }}>
                <Col className="gutter-row" span={7}>
                    <p>{"Description"}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"Rate"}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"Discount %"}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"Best Offer"}</p>{" "}
                </Col>
                <Col className="gutter-row" span={3}>
                    <p>{"Qty"}</p>
                </Col>
                <Col className="gutter-row" span={5}>
                    <p>{"Final Amount"}</p>
                </Col>
            </Row>

            <Form.List name={"items"}>
                {(subFields, subOpt) => (
                    <div>
                        {subFields.map((subField) => (
                            <Row
                                gutter={[12, 12]}
                                key={subField.key}
                                align={"middle"}
                            >
                                <Col className="gutter-row" span={7}>
                                    <Form.Item
                                        name={[subField.name, "description"]}
                                    >
                                        <Select
                                            style={{
                                                width: 300,
                                            }}  
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={[subField.name, "rate"]}>
                                        <Input
                                            style={{ width: 100 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item
                                        name={[
                                            subField.name,
                                            "percentDiscount",
                                        ]}
                                    >
                                        <Input style={{ width: 100 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item
                                        name={[subField.key, "bestOffer"]}
                                    >
                                        <Input  style={{ width: 100 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={[subField.key, "qty"]}>
                                        <Input style={{ width: 100 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item
                                        name={[subField.key, "finalAmount"]}
                                    >
                                        <Input  style={{ width: 100 }}/>
                                    </Form.Item>
                                </Col>
                               <Form.Item>
                               <DeleteOutlined
                                    onClick={() => {
                                        subOpt.remove(subField.name);
                                    }}
                                />
                               </Form.Item>
                               
                            </Row>
                        ))}
                        <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            icon={<PlusOutlined />}
                            style={{ marginBottom: "1rem" }}
                            block
                        >
                            Add Item
                        </Button>
                    </div>
                )}
            </Form.List>
            <Form.Item></Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </div>
    );
};

export default QuotationForm
