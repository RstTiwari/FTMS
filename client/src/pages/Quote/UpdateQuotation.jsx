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
    Flex,
} from "antd";
import PageLoader from "pages/PageLoader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import NotificationHandler from "EventHandler/NotificationHandler";
import QuotationForm from "Forms/QuotationForm";
import { epochInDDMMYY } from "Helper/EpochConveter";
import UpdateQuotationForm from "Forms/UpdateQuotationForm";

const UpdateQuotation = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toUpdateObj, setToUpdateObj] = useState(false);
    const { entity, id } = useParams();
    const { readData, updateData } = useAuth();
    const [product, setProduct] = useState([]);

    const [formKey, setFormKey] = useState(0);
    const { getDropDownData } = useAuth();
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const inputWidth = isLaptop ? 700 : 350;
    const inputFontSize = isLaptop ? "1rem" : "0.4rem";

    const handleDescriptionClick = async () => {
        let entity = "product";
        let fieldName = "productName";
        const dropDownData = await getDropDownData(entity, fieldName);
        setProduct(dropDownData);
    };
    const fomulatePayload = (value) => {
        value["billingAddress"] = {
            address: value.billingStreet,
            city: value.billingCity,
            state: value.billingState,
            pinCode: value.billingPincode,
        };
        value["shippingAddress"] = {
            address: value.shippingStreet,
            city: value.shippingCity,
            state: value.shippingState,
            pinCode: value.shippingPincode,
        };

        delete value.shippingStreet;
        delete value.shippingState;
        delete value.shippingCity;
        delete value.shippingPincode;
        delete value.billingStreet;
        delete value.billingState;
        delete value.billingCity;
        delete value.billingPincode;
        return { entity: entity, value };
    };

    const handleUpdateFormFinish = async (value) => {
        if (!toUpdateObj) {
            // checking if anything to update
            return NotificationHandler.error("Nothing to Update");
        }
        value._id = data._id;
        const { success, result, message } = await updateData(value);
        if (success) {
            return NotificationHandler.success(message);
        }
    };

    const handleValueChange = (subField, allValues) => {
        setToUpdateObj(allValues["item"]);
        form.setFieldValue({ items: toUpdateObj });
    };

    let fetchData = async () => {
        const { success, result, message } = await readData({
            entity: entity,
            id: id,
        });
        if (success === 1) {
            setData(result);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                margin: "1.5rem 2rem",
                padding: "2rem",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <PageLoader
                text={`Please hold Fetching ${entity}`}
                isLoading={isLoading}
            />
            {!isLoading && data ? (
                <>
                    <Header
                        title={` Update - ${entity} Details`}
                        subTitle={""}
                    />

                    <Form
                        name="updateQuotation"
                        onFinish={(value) => handleUpdateFormFinish(value)} // Correct the function name here
                        onValuesChange={handleValueChange}
                        initialValues={{
                            customer: data.customer.customerName,
                            quoteNo: data.quoteNo,
                            attenPerson: data.attenPerson,
                            grandTotal: data.grandTotal,
                            grossTotal: data.grossTotal,
                            items: data.items,
                            message: data.message,
                            quoteDate: epochInDDMMYY(data.quoteDate),
                            quoteExpiryDate: epochInDDMMYY(
                                data.quoteExpiryDate
                            ),
                            subject: data.subject,
                            taxPercent: data.taxPercent,
                            transPortAmount: data.transPortAmount,
                            validityCondition: data.validityCondition,
                            paymentsCondition: data.paymentsCondition,
                            installationCondition: data.installationCondition,
                            deliveryCondition: data.deliveryCondition,
                            facilityCondition: data.facilityCondition,
                            cancellationCondition: data.cancellationCondition,
                        }}
                    >
                        <QuotationForm current={form} />
                        <Col className="gutter-row" span={6}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<PlusOutlined />}
                                    block
                                >
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>
                    </Form>
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default UpdateQuotation;
