import { Col } from "antd";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const OverviewChart = () => {
    const data = [
        {
            name: "AUG-23",
            Lead: 4000,
            Project: 2400,
            Completed: 2400,
        },
        {
            name: "SEP-23",
            Lead: 4000,
            Project: 2400,
            Completed: 2400,
        },
        {
            name: "OCT-23",
            Lead: 3000,
            Project: 1398,
            Completed: 2210,
        },
        {
            name: "NOV-23",
            Lead: 2000,
            Project: 9800,
            Completed: 2290,
        },
        {
            name: "DEC-23",
            Lead: 2780,
            Project: 3908,
            Completed: 2000,
        },
        {
            name: "JAN-24",
            Lead: 1890,
            Project: 4800,
            Completed: 2181,
        },
    ];
    
    return (
        <ResponsiveContainer>
        <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 18 }}
            style={{ backgroundColor: "white",  margin:"1rem"} }
        >
           <LineChart
                width={700}
                height={300}
                data={data}
               
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="Lead"
                    stroke="#8884d8"
                />
                <Line
                    type="monotone"
                    dataKey="Project"
                    stroke="#82ca9d"
                />
            </LineChart>
        </Col>
        </ResponsiveContainer>

    );
};

export default OverviewChart;
