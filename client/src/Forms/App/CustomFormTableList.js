import React, { useEffect, useState ,useRef} from "react";
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
    Tooltip,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";
import CustomModel from "components/CustomProductSelect";
import TaxPercent from "components/Comman/TaxPercent";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import CoustomButton from "components/Comman/CoustomButton";

const CustomFormTableList = ({ form }) => {
    const { entity, tenantId } = useParams();
    const { appApiCall } = useAuth();
    const calculateDiscount = (discountPercent, rate) => {
        let discoumntAmount = Math.floor((rate * discountPercent) / 100);
        return Math.ceil(rate - discoumntAmount);
    };

    const calculateTaxAmount = (taxPercent, rate, qty) => {
        let taxAmount = (rate * taxPercent) / 100;
        return Math.ceil(taxAmount * qty);
    };

    const handleItemsUpdate = (value, filedName, rowName) => {    
        const items = form.getFieldValue("items");
        console.log(items,"===")
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
            temObj.taxAmount = calculateTaxAmount(
                temObj?.gstPercent || 0,
                temObj?.rate,
                temObj?.qty || 0
            );
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
                temObj?.discountAmount || temObj?.rate,
                temObj?.qty || 0
            );
            temObj.finalAmount = Math.ceil(temObj.discountAmount * temObj.qty);
        } else if (filedName === "gstPercent") {
            value = Number(value);
            temObj.gstPercent = value;
            temObj.taxAmount = calculateTaxAmount(
                temObj?.gstPercent || 0,
                temObj?.discountAmount || temObj?.rate,
                temObj?.qty || 0
            );
        } else if (filedName === "discountPercent") {
            value = Number(value);
            temObj.discountPercent = value;

            let finalAmount = calculateDiscount(
                temObj.discountPercent,
                temObj.rate
            );
            temObj.taxAmount = calculateTaxAmount(
                temObj?.gstPercent || 0,
                finalAmount,
                temObj?.qty || 0
            );
            temObj.discountAmount = finalAmount;
            temObj.finalAmount = temObj.discountAmount * temObj.qty;
        }

        items[rowName] = temObj;
        form.setFieldsValue({ items: items });
        const shippingState = form.getFieldValue(["shippingAddress", "state"]);
        const isIntraState = shippingState?.toLowerCase() === "maharashtra";
        // Initialize tax field values
        let cgstAndSgst12 = 0,
            cgstAndSgst18 = 0,
            cgstAndSgst28 = 0;
        let igst12 = 0,
            igst18 = 0,
            igst28 = 0;

            items.forEach((item) => {
            const taxAmount = item.taxAmount || 0;

            if (isIntraState) {
                if (item.gstPercent === 12) cgstAndSgst12 += taxAmount;
                else if (item.gstPercent === 18) cgstAndSgst18 += taxAmount;
                else if (item.gstPercent === 28) cgstAndSgst28 += taxAmount;
            } else {
                if (item.gstPercent === 12) igst12 += taxAmount;
                else if (item.gstPercent === 18) igst18 += taxAmount;
                else if (item.gstPercent === 28) igst28 += taxAmount;
            }
        });

        // Add tax breakdown into for
        form.setFieldsValue({
            cgstAndSgst12: Math.ceil(cgstAndSgst12),
            cgstAndSgst18: Math.ceil(cgstAndSgst18),
            cgstAndSgst28: Math.ceil(cgstAndSgst28),
            igst12: Math.ceil(igst12),
            igst18: Math.ceil(igst18),
            igst28: Math.ceil(igst28),
        });
        // Tax Calculator
        let grossTotal = items.reduce((a, b) => a + b.finalAmount, 0);
        const temItems = items.map((item) => ({
            ...item,
            taxAmount: item.taxAmount,
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

    const handleDelete = (rowIndex) => {
        const items = form.getFieldValue("items") || [];
        items.splice(rowIndex, 1); // Remove the item
    
        // Recalculate totals
        let grossTotal = items.reduce((a, b) => a + (b.finalAmount || 0), 0);
    
        let taxAmount = items.reduce(
            (acc, item) => acc + (item.taxAmount || 0),
            0
        );
    
        let totalWithTax = grossTotal + taxAmount;
        let grandTotal = totalWithTax;
    
        // Determine intra/inter state
        const shippingState = form.getFieldValue(["shippingAddress", "state"]);
        const isIntraState = shippingState?.toLowerCase() === "maharashtra";
    
        // Recalculate tax field breakdowns
        let cgstAndSgst12 = 0,
            cgstAndSgst18 = 0,
            cgstAndSgst28 = 0;
        let igst12 = 0,
            igst18 = 0,
            igst28 = 0;
    
        items.forEach((item) => {
            const tax = item.taxAmount || 0;
            if (isIntraState) {
                if (item.gstPercent === 12) cgstAndSgst12 += tax;
                else if (item.gstPercent === 18) cgstAndSgst18 += tax;
                else if (item.gstPercent === 28) cgstAndSgst28 += tax;
            } else {
                if (item.gstPercent === 12) igst12 += tax;
                else if (item.gstPercent === 18) igst18 += tax;
                else if (item.gstPercent === 28) igst28 += tax;
            }
        });
    
        // Set all updated values
        form.setFieldsValue({
            items,
            grossTotal: Math.ceil(grossTotal),
            taxAmount: Math.ceil(taxAmount),
            totalWithTax: Math.ceil(totalWithTax),
            grandTotal: Math.ceil(grandTotal),
            cgstAndSgst12: isIntraState ? Math.ceil(cgstAndSgst12) : 0,
            cgstAndSgst18: isIntraState ? Math.ceil(cgstAndSgst18) : 0,
            cgstAndSgst28: isIntraState ? Math.ceil(cgstAndSgst28) : 0,
            igst12: !isIntraState ? Math.ceil(igst12) : 0,
            igst18: !isIntraState ? Math.ceil(igst18) : 0,
            igst28: !isIntraState ? Math.ceil(igst28) : 0,
        });
    };
    

    // State to store selected columns
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [columnOptions, setColumnOptions] = useState([]);

    const renderColumnHeader = (columnKey, label, spanValue,tooltip) => {
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
            {tooltip && (
              <Tooltip title={tooltip}>
                <span
                  style={{
                    cursor: "pointer",
                    color: "red   ",
                    fontSize: "1rem",
                  }}
                >
                  {" "}
                  *
                </span>
              </Tooltip>
            )}
          </Col>
        ) : null;
    };
    // Render Discount Amount only if Discount% is selected
 
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
                case "getPercent":
                    dynamicSpans.itemDetails -= 2;
                    break;
                case "discountPercent":
                    dynamicSpans.itemDetails -= 1;
                    dynamicSpans.qty -= 1;
                    break;
                case "discountAmount":
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
        // before de-selection check if the value is in item table
        console.log(value, options);
        await updateColumnStatus(value, false);

        let filter = selectedColumns.filter((v) => v !== value);
        setSelectedColumns(filter);

        const items = form.getFieldValue("items") || [];

        if (value === "discountPercent") {
            // Set all discountAmount to 0 and update finalAmount
            const updatedItems = items.map((item) => {
                const discountAmount = 0;
                const finalAmount = (item.qty * item.rate);
                return {
                    ...item,
                    discountAmount,
                    finalAmount,
                };
            });
            form.setFieldsValue({ items: updatedItems });
        }

        if (value === "gstPercent") {
            // Set all gstPercent to 0 and recalculate taxAmount
            const updatedItems = items.map((item) => {
                const gstPercent = 0;
                const taxAmount = 0;
                return {
                    ...item,
                    gstPercent,
                    taxAmount,
                };
            });
            form.setFieldsValue({ items: updatedItems,taxAmount:0});
        }
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

    const shippingState = Form.useWatch(["shippingAddress", "state"], form);

    useEffect(() => {
        const isIntraState = shippingState?.toLowerCase() === "maharashtra";
        const items = form.getFieldValue("items") || [];

        let cgstAndSgst12 = 0,
            cgstAndSgst18 = 0,
            cgstAndSgst28 = 0;
        let igst12 = 0,
            igst18 = 0,
            igst28 = 0;

        items.forEach((item) => {
            const taxAmount = item.taxAmount || 0;

            if (isIntraState) {
                if (item.gstPercent === 12) cgstAndSgst12 += taxAmount;
                else if (item.gstPercent === 18) cgstAndSgst18 += taxAmount;
                else if (item.gstPercent === 28) cgstAndSgst28 += taxAmount;
            } else {
                if (item.gstPercent === 12) igst12 += taxAmount;
                else if (item.gstPercent === 18) igst18 += taxAmount;
                else if (item.gstPercent === 28) igst28 += taxAmount;
            }
        });

        form.setFieldsValue({
            cgstAndSgst12: isIntraState ? Math.ceil(cgstAndSgst12) : 0,
            cgstAndSgst18: isIntraState ? Math.ceil(cgstAndSgst18) : 0,
            cgstAndSgst28: isIntraState ? Math.ceil(cgstAndSgst28) : 0,
            igst12: !isIntraState ? Math.ceil(igst12) : 0,
            igst18: !isIntraState ? Math.ceil(igst18) : 0,
            igst28: !isIntraState ? Math.ceil(igst28) : 0,
        });
    }, [shippingState]);
    
    useEffect(() => {
        getColumnPre();
    }, []);


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
                    marginBottom: "30px",
                    marginTop: "20px",
                    overflow: "scroll",
                }}
            >
                <div
                    style={{
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
                        {renderColumnHeader("hsnCode", "HSN", 2)}
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
                        {renderColumnHeader("discountPercent", "DIS%", 2)}
                        {renderColumnHeader("discountAmount", "Best Offer", 2)}
                        {renderColumnHeader("gstPercent","GST%",2)}
                        
                        {renderColumnHeader(
                            "taxAmount",
                            "TAX AMT",
                            2,
                            "TAX AMOUNT CALCULATED BASED ON RATE AND GST%"
                        )}

                        <Col
                            className="gutter-row"
                            span={dynamicSpan.totalBeforeTax}
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <Taglabel text="TOTAL AMT" />

                            {/* Tooltip with * sign */}
                            <Tooltip title="TOTAL AMOUNT BEFORE TAX ">
                                <span
                                    style={{
                                        cursor: "pointer",
                                        color: "red   ",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {" "}
                                    *
                                </span>
                            </Tooltip>
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
                                                    form={form}
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
                                                        form={form}
                                                        row={name}

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
                                                    <Input
                                                        placeholder="No Image"
                                                        onPressEnter={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    />
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
                                                        min={1}
                                                        controls={false}
                                                        onPressEnter={(e) => {
                                                            e.preventDefault();
                                                        }}
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
                                                        onPressEnter={(e) => {
                                                            e.preventDefault();
                                                        }}
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
                                                    onPressEnter={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                />,
                                                2,
                                                name,
                                                restField
                                            )}

                                            {renderColumnValue(
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
                                                    disabled
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
                                                    onPressEnter={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                />,
                                                2,
                                                name,
                                                restField
                                            )}

                                            {
                                                renderColumnValue(
                                                    "gstPercent",
                                                 

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
                                                            onPressEnter={(e) => {
                                                                e.preventDefault();
                                                            }}
                                                        />
                                                    ,
                                                    2,
                                                    name,
                                                    restField
                                                )
                                            }
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
                                                    disabled
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
                                                        disabled
                                                        className="moneyInput"
                                                        min={0}
                                                        controls={false}
                                                        readOnly={true}
                                                        onPressEnter={(e) => {
                                                            e.preventDefault();
                                                        }}
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
                                                            handleDelete(name);
                                                            // subOpt.remove(name);
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
                                    type="link"
                                    style={{
                                        color: "#22b378",
                                    }}
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
                                    details={true}
                                    withIcon={true}
                                >
                                    ADD NEW ROW
                                </Button>
                            </Row>
                        </div>
                    )}
                </Form.List>
            </div>
        </>
    );
};

export default CustomFormTableList;
