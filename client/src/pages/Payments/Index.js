import React, { useEffect, useState } from "react";
import { Flex, Table ,Typography} from "antd";
import { paymentColumns } from "Data/PaymentData";
import Header from "components/Header";
import PageLoader from "pages/PageLoader";
import useDataFetching from "Hook/useDataFetching";

const Index = () => {
    let entity = "payments"
    const { data, isLoading, fetchData } = useDataFetching(entity);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
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
            <Header
                title={"Payment List"}
                localDataKey={"payments"}
                cancelRoute={"dashboard"}
                refresh={true}
            />
            <PageLoader isLoading={isLoading} />
            <Table columns={paymentColumns} dataSource={data} />
        </Flex>
    );
};

export default Index;
