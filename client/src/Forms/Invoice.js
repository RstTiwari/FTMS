import React from "react";
import { Form, Row, Col, Input, InputNumber, Button, Divider } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import ProductModal from "components/ProductModal";
import FormItemCol from "components/SmallComponent/FormItemCol";
import Taglabel from "components/SmallComponent/Taglabel";
import CustomSelect from "components/SmallComponent/CustomSelect";
import CustomModel from "components/CustomModal";

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
        <div style={{ height: "100vh" }}>
            <FormItemCol
                label={"Select Customer"}
                name={"customer"}
                labelAlign="left"
                labelCol={{ span: 8}}
                required={true}
                
                rules={[
                    {
                        required: "true",
                        message: "Please Select Customer",
                    },
                ]}
                type="model"
                entity ="customers"
                width="35%"
                customerSelect=""
                handleCustomerChange={handleCustomerChange}
            />

            <FormItemCol
                label={"Invoice#"}
                name={"quoteNo"}
                required={true}
                type={"entityNo"}
                labelAlign="left"
                labelCol={{ span: 8 }}
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
                    required={true}
                    labelCol={{span:8}}
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
                    required={true}
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
            <div
                style={{
                    position: "relative",
                    border: "1px solid #bfbfbb",
                    marginBottom: "20px",

                }}
            >
                <Row justify={"center"}>
                    <Taglabel text={"ITEM TABLE"} />
                </Row>
                <Row
                    style={{
                        position: "relative",
                        border: "1px solid #bfbfbb",
                    }}
                >
                    <Col
                        className="gutter-row"
                        span={6}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="Description" />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={3}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="HSN CODE" />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={3}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="Qty" />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={4}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="Rate" />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={4}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="Tax%" />
                    </Col>
                    <Col
                        className="gutter-row"
                        span={4}
                        style={{
                            borderRight: "1px solid #bfbfbb",
                            textAlign: "center",
                        }}
                    >
                        <Taglabel text="Final Amount" />
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
                            description: "",
                        },
                    ]}
                >
                    {(subFields, subOpt) => (
                        <div>
                            {subFields.map((subField) => (
                                <Row
                                    key={subField.key}
                                    align="middle"
                                    style={{ marginTop: "5px" }}
                                >
                                    <Col
                                        className="gutter-row"
                                        span={6}
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >

                                        <Form.Item
                                            name={[
                                                subField.name,
                                                "description",
                                            ]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please Select the description",
                                                },
                                            ]}
                                        >

                                            <CustomModel  entity={"products"} />
                                            {/* <ProductModal
                                                productSelect={(label) =>
                                                    onDescriptionChange(
                                                        label,
                                                        subField
                                                    )
                                                }
                                                productValue={
                                                    items
                                                        ? items[subField.key]
                                                        : ""
                                                }
                                            /> */}
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        className="gutter-row"
                                        span={3}
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <Form.Item
                                            name={[subField.name, "hsnCode"]}
                                        >
                                            <Input style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        className="gutter-row"
                                        span={3}
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <Form.Item
                                            name={[subField.name, "qty"]}
                                        >
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                onChange={(value) =>
                                                    onQtyChange(value, subField)
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        className="gutter-row"
                                        span={4}
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <Form.Item
                                            name={[subField.name, "rate"]}
                                        >
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                onChange={(value) =>
                                                    onRateChange(
                                                        value,
                                                        subField
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        className="gutter-row"
                                        span={4}
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <Form.Item
                                            name={[subField.name, "taxPercent"]}
                                        >
                                            <CustomSelect
                                                entity={"dropDownData"}
                                                entityKey={"taxPercent"}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        className="gutter-row"
                                        span={3}
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <Form.Item
                                            name={[
                                                subField.name,
                                                "finalAmount",
                                            ]}
                                        >
                                            <InputNumber
                                                readOnly
                                                style={{ width: "100%" }}
                                                className="moneyInput"
                                                min={0}
                                                controls={false}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        className="gutter-row"
                                        span={1}
                                        style={{ textAlign: "center" }}
                                    >
                                        <Form.Item>
                                            <DeleteOutlined
                                                style={{
                                                    color: "red",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    subOpt.remove(
                                                        subField.name
                                                    );
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
                                    });
                                }}
                                icon={<PlusOutlined />}
                                style={{
                                    marginTop: "1rem",
                                    background: "green",
                                    width: "10%",
                                }}
                                block
                            >
                                Add Item
                            </Button>
                        </div>
                    )}
                </Form.List>
            </div>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Gross Total"
                    name={"grossTotal"}
                    labelAlign="left"
                    type={"number"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax Amount"
                    name={"taxAmount"}
                    labelAlign="left"
                    type={"number"}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="GrandTotal"
                    name={"grandTotal"}
                    labelAlign="left"
                    type={"number"}
                />
            </Row>

        
            {/* Other form items go here */}
        </div>
    );
};

export default QuotationForm;
