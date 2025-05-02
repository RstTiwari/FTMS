import React, { useEffect, useState } from "react";
import {
    Collapse,
    Select,
    Tabs,
    Form,
    Space,
    InputNumber,
    Button,
    Row,
} from "antd";
import FormItemCol from "components/Comman/FormItemCol";
import TabPane from "antd/es/tabs/TabPane";
import { productCategory } from "../../Data/ProductData";
import CustomModel from "components/CustomProductSelect";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";


const { Panel } = Collapse;
const { Option } = Select;

const ProductForm = ({ form, onFormFinish, initalValue, isModal,entity }) => {
  const [itemType, setItemType] = useState(
    form.getFieldValue("itemType") || "product"
  );

  const handleImageUpdate = (file) => {
    form.setFieldsValue({ image: file });
  };

  const handelItemUpdate = (value, fieldName, row, subField) => {
    console.log(value,fieldName,"=value")
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
    } else if (fieldName === "transactionType") {
      form.setFieldsValue({ transactionType: value });
    } else if (fieldName === "vendor") {
      return form.setFieldsValue({ vendor: value });
    }
    subFieldValue[row] = temChange;
    form.setFieldsValue({ [subField]: subFieldValue });
  };
  
  useEffect(() => {
  
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
          <Row justify="start">
            <Button
              type="link"
              style={{
                color: "#22b378",
              }}
              onClick={() => add()}
              details={true}
              withIcon={true}
              icon={<PlusOutlined />}
            >
              Add Component Product
            </Button>
          </Row>
        </>
      )}
    </Form.List>
  );

  return (
    <div>
      <Tabs>
        <TabPane tab="General Info" key={1}>
          <FormItemCol
            labelAlign="left"
            labelCol={{ span: isModal ? 18 : 8 }}
            label=" Item Type"
            name="itemType"
            type={"option"}
            required={true}
            width={"30vw"}
            updateInForm={(value) => handelItemUpdate(value, "itemType")}
            preFillValue={form.getFieldValue("itemType") || "product"}
            options={productCategory}
          />

          <FormItemCol
            label=" Item Code"
            labelAlign="left"
            labelCol={{ span: 8 }}
            name="code"
            type={"select"}
            entity={"Product Code"}
            required={true}
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
            label=" Transaction Type"
            name="transactionType"
            type={"option"}
            required={true}
            width={"30vw"}
            updateInForm={(value) => handelItemUpdate(value, "transactionType")}
            preFillValue={form.getFieldValue("transactionType") || "sale"}
            options={[
              {
                label: "SALE",
                value: "sale",
              },
              {
                label: "PURCHASE",
                value: "purchase",
              },
              {
                label: "BOTH",
                value: "both",
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
            labelAlign="left"
            labelCol={{ span: isModal ? 18 : 8 }}
            label=" Item Image"
            name="image"
            type={"image"}
            width={"30vw"}
            preFillValue={form.getFieldValue("image")}
            updateImageInForm={handleImageUpdate}
            draggerWidth={"400px"}
          />
        </TabPane>

                {/* {itemType === "bill_of_material" && (
                    <TabPane tab="Bill Of Material" key={2}>
                        {renderFormList(
                            "Components",
                            "components",
                            "Component"
                        )}
                    </TabPane>
                )} */}
                <TabPane tab="Other Details" key={3}>
                    <FormItemCol
                        label={"Supplying Vendor"}
                        name={"vendor"}
                        labelCol={{ span: isModal ? 18 : 8 }}
                        tooltip={"Vendor You Get Part Manufacture"}
                        entity={"vendors"}
                        entityName={"Vendor"}
                        fieldName={"name"}
                        type={"modal"}
                        width={"30vw"}
                        preFillValue={form.getFieldValue("vendor")?.name || ""}
                        updateInForm={(value) => {
                            handelItemUpdate(value, "vendor");
                        }}
                    />
                    <FormItemCol
                        label={"Item Dimension"}
                        name={"dimension"}
                        labelCol={{ span: isModal ? 18 : 8 }}
                        tooltip={"length width and thickness of Item"}
                        width={"30vw"}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ProductForm;
