import StatBox from "components/StateBox";
import React from "react";
import {
    PointOfSaleOutlined,
    RequestQuote,
    AccountBoxOutlined,
    PaymentOutlined,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { useGetDashbordDataQuery } from "state/api";
import OverviewChart from "components/OverviewChart";
import { Flex ,Row,Col} from "antd";

const Dashbord = () => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const { data, isLoading } = useGetDashbordDataQuery();
    const columns = [
        {
          field: "_id",
          headerName: "ID",
          flex: 1,
        },
        {
          field: "userId",
          headerName: "User ID",
          flex: 1,
        },
        {
          field: "createdAt",
          headerName: "CreatedAt",
          flex: 1,
        },
        {
          field: "products",
          headerName: "# of Products",
          flex: 0.5,
          sortable: false,
          renderCell: (params) => params.value.length,
        },
        {
          field: "cost",
          headerName: "Cost",
          flex: 1,
          renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
      ];
    return (
        <Flex  vertical  style={{margin:'1rem'}}>
            <Row gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }} justify={"center"}>
            <Col style={{background:"red" , textAlign:"center"}} xs={24} sm={24} lg={8} xl={8}  > col</Col>
                <Col style={{background:"green"}}xs={24} sm={24} lg={8} xl={8}>col</Col>
            </Row>
            <Row gutter={1}>
                <Col style={{background:"white"}} xs={24} sm={24} lg={8} xl={8} >col</Col>
                <Col style={{background:"grey"}} xs={24} sm={24} lg={8} xl={8}>col</Col>
                <Col style={{background:"red"}} xs={24} sm={24} lg={8} xl={8}>col</Col>
            </Row>
        </Flex>
    );
};

export default Dashbord;
