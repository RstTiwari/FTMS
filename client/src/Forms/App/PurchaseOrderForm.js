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
import CustomModel from "components/CustomModal";
import NotificationHandler from "EventHandler/NotificationHandler";
import AddressDetails from "components/Comman/AddressDetails";
import { useParams } from "react-router-dom";
import useInitialFormValues from "Hook/useIntialFormValues";

const PurchaseOrder = ({ form, value, disabled, isModel }) => {
    const [isOrganizationChecked, setIsOrganizationChecked] = useState(false);
    const [isCustomerChecked, setIsCustomerChecked] = useState(false);
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
            setIsOrganizationChecked(true);
            setIsCustomerChecked(false);
        } else if (type === "customer") {
            form.setFieldsValue({ delivery: "" });
            setIsOrganizationChecked(false);
            setIsCustomerChecked(true);
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
            return NotificationHandler.error("invalid changes");
        }

        items[rowName] = temObj;
        const grossTotal = items.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.finalAmount;
        }, 0);

        let temArray = items.map((item) => ({
            ...item,
            taxAmount: item.finalAmount * (item.gstPercent / 100) || 0,
        }));

        const totalTaxAmount = temArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.taxAmount;
        }, 0);

        let grandTotal = totalTaxAmount + grossTotal;
        form.setFieldsValue({
            items: items,
            grossTotal: Math.ceil(grossTotal),
            taxAmount: Math.ceil(totalTaxAmount),
            grandTotal: Math.ceil(grandTotal),
        });
    };

    useEffect(() => {
        //Checking delivery Address Type
        let delivery = form.getFieldValue("delivery");
        if (id) {
            delivery?.type === "customer"
                ? setIsCustomerChecked(true)
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
                type={"model"}
                width={"25vw"}
                entity={"vendors"}
                fieldName={"name"}
                updateInForm={(value) => {
                    handleItemsUpdate(value, "vendorName");
                }}
                preFillValue={form.getFieldValue("vendor")?.name}
            />
            <FormItemCol
                label={"#PURCHASE"}
                name={"no"}
                labelAlign="left"
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
                preFillValue={form.getFieldValue("no")}
            />
            <Row>
                <FormItemCol
                    label={"Purchase Date"}
                    name={"purchaseDate"}
                    labelAlign="left"
                    type={"date"}
                    labelCol={{ span: 8 }}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Delivery Date",
                        },
                    ]}
                    updateInForm={(value) =>
                        handleItemsUpdate(value, "purchaseDate")
                    }
                    preFillValue={form.getFieldValue("purchaseDate")}
                />
            </Row>
            <Row>
                <FormItemCol
                    label={"Delivery Date"}
                    name={"deliveryDate"}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Delivery Date",
                        },
                    ]}
                    labelAlign="left"
                    type={"date"}
                    labelCol={{ span: 8 }}
                    updateInForm={(value) =>
                        handleItemsUpdate(value, "deliveryDate")
                    }
                    preFillValue={form.getFieldValue("deliveryDate")}
                />
            </Row>
            <div>
                <Row>
                    <Col
                        xs={24}
                        sm={24}
                        md={{ span: 12 }}
                        lg={{ span: 8 }}
                        xl={{ span: 8 }}
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
                                ORGANIZATION
                            </Checkbox>
                            <Checkbox
                                checked={isCustomerChecked}
                                onChange={() =>
                                    handleCheckboxChange("customer")
                                }
                            >
                                CUSTOMER
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    {isOrganizationChecked && (
                        <Col
                            xs={24}
                            sm={24}
                            md={{ span: 6, offset: 3 }}
                            lg={{ span: 6, offset: 3 }}
                            xl={{ span: 6, offset: 3 }}
                        >
                            <AddressDetails
                                id={tenantId}
                                initialRender={true}
                                entityName={"Delivery Address"}
                                onlyShippingAddress={true}
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
                            md={{ span: 24, offset: 3 }}
                            lg={{ span: 24, offset: 3 }}
                            xl={{ span: 24, offset: 3 }}
                        >
                            <FormItemCol
                                label={"Select Customer"}
                                name={"customer"}
                                labelAlign="left"
                                type={"model"}
                                entity={"customers"}
                                width={"25vw"}
                                fieldName={"name"}
                                onlyShippingAddress={true}
                                updateInForm={updateDeliveryAddress}
                                preFillValue={
                                    form.getFieldValue("delivery")?.to
                                }
                                preFillAddress={
                                    form.getFieldValue("delivery")?.address
                                }
                                forDeliveryAddress={true}
                            />
                        </Col>
                    )}
                </Row>{" "}
            </div>

            <Divider dashed />
            <Row justify={"center"} style={{ marginBottom: "10px" }}>
                <Taglabel text={"ITEM TABLE"} weight={1000} />
            </Row>
            <div
                style={{
                    position: "relative",
                    border: "2px solid #bfbfbb",
                    margin: "20px",
                    marginBottom: "20px",
                    overflow: "auto",
                }}
            >
                <div style={{ overflow: "auto", minWidth: 1200 }}>
                    <Row
                        style={{
                            position: "relative",
                            border: "1px solid #bfbfbb",
                        }}
                    >
                        <Col
                            className="gutter-row"
                            span={7}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text={"ITEM DESCRIPTION"} weight={700} />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={4}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text={"Rate"} />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={4}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text={"Qty"} />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={4}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text={"GST Tax %"} />
                        </Col>
                        <Col
                            className="gutter-row"
                            style={{ textAlign: "center" }}
                            span={5}
                        >
                            <Taglabel text={"Total Amount(Before tax)"} />
                        </Col>
                    </Row>
                </div>
                <Form.List
                    name={"items"}
                    initialValue={[
                        {
                            description: "",
                            rate: 0,
                            qty: 1,
                            gstPercent: 0,
                            finalAmount: 0,
                        },
                    ]}
                >
                    {(subFields, subOpt) => (
                        <div>
                            <div
                                style={{
                                    overflowA: "auto",
                                    overflowY: "auto",
                                    minHeight: "10vh",
                                    maxHeight: "40vh",
                                    minWidth: 1200,
                                }}
                            >
                                {subFields.map(
                                    ({ key, name, ...restField }) => (
                                        <Row
                                            key={key}
                                            align={"middle"}
                                            style={{ marginTop: "5px" }}
                                        >
                                            <Col
                                                className="gutter-row"
                                                span={7}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "description"]}
                                                >
                                                    <CustomModel
                                                        entity={"products"}
                                                        fieldName={
                                                            "productName"
                                                        }
                                                        updateInForm={(
                                                            value
                                                        ) => {
                                                            handleItemsUpdate(
                                                                value,
                                                                "description",
                                                                name
                                                            );
                                                        }}
                                                        preFillValue={
                                                            form.getFieldValue(
                                                                "items"
                                                            )?.[name]
                                                                ?.description
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "rate"]}
                                                >
                                                    <InputNumber
                                                        onChange={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "rate",
                                                                name
                                                            )
                                                        }
                                                        controls={false}
                                                        style={{
                                                            textAlign: "center",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "qty"]}
                                                >
                                                    <InputNumber
                                                        onChange={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "qty",
                                                                name
                                                            )
                                                        }
                                                        controls={false}
                                                        style={{
                                                            width: "100%",
                                                            textAlign: "center",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "gstPercent"]}
                                                >
                                                    <CustomSelect
                                                        updateInForm={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "gstPercent",
                                                                name
                                                            )
                                                        }
                                                        width={"100%"}
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                        entity={"gstPercent"}
                                                        entityName={
                                                            "gstPercent"
                                                        }
                                                        preFillValue={
                                                            form.getFieldValue(
                                                                "items"
                                                            )?.[name]
                                                                ?.gstPercent
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                span={4}
                                                style={{ textAlign: "center" }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "finalAmount"]}
                                                >
                                                    <InputNumber
                                                        readOnly
                                                        className="moneyInput"
                                                        min={0}
                                                        controls={false}
                                                        style={{
                                                            width: "100%",
                                                            textAlign: "center",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                span={1}
                                                style={{ textAlign: "center" }}
                                            >
                                                <Form.Item>
                                                    <DeleteOutlined
                                                        disabled={disabled}
                                                        style={{
                                                            color: "red",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            subOpt.remove(name);
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    )
                                )}
                            </div>
                            <Row justify="start">
                                <Button
                                    type="primary"
                                    disabled={disabled}
                                    onClick={() => {
                                        subOpt.add({
                                            description: "",
                                            finalAmount: 0,
                                            qty: 1,
                                            gstPercent: 0,
                                            rate: 0,
                                        });
                                    }}
                                    icon={<PlusOutlined />}
                                    style={{
                                        marginTop: "1rem",
                                        background: "#22b378",
                                        width: "200px",
                                    }}
                                >
                                    Add Item
                                </Button>
                            </Row>
                        </div>
                    )}
                </Form.List>
            </div>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Grand Total"
                    name={"grossTotal"}
                    tooltip={"Amount Before Tax"}
                    labelAlign="left"
                    type={"number"}
                    labelCol={{ span: 10 }}
                    readOnly={true}
                />
            </Row>
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Tax Amount(Rs)"
                    name={"taxAmount"}
                    labelCol={{ span: 10 }}
                    labelAlign="left"
                    tooltip={"Tax Amount on Gross Total"}
                    type={"number"}
                    readOnly={true}
                />
            </Row>
            {/* <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Transport(Rs)"
                    name={"transPortAmount"}
                    labelCol={{ span: 10 }}
                    updateInForm ={(value)=>{handleItemsUpdate(value,"transPortAmount")}}
                    labelAlign="left"
                    type={"number"}
                />
               
            </Row> */}
            <Row align={"middle"} justify={"end"}>
                <FormItemCol
                    label="Grand Total"
                    tooltip={"Amount After Tax"}
                    name={"grandTotal"}
                    labelCol={{ span: 10 }}
                    readOnly={true}
                    labelAlign="left"
                    type={"number"}
                />
            </Row>
            <Row justify={"start"}>
                <Taglabel
                    text={"Terms and Condition"}
                    type={"heading"}
                    weight={900}
                />
            </Row>

            <Row justify={"start"}>
                <FormItemCol
                    label={"Payments"}
                    name={"paymentCondition"}
                    labelCol={{ span: 8 }}
                    type={"select"}
                    width={"50vw"}
                    entity={"Payments Condition"}
                    entityName={"purchasePaymentsCondition"}
                    updateInForm={(value) =>
                        handleItemsUpdate(value, "paymentCondition")
                    }
                    preFillValue={form.getFieldValue("paymentCondition")}
                />
            </Row>
            <Row justify={"start"}>
                <FormItemCol
                    label={"Cancellation"}
                    name={"cancellationCondition"}
                    type={"select"}
                    width={"50vw"}
                    labelCol={{ span: 8 }}
                    entity={"Cancellation Condition"}
                    entityName={"purchaseCancellationCondition"}
                    updateInForm={(value) =>
                        handleItemsUpdate(value, "cancellationCondition")
                    }
                    preFillValue={form.getFieldValue("cancellationCondition")}
                />
            </Row>
        </div>
    );
};

export default PurchaseOrder;
