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

const Customers = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getTableData } = useAuth();
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    let entity = "customer"
    const fetchData = useCallback(async () => {
        try {
            const localData = getLocalData(entity);
            if (localData) {
                // Data has been fetched before, retrieve it from local storage
                setData(localData);
                setIsLoading(false);
            } else {
                // Data hasn't been fetched before, fetch it
                const { success, result, message } = await getTableData(entity);
                if (!success) {
                    setIsLoading(false);
                    NotificationHandler.error(message);
                } else {
                    setData(result);
                    setIsLoading(false);
                    setLocalData(entity, result);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
            NotificationHandler.error("Failed to fetch data");
        }
    }, [getTableData, entity])

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
            <Headers
                title={"COUSTOMER LIST"}
                subTitle={"ADD COUSTOMER"}
                addRoute={"customers/create"}
                localDataKey={entity}
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
