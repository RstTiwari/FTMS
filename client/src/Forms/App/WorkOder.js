import React, { useEffect } from "react";
import {
  Form,
  Select,
  Divider,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  InputNumber,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomModal from "components/CustomModal";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import CoustomButton from "components/Comman/CoustomButton";
import CustomFormTableList from "./CustomFormTableList";

const WorkOrderForm = ({ form }) => {
  const handleItemsUpdate = (value, fieldName, rowName) => {
    const items = form.getFieldValue("items");
    let tempObj = items[rowName];
    console.log(value, "value", fieldName);
    if (fieldName === "product") {
      let { details } = value;
      tempObj.description = value?.description;
      tempObj.image = details.image || "  ";
    } else if (fieldName === "qty") {
      tempObj.qty = value;
    }

    items[rowName] = tempObj;
    form.setFieldsValue({ items: items });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <FormItemCol
        label={"#Work Order"}
        name={"no"}
        labelAlign="left"
        required={true}
        labelCol={{ span: 8 }}
        width={"30vw"}
        type={"counters"}
        rules={[
          {
            required: true,
            message: "Please Provide Work Order No",
          },
        ]}
        updateInForm={(value) => {
          form.setFieldsValue({ no: value });
        }}
        preFillValue={form.getFieldValue("no")}
      />
      <FormItemCol
        label={"Work Order Type"}
        name={"type"}
        labelAlign="left"
        required={true}
        labelCol={{ span: 8 }}
        rules={[
          {
            required: true,
            message: "Please Select Type",
          },
        ]}
        type="select"
        width={"30vw"}
        entity={"type"}
        entityName={"workorderType"}
        updateInForm={(value) => {
          form.setFieldsValue({ type: value });
        }}
        preFillValue={form.getFieldValue("type")}
      />
      <FormItemCol
        label={"Exp Start Date"}
        name={"startDate"}
        required={true}
        labelCol={{ span: 8 }}
        rules={[
          {
            required: true,
            message: "Please Select Start Date",
          },
        ]}
        labelAlign="left"
        type={"date"}
        preFillValue={form.getFieldValue("startDate")}
        updateInForm={(value) => {
          form.setFieldsValue({ startDate: value });
        }}
      />
      <FormItemCol
        label={"Exp Due Date"}
        name={"dueDate"}
        required={true}
        rules={[
          {
            required: true,
            message: "Please Select Due Date",
          },
        ]}
        labelAlign="left"
        labelCol={{ span: 8 }}
        type={"date"}
        preFillValue={form.getFieldValue("dueDate")}
        updateInForm={(value) => {
          form.setFieldsValue({ dueDate: value });
        }}
      />
      <FormItemCol
        label={"Incharge"}
        name={"incharge"}
        type={"select"}
        tooltip={"Select the Project in charge for Work Order"}
        width={"30vw"}
        entity={"Work Order Incharge"}
        labelCol={{ span: 8 }}
        entityName="incharge"
        updateInForm={(value) => {
          form.setFieldsValue({ incharge: value });
        }}
        preFillValue={form.getFieldValue("incharge")}
      />
      <FormItemCol
        label={"Quotation No"}
        name={"quotationNo"}
        type={"input"}
        width={"30vw"}
        labelCol={{ span: 8 }}
      />
      <Divider dashed />
      <Row
        justify={"center"}
        style={{
          marginBottom: "10px",
          top: 0,
          background: "#fff",
          zIndex: 1,
        }}
      >
        <Taglabel text={"ITEM TABLE"} weight={1000} />
      </Row>
      <div
        style={{
          position: "relative",
          border: "2px solid #bfbfbb",
          marginBottom: "20px",
          zIndex: 10,
          margin: "20px",
          overflow: "auto",
        }}
      >
        <div
          style={{
            overflowX: "auto",
            overflowY: "auto",
            paddingBottom: "10px",
            minWidth: 1200,
          }}
        >
          <Row
            style={{
              position: "sticky",
              top: "30px",
              background: "#fff",
              border: "1px solid #bfbfbb",
              zIndex: 1,
            }}
          >
            {/* <Col
              className="gutter-row"
              span={4}
              style={{
                borderRight: "1px solid #bfbfbb",
                textAlign: "center",
                minWidth: "200px",
              }}
            >
              <Taglabel text={"ITEM CODE"} />
            </Col> */}
            <Col
              className="gutter-row"
              span={16}
              style={{
                borderRight: "1px solid #bfbfbb",
                textAlign: "center",
                minWidth: "300px",
              }}
            >
              <Taglabel text={"ITEM DESCRIPTION"} weight={700} />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{
                borderRight: "1px solid #bfbfbb",
                textAlign: "center",
                minWidth: "200px",
              }}
            >
              <Taglabel text={"QTY"} />
            </Col>
          </Row>
        </div>

        <Form.List
          name={"items"}
          initialValue={[
            {
              product: {
                code: "",
                name: "",
              },
              qty: 1,
            },
          ]}
        >
          {(subFields, subOpt) => (
            <div>
              <div
                style={{
                  overflowX: "auto",
                  overflowY: "auto",
                  minHeight: "10vh",
                  maxHeight: "70vh",
                  minWidth: 1200,
                }}
              >
                {subFields.map(({ key, name, ...restField }) => (
                  <Row key={key} align={"middle"} style={{ marginTop: "5px" }}>
                    {/* <Col
                      className="gutter-row"
                      span={4}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Form.Item {...restField} name={[name, "code"]}>
                        <CustomModal
                          entity={"products"}
                          fieldName={"code"}
                          updateInForm={(value) =>
                            handleItemsUpdate(value, "product", name)
                          }
                          preFillValue={
                            form.getFieldValue("items")?.[name]?.code
                          }
                          width={"100%"}
                        />
                      </Form.Item>
                    </Col> */}
                    <Col
                      className="gutter-row"
                      span={16}
                      style={{
                        textAlign: "center",
                        minWidth: "300px",
                      }}
                    >
                      <Form.Item {...restField} name={[name, "description"]}>
                        <CustomModal
                          entity={"products"}
                          fieldName={"name"}
                          updateInForm={(value) =>
                            handleItemsUpdate(value, "product", name)
                          }
                          preFillValue={
                            form.getFieldValue("items")?.[name]?.description
                          }
                          width={"100%"}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item {...restField} name={[name, "qty"]}>
                        <InputNumber
                          onChange={(value) =>
                            handleItemsUpdate(value, "qty", name)
                          }
                          controls={false}
                          min={0}
                          style={{
                            textAlign: "center",
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={1} style={{ textAlign: "center" }}>
                      <Form.Item>
                        <DeleteOutlined
                          style={{
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            subOpt.remove(name);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </div>

              {/* Button to add new item */}
              <Row justify="start">
                <CoustomButton
                  text={"Add Item"}
                  onClick={() => {
                    subOpt.add({
                      product: {
                        code: "",
                        name: "",
                      },
                      qty: 1,
                    });
                  }}
                  withIcon={true}
                />
              </Row>
            </div>
          )}
        </Form.List>
      </div>
    </div>
  );
};

export default WorkOrderForm;
