import React,{useEffect} from "react";
import Header from "components/Header";
import { Flex, Table, Typography } from "antd";
import PageLoader from "pages/PageLoader";
import { expensesColumns } from "Data/ExpensesData"
import useDataFetching from "Hook/useDataFetching";
import { pageLayout } from "theme";

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
        >
            <Header
                title={"Expenses List"}
                subTitle={"ADD EXPENSE"}
                addRoute={"expense/create"}
                localDataKey={"expenses"}
                cancelRoute={"dashboard"}
                refresh={true}
            />
            <Table
                columns={expensesColumns}
                dataSource={data}
                scroll={{ x: true, y: 600 }}
                showSorterTooltip={true}
                loading ={isLoading}
            />
        </Flex>
    );
};

export default Index;
