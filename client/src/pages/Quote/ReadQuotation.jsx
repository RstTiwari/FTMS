import { Flex, Form, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import PageLoader from "pages/PageLoader";
import QuotationForm from "Forms/QuotationForm";
import { epochInDDMMYY } from "Helper/EpochConveter";
const ReadQuation = () => {
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
            <PageLoader
                text={"Fetching Customer Detail Please Wait"}
                isLoading={isLoading}
            />
            {!isLoading && data ? (
                <>
                    <Header title={` Quotation Details`} subTitle={""} />
                    <Form
                        name="coustomerForm"
                        form={form}
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
                        disabled={true}
                    >
                        <QuotationForm current={form} data={data.items} />
                    </Form>
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default ReadQuation;
