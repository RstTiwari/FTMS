// CustomTable.js

import React, { useEffect, useState } from "react";
import { Space, Table,Input } from "antd";
import { useParams } from "react-router-dom";
const { Search } = Input;

const CustomTable = ({
    columns,
    dataSource,
    isLoading,
    onRowClick,
    onTableChange,
    rowClassName,
    totalCount,
    pagination = true,
}) => {
    let { pageSize, pageNo, entity } = useParams();
    const [total, setTotal] = useState(totalCount || 0);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: Number(pageNo) || 1,
            pageSize: Number(pageSize) || 10,
            total: total,
            showSizeChanger: true, // Add this line to enable pageSize dropdown
            pageSizeOptions: [10, 20, 50, 100], // Optional: Customize the page size options
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
        onTableChange(pagination); 
    };

    useEffect(() => {
        setTableParams((prevParams) => ({
            ...prevParams,
            pageSize:pageSize,
            pagination: {
                pageSize:pageSize,
                total: totalCount,
                showSizeChanger:true
            },
        }));
    }, [totalCount,pageNo,pageSize]);

    return (
        <div>
       
            <Table
                columns={columns}
                dataSource={dataSource}
                size="small"
                loading={isLoading}
                rowClassName={rowClassName}
                pagination={pagination ? tableParams.pagination : false}
                onChange={handleTableChange}
                // onRow={(record) => ({
                //     onClick: () => onRowClick(record),
                // })}
            />
        </div>
    );
};

export default CustomTable;
