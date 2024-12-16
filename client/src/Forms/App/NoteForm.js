import React, { useEffect } from "react";
import { Form, Row, Col, Collapse } from "antd";
import {
    PlusOutlined,
    MinusCircleOutlined,
    CaretRightOutlined,
} from "@ant-design/icons";
import Taglabel from "../../components/Comman/Taglabel";
import CustomSelect from "../../components/Comman/CustomSelect";
import CoustomButton from "../../components/Comman/CoustomButton";

const { Panel } = Collapse;

const NotesForm = ({ form, width = "50vw" }) => {
    // Handle value changes in the form
    const handleNoteUpdate = (value, row) => {
        let notes = form.getFieldValue("notes");
        if (!notes) notes = [];
        notes[row] = value;
        form.setFieldsValue({ notes });
    };

    // Add a default note when the component mounts
    useEffect(() => {
        const notes = form.getFieldValue("notes") || [];
        if (notes.length === 0) {
            addDefaultNote();
        }
    }, [form]);

    const addDefaultNote = () => {
        const notes = form.getFieldValue("notes") || [];
        notes.push("");
        form.setFieldsValue({ notes });
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
          header={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Taglabel text="Notes" />
            </div>
          }
          key="1"
          style={{ alignItems: "start" }}
        >
          <Form.List name="notes">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Row key={key} align="middle" justify="start">
                    <Col span={1}>
                      <Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{
                            color: "red",
                            justifyContent: "center",
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={20}>
                      <Form.Item
                        {...restField}
                        name={[name]}
                        fieldKey={[fieldKey]}
                        rules={[
                          {
                            required: true,
                            message: "Enter a Note",
                          },
                        ]}
                      >
                        <CustomSelect
                          width="100%"
                          entityName={"notes"}
                          entity="Note"
                          updateInForm={(value) =>
                            handleNoteUpdate(value, name)
                          }
                          preFillValue={
                            form.getFieldValue(["notes", name]) || ""
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
                <Row justify="start">
                  <CoustomButton
                    text={"Add Note"}
                    onClick={() => add()}
                    details={true}
                    withIcon={true}
                    icon={<PlusOutlined />}
                  />
                </Row>
              </>
            )}
          </Form.List>
        </Panel>
      </Collapse>
    );
};

export default NotesForm;
