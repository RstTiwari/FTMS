import React, { useEffect, useState } from "react";
import { Flex, Form, Select, Table } from "antd";
import Header from "components/Header";
import { quotationColumn, quotationDataSource } from "Data/QuotationData";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";

const Index = () => {
    const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const { getTableData } = useAuth();
    let entity = "quote";
    useEffect(() => {
        const fetchData = async () => {
            const { success, result, message } = await getTableData(entity);
            if (!success) {
                setIsLoading(false);
                NotificationHandler.error(message);
            } else {
                setIsLoading(false);
                setData(result);
            }
        };
        fetchData();
    }, []);
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
            />
            <Table
                columns={quotationColumn}
                dataSource={data}
                loading={isloading}
                scroll={{ x: true, y: 400 }}
            />
        </Flex>
    );
};

export default Index;
