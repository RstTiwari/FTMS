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
    Table,
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
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { entity, id } = useParams();
    const { readData } = useAuth();
    const [product, setProduct] = useState([]);

    let fetchData = async () => {
        const { success, result, message } = await readData({
            entity: entity,
            id: id,
        });
        if (success === 1) {
            setData(result);
            setIsLoading(false);
        } else {
            return NotificationHandler.error("Failed to Fetch");
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
            <Header title={` Update - ${entity} Details`} subTitle={""} localDataKey={"quote"}  cancelRoute={"quotation"}/>
            <PageLoader
                text={`Please hold Fetching ${entity}`}
                isLoading={isLoading}
            />

            {!isLoading && data && product ? (
                <>
                    <UpdateQuotationForm
                        initialValues={{
                            customer: data.customer._id,
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
                        id={id}
                    />
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default UpdateQuotation;
