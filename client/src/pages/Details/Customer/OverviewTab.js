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

import CustomerAddressCard from "components/Comman/CustomerCard";
import PaymentDetails from "components/Comman/CustomerPaymentDetails";
import CommentDetails from "components/Comman/CommnetsDetails";
import AddressDetails from "components/Comman/AddressDetails";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const { TabPane } = Tabs;
const { Content } = Layout;

const OverviewTab = ({ customerData }) => {
    const { entity } = useParams();
    return (
        <Layout style={{ display: "flex", flexDirection: "row" }}>
            <Content style={{ width: "30%", backgroundColor: "#fff" }}>
                <CustomerAddressCard
                    data={customerData}
                    billingAddress={customerData?.billingAddress}
                    shippingAddress={customerData?.shippingAddress}
                />
            </Content>
            <Content
                style={{
                    width: "70%",
                    paddingLeft: "16px",
                    background: "#ffffff",
                }}
            >
                <PaymentDetails />
                <CommentDetails />
            </Content>
        </Layout>
    );
};

export default OverviewTab;
