// CustomTable.js

import React, { useState } from "react";
import { Table } from "antd";

const CustomTable = ({
    columns,
    dataSource,
    isLoading,
    onRowClick,
    onTableChange,
    pageSize,
    rowClassName,
    total,
    currentPage, // Passed down as props for current page number
}) => {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: currentPage || 1,
            pageSize: pageSize || 10,
            total: total,
            hideOnSinglePage: true,
        },
    });

    const handleTableChange = (pagination) => {
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                current: pagination.current,
                pageSize: pagination.pageSize,
            },
        });
        onTableChange(pagination); // Pass the pagination data back to the parent
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                size="small"
                loading={isLoading}
                rowClassName={rowClassName}
                pagination={tableParams.pagination}
                onChange={handleTableChange}
                onRow={(record) => ({
                    onClick: () => onRowClick(record),
                })}
            />
        </>
    );
};

export default CustomTable;
