import React, { useEffect, useState } from "react";
import { Row, Col, Progress, Typography, Card, Tooltip, Dropdown, Button } from "antd";
import { Link ,useParams} from "react-router-dom";

const { Title, Text } = Typography;

const TotalReceivables = () => {
    const {tenantId}   = useParams()
     const [data, setData] = useState(null);
    const items =[
        {
            key: '1',
            label: (
              <Link to={`/app/${tenantId}/invoices/create`}>
                Invoice
              </Link>
            ),
          },
          {
            key: '2',
            label: (
              <Link to={`/app/${tenantId}/payments/create`}>
                Payment
              </Link>
            ),
          },
    ]

    useEffect(() => {
        // Simulate a data fetch
        setTimeout(() => {
            const receivablesData = {
                totalReceivables: 2000.0,
                overdue1_15: 0.0,
                overdue16_30: 0.0,
                overdue31_45: 2000.0,
                overdueAbove45: 0.0,
            };
            setData(receivablesData);
        }, 2000); // 2 seconds delay for demonstration
    }, []);

    return (
        <Card
            bordered={false}
            style={{
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                margin:"20px"
            }}
        >
            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={4}>
                        Total Receivables{" "}
                        <Tooltip title="Receivables over the past periods">
                            <Text type="secondary">ⓘ</Text>
                        </Tooltip>
                    </Title>
                    <Text>
                        Total Receivables ₹
                        {data ? data.totalReceivables.toFixed(2) : "Loading..."}
                    </Text>
                </Col>
                <Col>
                    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                        <a
                            href="#new"
                            style={{ textDecoration: "none", fontWeight: 500 }}
                        >
                            + New
                        </a>
                    </Dropdown>
                </Col>
            </Row>
            <Progress
                percent={data ? (data.totalReceivables / 10000) * 100 : 0} // Example percentage calculation
                strokeColor="#faad14"
                showInfo={false}
                style={{ margin: "1rem 0" }}
            />
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false}>
                        <Text type="secondary">CURRENT</Text>
                        <Title level={5}>
                            ₹{data ? data.overdue1_15.toFixed(2) : "Loading..."}
                        </Title>
                        <Text type="secondary"> 1-15 Days</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false}>
                        <Text type="danger">OVERDUE</Text>
                        <Title level={5}>
                            ₹
                            {data ? data.overdue16_30.toFixed(2) : "Loading..."}
                        </Title>
                        <Text type="secondary">16-30 Days</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false}>
                        <Text type="danger">PENDING</Text>
                        <Title level={5}>
                            ₹
                            {data ? data.overdue16_30.toFixed(2) : "Loading..."}
                        </Title>
                        <Text type="secondary">31-45 Days</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false}>
                        <Text type="danger">DELAYED</Text>
                        <Title level={5}>
                            ₹
                            {data ? data.overdue31_45.toFixed(2) : "Loading..."}
                        </Title>
                        <Text type="secondary">Above 45 Days</Text>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default TotalReceivables;
