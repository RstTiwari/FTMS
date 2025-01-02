import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Collapse,
  Space,
  InputNumber,
  Col,
  Select,
  Card,
} from "antd";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import CustomModel from "components/CustomModal";
import CoustomButton from "components/Comman/CoustomButton";
import { DeleteOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Option } = Select;

const ProductForm = ({ form, onFormFinish, initalValue, isModal }) => {
  const [itemType, setItemType] = useState(
    form.getFieldValue("itemType") || "product"
  );

  const handleImageUpdate = (file) => {
    form.setFieldsValue({ image: file });
  };

  const handelItemUpdate = (value, fieldName, row, subField) => {
    let subFieldValue = form.getFieldValue(subField) || [];
    let temChange = subFieldValue[row] || {};
    if (fieldName === "code") {
      form.setFieldsValue({ code: value });
    } else if (fieldName === "itemType") {
      setItemType(value);
      return form.setFieldsValue({ itemType: value });
    } else if (fieldName === "product") {
      temChange["product"] = value?.details?._id;
    } else if (fieldName === "qty") {
      temChange["qty"] = value;
    } else if (fieldName === "vendor") {
      return form.setFieldsValue({ vendor: value });
    }
    subFieldValue[row] = temChange;
    form.setFieldsValue({ [subField]: subFieldValue });
  };
  useEffect(() => {
    const fieldsToCheck = ["components", "parts", "hardwares", "accessories"];
    fieldsToCheck.forEach((field) => {
      const values = form.getFieldValue(field);
      if (!values || values.length === 0) {
        form.setFieldsValue({ [field]: [{ product: "", qty: 0 }] });
      }
    });
  }, []);
  const renderFormList = (label, fieldName, buttonName) => (
    <Form.List name={fieldName}>
      {(fields, { add, remove }) => (
        <>
          {/* Map through existing fields */}
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space key={key} style={{ display: "flex" }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, "product"]}
                fieldKey={[fieldKey, "product"]}
                rules={[
                  {
                    required: true,
                    message: `Please select a ${label}`,
                  },
                ]}
              >
                <CustomModel
                  width={"30vw"}
                  entity={"products"}
                  fieldName={"name"}
                  entityName={"Product Name"}
                  updateInForm={(value) =>
                    handelItemUpdate(value, "product", key, fieldName)
                  }
                  preFillValue={
                    form.getFieldValue(fieldName)?.[name]?.product?.name
                  }
                />
              </Form.Item>
              {/* Fields for Quantity */}
              <Form.Item
                {...restField}
                name={[name, "qty"]}
                fieldKey={[fieldKey, "qty"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter the qty",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Quantity"
                  min={1}
                  width={"50vw"}
                  controls={false}
                  onChange={(value) =>
                    handelItemUpdate(value, "qty", name, fieldName)
                  }
                />
              </Form.Item>
              <Button type="link" onClick={() => remove(name)}>
                <DeleteOutlined />
              </Button>
            </Space>
          ))}
          {/* Always show the Add button first */}
          <CoustomButton
            onClick={() => add()}
            text={`New ${buttonName}`}
            details={true}
          />
        </>
      )}
    </Form.List>
  );

  return (
    <div>
      {/* Common fields for all categories */}
      <FormItemCol
        labelAlign="left"
        labelCol={{ span: isModal ? 18 : 8 }}
        label=" Item Type"
        name="itemType"
        type={"itemType"}
        width={"30vw"}
        updateInForm={(value) => handelItemUpdate(value, "itemType")}
        preFillValue={form.getFieldValue("itemType") || "product"}
      />

      <FormItemCol
        label=" Item Code"
        labelAlign="left"
        labelCol={{ span: isModal ? 18 : 8 }}
        name="code"
        type={"select"}
        entity={" Item Code"}
        width={"30vw"}
        entityName={"product"}
        updateInForm={(value) => handelItemUpdate(value, "code")}
        preFillValue={form.getFieldValue("code")}
      />
      <FormItemCol
        label=" Item Name"
        labelAlign="left"
        required={true}
        width={"30vw"}
        labelCol={{ span: isModal ? 18 : 8 }}
        name="name"
        type={"input"}
        rules={[
          {
            required: true,
            message: "Please input the product name!",
          },
        ]}
      />
      <FormItemCol
        labelAlign="left"
        labelCol={{ span: isModal ? 18 : 8 }}
        label="Selling Price"
        name="rate"
        width={"30vw"}
        required={itemType === "product" ? true : false}
        rules={[
          {
            required: itemType === "product" ? true : false,
            message: "Please input the product price!",
          },
        ]}
      />

      <FormItemCol
        labelAlign="left"
        labelCol={{ span: isModal ? 18 : 8 }}
        label="Buying Price"
        name="purchaseRate"
        width={"30vw"}
      />
      <FormItemCol
        labelAlign="left"
        labelCol={{ span: isModal ? 18 : 8 }}
        label="HSN CODE"
        name="hsnCode"
        type={"input"}
        width={"30vw"}
      />
      <FormItemCol
        label={"Item Dimension"}
        name={"dimension"}
        labelCol={{ span: isModal ? 18 : 8 }}
        tooltip={"length width and thickness of Item"}
        width={"30vw"}
      />

      {/* Conditionally render Selling Price based on itemType */}

      {/**Conditonal rendering of the part Filed */}

      <>
        <FormItemCol
          label={"Supplying Vendor"}
          name={"vendor"}
          labelCol={{ span: isModal ? 18 : 8 }}
          tooltip={"Vendor You Get Part Manufacture"}
          entity={"vendors"}
          entityName={"Vendor"}
          fieldName={"name"}
          type={"model"}
          width={"30vw"}
          updateInForm={(value) => {
            handelItemUpdate(value, "vendor");
          }}
          hidden={
            itemType === "product" || itemType === "assembly" ? true : false
          }
        />
      </>

      <FormItemCol
        labelAlign="left"
        labelCol={{ span: isModal ? 18 : 8 }}
        label=" Item Image"
        name="image"
        type={"image"}
        width={"30vw"}
        preFillValue={form.getFieldValue("image")}
        updateImageInForm={handleImageUpdate}
      />

      {/* Conditional rendering for multi_assembly and assembly categories */}
      {itemType === "product" && (
        <Col xs={24} sm={24} md={24} xl={12} lg={12}>
          <Collapse>
            <Panel header={<Taglabel text={"Add Multilevel Field"} key={1} />}>
              <Collapse>
                <Panel
                  key="components"
                  header={<Taglabel text={"Assembly Componets"} />}
                >
                  {renderFormList("Components", "components", "Component")}
                </Panel>

                <Panel key="parts" header={<Taglabel text={"Parts"} />}>
                  {renderFormList("Parts", "parts", "Part")}
                </Panel>
                <Panel header={<Taglabel text={"Hardwares"} />} key="hardwares">
                  {renderFormList("Hardwares", "hardwares", "hardware")}
                </Panel>
                <Panel
                  header={<Taglabel text={"Accessoreis"} />}
                  key="Accessoreis"
                >
                  {renderFormList("accessories", "accessories", "accessory")}
                </Panel>
              </Collapse>
            </Panel>
          </Collapse>
        </Col>
      )}

      {itemType === "assembly" && (
        <Collapse>
          <Panel header={<Taglabel text={"Parts"} />} key="parts">
            {renderFormList("Part", "parts")}
          </Panel>
          <Panel header={<Taglabel text={"Hardware"} />} key="hardware">
            {renderFormList("Hardware", "hardwares")}
          </Panel>
        </Collapse>
      )}
    </div>
  );
};

export default ProductForm;
