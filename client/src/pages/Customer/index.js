import React, { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useGetCoustomersQuery, useGetListDataQuery } from "state/api";
import Headers from "../../components/Header";
import { Flex, Table } from "antd";
import { useAuth } from "state/AuthProvider";
import { App } from "antd";
import { coustomerColumns } from "../../Data/CoustomerData";
import NotificationHandler from "EventHandler/NotificationHandler";
import { getLocalData, setLocalData } from "Helper/FetchingLocalData";

const Customers = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getTableData } = useAuth();
    const isLaptop = useMediaQuery("(min-width:1000px)");

    const theme = useTheme();

    useEffect(() => {
        const localData = getLocalData("customers");
        if (localData) {
            // Data has been fetched before, retrieve it from local storage
            setData(localData);
            setIsLoading(false);
        } else {
            // Data hasn't been fetched before, fetch it
            fetchData();
        }
    }, []);

    // will get data from the Cookies there after
    const fetchData = async () => {
        let entity = "customer";
        const { success, result, message } = await getTableData(entity);
        if (success === 0) {
            return NotificationHandler.error(message);
        } else {
            setData(result);
            setLocalData(true);
            setLocalData("customers", result);
            setIsLoading(false);
        }
    };
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
            <Headers
                title={"COUSTOMER LIST"}
                subTitle={"ADD COUSTOMER"}
                addRoute={"customers/create"}
                localDataKey={"customers"}
                cancelRoute={"dashboard"}
            />
            <Table
                columns={coustomerColumns}
                dataSource={data}
                loading={isLoading}
            />
        </Flex>
    );
};

export default Customers;
