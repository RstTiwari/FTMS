import React, { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useGetCoustomersQuery, useGetListDataQuery } from "state/api";
import Headers from "../../components/Header";
import { Flex, Table } from "antd";
import { useAuth } from "state/AuthProvider";
import {
    coustomerColumns,
    coustomerDataSource,
} from "../../Data/CoustomerData";

const Customers = () => {
    const [data, setData] = useState([]);
    const { appApiCall } = useAuth();
    const isLaptop = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let data = await appApiCall("post", "getList", { entity: "customer" });
        if (data.success === 0) {
            // dhandle
        } else {
            setData(data.result);
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
            <Headers
                title={"COUSTOMER LIST"}
                subTitle={"ADD COUSTOMER"}
                addRoute={"customers/create"}
            />
            <Table columns={coustomerColumns} dataSource={data} />
        </Flex>
    );
};

export default Customers;
