import React from "react";
import { Form, Row, Col, Button, Input, Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DeleteOutline } from "@mui/icons-material";

const { Panel } = Collapse;

const NotesForm = ({ form, width = "35vw" }) => {
    // Handle value changes in the form
    const handleNoteUpdate = (e, row) => {
        const value = e.target.value;
        let notes = form.getFieldValue("notes") || [];
        notes[row] = value;
        form.setFieldsValue({ notes });
    };

    return (
        <Col style={{ width: width }}>
            <Collapse
                defaultActiveKey={["2"]}
                expandIconPosition="right"
                style={{ backgroundColor: "#fff", marginBottom: 16 }}
            >
                <Panel header="Notes" key="1">
                    <Form.List name="notes">
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
                                        Add Note
                                    </Button>
                                </Row>
                                {fields.map(
                                    ({ key, name, fieldKey, ...restField }) => (
                                        <Row
                                            key={key}
                                            align="middle"
                                            justify="start"
                                            gutter={16}
                                        >
                                            <Col span={22}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name]}
                                                    fieldKey={[fieldKey]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Enter a Note",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Enter note"
                                                        onChange={(e) =>
                                                            handleNoteUpdate(
                                                                e,
                                                                name
                                                            )
                                                        }
                                                        value={
                                                            form.getFieldValue([
                                                                "notes",
                                                                name,
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

export default NotesForm;
