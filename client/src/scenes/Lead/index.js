import React, { useEffect, useState } from "react";
import { Flex, Form, Select, Table } from "antd";
import Header from "components/Header";
import { leadColumns } from "Data/LeadData";
import { useAuth } from "state/AuthProvider";

const Index = () => {
    const [data, setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    const {getTableData} = useAuth()
    let entity = "lead";
    useEffect(() => {
        const fetchData = async () => {
            const { success, result, message } = await getTableData(entity);
            if (success === 1) {
                setIsLoading(false)
                setData(result);
            }
        };
        fetchData();
    },[]);
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
