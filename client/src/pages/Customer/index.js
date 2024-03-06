import React, { useEffect, useState ,useCallback} from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useGetCoustomersQuery, useGetListDataQuery } from "state/api";
import Headers from "../../components/Header";
import { Flex, Table } from "antd";
import { useAuth } from "state/AuthProvider";
import { App } from "antd";
import { coustomerColumns } from "../../Data/CoustomerData";
import NotificationHandler from "EventHandler/NotificationHandler";
import { getLocalData, setLocalData } from "Helper/FetchingLocalData";
import useDataFetching from "Hook/useDataFetching";

const Customers = () => {
    let entity = "customer"
    const { data, isLoading, fetchData } = useDataFetching(entity);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                padding: "1rem",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <Headers
                title={"COUSTOMER LIST"}
                subTitle={"ADD COUSTOMER"}
                addRoute={"customers/create"}
                localDataKey={entity}
                cancelRoute={"dashboard"}
                refresh={true}
            />
            <Table
                columns={coustomerColumns}
                dataSource={data}
                loading={isLoading}
                scroll={{ x: true, y: 600 }}
                showSorterTooltip={true}
            />
        </Flex>
    );
};

export default Customers;
