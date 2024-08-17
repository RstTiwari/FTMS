import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Card, Select } from "antd";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const { Title, Text } = Typography;
const { Option } = Select;

const SalesExpensesDashboard = () => {
    const [data, setData] = useState(null);
    const [total, setTotal] = useState(null);
    const [selectedYear, setSelectedYear] = useState("This Fiscal Year");

    useEffect(() => {
        // Simulate data fetching
        const fetchData = async () => {
            const salesExpensesData = [
                { name: "Jan 2024", Sales: 0, Expenses: 0 },
                { name: "Feb 2024", Sales: 0, Expenses: 0 },
                { name: "Mar 2024", Sales: 0, Expenses: 0 },
                { name: "Apr 2024", Sales: 0, Expenses: 0 },
                { name: "May 2024", Sales: 0, Expenses: 0 },
                { name: "Jun 2024", Sales: 4000000, Expenses: 0 },
                { name: "Jul 2024", Sales: 0, Expenses: 12000000 },
                { name: "Aug 2024", Sales: 0, Expenses: 0 },
                { name: "Sep 2024", Sales: 0, Expenses: 0 },
                { name: "Oct 2024", Sales: 0, Expenses: 0 },
                { name: "Nov 2024", Sales: 0, Expenses: 0 },
                { name: "Dec 2024", Sales: 0, Expenses: 0 },
            ];
            setData(salesExpensesData);
            setTotal({
                totalSales: "53,540.00",
                totalReceipts: "50,16,102.00",
                totalExpenses: "1,23,45,666.00",
            });
        };

        fetchData();
    }, []);

    const handleYearChange = (value) => {
        setSelectedYear(value);
        // You can add logic to fetch data based on the selected year
    };

    return (
        <Card
            bordered={false}
            style={{
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                margin: "20px",
            }}
        >
            <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: "1rem" }}
            >
                <Col>
                    <Title level={4}>
                        Sales and Purchases <Text type="secondary">ⓘ</Text>
                    </Title>
                </Col>
                <Col>
                    <Select
                        value={selectedYear}
                        onChange={handleYearChange}
                        style={{ width: 150 }}
                    >
                        <Option value="this_fiscal_year">
                            This Fiscal Year
                        </Option>
                        <Option value="last_fisacal_year">
                            Last Fiscal Year
                        </Option>
                        {/* Add more years as needed */}
                    </Select>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={18}>
                    {data ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="Sales"
                                    stackId="a"
                                    fill="#82ca9d"
                                />
                                <Bar
                                    dataKey="Expenses"
                                    stackId="a"
                                    fill="#ff7300"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div>Loading...</div>
                    )}
                </Col>

                <Col xs={24} sm={6}>
                    <div>
                        <Text type="secondary" style={{ display: "block" }}>
                            Total Sales
                        </Text>
                        <Title
                            level={5}
                            style={{ color: "#1890ff" }}
                        >{`₹${total?.totalSales}`}</Title>
                    </div>
                    <div>
                        <Text type="secondary" style={{ display: "block" }}>
                            Total Receipts
                        </Text>
                        <Title
                            level={5}
                            style={{ color: "#52c41a" }}
                        >{`₹${total?.totalReceipts}`}</Title>
                    </div>
                    <div>
                        <Text type="secondary" style={{ display: "block" }}>
                            Total Expenses
                        </Text>
                        <Title
                            level={5}
                            style={{ color: "#ff4d4f" }}
                        >{`₹${total?.totalExpenses}`}</Title>
                    </div>
                </Col>
            </Row>

            <Text
                type="secondary"
                style={{ display: "block", marginTop: "1rem" }}
            >
                * Sales value displayed is inclusive of tax and inclusive of
                credits.
            </Text>
        </Card>
    );
};

export default SalesExpensesDashboard;
