import React,{useState} from 'react'
import {Form, Select,Col,Input,Row, DatePicker,Divider,InputNumber,Button}  from "antd"
import { DeleteOutlined,PlusOutlined } from '@ant-design/icons'
import DropDownCoustom from 'components/DropDownCoustom'
import { companyDetails } from 'Data/LeadData'

const Invoice = ({current}) => {
  const [company ,setCompany]  = useState([])
  const handleInputChange = async (value) => {
    setCompany(companyDetails);
};
const handleItemInputChange =()=>{
    console.log()
}

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
              <Col span={10}>
                  <Select
                      options={company}
                      showSearch
                      dropdownRender={(menu) => (
                          <>
                              <DropDownCoustom
                                  option={menu}
                                  placeHolder={"Search Coustomer"}
                                  buttonName={"Add New"}
                              />
                          </>
                      )}
                  />
              </Col>
          </Form.Item>
          <Form.Item
              label={"Invoice#"}
              name={"invoiceNo"}
              labelAlign="left"
              labelCol={{ span: 6 }}
              rules={[
                  {
                      required: "true",
                      message: "Please Fill InvoiceNo",
                  },
              ]}
          >
              <Col span={10}>
                  <Input />
              </Col>
          </Form.Item>
          <Form.Item
              label={"OrderNo"}
              name={"orderNo"}
              labelAlign="left"
              labelCol={{ span: 6 }}
          >
              <Col span={10}>
                  <Input />
              </Col>
          </Form.Item>
          <Row>
              <Col xs={24} sm={24} md={12} lg={12}>
                  <Form.Item
                      label={"Invoice Date"}
                      name={"invoiceNo"}
                      rules={[
                          {
                              required: true,
                              message: "Please Select Invocie Date",
                          },
                      ]}
                      labelAlign="left"
                      labelCol={{ span: 12 }}
                  >
                      <DatePicker
                          placeholder="Invoice Date"
                          format={"DD/MM/YY"}
                      />
                  </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                  <Form.Item
                      label={"Due Date"}
                      name={"invoiceExpiredDate"}
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
              label={"SalesPerson"}
              name={"salesPerson"}
              labelAlign="left"
              labelCol={{ span: 6 }}
          >
              <Col span={6}>
                  <Input />
              </Col>
          </Form.Item>
          <Row>
              <h3>Item Table</h3>
          </Row>
          <Divider dashed />
          <Row gutter={[12, 12]} style={{ position: "relative" }}>
              <Col className="gutter-row" span={5}>
                  <p>{"Description"}</p>
              </Col>
              <Col className="gutter-row" span={2}>
                  <p>{"HSN Code"}</p>
              </Col>
              <Col className="gutter-row" span={2}>
                  <p>{"Qty"}</p>
              </Col>
              <Col className="gutter-row" span={2}>
                  <p>{"Rate"}</p>
              </Col>
              <Col className="gutter-row" span={2}>
                  <p>{"Taxable Amount"}</p>
              </Col>
              <Col className="gutter-row" span={2}>
                  <p>{"SGST%"}</p>{" "}
              </Col>
              <Col className="gutter-row" span={2}>
                  <p>{"CGST%"}</p>{" "}
              </Col>
              <Col className="gutter-row" span={2}>
                  <p>{"IGST%"}</p>
              </Col>
              <Col className="gutter-row" span={3}>
                  <p>{"Final Amount"}</p>
              </Col>
          </Row>
          <Form.List
                name={"items"}
                initialValue={[
                    {
                        bestOffer: 0,
                        finalAmount: 0,
                        qty: 1,
                        rate: 0,
                        percentDiscount: 0,
                    },
                ]}
            >
                {(subFields, subOpt) => (
                    <div>
                        {subFields.map((subField) => (
                            <Row
                                gutter={[12, 12]}
                                key={subField.key}
                                align={"middle"}
                            >
                                <Col className="gutter-row" span={5}>
                                    <Form.Item
                                        name={[subField.name, "description"]}
                                    >
                                        <Select
                                            style={{
                                                width: 200,
                                            }}
                                            dropdownRender={(menu) => (
                                                <DropDownCoustom
                                                    option={menu}
                                                    placeHolder="Search New Item"
                                                    buttonName="Add New"
                                                  
                                                />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item name={[subField.name, "hsnCode"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                          
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item name={[subField.name, "qty"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                          
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item name={[subField.name, "rate"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                          
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "taxableAmount"]}
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            min={0}
                                            controls={false}
                                            style={{ width: 75 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item name={[subField.name, "sgstPercent"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                         
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "cgstPercent"]}
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            min={0}
                                            controls={false}
                                            style={{ width: 75 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "igstPercent"]}
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            min={0}
                                            controls={false}
                                            style={{ width: 75 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "finalAmpount"]}
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            min={0}
                                            controls={false}
                                            style={{ width: 75 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                <Form.Item>
                                    <DeleteOutlined
                                        onClick={() => {
                                            subOpt.remove(subField.name);
                                        }}
                                    />
                                </Form.Item>
                                </Col>
                               
                            </Row>
                        ))}

                        <Button
                            type="primary"
                            onClick={() => {
                                subOpt.add(); // Use srNo instead of srN
                            }}
                            icon={<PlusOutlined />}
                            style={{
                                marginBottom: "1rem",
                                background: "green",
                            }}
                            block
                        >
                            Add Item
                        </Button>
                    </div>
                )}
            </Form.List>
      </div>
  );
}

export default Invoice
