import React, { useState } from 'react'
import { Form ,Select,Divider,Space,Input,Button} from 'antd'
import { LeadOption ,companyDetails,leadStatus} from 'Data/LeadData'
import {PlusOutlined}  from "@ant-design/icons"
import DropDownCoustom from 'components/DropDownCoustom'
import TextArea from 'antd/es/input/TextArea'
const LeadForm = () => {
    const [compnayDetails ,setCompanyDetails]  = useState([])
    const handleInputChange = async (value) => {
        setCompanyDetails(companyDetails);
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
              label={"Select Company"}
              name={"company"}
              hasFeedback
              rules={[
                  {
                      required: true,
                      message: "Plese Select Company",
                  },
              ]}
          >
              <Select
                  labelInValue
                  allowClear={true}
                  options={compnayDetails}
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
          <Form.Item label="Add Remark" name="addComment">
              <Input.TextArea />
          </Form.Item>
          <Form.Item>
              <Button type="primary" htmlType="submit">
                  Save
              </Button>
          </Form.Item>
      </div>
  );
}

export default LeadForm
