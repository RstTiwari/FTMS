import React,{useEffect} from "react";
import Header from "components/Header";
import { Flex, Table, Typography } from "antd";
import PageLoader from "pages/PageLoader";
import { expensesColumns } from "Data/ExpensesData"
import useDataFetching from "Hook/useDataFetching";

const Index = () => {
    let entity = "expenses";
    const { data, isLoading, fetchData } = useDataFetching(entity);
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
            <Header
                title={"Expenses List"}
                subTitle={"Add New Expense"}
                addRoute={"expense/create"}
                localDataKey={"expenses"}
                cancelRoute={"dashboard"}
            />
            <PageLoader isLoading={isLoading} />
            <Table columns={expensesColumns} dataSource={data} />
        </Flex>
    );
};

export default Index;
