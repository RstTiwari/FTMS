import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";


import Headers from "./Header";
import CustomTable from "./CustomTable";
import ListModule from "module/ListModule/ListModule";
import useDataFetching from "Hook/useDataFetching";

const CoustomListPage = ({onTableChange,onRowClick}) => {
    const { tenantId,entity,pageNo ,pageSize } = useParams();
    const navigate = useNavigate()
    const { select, listColumns } = ListModule(entity);
    const [selectedRecord, setSelectedRecord] = useState(null); // State to track selected row
    const {data,isLoading,fetchData} = useDataFetching(entity,select,pageNo,pageSize)

    useEffect(()=>{
        fetchData()
    },[pageNo,pageSize])


    return (
        <div className="customer-list-page">
            <Headers/>
            <CustomTable
                columns={listColumns}
                dataSource={data}
                isLoading={isLoading}
                onRowClick={onRowClick}
                onTableChange={onTableChange}
            />
            {/* Display additional content or sidebar with selectedRecord details */}
            {selectedRecord && (
                <div className="sidebar" style={{ width: "30%" }}>
                    {/* Render content related to selectedRecord */}
                    <h2>{selectedRecord.name}</h2>
                    <p>Email: {selectedRecord.customerName}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
};

export default CoustomListPage;
