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
                margin: "1.5rem 2rem",
                padding: "1rem",
                backgroundColor: "#ffffff",
            }}
        >
            <Header
                title={"Quotation List"}
                subTitle={"ADD QUOTE"}
                addRoute={"quotation/create"}
            />
            <Table
                columns={leadColumns}
                dataSource={leadDataSource}
                scroll={{ x: true, y: 400 }}
                
            />
        </Flex>
    );
};

export default Index;
