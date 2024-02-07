import React, { useEffect, useState } from "react";
import { Flex, Form, Select, Table } from "antd";
import Header from "components/Header";
import { leadColumns } from "Data/LeadData";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import { getLocalData,setLocalData} from "Helper/FetchingLocalData"

const Index = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getTableData } = useAuth();
    let entity = "lead";
    useEffect(() => {
        const localData = getLocalData(entity);
        if (localData) {
            // Data has been fetched before, retrieve it from local storage
            setData(localData);
            setIsLoading(false);
        } else {
            // Data hasn't been fetched before, fetch it
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        const { success, result, message } = await getTableData(entity);
        if (!success) {
            setIsLoading(false);
            return NotificationHandler.error(message);
        } else {
            setIsLoading(false);
            setData(result);
            setLocalData(entity,result)
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
            <Header
                title={"Lead List"}
                subTitle={"ADD LEAD"}
                addRoute={"lead/create"}
                cancelRoute={"dashboard"}
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
