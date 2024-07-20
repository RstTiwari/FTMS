// CustomTable.js

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
    rowClassName,
}) => {
    const tableStyle = {
        color: "green", // Text color
        backgroundColor: "#f0f0f0", // Light off-white background color
    };

    return (
        <>
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
                    hideOnSinglePage: true,
                }}
                onChange={onTableChange}
            />

            <style>
                {`
              .custom-row:hover {
                         background-color: #8A8D8F !important; /* Light grey hover color */
                         cursor: pointer; /* Change cursor to pointer */
                         background: #0b0b0b
                    }
              .selected-row {
                        background-color: #f3f3f3 !important; /* Black selected row color */
                    }
            `}
            </style>
        </>
    );
};

export default CustomTable;
