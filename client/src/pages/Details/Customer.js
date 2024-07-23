import React from 'react';
import { Tabs, Table, Descriptions, Layout,Row ,Col,Card,Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CollapsibleTable from 'components/SmallComponent/ColapsableTable';
import CustomerCard from 'components/SmallComponent/CustomerCard';
import Taglabel from 'components/SmallComponent/Taglabel';
import PaymentDetails from 'components/SmallComponent/PaymentDetails';
import CommentDetails from 'components/SmallComponent/CommnetsDetails';
import invoiceData from 'Data/InvoiceData';
import quotationData from 'Data/QuotationData';
import paymentData from 'Data/PaymentData';

const { TabPane } = Tabs;
const { Content } = Layout;

// Sample customer data
// const customerData = {
//   _id: { $oid: "668ba66008e5e6c6c54cd1e3" },
//   customerName: "Accneture company and Pvt hsdhsdhdshshhdssdhsdhds hsdhhsdds Ltd",
//   contactPerson: "Ramkumar",
//   customerPhone: 7848286982,
//   customerEmail: "khbDevandthhdhhhement1@gmail.com",
//   billingAddress: {
//     street1: "New Address for the hee hsdhdsh jjjdssdgiven Value of the concept that utilzes",
//     street2: "Gorai pada Vasa hdshhds hdshhsd hhh  hshhdshsdhhssdh  i",
//     city: "New Munbai",
//     state: "Goa"
//   },
//   shippingAddress: {
//     street1: "New Address for the given Value of the concept that utilzes",
//     street2: "Gorai pada Vasai",
//     city: "New Munbai",
//     state: "Goa"
//   },
//   tenantId: { $oid: "667e75df8da55d3c07a22626" },
//   __v: 0
// };

// Sample table data
// const tableData = [
//   {
//     key: '1',
//     totalBillAmount: 1000,
//     receivedBillAmount: 800,
//     pendingBillAmount: 200
//   }
// ];

// Sample comments data

// const columns = [
//   {
//     title: 'Total Bill Amount',
//     dataIndex: 'totalBillAmount',
//     key: 'totalBillAmount'
//   },
//   {
//     title: 'Received Bill Amount',
//     dataIndex: 'receivedBillAmount',
//     key: 'receivedBillAmount'
//   },
//   {
//     title: 'Pending Bill Amount',
//     dataIndex: 'pendingBillAmount',
//     key: 'pendingBillAmount'
//   }
// ];

const OverviewTab = ({customerData}) => (
    <Layout style={{ display: "flex", flexDirection: "row" }}>
        <Content style={{ width: "30%", backgroundColor: "#fff" }}>
            <CustomerCard
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

const TransactionTab = () => (
    <>
        <CollapsibleTable columns={invoiceData.getColumns()}  panelHeader={"Invoice"}/>
        <CollapsibleTable panelHeader={"Payments"}  columns={paymentData.getColumns()}/>
        <CollapsibleTable  panelHeader={"Quotations"} columns={quotationData.getColumns()}/>
    </>
);

const MyComponent = ({payload}) => (
  <Tabs defaultActiveKey="1" style={{marginLeft:'10px'}}>
    <TabPane tab={<Taglabel  text={"Overview"} weight={200} type={"text"}/>} key="1">
      <OverviewTab customerData ={payload} />
    </TabPane>
    <TabPane tab={<Taglabel  text={"Transaction"} weight={200} type={"text"}/>} key="2">
      <TransactionTab />
    </TabPane>
    <TabPane tab={<Taglabel  text={"Statement"} weight={200} type={"text"}/>} key="3">
      <p>Statement content</p>
    </TabPane>
  </Tabs>
);

export default MyComponent;
