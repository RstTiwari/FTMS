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
import SummaryCard from "./SummaryCard";


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
    const entityData = [
        {
            result: 100,
            isLoading: false,
            entity: "lead",
            title: "Lead Genrated",
            icon :<PointOfSaleOutlined/>
        },
        {
            result: 12334,
            isLoading: false,
            entity: "quote",
            title: "Quotes Send",
            icon:<RequestQuote/>
        },
        {
            result: 1234,
            isLoading: false,
            entity: "invoice",
            title: "Invoices ",
            icon:<AccountBoxOutlined/>
        },

        {
            result: 1200000,
            isLoading: false,
            entity: "payment",
            title: "Payments Due",
            icon:<PaymentOutlined/>
        },
    ];
    const cards = entityData.map((item, index)=>{
      if(item.entity === 'payment'){
          item.result = `${item.result}Rs`
      }
      return (
        
          <SummaryCard
              key={index}
              title={item.title}
              cardContent={item.result}
              prefix={"This Month"}
              tagColor={
                  item.entity === "invoice"
                      ? "cyan"
                      : item.entity === "quote"
                      ? "purple"
                      : item.entity === "lead"
                      ? "green"
                      : "blue"
              }
              icon={item.icon}
              isLoading={item.isLoading}
          />
      );
    })
    return (
        <Flex vertical style={{ margin: "1rem" }} gap={"large"}>
            <Row align={"middle"} gutter={[32,10]}>
                {cards}
            </Row>
            <Row align={"middle"} gutter={[32,10]} >
              <OverviewChart />
            </Row>
        </Flex>
    );
};

export default Dashbord;
