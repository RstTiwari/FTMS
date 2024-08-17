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

import PageLoader from "pages/PageLoader";
import OverviewTab from "./Overviewtab";
const { TabPane } = Tabs;

const VendorDetails = ({ values, loading }) => {
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
                <OverviewTab vendorData={values} />
            </TabPane>
        </Tabs>
    );
};

export default VendorDetails;
