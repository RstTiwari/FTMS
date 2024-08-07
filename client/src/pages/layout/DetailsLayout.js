// DetailsLayout.js

import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";

import CustomTable from "components/CustomTable";
import Headers from "components/Header";
import useDataFetching from "Hook/useDataFetching";
import ListModule from "module/ListModule/ListModule";

const DetailsLayout = () => {
    const { tenantId, entity, id, pageNo, pageSize } = useParams();
    const [selectedRowKey, setSelectedRowKey] = useState(null);
    const [details, setDetails] = useState(false);
    const dataForTable = ListModule(entity);

    const navigate = useNavigate();
    const { data, isLoading, fetchData } = useDataFetching(
        entity,
        dataForTable.select,
        pageNo,
        pageSize
    );

    const onTableChange = (pagination, filter, sorter) => {
        const { current: pageNo, pageSize } = pagination;
        navigate(`/app/${tenantId}/${entity}/${pageNo}/${pageSize}`);
    };

    const handleRowClick = (record) => {
        setSelectedRowKey(record._id);
        setDetails(true);
        navigate(
            `/app/${tenantId}/${entity}/${pageNo}/${pageSize}/details/${record._id}`
        );
    };

    useEffect(() => {
        setDetails(window.location.pathname.includes("details"));
        setSelectedRowKey(id);
    }, [id]);

    const rowClassName = (record) => {
        return record._id === selectedRowKey
            ? "custom-row selected-row"
            : "custom-row";
    };

    return (
        <Row>
            <Col
                xs={6}
                sm={6}
                md={details ? 6 : 24}
                lg={details ? 6 : 24}
                xl={details ? 6 : 24}
            >
                <Headers details={details} />
                <CustomTable
                    columns={dataForTable.getColumns(details)}
                    dataSource={data}
                    isLoading={isLoading}
                    onRowClick={handleRowClick}
                    onTableChange={onTableChange}
                    rowClassName={rowClassName}
                />
            </Col>
            {details && (
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    <Outlet />
                </Col>
            )}
        </Row>
    );
};

export default DetailsLayout;
