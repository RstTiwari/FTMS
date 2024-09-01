import React, { useState, useEffect } from "react";
import { Card, Collapse, Table, Button, Col, Row } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import axios from "axios";
import Taglabel from "./Taglabel";
import CustomTable from "components/CustomTable";
import useDataFetching from "Hook/useDataFetching";
import { useParams, useNavigate } from "react-router-dom";
import ListModule from "module/ListModule/ListModule";
import PageLoader from "pages/PageLoader";

const { Panel } = Collapse;

const CollapsibleTable = ({ columns, panelHeader, entity }) => {
    const { id, tenantId, pageNo, pageSize } = useParams();
    let navigate = useNavigate();
    let dataForTable = ListModule(entity);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const { data, total, isLoading, fetchData } = useDataFetching(
        entity,
        dataForTable.select,
        pageNo,
        pageSize,
        id
    );

    if (isLoading) {
        return <PageLoader isLoading={true} text={"holdOn__-"} />;
    }
    const handleTableChange = () => {
        return navigate(
            `/app/${tenantId}/${entity}/${pageNo}/${pageSize}/details/${id}`
        );
    };

    const handleFilterClick = () => {
        // fetchData({ filter: 'your-filter-criteria' });
    };

    const onPanelChange = (key) => {
        handlePanelChange(key);
        setIsPanelOpen(key.length > 0); // Check if panel is open
    };

    const handlePanelChange = (key) => {
        if (key) {
        }
    };

    return (
        <Collapse onChange={onPanelChange}>
            <Panel
                header={
                    <Row align="middle">
                        <Col flex="auto">
                            <Taglabel
                                text={panelHeader}
                                type="text"
                                weight={800}
                            />
                        </Col>
                    </Row>
                }
                key="1"
            >
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ total: total, pageSize: 50 }}
                    onChange={handleTableChange}
                />
            </Panel>
        </Collapse>
    );
};

export default CollapsibleTable;
