import React, { useEffect, useState } from "react";
import {
    Form,
    Table,
    Button,
    Select,
    Row,
    Col,
    Divider,
    Input,
    InputNumber,
    Image,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import CustomModel from "components/CustomModal";
import TaxPercent from "components/Comman/TaxPercent";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";

const CustomFormTableList = ({ form }) => {
    const { entity, tenantId } = useParams();
    const { appApiCall } = useAuth();
    const calculateDiscount = (discountPercent, rate) => {
        let discoumntAmount = Math.floor((rate * discountPercent) / 100);
        return Math.floor(rate - discoumntAmount);
    };

    const calculateTaxAmount = (taxPercent, rate, qty) => {
        let taxAmount = Math.floor((rate * taxPercent) / 100);
        return Math.floor(taxAmount * qty);
    };

    const handleItemsUpdate = (value, filedName, rowName) => {
        const items = form.getFieldValue("items");
        let temObj = items[rowName];
        if (filedName === "code" || filedName === "description") {
            let { details } = value;
            temObj.code = details?.code || "";
            temObj.description = details?.name;
            temObj.image = details?.image;
            temObj.hsnCode = details?.hsnCode || "";
            temObj.rate = details?.rate || 0;
            let finalAmount = calculateDiscount(
                temObj?.discountPercent || 0,
                temObj?.rate || 0
            );
            temObj.discountAmount = finalAmount;
            temObj.taxAmount = calculateTaxAmount(
                temObj?.gstPercent || 0,
                temObj?.discountAmount || temObj.rate,
                temObj?.qty || 0
            );
            temObj.finalAmount = temObj.discountAmount * temObj.qty;
        } else if (filedName === "hsnCode") {
            temObj.hsnCode = value;
        } else if (filedName === "qty") {
            temObj.qty = value;
            temObj.finalAmount = Math.ceil(value * temObj.rate);
        } else if (filedName === "rate") {
            temObj.rate = value;
            let finalAmount = calculateDiscount(
                temObj?.discountPercent || 0,
                temObj?.rate || 0
            );
            temObj.discountAmount = finalAmount;
            temObj.taxAmount = calculateTaxAmount(
                temObj?.gstPercent || 0,
                temObj?.discoumntAmount || temObj?.rate,
                temObj?.qty || 0
            );
            temObj.finalAmount = Math.ceil(temObj.discountAmount * temObj.qty);
        } else if (filedName === "gstPercent") {
            value = Number(value);
            temObj.gstPercent = value;
            temObj.taxAmount = calculateTaxAmount(
                temObj?.gstPercent || 0,
                temObj?.discoumntAmount || temObj?.rate,
                temObj?.qty || 0
            );
        } else if (filedName === "discountPercent") {
            value = Number(value);
            temObj.discountPercent = value;
            let finalAmount = calculateDiscount(
                temObj.discountPercent,
                temObj.rate
            );
            temObj.discountAmount = finalAmount;
            temObj.finalAmount = temObj.discountAmount * temObj.qty;
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
        let grandTotal = totalWithTax;
        form.setFieldsValue({
            grossTotal: Math.ceil(grossTotal),
            taxAmount: Math.ceil(taxAmount),
            totalWithTax: Math.ceil(totalWithTax),
            grandTotal: Math.ceil(grandTotal),
        });
    };

    // State to store selected columns
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [columnOptions, setColumnOptions] = useState([]);

    const renderColumnHeader = (columnKey, label, spanValue) => {
        return selectedColumns.includes(columnKey) ? (
            <Col
                className="gutter-row"
                span={spanValue}
                style={{
                    borderRight: "1px solid #bfbfbb",
                    textAlign: "center",
                }}
                key={columnKey}
            >
                <Taglabel text={label} />
            </Col>
        ) : null;
    };
    // Render Discount Amount only if Discount% is selected
    const renderDiscountAmountHeader = () => {
        return selectedColumns.includes("discountPercent") ? (
            <Col
                className="gutter-row"
                span={2}
                style={{
                    borderRight: "1px solid #bfbfbb",
                    textAlign: "center",
                }}
                key="discountAmount"
            >
                <Taglabel text="DISCOUNT RATE" />
            </Col>
        ) : null;
    };
    // A function to dynamically render columns with input components
    const renderColumnValue = (
        columnKey,
        component,
        spanValue,
        name,
        restField
    ) => {
        return selectedColumns.includes(columnKey) ? (
            <Col
                className="gutter-row"
                span={spanValue}
                style={{
                    textAlign: "center",
                }}
                key={columnKey}
            >
                <Form.Item {...restField} name={[name, columnKey]}>
                    {component}
                </Form.Item>
            </Col>
        ) : null;
    };
    const renderDiscountAmountColumnValue = (
        columnKey,
        component,
        spanValue,
        name,
        restField
    ) => {
        return selectedColumns.includes("discountPercent") ? (
            <Col
                className="gutter-row"
                span={spanValue}
                style={{
                    textAlign: "center",
                }}
                key={columnKey}
            >
                <Form.Item {...restField} name={[name, columnKey]}>
                    {component}
                </Form.Item>
            </Col>
        ) : null;
    };
    // Calculate the dynamic span for all columns to ensure total equals 24
    // Base spans for fixed columns
    const initialBaseSpans = {
        itemDetails: 11, // Initial span for ITEM DETAILS
        qty: 3,
        rate: 3,
        gst: 3,
        totalBeforeTax: 3,
        delete: 1,
    };
    const calculateDynamicSpans = () => {
        const totalColumns = 24;

        // Copy the initial base spans
        const dynamicSpans = { ...initialBaseSpans };

        // Adjust spans based on selected columns
        selectedColumns.forEach((column) => {
            switch (column) {
                case "code":
                    dynamicSpans.itemDetails -= 2;
                    break;
                case "image":
                    dynamicSpans.itemDetails -= 2;
                    break;
                case "hsnCode":
                    dynamicSpans.itemDetails -= 2;
                    break;
                case "discountPercent":
                    dynamicSpans.itemDetails -= 1;
                    dynamicSpans.qty -= 1;
                    dynamicSpans.rate -= 1;
                    dynamicSpans.gst -= 1;
                    break;
                case "taxAmount":
                    dynamicSpans.itemDetails -= 1;
                    dynamicSpans.totalBeforeTax -= 1;
                    break;
                default:
                    break;
            }
        });

        // Ensure the total span of all columns is 24
        const usedSpan = Object.values(dynamicSpans).reduce(
            (acc, span) => acc + span,
            0
        );
        const remainingSpan = totalColumns - usedSpan;

        return dynamicSpans;
    };

    let dynamicSpan = calculateDynamicSpans();

    const getColumnPre = async () => {
        let response = await appApiCall(
            "post",
            "getOrCreateColumnPreferences",
            {},
            { entity, tenantId }
        );
        if (response.success) {
            setColumnOptions(response.result);
            let selected = response.result.filter((ele) => ele.status === true);
            const values = selected.map((ele) => ele.value);
            // Update the state with the extracted values
            setSelectedColumns(values);
        }
    };
    // Options for optional columns
    // Function to handle column selection
    const handleSelect = async (value, option) => {
        // lets update the clicked column
        await updateColumnStatus(value, true);
        setSelectedColumns([...selectedColumns, value]);
    };
    const handleDeSelect = async (value, options) => {
        // before de slectiong check if the value is in item talble
        let items = form.getFieldValue("items");
        console.log(items.length, "items");
        if (items.length > 0) {
            return NotificationHandler.info({
                content: "Item tabel sholud be empty to De Select columns",
            });
        }
        await updateColumnStatus(value, false);
        let filter = selectedColumns.filter((v) => v !== value);
        setSelectedColumns(filter);
    };

    const updateColumnStatus = async (value, status) => {
        try {
            let response = await appApiCall(
                "post",
                "updateColumnPreferences",
                {
                    value,
                    status,
                },
                { entity, tenantId }
            );
            if (response.success) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            error.log(error);
            return false;
        }
    };

    useEffect(() => {
        getColumnPre();
    }, []);
    useEffect(() => {}, [form]);

    return (
        <>
            <Divider dashed />
            <Row
                justify="space-between"
                align="middle"
                style={{
                    marginBottom: "10px",
                    top: 0,
                    background: "#fff",
                    zIndex: 1,
                    position: "relative",
                }}
            >
                <Col flex="auto" style={{ textAlign: "center" }}>
                    <Taglabel text={"ITEM TABLE"} weight={1000} />
                </Col>

                <Col
                    flex="none"
                    style={{ position: "absolute", right: "20px" }}
                >
                    <Row>
                        <Taglabel text={"Optional Columns"} />
                    </Row>
                    <Row>
                        <Select
                            mode="multiple"
                            maxTagCount={0}
                            options={columnOptions}
                            value={selectedColumns}
                            style={{ width: "10vw" }}
                            onSelect={handleSelect}
                            onDeselect={handleDeSelect}
                            onClick={getColumnPre}
                            loading={columnOptions.length > 0 ? false : true}
                        />
                    </Row>
                </Col>
            </Row>

            <div
                style={{
                    position: "relative",
                    border: "2px solid #bfbfbb",
                    marginBottom: "20px",
                    margin: "20px",
                    overflow: "scroll",
                }}
            >
                <div
                    style={{
                        minWidth: 1100,
                        overflow: "auto",
                    }}
                >
                    <Row
                        style={{
                            position: "relative",
                            border: "1px solid #bfbfbb",
                        }}
                    >
                        {/* Dynamically render optional columns based on selection */}
                        {renderColumnHeader("code", "ITEM CODE", 2)}
                        <Col
                            className="gutter-row"
                            span={dynamicSpan.itemDetails}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text="ITEM DETAILS" />
                        </Col>
                        {renderColumnHeader("image", "IMAGE", 2)}
                        {renderColumnHeader("hsnCode", "HSN CODE", 2)}
                        <Col
                            className="gutter-row"
                            span={dynamicSpan.qty}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text="QTY" />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={dynamicSpan.rate}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text="RATE" />
                        </Col>
                        {renderColumnHeader("discountPercent", "DISCOUNT%", 2)}
                        {renderDiscountAmountHeader()}

                        <Col
                            className="gutter-row"
                            span={dynamicSpan.gst}
                            style={{
                                borderRight: "1px solid #bfbfbb",
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text="GST%" />
                        </Col>
                        {renderColumnHeader("taxAmount", "TAX AMOUNT", 2)}

                        <Col
                            className="gutter-row"
                            span={dynamicSpan.totalBeforeTax}
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text="TOTAL BEFORE TAX" />
                        </Col>
                    </Row>
                </div>
                <Form.List
                    name={"items"}
                    initialValue={[
                        {
                            finalAmount: 0,
                            qty: 1,
                            rate: 0,
                            gstPercent: 0,
                            finalAmount: 0,
                            description: "",
                        },
                    ]}
                >
                    {(subFields, subOpt) => (
                        <div>
                            <div
                                style={{
                                    overflowX: "auto",
                                    overflow: "auto",
                                    minHeight: "10vh",
                                    maxHeight: "40vh",
                                    minWidth: 1100,
                                }}
                            >
                                {subFields.map(
                                    ({ key, name, ...restField }) => (
                                        <Row
                                            key={key}
                                            align="middle"
                                            style={{
                                                marginTop: "5px",
                                            }}
                                        >
                                            {renderColumnValue(
                                                "code",
                                                <CustomModel
                                                    entity={"products"}
                                                    fieldName={"code"}
                                                    updateInForm={(value) => {
                                                        handleItemsUpdate(
                                                            value,
                                                            "code",
                                                            name
                                                        );
                                                    }}
                                                    preFillValue={
                                                        form.getFieldValue(
                                                            "items"
                                                        )?.[name]?.code
                                                    }
                                                    width={"100%"}
                                                />,
                                                2,
                                                name,
                                                restField
                                            )}

                                            <Col
                                                className="gutter-row"
                                                span={dynamicSpan.itemDetails}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "description"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please Select the description",
                                                        },
                                                    ]}
                                                >
                                                    <CustomModel
                                                        entity={"products"}
                                                        fieldName={"name"}
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
                                            {renderColumnValue(
                                                "image",

                                                form.getFieldValue("items")?.[
                                                    name
                                                ]?.image ? (
                                                    <Image
                                                        width={"100%"}
                                                        height={10}
                                                        src={
                                                            form.getFieldValue(
                                                                "items"
                                                            )?.[name]?.image
                                                        }
                                                        visible={false}
                                                    />
                                                ) : (
                                                    <Input placeholder="No Image" />
                                                ),

                                                2,
                                                name,
                                                restField
                                            )}
                                            {renderColumnValue(
                                                "hsnCode",
                                                <Input
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    onChange={(event) =>
                                                        handleItemsUpdate(
                                                            event.target.value,
                                                            "hsnCode",
                                                            name
                                                        )
                                                    }
                                                    preFillValue={
                                                        form.getFieldValue(
                                                            "items"
                                                        )?.[name]?.hsnCode
                                                    }
                                                />,
                                                2,
                                                name,
                                                restField
                                            )}

                                            <Col
                                                className="gutter-row"
                                                span={dynamicSpan.qty}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "qty"]}
                                                >
                                                    <InputNumber
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "qty",
                                                                name
                                                            )
                                                        }
                                                        controls={false}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                className="gutter-row"
                                                span={dynamicSpan.rate}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "rate"]}
                                                >
                                                    <InputNumber
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "rate",
                                                                name
                                                            )
                                                        }
                                                        controls={false}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            {renderColumnValue(
                                                "discountPercent",
                                                <InputNumber
                                                    onChange={(value) =>
                                                        handleItemsUpdate(
                                                            value,
                                                            "discountPercent",
                                                            name
                                                        )
                                                    }
                                                    min={false}
                                                    controls={false}
                                                    width="100%"
                                                    style={{
                                                        width: "100%",
                                                        textAlign: "center",
                                                    }}
                                                    preFillValue={
                                                        form.getFieldValue(
                                                            "items"
                                                        )?.[name]
                                                            ?.discountPercent
                                                    }
                                                />,
                                                2,
                                                name,
                                                restField
                                            )}

                                            {renderDiscountAmountColumnValue(
                                                "discountAmount",
                                                <InputNumber
                                                    updateInForm={(value) =>
                                                        handleItemsUpdate(
                                                            value,
                                                            "discountAmount",
                                                            name
                                                        )
                                                    }
                                                    min={false}
                                                    controls={false}
                                                    readOnly={true}
                                                    width="100%"
                                                    style={{
                                                        width: "100%",
                                                        textAlign: "center",
                                                    }}
                                                    preFillValue={
                                                        form.getFieldValue(
                                                            "items"
                                                        )?.[name]
                                                            ?.discountAmount
                                                    }
                                                />,
                                                2,
                                                name,
                                                restField
                                            )}

                                            <Col
                                                className="gutter-row"
                                                span={dynamicSpan.gst}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "gstPercent"]}
                                                >
                                                    <TaxPercent
                                                        updateInForm={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "gstPercent",
                                                                name
                                                            )
                                                        }
                                                        min={false}
                                                        controls={false}
                                                        width="100%"
                                                        style={{
                                                            width: "100%",
                                                            textAlign: "center",
                                                        }}
                                                        preFillValue={
                                                            form.getFieldValue(
                                                                "items"
                                                            )?.[name]
                                                                ?.gstPercent
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            {renderColumnValue(
                                                "taxAmount",
                                                <InputNumber
                                                    updateInForm={(value) =>
                                                        handleItemsUpdate(
                                                            value,
                                                            "taxAmount",
                                                            name
                                                        )
                                                    }
                                                    min={false}
                                                    controls={false}
                                                    readOnly={true}
                                                    width="100%"
                                                    style={{
                                                        width: "100%",
                                                        textAlign: "center",
                                                    }}
                                                    preFillValue={
                                                        form.getFieldValue(
                                                            "items"
                                                        )?.[name]?.taxAmount
                                                    }
                                                />,
                                                2,
                                                name,
                                                restField
                                            )}

                                            <Col
                                                className="gutter-row"
                                                span={
                                                    dynamicSpan.totalBeforeTax
                                                }
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "finalAmount"]}
                                                >
                                                    <InputNumber
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        className="moneyInput"
                                                        min={0}
                                                        controls={false}
                                                        readOnly={true}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                className="gutter-row"
                                                span={dynamicSpan.delete}
                                                style={{ textAlign: "center" }}
                                            >
                                                <Form.Item>
                                                    <DeleteOutlined
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

                            <Button
                                type="primary"
                                onClick={() => {
                                    subOpt.add({
                                        description: "",
                                        qty: 1,
                                        hsnCode: "",
                                        rate: 0,
                                        discountPercent: 0,
                                        gstPercent: 0,
                                    });
                                }}
                                icon={<PlusOutlined />}
                                style={{
                                    marginTop: "1rem",
                                    background: "green",
                                    width: "200px",
                                }}
                                block
                            >
                                Add Item
                            </Button>
                        </div>
                    )}
                </Form.List>
            </div>
        </>
    );
};

export default CustomFormTableList;
