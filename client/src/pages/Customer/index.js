import React, { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useGetCoustomersQuery, useGetListDataQuery } from "state/api";
import Headers from "../../components/Header";
import { Flex, Table } from "antd";
import { useAuth } from "state/AuthProvider";
import { App } from "antd";
import {
    coustomerColumns,
    coustomerDataSource,
} from "../../Data/CoustomerData";
import NotificationHandler from "EventHandler/NotificationHandler";

const Customers = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { message, notification, modal } = App.useApp();

    const { getTableData } = useAuth();
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let entity = "customer";
        const { success, result, message } = await getTableData(entity);
        if (success === 0) {
           return NotificationHandler.error(message);
        } else {
            setData(result);
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
