import React, { useState, useRef, useEffect } from "react";
import Taglabel from "components/Comman/Taglabel";
import {
  Form,
  Select,
  Divider,
  Space,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Typography,
  Checkbox,
} from "antd";

import { PlusOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";

import FormItemCol from "components/Comman/FormItemCol";
import CustomSelect from "components/Comman/CustomSelect";
import CustomModel from "components/CustomProductSelect";
import NotificationHandler from "EventHandler/NotificationHandler";
import AddressDetails from "components/Comman/AddressDetails";
import { useParams } from "react-router-dom";
import useInitialFormValues from "Hook/useIntialFormValues";
import TaxPercent from "components/Comman/TaxPercent";
import CustomFormTableList from "./CustomFormTableList";
import PaymentLayoutComponent from "./PaymentLayoutComponent";
import AddressComponent from "components/Comman/AddressComponent";
import DeliveryAddressForm from "components/Comman/DeliveryAdress";

const PurchaseOrder = ({ form, value, disabled, isUpdate,entity }) => {

  const { tenantId, id } = useParams();
 


 

  // Updating Form Item Values
  const handleItemsUpdate = (value, fieldName, rowName) => {
    const items = form.getFieldValue("items");
    const temObj = items[rowName];
    if (fieldName === "vendorName") {
      form.setFieldsValue({ vendor: value });
    } else if (fieldName === "no") {
      form.setFieldsValue({ no: value });
    } else if (fieldName === "description") {
      let { description, rate, hsnCode } = value;
      temObj.description = description;
      temObj.rate = rate;
      temObj.finalAmount = temObj.qty * temObj.rate;
    } else if (fieldName === "rate") {
      temObj.rate = value;
      temObj.finalAmount = temObj.rate * temObj.qty;
    } else if (fieldName === "qty") {
      temObj.qty = value;
      temObj.finalAmount = temObj.rate * temObj.qty;
    } else if (fieldName === "gstPercent") {
      temObj.gstPercent = Number(value);
    } else if (fieldName === "paymentCondition") {
      form.setFieldsValue({ paymentCondition: value });
    } else if (fieldName === "cancellationCondition") {
      form.setFieldsValue({ cancellationCondition: value });
    } else if (fieldName === "purchaseDate") {
      form.setFieldsValue({ purchaseDate: value });
    } else if (fieldName === "deliveryDate") {
      form.setFieldsValue({ deliveryDate: value });
    } else {
    }

    items[rowName] = temObj;
    const grossTotal = items.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.finalAmount;
    }, 0);

    let temArray = items.map((item) => ({
      ...item,
      taxAmount: item.finalAmount * (item.gstPercent / 100) || 0,
    }));

    let taxAmount = temArray.reduce(
      (acc, item) => acc + (item.taxAmount || 0),
      0
    );

    let totalWithTax = grossTotal + taxAmount;
    let grandTotal = totalWithTax;
    // Calculate grandTotal based on otherCharges
    let otherCharges = form.getFieldValue("otherCharges") || [];
    otherCharges.forEach((charge) => {
      if (charge.rsOrPercent === "percent") {
        const amountToAdjust = (totalWithTax * (charge.amount || 0)) / 100;
        if (charge.action === "add") {
          grandTotal += amountToAdjust;
        } else {
          grandTotal -= amountToAdjust;
        }
      } else {
        if (charge.action === "add") {
          grandTotal += charge.amount || 0;
        } else {
          grandTotal -= charge.amount || 0;
        }
      }
    });
    form.setFieldsValue({
      grossTotal: grossTotal,
      taxAmount: taxAmount,
      totalWithTax: totalWithTax,
      grandTotal: grandTotal,
    });
  };

useEffect(() => {
  const delivery = form.getFieldValue("delivery");
  if (delivery) {
    form.setFieldsValue({
      delivery: {
        to: delivery.to,
        street1: delivery.street1,
        street2: delivery.street2,
        city: delivery.city,
        pincode: delivery.pincode,
        state: delivery.state,
      },
    });
  }
}, [form]);



  useEffect(() => {}, [form]);
  console.log(form.getFieldsValue(),"got the value")
  return (
      <div>
          <FormItemCol
              label={"Select Vendor"}
              name={"vendor"}
              labelAlign="left"
              labelCol={{ span: 8 }}
              required={true}
              rules={[
                  {
                      required: "true",
                      message: "Please Select Vendor",
                  },
              ]}
              type={"options"}
              width={"30vw"}
              entity={"vendors"}
              fieldName={"name"}
              updateInForm={(value) => {
                  handleItemsUpdate(value, "vendorName");
              }}
              preFillValue={form.getFieldValue("vendor")?.name}
              form = {form}
          />
          <FormItemCol
              label={"#PURCHASE"}
              name={"prefix"}
              labelAlign="left"
              width={"30vw"}
              hidden={true}
          />
          <FormItemCol
              label={"#PURCHASE"}
              name={"no"}
              labelAlign="left"
              width={"30vw"}
              required={true}
              type={"counters"}
              labelCol={{ span: 8 }}
              rules={[
                  {
                      required: "true",
                      message: "Please Provide Quote No",
                  },
              ]}
              updateInForm={(value) => {
                  handleItemsUpdate(value, "no");
              }}
              entity={entity}
              preFillValue={form.getFieldValue("no")}
              parentForm={form}
          />
          <FormItemCol
              label={"#PURCHASE"}
              name={"suffix"}
              labelAlign="left"
              width={"30vw"}
              hidden={true}
          />
          <FormItemCol
              label={"Purchase Date"}
              name={"purchaseDate"}
              labelAlign="left"
              type={"date"}
              labelCol={{ span: 8 }}
              width={"30vw"}
              required={true}
              rules={[
                  {
                      required: true,
                      message: "Please Select Delivery Date",
                  },
              ]}
              updateInForm={(value) => handleItemsUpdate(value, "purchaseDate")}
              preFillValue={form.getFieldValue("purchaseDate")}
          />
          <FormItemCol
              label={"Delivery Date"}
              name={"deliveryDate"}
              required={true}
              width={"30vw"}
              rules={[
                  {
                      required: true,
                      message: "Please Select Delivery Date",
                  },
              ]}
              labelAlign="left"
              type={"date"}
              labelCol={{ span: 8 }}
              updateInForm={(value) => handleItemsUpdate(value, "deliveryDate")}
              preFillValue={form.getFieldValue("deliveryDate")}
          />
          <div>
              <Row>
                  <Col
                      xs={24}
                      sm={24}
                      md={{ span: 12 }}
                      lg={{ span: 12 }}
                      xl={{ span: 12 }}
                  >
                      <Form.Item
                          label={<Taglabel text={"Delivery Address"} />}
                          labelCol={{ span: 8 }}
                          labelAlign="left"
                          name={"delivery"}
                          
                          rules={[
                              {
                                  required: true,
                                  message: "Delivery Required",
                              },
                          ]}
                      >
                    
                          <DeliveryAddressForm />
                      </Form.Item>
                  </Col>
              </Row>
          </div>

          <CustomFormTableList form={form} />
          <PaymentLayoutComponent
              form={form}
              widthOfNotes="35vw"
              widthOfTerm="35vw"
          />
      </div>
  );
};

export default PurchaseOrder;
