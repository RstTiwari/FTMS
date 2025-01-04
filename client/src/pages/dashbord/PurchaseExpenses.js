import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Card, Select, Tooltip } from "antd";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from "recharts";
import useInitialFormValues from "Hook/useIntialFormValues";
import { useParams } from "react-router-dom";
import PageLoader from "pages/PageLoader";

const { Title, Text } = Typography;
const { Option } = Select;

const PurchaseExpenses = () => {
    const [period, setPeriod] = useState("this_fiscal_year");
    const { tenantId } = useParams();

    let { initialValues, isFetching, fetchInitialValues } =
        useInitialFormValues(
            "purchaseAndExpenses",
            "totalReciveables",
            tenantId,
        );


    useEffect(() => {
        fetchInitialValues(period);
    }, []);

    useEffect(() => {}, [period]);

    const handleYearChange = (value) => {
        let current = value
        setPeriod(current);
        fetchInitialValues(current);
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
              Purchases and Expenses
              <Tooltip title="Total Expense and Purchase">
                <Text type="secondary">ⓘ</Text>
              </Tooltip>
            </Title>
          </Col>
          <Col>
            <Select
              value={period}
              onChange={handleYearChange}
              style={{ width: 150 }}
            >
              <Option value="this_month">This Month</Option>
              <Option value="last_three_month">Last 3 Month</Option>
              <Option value="this_fiscal_year">This Fiscal Year</Option>
              <Option value="last_fiscal_year">Last Fiscal Year</Option>
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={18}>
            {initialValues ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={initialValues.purchaseAndExpense}
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
                  <RechartsTooltip />
                  <Bar dataKey="Purchase" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="Expenses" stackId="a" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div>Loading...</div>
            )}
          </Col>

          <Col xs={24} sm={6}>
            <div>
              <Text type="secondary" style={{ display: "block" }}>
                Total Purchase
              </Text>
              <Title
                level={5}
                style={{ color: "#1890ff" }}
              >{`₹${initialValues?.totalPurchase}`}</Title>
            </div>
            <div>
              <Text type="secondary" style={{ display: "block" }}>
                Total Expenses
              </Text>
              <Title
                level={5}
                style={{ color: "#52c41a" }}
              >{`₹${initialValues?.totalExpenses}`}</Title>
            </div>
            <div>
              <Text type="secondary" style={{ display: "block" }}>
                Overall Total
              </Text>
              <Title
                level={5}
                style={{ color: "#ff4d4f" }}
              >{`₹${initialValues?.total}`}</Title>
            </div>
          </Col>
        </Row>

        <Text type="secondary" style={{ display: "block", marginTop: "1rem" }}>
          * Sales value displayed is inclusive of tax and inclusive of credits.
        </Text>
      </Card>
    );
};

export default PurchaseExpenses;
