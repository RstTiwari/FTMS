import React from "react";
import { Table } from "antd";

const CustomTable = ({ columns, dataSource, loading, onRowClick }) => {
    const tableStyle = {
        color: "green", // Text color
        backgroundColor: "#f0f0f0", // Light off-white background color
    };

    const rowClassName = () => "custom-row";

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                size="small"
                loading={loading}
                onRow={(record) => ({
                    onClick: () => onRowClick(record),
                })}
                rowClassName={rowClassName}
                style={tableStyle}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                }}
            />
        </>
    );
};

export default CustomTable;
