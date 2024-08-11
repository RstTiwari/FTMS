import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography, Button } from "antd";
import * as Icons from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ftmsLogo from "../Assets/favicon.png";
import { useCookies } from "react-cookie";

const { Sider } = Layout;
const Sidebar = ({
    drawerWidth,
    isSideBarClosed,
    setIsSidebarClosed,
    isLaptop,
    sidebar,
    tenantId,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const [openKeys, setOpenKeys] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const convertDataToNavItems = (data) => {
        return data?.map((item) => {
            const IconComponent = Icons[item.icon];
            const newItem = {
                key: item.key,
                label: item.label,
                icon: IconComponent ? (
                    <IconComponent style={{ color: "yellow" }} />
                ) : null,
            };

            if (item.children && item.children.length > 0) {
                newItem.children = convertDataToNavItems(item.children);
            }

            return newItem;
        });
    };

    const navItems = convertDataToNavItems(sidebar);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (navItems.map((item) => item.key).includes(latestOpenKey)) {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        } else {
            setOpenKeys(keys);
        }
    };

    const handleNavbarClick = (e) => {
        let entity = e.key;
        let pageNo = 1;
        if (!tenantId) {
            console.error("tenantId is undefined");
            return;
        }

        if (!entity) {
            console.error("entity is undefined");
            return;
        }

        if (entity == "dashboard") {
            return navigate(`/app/${tenantId}/dashboard`);
        }
        navigate(`/app/${tenantId}/${entity}/${pageNo}/25`);
        setActive(entity);
    };

    return (
        <Sider
            width={drawerWidth}
            collapsible
            collapsed={isSideBarClosed}
            onCollapse={(value) => {
                setIsSidebarClosed(value);
            }}
            style={{
                height: "100vh",
                position: "fixed",
                background: "#181c2e",
                fontFamily: "sans-serif",
                fontWeight: 500,
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px",
                }}
            >
                <img
                    src={ftmsLogo}
                    alt="FTMS Logo"
                    style={{ width: "1.5rem", marginLeft: "0.5rem" }}
                />
                {!isSideBarClosed && (
                    <Typography.Title
                        level={4}
                        style={{ color: "white", margin: 0 }}
                    >
                        FTMS
                    </Typography.Title>
                )}
            </div>
            <Menu
                mode="inline"
                selectedKeys={[active]}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={handleNavbarClick}
                theme="dark"
                items={navItems}
                style={{
                    background: "#181c2e",
                    color: "white",
                    fontSize: "0.85rem",
                    textAlign: "left",
                }}
            />
            <style jsx>{`
                .ant-menu-item:hover {
                    background-color: #22b378 !important;
                }
                .ant-menu-item-selected {
                    background-color: #22b378 !important;
                    color: #fff !important;
                }

                .ant-menu-submenu > .ant-menu-sub {
                    background-color: #181c2e !important;
                }
            `}</style>
        </Sider>
    );
};

export default Sidebar;
