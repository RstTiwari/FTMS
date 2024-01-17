import React, { useState,useRef ,useEffect} from 'react'
import { Form ,Select,Divider,Space,Input,Button,Row,Col, DatePicker,InputNumber} from 'antd'
import {PlusOutlined,CloseOutlined,DeleteOutlined}  from "@ant-design/icons"
import DropDownCoustom from 'components/DropDownCoustom'
import TextArea from 'antd/es/input/TextArea'
import {companyDetails}  from "../Data/LeadData"
import { quoteAddProductColumn}  from "../Data/QuotationData"
import { productOption } from 'Data/ProductData'



const QuotationForm = ({current}) => {
  const[form] = Form.useForm()
  const [company ,setCompany]  = useState([])
  const [producName,setCompanyName] = useState([])


  // state for Item
  const [bestOffer,setBestOffer] = useState(0)
  const [finalAmount,setFinalAmount] = useState(0)
  const [srNo,setSrNo] = useState(1)
  const handleInputChange = async (value) => {
      setCompany(companyDetails);
  };
 

  const handleItemInputChange = async ()=>{
       setCompanyName(productOption)
  }
  const onRateChange = async (value, subField) => {
    const formData = current.getFieldValue("items")
    const items = [...formData]
    const rowManipulated = items[subField.key]
    console.log(rowManipulated);
    // const discountPercent =
    //     current.getFieldValue(["items", subField.name, "percentDiscount"]) || 0;
    // const qty = current.getFieldValue(["items", subField.name, "qty"]) || 0;
      const discountAmount = Math.floor((value * rowManipulated.percentDiscount) / 100);
      rowManipulated.bestOffer = value - discountAmount;
    //  rowManipulated.finalAmount = bestOffer * rowManipulated.qty;
    // console.log(rowManipulated,bestOffer,finalAmount);
    // // rowManipulated.finalAmount = finalAmount
    // rowManipulated.bestOffer = bestOffer
    // allItems[subField.key -1] = rowManipulated
    // console.log(items);

    // form.setFieldsValue({
    //     [`items[${subField.name}].finalAmount`]: finalAmount,
    //     [`items[${subField.name}].bestOffer`]: bestOffer,
    // });
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
                    options={company}
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
                <Col className="gutter-row" span={3}>
                    <p>{"Final Amount"}</p>
                </Col>
            </Row>

            <Form.List name={"items"}  initialValue={[{bestOffer:0,finalAmount:0,qty:1,rate:0,percentDiscount:0}]} >
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
                                                width: 250,
                                            }}
                                            options={producName}
                                            dropdownRender={(menu) => (
                                                <DropDownCoustom
                                                    option={menu}
                                                    placeHolder="Search New Item"
                                                    buttonName="Add New"
                                                    onInputChange={
                                                        handleItemInputChange
                                                    }
                                                />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={[subField.name, "rate"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(value) => onRateChange(value, subField)}
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
                                        <InputNumber style={{ width: 75 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item
                                        name={[subField.name, "bestOffer"]}
                                    >
                                        <InputNumber
                                           readOnly
                                           className="moneyInput"
                                           value={finalAmount}
                                           min={0}
                                           controls={false}
                                           style={{ width: 75 }}

                                        />

                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={[subField.name, "qty"]}>
                                        <InputNumber style={{ width: 75 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item
                                        name={[subField.name, "finalAmount"]}

                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            value={finalAmount}
                                            min={0}
                                            controls={false}
                                            style={{ width: 75 }}
                                        />
                                        
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
                            type="primary"
                            onClick={() => {
                                subOpt.add({bestOffer:0,finalAmount:0}); // Use srNo instead of srN
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
            <Col className="gutter-row">
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<PlusOutlined />}
                        block
                    >
                        Save
                    </Button>
                </Form.Item>
            </Col>
        </div>
    );
};

export default QuotationForm
