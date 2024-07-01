import React from "react";
import { Form, Row, Col, Input, InputNumber, Button, Divider } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import ProductModal from "components/ProductModal";
import FormItemCol from "components/SmallComponent/FormItemCol";
import Taglabel from "components/SmallComponent/Taglabel";

const QuotationForm = ({ current }) => {
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const inputWidth = isLaptop ? 700 : 350;
    const inputFontSize = isLaptop ? "1rem" : "0.4rem";

    const items = current?.getFieldsValue(["items"]);

    const handleCustomerChange = (value) => {
        current.setFieldsValue({ customer: value });
    };

    const onDescriptionChange = (value, subField) => {
        // Your logic here
    };

    const onRateChange = (value, subField) => {
        // Your logic here
    };

    const onQtyChange = (value, subField) => {
        // Your logic here
    };

    const onSgstChange = (value, subField) => {
        // Your logic here
    };

    const onCgstChange = (value, subField) => {
        // Your logic here
    };

    const onIgstChange = (value, subField) => {
        // Your logic here
    };

    return (
        <div style={{height:"100vh"}}>
            <FormItemCol
                label={"Select Customer"}
                name={"customer"}
                labelAlign="left"
                labelCol={{ span: 6 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Select Customer",
                    },
                ]}
                type="model"
                customerSelect=""
                handleCustomerChange={handleCustomerChange}
            />

            <FormItemCol
                label={"#Quote"}
                name={"quoteNo"}
                labelAlign="left"
                labelCol={{ span: 6 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
            />

            <Row>
                <FormItemCol
                    label={"Invoice Date"}
                    name={"quoteDate"}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Quote Date",
                        },
                    ]}
                    labelAlign="left"
                    type={"date"}
                />
                <FormItemCol
                    label={"Due Date"}
                    name={"expiryDate"}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Quote Expiry Date",
                        },
                    ]}
                    labelAlign="left"
                    labelCol={{ span: 6 }}
                    type={"date"}
                />
            </Row>

            <Divider dashed />
            <Row style={{ position: "relative" }}>
                <Col className="gutter-row" span={4}>
                    <Taglabel  text={"Description"}  />
                    <p></p>
                </Col>
                <Col className="gutter-row" span={2}>
                    <Taglabel  text={"HSN CODE"}/>
                </Col>
                <Col className="gutter-row" span={2}>
                    <Taglabel  text={"Qty"}/>
                </Col>
                <Col className="gutter-row" span={2}>
                    <Taglabel  text={"Rate"}/>
                </Col>
              
                
                <Col className="gutter-row" span={2}>
                    <Taglabel  text={"Tax%"}/>
                </Col>
              
                <Col className="gutter-row" span={3}>
                    <Taglabel  text={"Final Amount"}/>
                </Col>
            </Row>
            <Form.List
                name={"items"}
                initialValue={[
                    {
                        finalAmount: 0,
                        qty: 1,
                        rate: 0,
                        taxPercent: 0,
                        finalAmount: 0,
                        description:""
                    },
                ]}
            >
                {(subFields, subOpt) => (
                    <div>
                        {subFields.map((subField) => (
                            <Row
                                key={subField.key}
                                align={"middle"}
                            >
                                <Col className="gutter-row" span={4}>
                                    <Form.Item
                                        name={[subField.name, "description"]}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please Select the description",
                                            },
                                        ]}
                                    >
                                        <ProductModal
                                            productSelect={(label) =>
                                                onDescriptionChange(
                                                    label,
                                                    subField
                                                )
                                            }
                                            productValue={
                                                items ? items[subField.key] : ""
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "hsnCode"]}
                                    >
                                        <Input style={{ width: 60 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item name={[subField.name, "rate"]}>
                                        <InputNumber
                                            style={{ width: 75 }}
                                            onChange={(value) =>
                                                onRateChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item name={[subField.name, "qty"]}>
                                        <InputNumber
                                            style={{ width: 60 }}
                                            onChange={(value) =>
                                                onQtyChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name={[subField.name, "taxPercent"]}
                                    >
                                        <InputNumber
                                            className="moneyInput"
                                            min={0}
                                            style={{ width: 60 }}
                                            onChange={(value) =>
                                                onIgstChange(value, subField)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item
                                        name={[subField.name, "finalAmount"]}
                                    >
                                        <InputNumber
                                            readOnly
                                            className="moneyInput"
                                            min={0}
                                            controls={false}
                                            style={{ width: 80 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
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
                                subOpt.add({
                                    description: "",
                                    qty: 1,
                                    rate: 0,
                                    taxableAmount: 0,
                                    sgstPercent: 0,
                                    cgstPercent: 0,
                                    igstPercent: 0,
                                    finalAmount: 0,
                                }); // Use srNo instead of srN
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
            {/* Other form items go here */}
        </div>
    );
};

export default QuotationForm;
