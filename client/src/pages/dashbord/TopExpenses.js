import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Select, Spin } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;
const { Option } = Select;

const COLORS = ['#82ca9d', '#8884d8', '#8dd1e1', '#ffc658']; // Add more colors if you have more categories

const TopExpenses = () => {
  const [data, setData] = useState(null);
  const [selectedYear, setSelectedYear] = useState('This Fiscal Year');

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setTimeout(() => {
        const expensesData = [
          { name: 'Materials', value: 12345666 },
          { name: 'Labor', value: 8345678 },
          { name: 'Transport', value: 5678900 },
        ];
        setData(expensesData);
      }, 2000); // Simulate a 2-second delay
    };

    fetchData();
  }, []);

  const handleYearChange = (value) => {
    setSelectedYear(value);
    // You can add logic to fetch data based on the selected year
  };

  return (
   <Col lg={12} xl={12} style={{margin:"20px"}}>
    <Card bordered={false} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '1rem' }}>
        <Col>
          <Title level={4}>Top Expenses <Text type="secondary">ⓘ</Text></Title>
        </Col>
        <Col>
          <Select value={selectedYear} onChange={handleYearChange} style={{ width: 150 }}>
            <Option value="This Fiscal Year">This Fiscal Year</Option>
            <Option value="Last Fiscal Year">Last Fiscal Year</Option>
            <Option value="2023">2023</Option>
            {/* Add more years as needed */}
          </Select>
        </Col>
      </Row>

      {data ? (
        <Row align="middle" justify="center">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#82ca9d"
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center' }}>
              <Text strong>TOP EXPENSES</Text>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            {data.map((entry, index) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 10, height: 5, backgroundColor: COLORS[index % COLORS.length], marginRight: 8 }}></div>
                  <Text>{entry.name}</Text>
                </div>
                <div>
                  <Title level={5} style={{ color: '#595959' }}>{`₹${entry.value.toLocaleString()}`}</Title>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      ) : (
        <Row justify="center" align="middle" style={{ height: 200 }}>
          <Spin size="large" />
        </Row>
      )}
    </Card>
   </Col>
  );
};

export default TopExpenses;
