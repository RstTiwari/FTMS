import React, { useEffect } from "react";
import Header from "components/Header";
import { Flex, Table, Typography } from "antd";
import PageLoader from "pages/PageLoader";
import { challanColumns } from "Data/Challan";
import useDataFetching from "Hook/useDataFetching";

const Index = () => {
    let entity = "challan";
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
                title={"Challan List"}
                localDataKey={"expenses"}
                cancelRoute={"dashboard"}
            />
            <PageLoader isLoading={isLoading} />
            <Table columns={challanColumns} dataSource={data} />
        </Flex>
    );
};

export default Index;
