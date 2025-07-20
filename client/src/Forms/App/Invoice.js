import React, { useEffect, useState } from "react";
import FormItemCol from "components/Comman/FormItemCol";
import CustomFormTableList from "./CustomFormTableList";
import PaymentLayoutComponent from "./PaymentLayoutComponent";
import { Button, Typography } from "antd";
const { Title } = Typography;

const QuotationForm = ({ form, entity }) => {
    const [customerSelected, setCustomerSelected] = useState(false);

    useEffect(() => {
        const customer = form.getFieldValue("customer");
        setCustomerSelected(!!customer);
    }, [form.getFieldValue("customer")]);

    const handleItemsUpdate = (value, fieldName, rowName) => {
        const items = form.getFieldValue("items") || [];
        let temObj = items[rowName];

        if (fieldName === "customer") {
            form.setFieldsValue({ customer: value });
            console.log(value,"===")
            setCustomerSelected(true); // trigger UI update
            return;
        }

        if (["no", "invoiceDate", "dueDate"].includes(fieldName)) {
            form.setFieldsValue({ [fieldName]: value });
            return;
        }

        if (["description", "qty", "rate", "gstPercent"].includes(fieldName)) {
            if (!temObj) return;
            if (fieldName === "description") {
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
                temObj.gstPercent = Number(value);
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

            let otherCharges = form.getFieldValue("otherCharges") || [];
            otherCharges.forEach((charge) => {
                const amountToAdjust =
                    charge.rsOrPercent === "percent"
                        ? (totalWithTax * (charge.amount || 0)) / 100
                        : charge.amount || 0;

                grandTotal +=
                    charge.action === "add" ? amountToAdjust : -amountToAdjust;
            });

            form.setFieldsValue({
                grossTotal: Math.ceil(grossTotal),
                taxAmount: Math.ceil(taxAmount),
                totalWithTax: Math.ceil(totalWithTax),
                grandTotal: Math.ceil(grandTotal),
            });
        }
    };

    return (
        <div>
            {/* CUSTOMER SELECTION */}
            <FormItemCol
                label={"Select Customer"}
                name={"customer"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                required={true}
                rules={[{ required: true, message: "Please Select Customer" }]}
                type="options"
                entity="customers"
                width={"30vw"}
                fieldName={"name"}
                updateInForm={(value) => handleItemsUpdate(value, "customer")}
                preFillValue={form.getFieldValue("customer")?.name}
            />
            {/* CONDITIONAL SHIPPING ADDRESS - JUST AFTER CUSTOMER */}
            {customerSelected && (
                <>
                    <Title level={5} style={{ marginBottom: 0, marginTop: 20 }}>
                        Shipping Address
                    </Title>

                    {true && (
                        <div style={{ marginBottom: 16 }}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    const billing = true;
                                    form.setFieldsValue({
                                        shippingAddress: {
                                            street1: billing.street1 || "",
                                            street2: billing.street2 || "",
                                            city: billing.city || "",
                                            state: billing.state || [],
                                            pincode: billing.pincode || "",
                                        },
                                    });
                                }}
                            >
                                Same as Billing Address
                            </Button>
                        </div>
                    )}

                    <FormItemCol
                        name={["shippingAddress", "street1"]}
                        label={"Street 1"}
                        type="text"
                        required
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        width={"30vw"}
                    />
                    <FormItemCol
                        name={["shippingAddress", "street2"]}
                        label={"Street 2"}
                        type="text"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        width={"30vw"}
                    />
                    <FormItemCol
                        name={["shippingAddress", "city"]}
                        label={"City"}
                        type="text"
                        required
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        width={"30vw"}
                    />
                    <FormItemCol
                        name={["shippingAddress", "pincode"]}
                        label={"Pincode"}
                        type="number"
                        required
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        width={"30vw"}
                    />
                    <FormItemCol
                        name={["shippingAddress", "state"]}
                        label={"State"}
                        type="multiSelect"
                        entity="states"
                        fieldName="name"
                        required
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        width={"30vw"}
                    />
                </>
            )}
            {/* Hidden Prefix/Suffix */}
            <FormItemCol name="prefix" hidden type="text" />
            <FormItemCol name="suffix" hidden type="text" />
            {/* INVOICE INFO */}
            <FormItemCol
                label={"Invoice#"}
                name={"no"}
                required={true}
                type={"counters"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                width={"30vw"}
                rules={[{ required: true, message: "Please Provide Quote No" }]}
                entity={entity}
                updateInForm={(value) => handleItemsUpdate(value, "no")}
                parentForm={form}
                preFillValue={form.getFieldValue("no")}
            />
            <FormItemCol
                label={"Invoice Date"}
                name={"invoiceDate"}
                required={true}
                labelCol={{ span: 8 }}
                width={"30vw"}
                type={"date"}
                labelAlign="left"
                rules={[
                    { required: true, message: "Please Select Quote Date" },
                ]}
                preFillValue={form.getFieldValue("invoiceDate")}
                updateInForm={(value) =>
                    handleItemsUpdate(value, "invoiceDate")
                }
            />
            <FormItemCol
                label={"Due Date"}
                name={"dueDate"}
                required={true}
                labelAlign="left"
                labelCol={{ span: 8 }}
                width={"30vw"}
                type={"date"}
                rules={[
                    {
                        required: true,
                        message: "Please Select Quote Expiry Date",
                    },
                ]}
                preFillValue={form.getFieldValue("dueDate")}
                updateInForm={(value) => handleItemsUpdate(value, "dueDate")}
            />
            <CustomFormTableList form={form} />
            <PaymentLayoutComponent form={form} />
        </div>
    );
};

export default QuotationForm;
