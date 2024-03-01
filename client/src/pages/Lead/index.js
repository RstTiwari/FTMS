import React, { useEffect, useState, useCallback } from "react";
import { Flex, Form, Select, Table } from "antd";
import Header from "components/Header";
import { leadColumns } from "Data/LeadData";
import { useAuth } from "state/AuthProvider";
import useDataFetching from "Hook/useDataFetching";

const Index = () => {
    let entity = "lead";
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
                title={"Lead List"}
                subTitle={"ADD LEAD"}
                addRoute={"lead/create"}
                localDataKey={"lead"}
                cancelRoute={"dashboard"}
                refresh={true}
            />
            <Table
                columns={leadColumns}
                loading={isLoading}
                dataSource={data}
                scroll={{ x: true, y: 400 }}
                showSorterTooltip={true}
            />
        </Flex>
    );
};

export default Index;
