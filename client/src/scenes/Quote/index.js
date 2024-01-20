import React, { useState } from "react";
import { Flex, Form, Select, Table } from "antd";
import Header from "components/Header";
import { quotationColumn,quotationDataSource } from "Data/QuotationData";

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
                title={"Quotation List"}
                subTitle={"ADD QUOTE"}
                addRoute={"quotation/create"}
            />
            <Table
                columns={quotationColumn}
                dataSource={quotationDataSource}
                scroll={{ x: true, y: 400 }}
            />
        </Flex>
    );
};

export default Index;
