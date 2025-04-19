import React from "react";
import {  Divider } from "antd";
import FormItemCol from "components/Comman/FormItemCol";
import CustomFormTableList from "./CustomFormTableList";
import PaymentLayoutComponent from "./PaymentLayoutComponent";

const QuotationForm = ({ form,entity }) => {

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
                type="options"
                entity="customers"
                width={"30vw"}
                customerSelect=""
                fieldName={"name"}
                updateInForm={(value) => handleItemsUpdate(value, "customer")}
                preFillValue={form.getFieldValue("customer")?.name}
            />
              <FormItemCol
                name={"prefix"}
                required={true}
                type={"text"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                hidden={true}
                width={"30vw"}
             
            />
            <FormItemCol
                label={"Invoice#"}
                name={"no"}
                required={true}
                type={"counters"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                width={"30vw"}
                rules={[
                    {
                        required: "true",
                        message: "Please Provide Quote No",
                    },
                ]}
                entity={entity}
                updateInForm={(value) => handleItemsUpdate(value, "no")}
                parentForm={form}
                preFillValue={form.getFieldValue("no")}
            />
                <FormItemCol
                name={"suffix"}
                required={true}
                type={"text"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                hidden={true}
            />
            <FormItemCol
                label={"Invoice Date"}
                name={"invoiceDate"}
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
                width={"30vw"}
                type={"date"}
                preFillValue={form.getFieldValue("dueDate")}
                updateInForm={(value) => handleItemsUpdate(value, "dueDate")}
            />
            <Divider dashed />
            <CustomFormTableList form={form} />
            <PaymentLayoutComponent form={form} />
        </div>
    );
};

export default QuotationForm;
