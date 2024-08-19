import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Card, Select, Spin } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useInitialFormValues from "Hook/useIntialFormValues";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

const COLORS = ["#82ca9d", "#8884d8", "#8dd1e1", "#ffc658"]; // Add more colors if you have more categories

const TopExpenses = () => {
    const [selectedYear, setSelectedYear] = useState("this_fiscal_year");
    const { tenantId } = useParams();
    let { initialValues, isFetching, fetchInitialValues } =
        useInitialFormValues(
            "topExpenses",
            "totalReciveables",
            tenantId,
            selectedYear
        );

    useEffect(() => {
        fetchInitialValues();
    }, [selectedYear]);

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };

    return (
        <Col lg={12} xl={12} style={{ margin: "20px" }}>
            <Card
                bordered={false}
                style={{
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Row
                    justify="space-between"
                    align="middle"
                    style={{ marginBottom: "1rem" }}
                >
                    <Col>
                        <Title level={4}>
                            Top Expenses <Text type="secondary">ⓘ</Text>
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
                        </Select>
                    </Col>
                </Row>

                {initialValues ? (
                    <Row align="middle" justify="center">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={initialValues} // Corrected from initialValues to data
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#82ca9d"
                                        dataKey="value" // Ensure this matches your data structure
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {initialValues.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div style={{ textAlign: "center" }}>
                                <Text strong>TOP EXPENSES</Text>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {initialValues.map((entry, index) => (
                                <div
                                    key={index}
                                    style={{
                                        marginBottom: 8,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginRight: 8,
                                            width: "60%",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 12,
                                                height: 12,
                                                backgroundColor:
                                                    COLORS[
                                                        index % COLORS.length
                                                    ],
                                                borderRadius: "50%",
                                                marginRight: 8,
                                            }}
                                        ></div>
                                        <Text
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {entry.name}
                                        </Text>{" "}
                                        {/* Category name */}
                                    </div>
                                    <div
                                        style={{ flex: 1, textAlign: "right" }}
                                    >
                                        <Title
                                            level={5}
                                            style={{
                                                margin: 0,
                                                color: "#595959",
                                                whiteSpace: "nowrap",
                                            }}
                                        >{`₹${entry.value.toLocaleString()}`}</Title>{" "}
                                        {/* Value */}
                                    </div>
                                </div>
                            ))}
                        </Col>
                    </Row>
                ) : (
                    <Row
                        justify="center"
                        align="middle"
                        style={{ height: 200 }}
                    >
                        <Spin size="large" />
                    </Row>
                )}
            </Card>
        </Col>
    );
};

export default TopExpenses;
