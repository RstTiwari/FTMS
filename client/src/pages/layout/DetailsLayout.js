import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { Space, Table, Input, Button } from "antd";

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

const { Search } = Input;

const DetailsLayout = () => {
    const { tenantId, entity, id, pageNo, pageSize } = useParams();
    const [selectedRowKey, setSelectedRowKey] = useState(null);
    const [details, setDetails] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const debouncedSearch = useDebounce(searchInput, 300);
    const dataForTable = ListModule(entity);
    const [deleteRowKeys, setDeleteRowKeys] = useState([]);
    const { adminApiCall } = useAuth();
    

    const [show, setShow] = useState(false);
    const openModal = () => {
        setShow(true);
    };
    const closeModal = (reload) => {
        if (reload) {
            setShow(false);
            fetchData();
        } else {
            setShow(false);
        }
    };

    const navigate = useNavigate();
    const { data, total, isLoading, fetchData } = useDataFetching(
        entity,
        dataForTable.select,
        pageNo,
        pageSize
    );
    const { data: searchResults, isLoading: searchLoading } = useSearch(
        entity,
        debouncedSearch,
        dataForTable.select
    );
    console.log(searchResults);

    const onTableChange = (pagination) => {
        const { current: pageNo, pageSize } = pagination;
        navigate(`/app/${tenantId}/${entity}/${pageNo}/${pageSize}`);
    };
    const rowSelection = {
        deleteRowKeys,
        onChange: (keys) => setDeleteRowKeys(keys),
    };

    const onDeleteSelected = async () => {
        let { success, result, message } = await adminApiCall(
            "post",
            "delete",
            {},
            { entity, tenantId,deleteRowKeys }
        );
        if (success) {
            NotificationHandler.success(message);
            fetchData();
            setDeleteRowKeys([])
        } else {
            return NotificationHandler.error(message);
        }

    }
   
    useEffect(() => {
        setDetails(window.location.pathname.includes("details"));
        setSelectedRowKey(id);
    }, [id]);
    console.log(deleteRowKeys,"deleteRowKeys")

    const rowClassName = (record) => {
        return record._id === selectedRowKey
            ? "custom-row selected-row"
            : "custom-row";
    };

    return (
        <Row style={{ margin: "30px" }}>
            <Col
                xs={details ? 12 : 24}
                sm={details ? 12 : 24}
                md={details ? 6 : 24}
                lg={details ? 6 : 24}
                xl={details ? 6 : 24}
            >
                <Row>
                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        style={{
                            color: "black",
                            fontSize: details ? "12px" : "1rem",
                            color: "#22b378",
                        }}
                    >
                        ALL {fetchTitleName(entity)?.toUpperCase()}
                    </Col>
                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        style={{
                            textAlign: "right",
                            fontSize: details ? "0.55rem" : "1rem",
                            right: 20,
                        }}
                    >
                        <CoustomButton
                            isCancel={false}
                            text={"NEW"}
                            onClick={openModal}
                            withIcon
                            details={true}
                            isLoading={isLoading}
                        />
                    </Col>
                </Row>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    {/* LEFT SIDE: Search Box */}
                    <Input.Search
                        placeholder="Search..."
                        style={{ width: 300 }}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        allowClear
                    />

                    {/* RIGHT SIDE: Delete Button (shown only if rows selected) */}
                    {deleteRowKeys.length > 0 && (
                        <Button
                            danger
                            type="primary"
                            onClick={() => onDeleteSelected(deleteRowKeys)}
                            style={{marginRight:100}}
                            size="small"
                        >
                            Delete
                        </Button>
                    )}
                </div>

                <CustomTable
                    columns={dataForTable.getColumns(details)}
                    dataSource={debouncedSearch.trim() ? searchResults : data}
                    isLoading={
                        debouncedSearch.trim() ? searchLoading : isLoading
                    }
                    onTableChange={onTableChange}
                    rowClassName={rowClassName}
                    totalCount={debouncedSearch.trim() ? 0 : total}
                    currentPage={debouncedSearch.trim() ? 0 : pageNo}
                    pagination={
                        debouncedSearch.trim()
                            ? false
                            : true
                    }
                    rowSelection={rowSelection}
                />
            </Col>
            <CustomDialog
                show={show}
                setShow={setShow}
                children={
                    <CustomForm
                        entityOfModal={entity}
                        closeModal={(realod) => closeModal(realod)}
                    />
                }
            />
        </Row>
    );
};

export default DetailsLayout;
