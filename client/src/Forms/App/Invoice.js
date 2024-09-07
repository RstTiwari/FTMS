import React from "react";
import { Form, Row, Col, Input, InputNumber, Button, Divider } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import CustomSelect from "components/Comman/CustomSelect";
import CustomModel from "components/CustomModal";
import NotificationHandler from "EventHandler/NotificationHandler";
import TaxPercent from "components/Comman/TaxPercent";
import CustomFormTableList from "./CustomFormTableList";
import PaymentLayoutComponent from "./PaymentLayoutComponent";

const QuotationForm = ({ form }) => {
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const inputWidth = isLaptop ? 700 : 350;
    const inputFontSize = isLaptop ? "1rem" : "0.4rem";

    const handleItemsUpdate = (value, fieldName, rowName) => {
        const items = form.getFieldValue("items");
        let temObj = items[rowName];

        if (fieldName === "customer") {
            form.setFieldsValue({ customer: value });
        } else if (fieldName === "no") {
            form.setFieldsValue({ no: value });
        } else if (fieldName === "description") {
            let { description, rate, hsnCode } = value;
            temObj.description = description;
            temObj.hsnCode = hsnCode;
            temObj.rate = rate;
            temObj.finalAmount = temObj.rate * temObj.qty;
        } else if (fieldName === "qty") {
            temObj.qty = value;
            temObj.finalAmount = temObj.rate * value;
        } else if (fieldName === "rate") {
            temObj.rate = value;
            temObj.finalAmount = temObj.qty * value;
        } else if (fieldName === "gstPercent") {
            value = Number(value);
            temObj.gstPercent = value;
        } else if (fieldName === "invoiceDate") {
            form.setFieldsValue({ invoiceDate: value });
        } else if (fieldName === "dueDate") {
            form.setFieldsValue({ dueDate: value });
        } else {
        }

        items[rowName] = temObj;
        let grossTotal = items.reduce(
            (acc, item) => acc + (item.finalAmount || 0),
            0
        );
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
            grossTotal: Math.ceil(grossTotal),
            taxAmount: Math.ceil(taxAmount),
            totalWithTax: Math.ceil(totalWithTax),
            grandTotal: Math.ceil(grandTotal),
        });
    };

    return (
        <div>
            <FormItemCol
                label={"Select Customer"}
                name={"customer"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                required={true}
                rules={[
                    {
                        required: "true",
                        message: "Please Select Customer",
                    },
                ]}
                type="modal"
                entity="customers"
                width={"25vw"}
                customerSelect=""
                fieldName={"name"}
                updateInForm={(value) => handleItemsUpdate(value, "customer")}
                preFillValue={form.getFieldValue("customer")?.name}
            />

            <FormItemCol
                label={"Invoice#"}
                name={"no"}
                required={true}
                type={"counters"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
                updateInForm={(value) => handleItemsUpdate(value, "no")}
                preFillValue={form.getFieldValue("no")}
            />

            <FormItemCol
                label={"Invoice Date"}
                name={"invoiceDate"}
                required={true}
                labelCol={{ span: 8 }}
                rules={[
                    {
                        required: true,
                        message: "Please Select Quote Date",
                    },
                ]}
                labelAlign="left"
                type={"date"}
                preFillValue={form.getFieldValue("invoiceDate")}
                updateInForm={(value) =>
                    handleItemsUpdate(value, "invoiceDate")
                }
            />
            <FormItemCol
                label={"Due Date"}
                name={"dueDate"}
                required={true}
                rules={[
                    {
                        required: true,
                        message: "Please Select Quote Expiry Date",
                    },
                ]}
                labelAlign="left"
                labelCol={{ span: 8 }}
                type={"date"}
                preFillValue={form.getFieldValue("dueDate")}
                updateInForm={(value) => handleItemsUpdate(value, "dueDate")}
            />

            <Divider dashed />
            <CustomFormTableList form={form} />
            <PaymentLayoutComponent form={form} />
            <FormItemCol form={form} type={"terms"} />
            {/* Other form items go here */}
        </div>
    );
};

export default QuotationForm;
