import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Space, Dropdown, Menu } from "antd";
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    FilePdfOutlined,
    RedoOutlined,
    PlusOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";

export const TableAction = ({ params, page, download }) => {
    const menuItems = [
        <Menu.Item key="1">
            <Link to={`/read/${page}/${params}`}>
                {" "}
                <EyeOutlined />
                SHOW
            </Link>
        </Menu.Item>,
        <Menu.Item key="2">
            <Link to={`/edit/${page}/${params}`}>
                {" "}
                <EditOutlined />
                EDIT
            </Link>
        </Menu.Item>,
        <Menu.Item key="3">
            {download ? (
                <Link to={`/download/${page}/${params}`}>
                    {" "}
                    <FilePdfOutlined /> DOWNLOAD
                </Link>
            ) : (
                ""
            )}
        </Menu.Item>,
    ];

    return (
        <Space size="small">
            <Dropdown overlay={<Menu>{menuItems}</Menu>} trigger={["click"]}>
                <a>....</a>
            </Dropdown>
        </Space>
    );
};
