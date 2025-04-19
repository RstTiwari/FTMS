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

const PurchaseOrder = ({ form, value, disabled, isUpdate,entity }) => {
  const [isOrganizationChecked, setIsOrganizationChecked] = useState(false);
  const [isCustomerChecked, setIsCustomerChecked] = useState(false);
  const [isVendorChecked, setIsVendorChecked] = useState(false);

  const [delivery, setDelivery] = useState("");
  const { tenantId, id } = useParams();
  const { initialValues, isFetching, fetchInitialValues } =
    useInitialFormValues("tenant", "get", tenantId);

  const updateDeliveryAddress = (values) => {
    form.setFieldsValue({
      delivery: {
        type: values?.type,
        to: values?.to,
        address: values?.address,
      },
    });
  };

  const handleCheckboxChange = async (type) => {
    if (type === "organization") {
      // Probally call the api and get the Organization Data
      if (!initialValues) {
        await fetchInitialValues();
      }

      setDelivery({
        ...delivery,
        type: "organization",
        to: initialValues?.companyName,
        address: initialValues?.deliveryAddress,
      });

      updateDeliveryAddress({
        type: "organization",
        to: initialValues?.companyName,
        address: initialValues?.deliveryAddress,
      });
      setIsCustomerChecked(false);
      setIsVendorChecked(false);
      setIsOrganizationChecked(true);
    } else if (type === "customer") {
      form.setFieldsValue({ delivery: "" });
      setIsOrganizationChecked(false);
      setIsVendorChecked(false);
      setIsCustomerChecked(true);
    } else if (type === "vendor") {
      form.setFieldsValue({ delivery: "" });
      setIsOrganizationChecked(false);
      setIsCustomerChecked(false);
      setIsVendorChecked(true);
    }
  };

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
    //Checking delivery Address Type
        let delivery = form.getFieldValue("delivery");
        if(delivery){
     delivery?.type === "customer"
          ? setIsCustomerChecked(true)
          : delivery?.type === "vendor"
          ? setIsVendorChecked(true)
          : setIsOrganizationChecked(true);
        setDelivery({
          ...delivery,
          to: delivery?.to,
          address: delivery?.address,
        });
        }

  }, []);

  useEffect(() => {}, [form]);
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
                          <Checkbox
                              checked={isOrganizationChecked}
                              onChange={() =>
                                  handleCheckboxChange("organization")
                              }
                          >
                              SELF
                          </Checkbox>
                          <Checkbox
                              checked={isCustomerChecked}
                              onChange={() => handleCheckboxChange("customer")}
                          >
                              CUSTOMER
                          </Checkbox>
                          <Checkbox
                              checked={isVendorChecked}
                              onChange={() => handleCheckboxChange("vendor")}
                          >
                              VENDOR
                          </Checkbox>
                      </Form.Item>
                  </Col>
              </Row>
              <Row>
                  {isOrganizationChecked && (
                      <Col
                          xs={24}
                          sm={24}
                          md={{ span: 8 }}
                          lg={{ span: 8 }}
                          xl={{ span: 8 }}
                      >
                          <AddressDetails
                              id={tenantId}
                              initialRender={true}
                              entityName={"Delivery Address"}
                              address={delivery?.address}
                              to={delivery?.to}
                              keyName={"deliveryAddress"}
                              entity={"tenant"}
                              updateInForm={updateDeliveryAddress}
                          />
                      </Col>
                  )}

                  {isCustomerChecked && (
                      <Col
                          xs={24}
                          sm={24}
                          md={{ span: 24 }}
                          lg={{ span: 24 }}
                          xl={{ span: 24 }}
                      >
                          <FormItemCol
                              name={"customer"}
                              labelAlign="left"
                              type={"modal"}
                              entity={"customers"}
                              width={"25vw"}
                              fieldName={"name"}
                              onlyShippingAddress={true}
                              updateInForm={updateDeliveryAddress}
                              preFillValue={form.getFieldValue("delivery")?.to}
                              preFillAddress={
                                  form.getFieldValue("delivery")?.address
                              }
                              forDeliveryAddress={true}
                              xl={6}
                              lg={6}
                          />
                      </Col>
                  )}
                  {isVendorChecked && (
                      <Col
                          xs={24}
                          sm={24}
                          md={{ span: 24 }}
                          lg={{ span: 24 }}
                          xl={{ span: 24 }}
                      >
                          <FormItemCol
                              name={"vendor"}
                              labelAlign="left"
                              type={"modal"}
                              entity={"vendors"}
                              width={"25vw"}
                              fieldName={"name"}
                              updateInForm={updateDeliveryAddress}
                              onlyShippingAddress={true}
                              preFillValue={form.getFieldValue("delivery")?.to}
                              preFillAddress={
                                  form.getFieldValue("delivery")?.address
                              }
                              forDeliveryAddress={true}
                              xl={6}
                              lg={6}
                          />
                      </Col>
                  )}
              </Row>{" "}
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
