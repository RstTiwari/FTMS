import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Form,
    Row,
    Col,
    Button,
    Select,
    Input,
    InputNumber,
    Collapse,
    Divider,
} from "antd";
import {
    PlusOutlined,
    MinusCircleOutlined,
    CaretRightOutlined,
} from "@ant-design/icons";
import CoustomButton from "../../components/Comman/CoustomButton";
import { DeleteOutline } from "@mui/icons-material";
import FormItemCol from "../../components/Comman/FormItemCol";
import NotificationHandler from "EventHandler/NotificationHandler";
import NotesForm from "./NoteForm";
import TermsAndConditionsForm from "./TermsAndCondition";
import TechnicalSpecification from "./TechnicalSpecification";


const PaymentLayoutComponent = ({ form,widthOfTerm="75vw",widthOfNotes ="75vw" }) => {
    // Capitalize the first letter of a string
    const { entity } = useParams();
    const watchedTaxValues = Form.useWatch([], form)
    const allFormValues = form.getFieldsValue();
const taxFields = Object.keys(allFormValues).filter((key) =>
    /^(cgstAndSgst|igst)\d+$/.test(key)
);

const labelMap = {
    cgstAndSgst28: "CGST + SGST (28%)",
    cgstAndSgst12: "CGST + SGST (12%)",
    cgstAndSgst18: "CGST + SGST (18%)",
    igst28: "IGST (28%)",
    igst12: "IGST (12%)",
    igst18: "IGST (18%)",
};
    
    const [showOtherCharges, setShowOtherCharges] = useState();
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Handle value changes in the form
    const handleItemsUpdate = () => {
        // Calculate grandTotal based on otherCharges
        let totalWithTax = form.getFieldValue("totalWithTax") || 0;
        let grandTotal = totalWithTax;
        let otherCharges = form.getFieldValue("otherCharges") || [];
        otherCharges.forEach((charge) => {
            if (charge.rsOrPercent === "percent" && charge.amount > 99) {
                return NotificationHandler.info({
                    content: "Percent value should be less than 99",
                });
            }
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
        form.setFieldsValue({ grandTotal: Math.ceil(grandTotal) });
    };

  

    useEffect(()=>{

    },[form])
    return (
        <Row justify={"end"}>
            {/* Left Column */}
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Row>
                    <NotesForm form={form} width={widthOfNotes} />
                </Row>
                <Divider />
                {["quotations", "challans"].includes(entity) && (
                    <Row style={{ marginTop: "20px" }}>
                        <TermsAndConditionsForm
                            form={form}
                            width={widthOfTerm}
                        />
                        <TechnicalSpecification
                            form={form}
                            width={widthOfTerm}
                        />
                    </Row>
                )}
            </Col>

            {/* Right Column */}
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ right: 50 }}>
                <Row span={24} justify={"end"}>
                    <FormItemCol
                        label="Total(Before Tax)"
                        tooltip={"Amount before Tax"}
                        name={"grossTotal"}
                        labelAlign="left"
                        labelCol={{ span: 15 }}
                        type={"number"}
                        width={125}
                        disabled={true}
                    />
                </Row>
                {["invoices", "challans"].includes(entity) ? (
                    [
                        "cgstAndSgst12",
                        "cgstAndSgst18",
                        "cgstAndSgst28",
                        "igst12",
                        "igst18",
                        "igst28",
                    ].map((key) => (
                        <Row span={24} justify={"end"}>
                            <FormItemCol
                                key={key}
                                name={key}
                                label={labelMap[key]}
                                labelCol={{ span: 15 }}
                                type="number"
                                width={125}
                                disabled
                                hidden={!watchedTaxValues?.[key]} // Hide if value not set
                            />
                        </Row>
                    ))
                ) : (
                   ""
                )}
                 <Row span={24} justify={"end"}>
                        <FormItemCol
                            label="Total Tax Amount"
                            name={"taxAmount"}
                            labelCol={{ span: 15 }}
                            labelAlign="left"
                            tooltip={"Total Tax  Amount"}
                            type={"number"}
                            disabled={true}
                            width={125}
                            preFillValue={
                                form.getFieldValue("totalWithTax") -
                                form.getFieldValue("grossTotal")
                            }
                        />
                    </Row>

                <Row span={24} justify={"end"}>
                    <FormItemCol
                        label="Total (After Tax)"
                        tooltip={"Amount With Tax"}
                        name={"totalWithTax"}
                        labelAlign="left"
                        labelCol={{ span: 15 }}
                        type={"number"}
                        width={125}
                        disabled={true}
                    />
                </Row>

                {/* Toggle Button for Other Charges */}
                <Row justify={"end"}></Row>

                <Row justify={"end"}>
                    <Form.List name="otherCharges">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(
                                    ({ key, name, fieldKey, ...restField }) => (
                                        <Row
                                            key={key}
                                            align="middle"
                                            justify={"end"}
                                            style={{
                                                fontSize: "0.7rem",
                                                width: "100%",
                                            }}
                                        >
                                            <Col span={1}>
                                                <Form.Item>
                                                    <DeleteOutline
                                                        onClick={() =>
                                                            remove(name)
                                                        }
                                                        style={{
                                                            color: "red",
                                                            fontSize: "1rem",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "action"]}
                                                    fieldKey={[
                                                        fieldKey,
                                                        "action",
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Select Add/Less",
                                                        },
                                                    ]}
                                                    initialValue={
                                                        form.getFieldValue(
                                                            "otherCharges"
                                                        )?.[name]?.action ||
                                                        "add"
                                                    }
                                                >
                                                    <Select
                                                        onChange={
                                                            handleItemsUpdate
                                                        }
                                                        options={[
                                                            {
                                                                label: "ADD",
                                                                value: "add",
                                                            },
                                                            {
                                                                label: "LESS",
                                                                value: "less",
                                                            },
                                                        ]}
                                                        style={{
                                                            fontSize: "0.7rem",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "chargeName"]}
                                                    fieldKey={[
                                                        fieldKey,
                                                        "chargeName",
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Fill Name",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Name"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        onBlur={(e) => {
                                                            const value =
                                                                e.target.value;
                                                            form.setFieldsValue(
                                                                {
                                                                    [`otherCharges[${name}].chargeName`]:
                                                                        capitalizeFirstLetter(
                                                                            value
                                                                        ),
                                                                }
                                                            );
                                                        }}
                                                        onChange={(value) =>
                                                            handleItemsUpdate(
                                                                value
                                                            )
                                                        }
                                                        onPressEnter={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "amount"]}
                                                    fieldKey={[
                                                        fieldKey,
                                                        "amount",
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Fill Amount",
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        placeholder="Amount"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        controls={false}
                                                        onChange={(value) =>
                                                            handleItemsUpdate(
                                                                value,
                                                                "amount"
                                                            )
                                                        }
                                                        onPressEnter={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "rsOrPercent"]}
                                                    fieldKey={[
                                                        fieldKey,
                                                        "rsOrPercent",
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Select Rs or %",
                                                        },
                                                    ]}
                                                    initialValue={
                                                        form.getFieldValue(
                                                            "otherCharges"
                                                        )?.[name]
                                                            ?.rsOrPercent ||
                                                        "rupee"
                                                    }
                                                >
                                                    <Select
                                                        onChange={
                                                            handleItemsUpdate
                                                        }
                                                        options={[
                                                            {
                                                                label: "%",
                                                                value: "percent",
                                                            },
                                                            {
                                                                label: "₹",
                                                                value: "rupee",
                                                            },
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    )
                                )}

                                <Row
                                    justify="start"
                                    style={{ marginBottom: 10 }}
                                >
                                    <Button
                                        type="link"
                                        onClick={() => add()}
                                        style={{
                                            marginBottom: "10px",
                                            fontWeight: "bold",
                                            color: "#22b378",
                                        }}
                                        icon={<PlusOutlined />}
                                    >
                                        ADD NON TAXABLE CHARGES
                                    </Button>
                                </Row>
                            </>
                        )}
                    </Form.List>
                </Row>

                <Row justify={"end"}>
                    <FormItemCol
                        label="Grand Total"
                        name={"grandTotal"}
                        labelCol={{ span: 15 }}
                        labelAlign="left"
                        tooltip={"Total Amount including Amount"}
                        type={"number"}
                        disabled={true}
                        width={125}
                    />
                </Row>
            </Col>
        </Row>
    );
};

export default PaymentLayoutComponent;
