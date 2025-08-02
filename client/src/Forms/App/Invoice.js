import React, { useEffect, useState } from "react";
import FormItemCol from "components/Comman/FormItemCol";
import CustomFormTableList from "./CustomFormTableList";
import PaymentLayoutComponent from "./PaymentLayoutComponent";
import { Button, Typography, Checkbox, Select, Form, Divider } from "antd"; // Use AntD Checkbox instead of MUI for consistency
import CoustomerData from "Data/CoustomerData";
import CustomLabel from "components/Comman/CustomLabel";

const { Title } = Typography;

const QuotationForm = ({ form, entity }) => {
    const [customerSelected, setCustomerSelected] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [sameAsBilling, setSameAsBilling] = useState(false);

    useEffect(() => {
        const customer = form.getFieldValue("customer");
        setCustomerSelected(!!customer);
    }, [form.getFieldValue("customer")]);

    const handleSameAsBillingChange = (e) => {
        const isChecked = e.target.checked;
        setSameAsBilling(isChecked);
        setDisabled(isChecked);

        if (isChecked) {
            // Set shippingAddress as null
            form.setFieldsValue({ shippingAddress: null });
        } else {
            // Reset shippingAddress fields for manual input
            const currentAddress = form.getFieldValue("shippingAddress") || {};
            form.setFieldsValue({
                shippingAddress: {
                    street1: currentAddress.street1 || "",
                    street2: currentAddress.street2 || "",
                    city: currentAddress.city || "",
                    state: currentAddress.state || [],
                    pincode: currentAddress.pincode || "",
                },
            });
        }
    };

    const handleItemsUpdate = (value, fieldName, rowName) => {
        const items = form.getFieldValue("items") || [];
        let temObj = items[rowName];

        if (fieldName === "customer") {
            form.setFieldsValue({ customer: value });
            setCustomerSelected(true);
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
    console.log(form.getFieldsValue(),"==")
    return (
        <div>
            {/* CUSTOMER SELECTION */}
            <FormItemCol
                label="Select Customer"
                name="customer"
                labelAlign="left"
                labelCol={{ span: 8 }}
                required
                rules={[{ required: true, message: "Please Select Customer" }]}
                type="options"
                entity="customers"
                width="30vw"
                fieldName="name"
                updateInForm={(value) => handleItemsUpdate(value, "customer")}
                preFillValue={form.getFieldValue("customer")?.name}
            />

            {customerSelected && (
                <>
                    <Title
                        level={5}
                        style={{ marginBottom: 12, marginTop: 20 }}
                    >
                        Shipping Address
                    </Title>
                    <FormItemCol
                        name={["shippingAddress", "name"]}
                        label="Company Name"
                        type="text"
                        required
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        width="30vw"
                        disabled={disabled}
                    />
                    <FormItemCol
                        name={["shippingAddress", "street1"]}
                        label="Street 1"
                        type="text"
                        required
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        width="30vw"
                        disabled={disabled}
                    />
                    <FormItemCol
                        name={["shippingAddress", "street2"]}
                        label="Street 2"
                        type="text"
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        width="30vw"
                        disabled={disabled}
                    />
                    <FormItemCol
                        name={["shippingAddress", "city"]}
                        label="City"
                        type="text"
                        required
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        width="30vw"
                        disabled={disabled}
                    />
                    <FormItemCol
                        name={["shippingAddress", "pincode"]}
                        label="Pincode"
                        type="number"
                        required
                        labelAlign="left"
                        labelCol={{ span: 8 }}
                        width="30vw"
                        disabled={disabled}
                    />

                    <Form.Item
                        label={<CustomLabel label="State" required={true} />}
                        name={["shippingAddress", "state"]}
                        labelAlign="left"
                        labelCol={{ span: 4 }}
                        rules={[
                            {
                                required: true,
                                message: "Please select a state",
                            },
                        ]}
                        style={{ marginBottom: 16 }}
                    >
                        <Select
                            options={CoustomerData.states}
                            style={{ width: "30vw" }}
                            disabled={disabled}
                            onSelect={(value) =>
                                form.setFieldsValue({
                                    shippingAddress: { state: value },
                                })
                            }
                        />
                    </Form.Item>

                    <Divider style={{ marginTop: 20, marginBottom: 10 }} />
                </>
            )}

            {/* INVOICE INFO */}
            <FormItemCol
                label={"Invoice#"}
                name={"no"}
                required
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
                required
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
                required
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
        <FormItemCol
                label={"Driver Phone No"}
                name={"deriverContactNo"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                width={"30vw"}
                type={"text"}
                preFillValue={form.getFieldValue("deriverContactNo")}
                updateInForm={(value) => handleItemsUpdate(value, "deriverContactNo")}
            />
        <FormItemCol
                label={"Vehicle No"}
                name={"vehicleNo"}
                labelAlign="left"
                labelCol={{ span: 8 }}
                width={"30vw"}
                type={"text"}
                preFillValue={form.getFieldValue("vehicleNo")}
                updateInForm={(value) => handleItemsUpdate(value, "vehicleNo")}
            />


            <CustomFormTableList form={form} />
            <PaymentLayoutComponent form={form} />
        </div>
    );
};

export default QuotationForm;
