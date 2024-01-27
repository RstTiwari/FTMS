import React, { useEffect, useState } from "react";
import { Flex, Form, Select, Table } from "antd";
import Header from "components/Header";
import { leadColumns } from "Data/LeadData";
import { getTableData } from "Helper/ApiHelper";

const Index = () => {
    const [tableData, setTableData] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    let entity = "lead";
    useEffect(() => {
        const fetchData = async () => {
            const { success, result, message } = await getTableData(entity);
            if (success === 1) {
                setIsLoading(false)
                setTableData(result);
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
                dataSource={tableData}
                scroll={{ x: true, y: 400 }}
                showSorterTooltip={true}
            />
        </Flex>
    );
};

export default Index;
