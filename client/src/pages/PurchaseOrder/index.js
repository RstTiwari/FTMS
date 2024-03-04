import React, { useEffect } from "react";
import Headers from "../../components/Header";
import { Flex, Table } from "antd";
import { purchaseColumn } from "../../Data/PurchaseData";
import useDataFetching from "Hook/useDataFetching";

const PurchaseOrder = () => {
    let entity = "purchaseorder";
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
            <Headers
                title={"PURCHASE ORDER LIST"}
                subTitle={"NEW PURCHASE"}
                addRoute={"purchaseorder/create"}
                localDataKey={entity}
                cancelRoute={"dashboard"}
                refresh={true}
            />
            <Table
                columns={purchaseColumn}
                dataSource={data}
                loading={isLoading}
                scroll={{ x: true, y: 600 }}
                showSorterTooltip={true}

            />
        </Flex>
    );
};

export default PurchaseOrder;
