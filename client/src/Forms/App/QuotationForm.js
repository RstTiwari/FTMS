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
import CustomModal from "components/CustomProductSelect";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import { jsDateIntoDayjsDate } from "Helper/EpochConveter";
import TaxPercent from "components/Comman/TaxPercent";
import CustomFormTableList from "./CustomFormTableList";
import PaymentLayoutComponent from "./PaymentLayoutComponent";
import CoustomerData from "Data/CoustomerData";

const QuotationForm = ({ form,entity }) => {
    const handleItemsUpdate = (value, filedName, rowName) => {
        const items = form.getFieldValue("items");
        let temObj = items[rowName];
        if (filedName === "description") {
            let { description, rate, hsnCode } = value;
            temObj.description = description;
            temObj.rate = Math.ceil(rate);
            temObj.finalAmount = Math.ceil(temObj.qty * rate);
        } else if (filedName === "rate") {
            temObj.rate = value;
            temObj.finalAmount = Math.ceil(temObj.qty * value);
        } else if (filedName === "qty") {
            temObj.qty = value;
            temObj.finalAmount = Math.ceil(value * temObj.rate);
        } else if (filedName === "gstPercent") {
            value = Number(value);
            temObj.gstPercent = value;
        } else if (filedName === "transportAmount") {
            form.setFieldsValue({ transportAmount: value });
        } else if (filedName === "paymentsCondition") {
            form.setFieldsValue({ paymentsCondition: value });
        } else if (filedName === "deliveryCondition") {
            form.setFieldsValue({ deliveryCondition: value });
        } else if (filedName === "cancellationCondition") {
            form.setFieldsValue({ cancellationCondition: value });
        } else if (filedName === "validityCondition") {
            form.setFieldsValue({ validityCondition: value });
        } else if (filedName === "customer") {
            form.setFieldsValue({ customer: value });
        } else if (filedName === "no") {
            form.setFieldsValue({ no: value });
        } else if (filedName === "sub") {
            form.setFieldsValue({ sub: value });
        } else if (filedName === "salesPerson") {
            form.setFieldsValue({ salesPerson: value });
        } else if (filedName === "quoteDate") {
            form.setFieldsValue({ quoteDate: value });
        } else if (filedName === "expiryDate") {
            form.setFieldsValue({ expiryDate: value });
        } else {
        }

        items[rowName] = temObj;
        form.setFieldsValue({ items: items });

        // Tax Calculator
        let grossTotal = items.reduce((a, b) => a + b.finalAmount, 0);
        const temItems = items.map((item) => ({
            ...item,
            taxAmount: item.finalAmount * (item.gstPercent / 100),
        }));

        let taxAmount = temItems.reduce(
            (acc, item) => acc + (item.taxAmount || 0),
            0
        );
        let totalWithTax = grossTotal + taxAmount;
        let grandTotal = Math.ceil(totalWithTax);
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
            totalWithTax:Math.ceil( totalWithTax),
            grandTotal: Math.ceil(grandTotal),
        });
    };

    useEffect(() => {}, []);
    return (
        <div>
            <FormItemCol
                label={"Select Customer"}
                name={"customer"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                type="options"
                width={"30vw"}
                entity={"customers"}
                fieldName="name" // filed name form customer modal
                onlyShippingAddress={true}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "customer");
                }}
                form={form}
                preFillValue={form.getFieldValue("customer")?.name}
            />
            <FormItemCol
                name={"prefix"}
                labelAlign="left"
                hidden={true}
                labelCol={{ span: 8 }}
                width={"30vw"}
            />
            <FormItemCol
                label={"#Quote"}
                name={"no"}
                labelAlign="left"
                required={true}
                labelCol={{ span: 8 }}
                width={"30vw"}
                type={"counters"}
            rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "no");
                }}
                parentForm={form}
                entity={entity}
                preFillValue={form.getFieldValue("no")}
            />
            <FormItemCol
                name={"suffix"}
                labelAlign="left"
                hidden={true}
                labelCol={{ span: 8 }}
                width={"30vw"}
            />
            <FormItemCol
                label={"Quote Date"}
                name={"quoteDate"}
                required={true}
                labelCol={{ span: 8 }}
                width={"30vw"}
                rules={[
                    {
                        required: true,
                        message: "Please Select Quote Date",
                    },
                ]}
                labelAlign="left"
                type={"date"}
                preFillValue={form.getFieldValue("quoteDate")}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "quoteDate");
                }}
            />
            <FormItemCol
                label={"Sub"}
                name={"sub"}
                type={"select"}
                tooltip={"Let your customer know what this quote is for"}
                width={"30vw"}
                entity={"Quotation Sub"}
                labelCol={{ span: 8 }}
                entityName="sub"
                updateInForm={(value) => {
                    handleItemsUpdate(value, "sub");
                }}
                preFillValue={form.getFieldValue("sub")}
            />
            <FormItemCol
                label={"Attn"}
                name={"attn"}
                type={"text"}
                width={"30vw"}
                labelCol={{ span: 8 }}
                entityName="attn"
                updateInForm={(value) => {
                    handleItemsUpdate(value, "attn");
                }}
                preFillValue={form.getFieldValue("attn")}
            />
            <FormItemCol
                label={"Sales Person"}
                name={"salesPerson"}
                type={"select"}
                entity={"Sales Person"}
                entityName="salesPerson"
                width={"30vw"}
                labelCol={{ span: 8 }}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "salesPerson");
                }}
                preFillValue={form.getFieldValue("salesPerson")}
            />
            <FormItemCol
                label={"Message"}
                name={"message"}
                type={"textArea"}
                width={"30vw"}
                labelCol={{ span: 8 }}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "message");
                }}
                preFillValue={form.getFieldValue("message")}
              
            />
            <CustomFormTableList form={form} />
            <PaymentLayoutComponent form={form} />
        </div>
    );
};

export default QuotationForm;
