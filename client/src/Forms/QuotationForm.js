import React, { useState } from 'react'
import { Form ,Select,Divider,Space,Input,Button,Row,Col} from 'antd'
import { LeadOption ,companyDetails,leadStatus} from 'Data/LeadData'
import {PlusOutlined}  from "@ant-design/icons"
import DropDownCoustom from 'components/DropDownCoustom'
import TextArea from 'antd/es/input/TextArea'

const QuotationForm = () => {
  const [quoteNo,setQuoteNo] = useState("123456")
  
    return (
        <div>
          <Row justify={"start"}>
          <Col span={24} >
          <Form.Item
                label={"Select Coustomer"}
                name={"coustomer"}
                labelAlign ="left"
                labelCol={{span:6}}
                rules={[
                    {
                        required: "true",
                        message: "Please Select Coustomer",
                    },
                ]}
            >
                <Select
                    dropdownRender={() => (
                        <>
                            <DropDownCoustom
                                option={[]}
                                placeHolder={"Search Coustomer"}
                                buttonName={"Add New"}
                            />
                        </>
                    )}
                />
          </Form.Item>
          <Form.Item
                label={"Quote#"}
                name={"quote"}
                labelAlign ="left"
                labelCol={{span:6}}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
            >
              <Input 
              defaultValue={quoteNo}
              />
          </Form.Item>
          </Col>
          </Row>  
        </div>
    );
};

export default QuotationForm
