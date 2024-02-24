import { Flex, Form, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import PageLoader from "pages/PageLoader";
import InvoiceFrom from "Forms/Invoice";
import { epochInDDMMYY } from "Helper/EpochConveter";
const ReadInvoice = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState("");
    const { readData } = useAuth();
    const { entity, id } = useParams();
    const [form] = Form.useForm();

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
            <Header title={` ${entity} Details`} subTitle={""} cancelRoute={"invoice"} />

            <PageLoader
                text={"Fetching Invoice Detail Please Wait"}
                isLoading={isLoading}
            />
            {!isLoading && data ? (
                <>
                    <Form
                        name="coustomerForm"
                        form={form}
                        initialValues={{
                            customer: data.customer._id,
                            invoiceNo: data.invoiceNo,
                            orderNo: data.orderNo,
                            invoiceDate: epochInDDMMYY(data.invoiceDate),
                            invoiceExpiredDate: epochInDDMMYY(
                                data.invoiceExpiredDate
                            ),
                            salesPerson: data.salesPerson,
                            items: data.items,
                            grossTotal: data.grossTotal,
                            totalTaxAmount: data.totalTaxAmount,
                            grandTotal: data.grandTotal,
                        }}
                        disabled={true}
                    >
                        <InvoiceFrom current={form} />
                    </Form>
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default ReadInvoice;
