import { Flex, Form, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import PageLoader from "pages/PageLoader";
import QuotationForm from "Forms/QuotationForm";
import { epochInDDMMYY } from "Helper/EpochConveter";
import LeadForm from "Forms/LeadForm";
const ReadLead = () => {
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
                    <Header title={` ${entity} Details`} subTitle={""}  cancelRoute={"lead"}/>
                    <Form
                        name="coustomerForm"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                        form={form}
                        initialValues={{
                            source:data.source,
                            customer:data.customer.customerName,
                            status:data.status,
                            comments:data.comments
                        }}
                        disabled={true}
                    >
                        <LeadForm current={form} />
                    </Form>
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default ReadLead;
