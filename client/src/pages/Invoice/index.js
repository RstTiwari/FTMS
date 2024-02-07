import React, { useState, useEffect } from "react"; // Import useEffect from React
import { Flex, Table } from "antd";
import Header from "components/Header";
import { invoiceColumns, invoiceData } from "Data/InvoiceData";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import { getLocalData,setLocalData } from "Helper/FetchingLocalData"


const Index = () => {
    const { getTableData } = useAuth();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let entity = "invoice";
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
            setIsLoading(false)
            return NotificationHandler.error(message);
        } else {
            setData(result);
            setIsLoading(false);
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
                title={"Invoice List"}
                subTitle={"ADD INVOiCES"}
                addRoute={"invoice/create"}
                cancelRoute={"dashboard"}
            />
            <Table
                columns={invoiceColumns}
                dataSource={data}
                loading={isLoading}
            />
        </Flex>
    );
};

export default Index; // Capitalize index to Index as it's a component name convention
