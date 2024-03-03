import React, { useEffect, useState ,useCallback} from "react";
import Headers from "../../components/Header";
import { Flex, Table } from "antd";
import { vendorColumns } from "../../Data/VendorData.js";
import useDataFetching from "Hook/useDataFetching";

const Vendor = () => {
    let entity = "vendors"
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
                title={"VENDOR LIST"}
                subTitle={"NEW VENDOR"}
                addRoute={"vendors/create"}
                localDataKey={entity}
                cancelRoute={"dashboard"}
                refresh={true}
            />
            <Table
                columns={vendorColumns}
                dataSource={data}
                loading={isLoading}
            />
        </Flex>
    );
};

export default Vendor;
