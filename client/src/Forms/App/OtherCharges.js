import React, { useEffect } from "react";
import {
    Form,
    Row,
    Col,
    Button,
    Select,
    Input,
    InputNumber,
    Collapse,
} from "antd";
import {
    PlusOutlined,
    MinusCircleOutlined,
    CaretRightOutlined,
} from "@ant-design/icons";
import CoustomButton from "../../components/Comman/CoustomButton";

const { Option } = Select;
const { Panel } = Collapse;

const OtherChargesForm = ({ form, updateInForm, width = "30vw" }) => {
    // Capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Handle value changes in the form
    const handleFieldChange = () => {
        updateInForm();
    };

    //Handle changes in the form fields
    // Add a default term when the component mounts
    useEffect(() => {
        const otherCharges = form.getFieldValue("otherCharges") || [];
        if (otherCharges.length <= 0) {
            addDefaultTerm();
        }
    }, [form]);

    const addDefaultTerm = () => {
        const otherCharges = form.getFieldValue("otherCharges") || [];
        otherCharges.push({ chargeName: "", amount: "" });
        form.setFieldsValue({ otherCharges });
    };

    return (
        <Collapse
            bordered={false}
            expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{
                background: "transparent",
                width: width,
            }}
        >
            <Panel
                header="Non Taxable Other Charges"
                key="1"
                style={{ alignItems: "center" }}
            >
                <Form.List name="otherCharges">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(
                                ({ key, name, fieldKey, ...restField }) => (
                                    <Row
                                        key={key}
                                        align="middle"
                                        justify="start"
                                    >
                                        <Col span={1}>
                                            <Form.Item>
                                                <MinusCircleOutlined
                                                    onClick={() => remove(name)}
                                                    style={{
                                                        color: "red",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={5}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "action"]}
                                                fieldKey={[fieldKey, "action"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Select Add/Less",
                                                    },
                                                ]}
                                                initialValue={
                                                    form.getFieldValue(
                                                        "otherCharges"
                                                    )?.[name]?.action || "add"
                                                }
                                            >
                                                <Select
                                                    onChange={handleFieldChange}
                                                    options={[
                                                        {
                                                            label: "ADD",
                                                            value: "add",
                                                        },
                                                        {
                                                            label: "LESS",
                                                            value: "less",
                                                        },
                                                    ]}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={7}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "chargeName"]}
                                                fieldKey={[
                                                    fieldKey,
                                                    "chargeName",
                                                ]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Enter Charge Name",
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="Description"
                                                    style={{ width: "100%" }}
                                                    onBlur={(e) => {
                                                        const value =
                                                            e.target.value;
                                                        form.setFieldsValue({
                                                            [`otherCharges[${name}].chargeName`]:
                                                                capitalizeFirstLetter(
                                                                    value
                                                                ),
                                                        });
                                                    }}
                                                    onChange={handleFieldChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={7}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "amount"]}
                                                fieldKey={[fieldKey, "amount"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Enter Charge Amount",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    placeholder="Amount"
                                                    style={{ width: "100%" }}
                                                    controls={false}
                                                    onChange={handleFieldChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "rsOrPercent"]}
                                                fieldKey={[
                                                    fieldKey,
                                                    "rsOrPercent",
                                                ]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Select Rs or %",
                                                    },
                                                ]}
                                                initialValue={
                                                    form.getFieldValue(
                                                        "otherCharges"
                                                    )?.[name]?.rsOrPercent ||
                                                    "rupee"
                                                }
                                            >
                                                <Select
                                                    onChange={handleFieldChange}
                                                    options={[
                                                        {
                                                            label: "%",
                                                            value: "percent",
                                                        },
                                                        {
                                                            label: "₹",
                                                            value: "rupee",
                                                        },
                                                    ]}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            )}
                            <Row justify="start">
                                <Row justify="start">
                                    <CoustomButton
                                        text={"Add New"}
                                        onClick={() => add()}
                                        withIcon={true}
                                        details={true}
                                    />
                                </Row>
                            </Row>
                        </>
                    )}
                </Form.List>
            </Panel>
        </Collapse>
    );
};

export default OtherChargesForm;
