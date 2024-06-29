import React, { useEffect, useState } from "react";
import Headers from "./Header";
import CustomTable from "./CustomTable";
import { useParams } from "react-router-dom";
import ListModule from "module/ListModule/ListModule";

const CoustomListPage = () => {
    const { entity } = useParams();
    const { headers, listColumns } = ListModule(entity);
    const [isLoading, setIsLoading] = useState(false); // Example loading state, replace with your actual loading state
    const [selectedRecord, setSelectedRecord] = useState(null); // State to track selected row

    // Example column definition
    const customerColumns = [
        { title: "ID", dataIndex: "id" },
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        // Add more columns as needed
    ];

    // Example data source
    const data = [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
        // Add more data rows as needed
    ];

    // Handle row click to open new route
    const handleRowClick = (record) => {
        setSelectedRecord(record);
        // Example: Navigate to a new route with reduced width
        // You can implement your navigation logic here
        // Example:
        // history.push(`/app/${record.id}`, { width: '30%' });
    };

    return (
        <div className="customer-list-page">
            <Headers
                title={headers?.title}
                subTitle={headers?.subTitle}
                addRoute={"/customers/create"}
                cancelRoute={"/dashboard"}
            />
            <CustomTable
                columns={listColumns}
                dataSource={[]}
                isLoading={isLoading}
                onRowClick={handleRowClick}
            />
            {/* Display additional content or sidebar with selectedRecord details */}
            {selectedRecord && (
                <div className="sidebar" style={{ width: "30%" }}>
                    {/* Render content related to selectedRecord */}
                    <h2>{selectedRecord.name}</h2>
                    <p>Email: {selectedRecord.email}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
};

export default CoustomListPage;
