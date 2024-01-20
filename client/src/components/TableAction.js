import React from 'react';
import { DownOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { Space, Dropdown, Menu } from "antd";

export const TableAction = ({ params,page }) => {
    const menuItems = [
        <Menu.Item key="1">
            <Link to={`/show/${page}/${params}`}>SHOW</Link>
        </Menu.Item>,
        <Menu.Item key="2">
            <Link to={`/edit/${page}/${params}`}>EDIT</Link>
        </Menu.Item>,
        <Menu.Item key="3">
            <Link to={`/download/${page}/${params}`}>DOWNLOAD</Link>
        </Menu.Item>,
    ];

    return (
        <Space size="middle">
            <Dropdown overlay={<Menu>{menuItems}</Menu>}>
                <a>
                    <DownOutlined />
                </a>
            </Dropdown>
        </Space>
    );
};
