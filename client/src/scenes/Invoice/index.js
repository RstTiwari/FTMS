import React, { useState, useEffect } from "react"; // Import useEffect from React
import { Flex, Table } from "antd";
import Header from "components/Header";
import { invoiceColumns, invoiceData } from "Data/InvoiceData";
import { getTableData } from "Helper/ApiHelper";

const Index = () => { // Capitalize index to Index as it's a component name convention
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let entity = "invoice";

    useEffect(() => {
        const fetchData = async () => {
            const { success, result, message } = await getTableData(entity);
            if (success === 1) {
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
                title={"Invoice List"}
                subTitle={"ADD INVOiCES"}
                addRoute={"invoice/create"}
            />
            <Table columns={invoiceColumns} dataSource={data} loading={isLoading} />
        </Flex>
    );
};

export default Index; // Capitalize index to Index as it's a component name convention
