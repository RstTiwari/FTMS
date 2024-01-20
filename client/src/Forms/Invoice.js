import React,{useState} from 'react'
import {Form, Select,Col}  from "antd"
import DropDownCoustom from 'components/DropDownCoustom'
import { companyDetails } from 'Data/LeadData'

const Invoice = ({current}) => {
  const [company ,setCompany]  = useState([])
  const handleInputChange = async (value) => {
    setCompany(companyDetails);
};

  return (
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
          <Col  span={10}>
              <Select
                  options={company}
                  showSearch
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
          </Col>
      </Form.Item>
  );
}

export default Invoice
