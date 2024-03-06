import PaymentForm from "Forms/PaymentForm";
import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import Header from "components/Header";
import PageLoader from "pages/PageLoader";
import { useAuth } from "state/AuthProvider";
import { useParams } from "react-router-dom";
import PaymentHistoryList from "../Payments/PaymentHistory";
import SaveBottmComponent from "components/SaveBottomComponent";

const NewPayment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();
    const { readData } = useAuth();
    const { id } = useParams();

    const fetchData = async () => {
        const { success, result, message } = await readData({
            entity: "invoice",
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
                padding: "2rem",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <Header title={"RECORD NEW  PAYMENT"} cancelRoute={"payments"} />
            {
                data ? (
            <>
            <PaymentForm initialValue={data} />
            <SaveBottmComponent buttonText={"UPDATE PAYMENT"} cancelRoute={"payments"} />
            </>

                ):(
                    <PageLoader  isLoading={isLoading}/>
                )
            }
        </Flex>
    );
};

export default NewPayment;
