import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Space, Dropdown, Menu } from "antd";
import pdfGenrate from "Helper/PdfGenrate";
import { useAuth } from "state/AuthProvider"
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    FilePdfOutlined,
    RedoOutlined,
    PlusOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";

export const TableAction = ({ params, page, download,entityNo }) => {
    const {pdfGenrate} = useAuth()
    const menuItems = [
        <Menu.Item key="1">
            <Link to={`/read/${page}/${params}`}>
                {" "}
                <EyeOutlined />
                SHOW
            </Link>
        </Menu.Item>,
        <Menu.Item key="2">
            <Link to={`/update/${page}/${params}`}>
                {" "}
                <EditOutlined />
                EDIT
            </Link>
        </Menu.Item>,
        <Menu.Item key="3" onClick={()=>pdfGenrate(page,params,entityNo)}>
            {download ? (
                <div>
                    {" "}
                    <FilePdfOutlined />PDF
                </div>
            ) : (
                ""
            )}
        </Menu.Item>,
    ];

    return (
        <Space size="small">
            <Dropdown overlay={<Menu>{menuItems}</Menu>} trigger={["click"]}>
                <div style={{fontSize:"2rem",cursor:"pointer"}} >...</div>
            </Dropdown>
        </Space>
    );
};
