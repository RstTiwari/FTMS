import React, { useEffect } from "react";
import { Flex, Row, Col, Tabs } from "antd";
import SummaryCard from "./SummaryCard";
import { useAuth } from "state/AuthProvider";
import TotalReceivables from "./TotalRecivables";
import Taglabel from "components/Comman/Taglabel";
import TabPane from "antd/es/tabs/TabPane";
import SalesExpensesDashboard from "./SalesExpenses";
import TopExpenses from "./TopExpenses";

const Dashbord = () => {
    return (
        <div style={{padding:"20px"}}>
            <Tabs>
                <TabPane tab="DASHBOARD" key={1}>
                    <TotalReceivables />
                    <SalesExpensesDashboard />
                    <TopExpenses/>
                </TabPane>
                <TabPane tab="MYFAC8RY SERVICES" key={2}>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Dashbord;
