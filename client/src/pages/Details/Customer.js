import React from 'react';
import { Tabs, Table, Descriptions, Layout,Row ,Col,Card,Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AddressCard from 'components/SmallComponent/AddressCard';
import CollapsibleTable from 'components/SmallComponent/ColapsableTable';

const { TabPane } = Tabs;
const { Content } = Layout;

// Sample customer data
const customerData = {
  _id: { $oid: "668ba66008e5e6c6c54cd1e3" },
  customerName: "Ramkumar",
  contactPerson: "Ramkumar",
  customerPhone: 7848286982,
  customerEmail: "khbDevlopement1@gmail.com",
  billingAddress: {
    street1: "New Address for the given Value of the concept that utilzes",
    street2: "Gorai pada Vasai",
    city: "New Munbai",
    state: "Goa"
  },
  shippingAddress: {
    street1: "New Address for the given Value of the concept that utilzes",
    street2: "Gorai pada Vasai",
    city: "New Munbai",
    state: "Goa"
  },
  tenantId: { $oid: "667e75df8da55d3c07a22626" },
  __v: 0
};

// Sample table data
const tableData = [
  {
    key: '1',
    totalBillAmount: 1000,
    receivedBillAmount: 800,
    pendingBillAmount: 200
  }
];

// Sample comments data
const comments = [
  { id: 1, comment: 'First bill' },
  { id: 2, comment: 'Second bill' },
  { id: 3, comment: 'Third bill' }
];

const columns = [
  {
    title: 'Total Bill Amount',
    dataIndex: 'totalBillAmount',
    key: 'totalBillAmount'
  },
  {
    title: 'Received Bill Amount',
    dataIndex: 'receivedBillAmount',
    key: 'receivedBillAmount'
  },
  {
    title: 'Pending Bill Amount',
    dataIndex: 'pendingBillAmount',
    key: 'pendingBillAmount'
  }
];

const OverviewTab = () => (
    <Layout style={{ display: "flex", flexDirection: "row" }}>
        <Content style={{ width: "30%" }}>
            <Card style={{ textAlign: "center" }}>
                <Col>
                    <Avatar size={48} icon={<UserOutlined />} />
                </Col>
                <Col>
                    <h3>{customerData.customerName}</h3>
                    <p>{customerData.customerPhone}</p>
                    <p>{customerData.customerEmail}</p>
                </Col>
            </Card>
            <AddressCard  billingAddress={customerData?.billingAddress} shippingAddress={customerData?.shippingAddress}/>
        </Content>
        <Content style={{ width: "70%", paddingLeft: "16px" }}>
            <Table
                dataSource={tableData}
                columns={columns}
                pagination={false}
            />
            <div style={{ marginTop: "16px" }}>
                <h3>Comments</h3>
                <ul>
                    {comments
                        .sort((a, b) => a.id - b.id)
                        .map((comment) => (
                            <li key={comment.id}>{comment.comment}</li>
                        ))}
                </ul>
            </div>
        </Content>
    </Layout>
);
const TransactionTab = () => (
    <>
        <CollapsibleTable />
        <CollapsibleTable />
        <CollapsibleTable />
    </>
);

const MyComponent = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="Overview" key="1">
      <OverviewTab />
    </TabPane>
    <TabPane tab="Transaction" key="2">
      <TransactionTab />
    </TabPane>
    <TabPane tab="Statement" key="3">
      <p>Statement content</p>
    </TabPane>
  </Tabs>
);

export default MyComponent;
