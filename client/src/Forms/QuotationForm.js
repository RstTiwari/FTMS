import React, { useState } from 'react'
import { Form ,Select,Divider,Space,Input,Button,Row,Col, DatePicker,Table} from 'antd'
import {PlusOutlined}  from "@ant-design/icons"
import DropDownCoustom from 'components/DropDownCoustom'
import TextArea from 'antd/es/input/TextArea'
import {companyDetails,items}  from "../Data/LeadData"


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
                <Input  />
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
                        <DatePicker placeholder="Quote Date"  format={"DD/MM/YY"}/>
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
                        <DatePicker placeholder="Expiry Date"  format={"DD/MM/YY"} />
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
              <Input.TextArea  
              style={{width:"100%"}}
              />
            </Form.Item>
            <Form.Item>
                <Table />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                  Save
              </Button>
          </Form.Item>
        </div>
    );
};

export default QuotationForm
