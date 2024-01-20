import React, { useState } from "react";
import { Flex, Form, Select, Table } from "antd";
import Header from "components/Header";
import { leadColumns,leadDataSource } from "Data/LeadData";

const Index = () => {

    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                padding: "2rem",
                backgroundColor: "#ffffff",
                borderRadius:"1rem"
            }}
        >
            <Header
                title={"Lead List"}
                subTitle={"ADD LEAD"}
                addRoute={"lead/create"}
            />
            <Table
                columns={leadColumns}
                dataSource={leadDataSource}
                scroll={{ x: true, y: 400 }}
                showSorterTooltip = {true}
                
            />
        </Flex>
    );
};

export default Index;
