import React, { useEffect, useState ,useCallback} from "react";
import { Flex, Form, Select, Table } from "antd";
import Header from "components/Header";
import { quotationColumn, quotationDataSource } from "Data/QuotationData";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import { setLocalData, getLocalData } from "Helper/FetchingLocalData";
import useDataFetching from "Hook/useDataFetching";

const Index = () => {
    let entity = "quote";
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
                title={"Quotation List"}
                subTitle={"ADD QUOTE"}
                addRoute={"quotation/create"}
                localDataKey={"quote"}
                cancelRoute={"dashboard"}
                refresh={true}
            />
            <Table
                columns={quotationColumn}
                dataSource={data}
                loading={isLoading}
                scroll={{ x: true, y: 600 }}
                showSorterTooltip={true}
            />
        </Flex>
    );
};

export default Index;
