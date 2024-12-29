import React, {  useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import FormItemCol from "components/Comman/FormItemCol";
import CustomFormTableList from "./CustomFormTableList";
import PaymentLayoutComponent from "./PaymentLayoutComponent";
import useInitialFormValues from "Hook/useIntialFormValues";
import { Row,Col,Checkbox ,Form} from "antd";
import Taglabel from "components/Comman/Taglabel";
import AddressDetails from "components/Comman/AddressDetails";

const DeliveryChallan = ({ form }) => {
  const isLaptop = useMediaQuery("(min-width:1000px)");
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
     if (type === "customer") {
       form.setFieldsValue({ delivery: "" });
       setIsVendorChecked(false);
       setIsCustomerChecked(true);
     } else if (type === "vendor") {
       form.setFieldsValue({ delivery: "" });
       setIsCustomerChecked(false);
       setIsVendorChecked(true);
     }
   };

  const handleItemUpdate = (value, filedName, rowName) => {
    const items = form.getFieldValue("items");
    let temObj = items[rowName];
    if (filedName === "description") {
      let { description, rate, hsnCode } = value;
      temObj.description = description;
      temObj.rate = Math.ceil(rate);
      temObj.finalAmount = Math.ceil(temObj.qty * Number(rate));
    } else if (filedName === "rate") {
      temObj.rate = value;
      temObj.finalAmount = Number(Math.ceil(temObj.qty * value));
    } else if (filedName === "qty") {
      temObj.qty = value;
      temObj.finalAmount = Number(Math.ceil(temObj.qty * temObj.rate));
    } else if (filedName === "customer") {
      form.setFieldsValue({ customer: value });
    } else if (filedName === "no") {
      form.setFieldsValue({ no: value });
    } else if (filedName === "challanDate") {
      form.setFieldsValue({ challanDate: value });
    } else if (filedName === "transportAmount") {
      form.setFieldsValue({ transportAmount: value });
    } else if (filedName === "gstPercent") {
      temObj.gstPercent = value;
    } else if (filedName === "challanType") {
      form.setFieldsValue({ challanType: value });
    }

    items[rowName] = temObj;
    form.setFieldsValue({ items: items });

    // Tax Calculator
    let grossTotal = items.reduce((sum, item) => sum + item.finalAmount, 0);
    const temItems = items.map((item) => ({
      ...item,
      taxAmount: item.finalAmount * (item.gstPercent / 100),
    }));

    let taxAmount = temItems.reduce(
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
      console.log(delivery,'==delivery')
        delivery?.type === "customer"
          ? setIsCustomerChecked(true)
          : setIsVendorChecked(true);
        setDelivery({
          ...delivery,
          to: delivery?.to,
          address: delivery?.address,
        });
    }, [,]);

  useEffect(() => {}, []);
  return (
    <div>
      <FormItemCol
        label={"#Delivery Challan"}
        name={"no"}
        labelAlign="left"
        required={true}
        labelCol={{ span: 8 }}
        type={"counters"}
        rules={[
          {
            required: "true",
            message: "Please Provide Challan No",
          },
        ]}
        updateInForm={(value) => handleItemUpdate(value, "no")}
        preFillValue={form.getFieldValue("no")}
        width={"30vw"}
      />
      <FormItemCol
        label={"Challan Date"}
        name={"challanDate"}
        required={true}
        rules={[
          {
            required: true,
            message: "Please Select Challan Date",
          },
        ]}
        labelCol={{ span: 8 }}
        labelAlign="left"
        type={"date"}
        width={"30vw"}
        preFillValue={form.getFieldValue("challanDate")}
        updateInForm={(value) => handleItemUpdate(value, "challanDate")}
      />
      <FormItemCol
        label={"Challan Type"}
        name={"challanType"}
        required={true}
        rules={[
          {
            required: true,
            message: "Please Select Challan Type",
          },
        ]}
        labelCol={{ span: 8 }}
        width={"30vw"}
        labelAlign="left"
        type={"select"}
        entity={"Challan Type"}
        entityName={"challanType"}
        updateInForm={(value) => handleItemUpdate(value, "challanType")}
        preFillValue={form.getFieldValue("challanType")}
      />

      <FormItemCol
        label={"Vehicle No"}
        name={"vehicleNo"}
        labelCol={{ span: 8 }}
        labelAlign="left"
        type={"input"}
        width={"30vw"}
      />
      <FormItemCol
        label={"Contact No"}
        name={"contactNo"}
        labelCol={{ span: 8 }}
        labelAlign="left"
        type={"input"}
        width={"30vw"}
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
              label={<Taglabel text={"Delivery To"} type={"forFormField"} />}
              labelCol={{ span: 8 }}
              labelAlign="left"
              name={"delivery"}
              required ={true}
              rules={[
                {
                  required: true,
                  message: "Delivery To Required",
                },
              ]}
            >
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
                preFillAddress={form.getFieldValue("delivery")?.address}
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
                preFillAddress={form.getFieldValue("delivery")?.address}
                forDeliveryAddress={true}
                xl={6}
                lg={6}
              />
            </Col>
          )}
        </Row>{" "}
      </div>

      <CustomFormTableList form={form} />
      <PaymentLayoutComponent form={form} />
    </div>
  );
};

export default DeliveryChallan;
