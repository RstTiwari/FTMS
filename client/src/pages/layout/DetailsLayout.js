import { Row, Col, Select, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CustomTable from "components/CustomTable";
import useDataFetching from "Hook/useDataFetching";
import ListModule from "module/ListModule/ListModule";
import "App.css";
import CoustomButton from "components/Comman/CoustomButton";
import { fetchTitleName } from "Helper/PageTitle";
import CustomDialog from "components/CustomDialog";
import CustomForm from "components/CreateCustomForm";
import useDebounce from "Hook/useDebounce";
import useSearch from "Hook/useSearch";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";

const DetailsLayout = () => {
    const { tenantId, entity, id, pageNo, pageSize } = useParams();

    const [selectedRowKey, setSelectedRowKey] = useState(null);
    const [details, setDetails] = useState(false);

    const [searchInput, setSearchInput] = useState("");
    const [selectedFY, setSelectedFY] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const debouncedSearch = useDebounce(searchInput, 300);

    const dataForTable = ListModule(entity);
    const [deleteRowKeys, setDeleteRowKeys] = useState([]);
    const { adminApiCall } = useAuth();

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const { data, total, isLoading, fetchData } = useDataFetching(
        entity,
        dataForTable.select,
        pageNo,
        pageSize
    );

    // ✅ SEARCH HOOK
    const {
        data: searchResults,
        isLoading: searchLoading,
        refetch: refetchSearch,
    } = useSearch(
        entity,
        debouncedSearch,
        selectedFY,
        selectedStatus,
        dataForTable.select
    );

    const isFiltering =
        debouncedSearch.trim() || selectedFY || selectedStatus;

    const getFinancialYears = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        let startYear = currentMonth >= 3 ? currentYear : currentYear - 1;

        const years = [];
        for (let i = 0; i < 5; i++) {
            const from = startYear - i;
            const to = from + 1;
            years.push(`${from}-${to}`);
        }
        return years;
    };

    const statusOptions = ["DRAFT", "PARTIAL PAID", "FULLY PAID"];

    const onTableChange = (pagination) => {
        const { current: pageNo, pageSize } = pagination;
        navigate(`/app/${tenantId}/${entity}/${pageNo}/${pageSize}`);
    };

    const rowSelection = {
        deleteRowKeys,
        onChange: (keys) => setDeleteRowKeys(keys),
    };

    // ✅ FIXED DELETE
    const onDeleteSelected = async () => {
        let { success, message } = await adminApiCall(
            "post",
            "delete",
            {},
            { entity, tenantId, deleteRowKeys }
        );

        if (success) {
            NotificationHandler.success(message);

            if (isFiltering) {
                await refetchSearch(); // ✅ refresh filtered data
            } else {
                fetchData();
            }

            setDeleteRowKeys([]);
        } else {
            NotificationHandler.error(message);
        }
    };

    useEffect(() => {
        setDetails(window.location.pathname.includes("details"));
        setSelectedRowKey(id);
    }, [id]);

    const rowClassName = (record) =>
        record._id === selectedRowKey
            ? "custom-row selected-row"
            : "custom-row";

    return (
        <Row style={{ margin: "30px" }}>
            <Col xs={24} md={details ? 6 : 24}>

                {/* HEADER */}
                <Row>
                    <Col xs={12} style={{ color: "#22b378" }}>
                        ALL {fetchTitleName(entity)?.toUpperCase()}
                    </Col>
                    <Col xs={12} style={{ textAlign: "right" }}>
                        <CoustomButton text="NEW" onClick={() => setShow(true)} />
                    </Col>
                </Row>

                {/* FILTER BAR */}
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>

                    <Input
                        placeholder="Search..."
                        style={{ width: 150 }}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        allowClear
                    />

                    <Select
                        placeholder="FY"
                        style={{ width: 150 }}
                        allowClear
                        value={selectedFY || undefined}
                        onChange={setSelectedFY}
                        options={getFinancialYears().map((fy) => ({
                            label: fy,
                            value: fy,
                        }))}
                    />

                    {entity === "invoices" && (
                        <Select
                            placeholder="Status"
                            style={{ width: 180 }}
                            allowClear
                            value={selectedStatus || undefined}
                            onChange={setSelectedStatus}
                            options={statusOptions.map((s) => ({
                                label: s,
                                value: s,
                            }))}
                        />
                    )}

                    {deleteRowKeys.length > 0 && (
                        <Button danger onClick={onDeleteSelected}>
                            Delete
                        </Button>
                    )}
                </div>

                {/* TABLE */}
                {console.log("details",dataForTable.getColumns())}
                <CustomTable
                    columns={dataForTable.getColumns(details)}
                    dataSource={isFiltering ? searchResults : data}
                    isLoading={isFiltering ? searchLoading : isLoading}
                    onTableChange={onTableChange}
                    rowClassName={rowClassName}
                    pagination={!isFiltering}
                    totalCount={isFiltering ? 0 : total}
                    currentPage={isFiltering ? 0 : pageNo}
                    rowSelection={rowSelection}
                />

                {/* MODAL */}
                <CustomDialog
                    show={show}
                    setShow={setShow}
                    children={
                        <CustomForm
                            entityOfModal={entity}
                            closeModal={(reload) => {
                                setShow(false);
                                if (reload) fetchData();
                            }}
                        />
                    }
                />
            </Col>
        </Row>
    );
};

export default DetailsLayout;