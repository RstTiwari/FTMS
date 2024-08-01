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
import PaymentDetails from "components/Comman/PaymentDetails";
import CommentDetails from "components/Comman/CommnetsDetails";
const { TabPane } = Tabs;
const { Content } = Layout;

const OverviewTab = ({ customerData }) => (
    <Layout style={{ display: "flex", flexDirection: "row" }}>
        <Content style={{ width: "30%", backgroundColor: "#fff" }}>
            <CustomerAddressCard
                customerData={customerData}
                billingAddress={customerData?.billingAddress}
                shippingAddress={customerData?.shippingAddress}
            />
        </Content>
        <Content style={{ width: "70%", paddingLeft: "16px" }}>
            <PaymentDetails />
            <CommentDetails />
        </Content>
    </Layout>
);

export default OverviewTab;
