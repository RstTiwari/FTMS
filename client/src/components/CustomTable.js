import React from "react";
import { Table } from "antd";
import PageLoader from "pages/PageLoader";

const CustomTable = ({
    columns,
    dataSource,
    isLoading,
    onRowClick,
    onTableChange,
    pageSize,
}) => {
    const tableStyle = {
        color: "green", // Text color
        backgroundColor: "#f0f0f0", // Light off-white background color
    };

    const rowClassName = () => "custom-row";

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            size="small"
            loading={isLoading}
            onRow={(record) => ({
                onClick: () => onRowClick(record),
            })}
            rowClassName={rowClassName}
            style={tableStyle}
            pagination={{
                pageSize: pageSize,
                showSizeChanger: true,
            }}
            onChange={onTableChange}
        />
    );
};

export default CustomTable;
