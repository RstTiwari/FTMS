import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Progress,
    Typography,
    Card,
    Tooltip,
    Dropdown,
    Button,
} from "antd";
import { Link, useParams } from "react-router-dom";
import useInitialFormValues from "Hook/useIntialFormValues";
import Taglabel from "components/Comman/Taglabel";

const { Title, Text } = Typography;

const TotalReceivables = () => {
    const { tenantId } = useParams();
    const items = [
        {
            key: "1",
            label: <Link to={`/app/${tenantId}/invoices/create`}>Invoice</Link>,
        },
        {
            key: "2",
            label: (
                <Link to={`/app/${tenantId}/paymentsreceived/create`}>
                    Payment
                </Link>
            ),
        },
    ];
    const { initialValues, isFetching, fetchInitialValues } =
        useInitialFormValues("tenant", "totalReciveables", tenantId);

    useEffect(() => {
        fetchInitialValues();
    }, []);

    return (
        <Card
            bordered={false}
            style={{
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                margin: "20px",
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
                    <Taglabel
                        text={`₹
                        ${
                            initialValues
                                ? initialValues?.totalReceivables?.toFixed(2)
                                : "Loading..."
                        }`}
                        weight={1000}
                    />
                    <Text></Text>
                </Col>
                
            </Row>
            <Progress
                percent={
                    initialValues
                        ? (initialValues?.totalReceivables / 10000) * 100
                        : 0
                } // Example percentage calculation
                strokeColor="#faad14"
                showInfo={false}
                style={{ margin: "1rem 0" }}
            />
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false}>
                        <Text type="success">CURRENT</Text>
                        <Tooltip title="Bill Date Coming 1-15 Days ">
                            <Text type="secondary">ⓘ</Text>
                        </Tooltip>
                        <Title level={5}>
                            ₹
                            {initialValues
                                ? initialValues?.last15Days.toFixed(2)
                                : "Loading..."}
                        </Title>
                        <Text type="secondary"> 1-15 Days</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false}>
                        <Text type="warning">COMING</Text>
                        <Tooltip title="Bill Date Coming 16-30 Days ">
                            <Text type="secondary">ⓘ</Text>
                        </Tooltip>
                        <Title level={5}>
                            ₹
                            {initialValues
                                ? initialValues?.last16To30Days.toFixed(2)
                                : "Loading..."}
                        </Title>
                        <Text type="secondary">16-30 Days</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false}>
                        <Text type="warning">PAST</Text>
                        <Tooltip title="Bill Date has Past 1-45 Days ">
                            <Text type="secondary">ⓘ</Text>
                        </Tooltip>
                        <Title level={5}>
                            ₹
                            {initialValues
                                ? initialValues?.last31To45Days.toFixed(2)
                                : "Loading..."}
                        </Title>
                        <Text type="secondary">31-45 Days</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false}>
                        <Text type="danger">OVERDUE</Text>
                        <Tooltip title="Bill Date Has Past Above  45 Days ">
                            <Text type="secondary">ⓘ</Text>
                        </Tooltip>
                        <Title level={5}>
                            ₹
                            {initialValues
                                ? initialValues?.above45Days.toFixed(2)
                                : "Loading..."}
                        </Title>
                        <Text type="secondary">Above 45 Days</Text>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default TotalReceivables;
