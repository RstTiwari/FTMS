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
import { DeleteForeverOutlined, DeleteOutline } from "@mui/icons-material";

const { Panel } = Collapse;

const TermsAndConditionsForm = ({ form, width = "50vw" }) => {
    // Handle value changes in the form
    const handleItemUpdate = (value, fieldName, row) => {
        let terms = form.getFieldValue("terms");
        if (!terms) terms = [];
        let temObj = terms[row] || {};
        temObj[fieldName] = value;
        terms[row] = temObj;
        form.setFieldsValue({ terms: terms });
    };

    // Add a default term when the component mounts
    useEffect(() => {
        const terms = form.getFieldValue("terms") || [];
        if (terms.length === 0) {
            addDefaultTerm();
        }
    }, [form]);

    const addDefaultTerm = () => {
        const terms = form.getFieldValue("terms") || [];
        terms.push({ name: "", value: "" });
        form.setFieldsValue({ terms });
    };

    return (
      <Col style={{ width: width }}>
        <Form.List name="terms">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Row key={key} align="middle" justify="start">
                  <Col span={15}>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      fieldKey={[fieldKey, "value"]}
                      rules={[
                        {
                          required: true,
                          message: "Select Term Value",
                        },
                      ]}
                    >
                      <CustomSelect
                        width="100%"
                        entityName={"termValue"}
                        entity="Term Value"
                        updateInForm={(value) => {
                          handleItemUpdate(value, "value", name);
                        }}
                        preFillValue={
                          form.getFieldValue(["terms", name, "value"]) || ""
                        }
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
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
              <Row justify="start">
                <CoustomButton
                  text={"Add Term"}
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

export default TermsAndConditionsForm;
