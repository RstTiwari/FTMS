import React from "react";
import { BankOutlined, DownOutlined, MoneyCollectFilled, MoneyCollectOutlined } from "@ant-design/icons";
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
import { PaymentOutlined } from "@mui/icons-material";

export const TableAction = ({ params, page, download,entityNo,payment }) => {
    console.log(params,page,download );
    const {pdfGenrate} = useAuth()
    const menuItems = [
        <Menu.Item key="1" style={{fontSize:"0.75rem"}}>
            <Link to={`/read/${page}/${params}`}>
                {" "}
                <EyeOutlined />
                SHOW
            </Link>
        </Menu.Item>,
        <Menu.Item key="2"  style={{fontSize:"0.75rem"}}>
            <Link to={`/update/${page}/${params}`}>
                {" "}
                <EditOutlined />
                EDIT
            </Link>
        </Menu.Item>,
        <Menu.Item key="3" onClick={()=>pdfGenrate(page,params,entityNo)}  style={{fontSize:"0.75rem"}}>
            {download ? (
                <div>
                    {" "}
                    <FilePdfOutlined />PDF
                </div>
            ) : (
                ""
            )}
        </Menu.Item>,
            <Menu.Item key="4"  style={{fontSize:"0.75rem"}}>
            <Link to={`/record/payment/${params}`}>
                {payment ? (
                    <>
                    <BankOutlined />
                RECORD PAYMENT
                    </>
                ):("")}
                
            </Link>
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
