import React, { useEffect } from "react";
import { Form, Row, Col, Button, Input, Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DeleteOutline } from "@mui/icons-material";
import { useAuth } from "state/AuthProvider";
import { useParams } from "react-router-dom";




const { Panel } = Collapse;

const TechnicalSpecification = ({ form, width = "75vw" }) => {
        const { adminApiCall } = useAuth();
            const { tenantId } = useParams();
        

        const handleItemUpdate = (e, fieldName, row) => {
            const value = e.target.value;
            let specification = form.getFieldValue("specification") || [];
            let tempObj = specification[row] || {};
            tempObj[fieldName] = value;
            specification[row] = tempObj;
            form.setFieldsValue({ specification });
        };
        const fetchData = async () => {
            const payload = {};
            const params = { entity: "tenant" };
            const { success, result, message } = await adminApiCall(
                "get",
                "read",
                payload,
                { entity: "tenant", tenantId: tenantId }
            );
            form.setFieldsValue({ specification: result?.specification });
        };

        useEffect(() => {
            fetchData();
        });

    return (
        <Col style={{ width: width }}>
            <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition="right"
                style={{ backgroundColor: "#fff", marginBottom: 16 }}
            >
                <Panel header="TechnicalSpecification" key="1">
                    <Form.List name="specification">
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
                                        Add Technical Specification
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
                                                                "specification",
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

export default TechnicalSpecification;
