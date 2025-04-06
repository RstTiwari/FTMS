import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Tabs,
    Table,
    Descriptions,
    Layout,
    Row,
    Col,
    Card,
    Avatar,
} from "antd";
import Taglabel from "components/Comman/Taglabel";
import OverviewTab from "./OverviewTab";
import TransactionTab from "./TransectionTab";
import PageLoader from "pages/PageLoader";
const { TabPane } = Tabs;

const CustomerDetails = ({ values, loading,entity,closeModal,id }) => {
    useEffect(() => {
        if (loading) {
            return <PageLoader isLoading={loading} />;
        }
    }, [loading]);
    return (
        <Tabs defaultActiveKey="1" style={{ marginLeft: "10px" }}>
            <TabPane
                tab={<Taglabel text={"Overview"} weight={200} type={"text"} />}
                key="1"
            >
                <OverviewTab data={values} entity ={entity} id={id} />
            </TabPane>
            <TabPane
                tab={
                    <Taglabel text={"Transaction"} weight={200} type={"text"} />
                }
                key="2"
            >
                <TransactionTab />
            </TabPane>
            <TabPane
                tab={<Taglabel text={"Statement"} weight={200} type={"text"} />}
                key="3"
            >
                <p>Statement content</p>
            </TabPane>
        </Tabs>
    );
};

export default CustomerDetails;
