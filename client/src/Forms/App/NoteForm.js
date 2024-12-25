import React, { useEffect } from "react";
import { Form, Row, Col, Collapse } from "antd";
import {
    PlusOutlined,
    MinusCircleOutlined,
    CaretRightOutlined,
    DeleteColumnOutlined,
} from "@ant-design/icons";
import Taglabel from "../../components/Comman/Taglabel";
import CustomSelect from "../../components/Comman/CustomSelect";
import CoustomButton from "../../components/Comman/CoustomButton";
import { DeleteForever, DeleteForeverOutlined, DeleteOutline } from "@mui/icons-material";

const { Panel } = Collapse;

const NotesForm = ({ form, width = "35vw" }) => {
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
      <Col style={{ width: width }}>
        <Form.List name="notes">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Row key={key} align="middle" justify="start">
                  <Col span={15}>
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
                        updateInForm={(value) => handleNoteUpdate(value, name)}
                        preFillValue={form.getFieldValue(["notes", name]) || ""}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <Form.Item>
                      <DeleteOutline
                        onClick={() => remove(name)}
                        style={{
                          color: "red",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
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
      </Col>
    );
};

export default NotesForm;
