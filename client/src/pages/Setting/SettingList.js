import React from "react";
import { List, Menu } from "antd";
import { Link } from "react-router-dom";
import { Typography, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import {
    ContainerOutlined,
    PrinterOutlined,
    TeamOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const SettingList = ({ closeSideBar, setCloseSideBar }) => {
    const { entity, id } = useParams();
    const navigate = useNavigate();
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const [cookie, setCookie] = useCookies("authData");
    const tenantId = cookie["profile"]["tenant"]["tenantId"];

    const handleClick = (e) => {
        navigate(`/app/${tenantId}/settings/${e.key}/${tenantId}`);
        setCloseSideBar(!closeSideBar);
    };
    const items = [
        getItem("Orgnization Profile", `orgnizations`, <ContainerOutlined />),
        getItem("PDF Templates", "templates", <PrinterOutlined />),
        getItem("Dashbord Users", "dashbordusers", <TeamOutlined />),
        // getItem("Employess", "emloyess", < />),
    ];
    return <Menu items={items} onClick={(e) => handleClick(e)} />;
};

export default SettingList;
