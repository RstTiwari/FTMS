import React, { useState, useEffect,useCallback } from "react"; // Import useEffect from React
import { Flex, Table } from "antd";
import Header from "components/Header";
import { invoiceColumns, invoiceData } from "Data/InvoiceData";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import { getLocalData,setLocalData } from "Helper/FetchingLocalData"
import useDataFetching from "Hook/useDataFetching";


const Index = () => {
    let entity = "invoice";
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
                title={"Invoice List"}
                subTitle={"ADD INVOiCES"}
                addRoute={"invoice/create"}
                localDataKey={"invoice"}
                cancelRoute={"dashboard"}
                refresh={true}
            />
            <Table
                columns={invoiceColumns}
                dataSource={data}
                loading={isLoading}
            />
        </Flex>
    );
};

export default Index; // Capitalize index to Index as it's a component name convention
