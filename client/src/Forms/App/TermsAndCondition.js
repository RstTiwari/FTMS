import React from "react";
import { Form, Row, Col, Button, Input, Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DeleteOutline } from "@mui/icons-material";

const { Panel } = Collapse;

const TermsAndConditionsForm = ({ form, width = "75vw" }) => {
    // Handle input value change
    const handleItemUpdate = (e, fieldName, row) => {
        const value = e.target.value;
        let terms = form.getFieldValue("terms") || [];
        let tempObj = terms[row] || {};
        tempObj[fieldName] = value;
        terms[row] = tempObj;
        form.setFieldsValue({ terms });
    };

    return (
        <Col style={{ width: width }}>
            <Collapse
                defaultActiveKey={["2"]}
                expandIconPosition="right"
                style={{ backgroundColor: "#fff", marginBottom: 16 }}
            >
                <Panel header="Terms and Conditions" key="1">
                    <Form.List name="terms">
                        {(fields, { add, remove }) => (
                            <>
                                <Row
                                    justify="start"
                                    style={{ marginBottom: 12 }}
                                >
                                    <Button
                                        type="link"
                                        style={{
                                            color: "#22b378",
                                            paddingLeft: 0,
                                        }}
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                    >
                                        Add Term
                                    </Button>
                                </Row>
                                {fields.map(
                                    (
                                        { key, name, fieldKey, ...restField },
                                        index
                                    ) => (
                                        <Row
                                            key={key}
                                            align="middle"
                                            justify="start"
                                            gutter={16}
                                        >
                                            <Col span={22}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "value"]}
                                                    fieldKey={[
                                                        fieldKey,
                                                        "value",
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please input a term value",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Enter term"
                                                        onChange={(e) =>
                                                            handleItemUpdate(
                                                                e,
                                                                "value",
                                                                name
                                                            )
                                                        }
                                                        width={"100vw"}
                                                        value={
                                                            form.getFieldValue([
                                                                "terms",
                                                                name,
                                                                "value",
                                                            ]) || ""
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Form.Item>
                                                    <DeleteOutline
                                                        onClick={() =>
                                                            remove(name)
                                                        }
                                                        style={{
                                                            color: "red",
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    )
                                )}
                            </>
                        )}
                    </Form.List>
                </Panel>
            </Collapse>
        </Col>
    );
};

export default TermsAndConditionsForm;
