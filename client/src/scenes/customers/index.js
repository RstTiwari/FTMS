import React from 'react'
import {useMediaQuery,useTheme}  from "@mui/material"
import { useGetCoustomersQuery } from 'state/api'
import Headers from "../../components/Header"
import { Flex, Table } from 'antd'
import {coustomerColumns, coustomerDataSource} from "../../Data/CoustomerData"

const Customers = () => {
    const { data, isLoading } = useGetCoustomersQuery();
    const isLaptop = useMediaQuery("(min-width:1000px)")
    const theme = useTheme();
   
    return (
        <Flex
        gap={"middle"}
        vertical
        style={{
            margin: "1.5rem 2rem",
            padding: "2rem",
            backgroundColor: "#ffffff",
            borderRadius:"1rem"
        }} 
         >
            <Headers title={"Coustomer"} subTitle={"All Coustomers"} addRoute={"customers/create"} />
            <Table columns={coustomerColumns} dataSource={coustomerDataSource}/>
        
        </Flex>
    );
};

export default Customers
