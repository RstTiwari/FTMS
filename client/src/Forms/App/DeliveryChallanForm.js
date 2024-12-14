import React, { useState, useRef, useEffect } from "react";
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
} from "antd";

import { PlusOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import { useAuth } from "state/AuthProvider";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import CustomSelect from "components/Comman/CustomSelect";
import CustomModel from "components/CustomModal";
import TaxPercent from "components/Comman/TaxPercent";
import CustomFormTableList from "./CustomFormTableList";
import PaymentLayoutComponent from "./PaymentLayoutComponent";

const DeliveryChallan = ({ form }) => {
    const isLaptop = useMediaQuery("(min-width:1000px)");

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
                const amountToAdjust =
                    (totalWithTax * (charge.amount || 0)) / 100;
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

    useEffect(() => {}, []);
    return (
      <div>
        <FormItemCol
          label={"Select Customer"}
          name={"customer"}
          labelAlign="left"
          required={true}
          labelCol={{ span: 8 }}
          rules={[
            {
              required: "true",
              message: "Please Select Customer",
            },
          ]}
          type="modal"
          width={"30vw"}
          entity={"customers"}
          fieldName={"name"}
          onlyShippingAddress={true}
          updateInForm={(value) => handleItemUpdate(value, "customer")}
          preFillValue={form.getFieldValue("customer")?.name}
        />
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

        <CustomFormTableList form={form} />
        <PaymentLayoutComponent form={form} />
        <FormItemCol form={form} type={"terms"} />
      </div>
    );
};

export default DeliveryChallan;
