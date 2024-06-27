import PaymentForm from "Forms/PaymentForm";
import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import Header from "components/Header";
import PageLoader from "pages/PageLoader";
import { useAuth } from "state/AuthProvider";
import { useParams } from "react-router-dom";
import PaymentHistoryList from "../Payments/PaymentHistory";
import SaveBottmComponent from "components/SaveBottomComponent";
import { pageLayout } from "theme";

const NewPayment = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const { readData } = useAuth();
    const { id } = useParams();

    const fetchData = async () => {
        const { success, result, message } = await readData({
            entity: "invoice",
            id: id,
        });
        if (success === 1) {
            setIsLoading(false);
            setData(result);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Flex
            gap={"middle"}
            vertical
        >
            <Header title={"RECORD NEW  PAYMENT"} cancelRoute={"payments"} />
            <PageLoader isLoading={isLoading} />
            {
                data ? (
            <>
            <PaymentForm initialValue={data} />
            </>

                ):(
                    ""
                )
            }
        </Flex>
    );
};

export default NewPayment;
