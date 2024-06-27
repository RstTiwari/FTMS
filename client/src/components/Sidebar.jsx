import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography, Button } from "antd";
import {
    HomeOutlined,
    GroupOutlined,
    DollarOutlined,
    CalculatorOutlined,
    ShoppingCartOutlined,
    FileSearchOutlined,
    ProfileOutlined,
    AccountBookOutlined,
    TeamOutlined,
    MoneyCollectOutlined,
    PieChartOutlined,
    DatabaseOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { BusinessCenterOutlined } from "@mui/icons-material";

import ftmsLogo from "../Assets/favicon.png";

const { Sider } = Layout;

const Sidebar = ({
    user,
    drawerWidth,
    isSideBarClosed,
    setIsSidebarClosed,
    isLaptop,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const [openKeys, setOpenKeys] = useState([]);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const navItems = [
        {
            key: "dashboard",
            icon: <HomeOutlined />,
            label: "Dashboard",
        },
        {
            key: "sales",
            label: "Sales & Marketing",
            icon: <BusinessCenterOutlined />,
            children: [
                {
                    key: "customers",
                    label: "Customers",
                },
                {
                    key: "quotation",
                    label: "Quotation",
                },
                {
                    key: "lead",
                    label: "Lead",
                },
            ],
        },
        {
            key: "accounts",
            label: "Accounts",
            icon: <AccountBookOutlined />,
            children: [
                {
                    key: "invoice",
                    label: "Invoice",
                },
                {
                    key: "payments",
                    label: "Payments",
                },
                {
                    key: "expenses",
                    label: "Expenses",
                },
                {
                    key: "delivery",
                    label: "Delivery Challan",
                },
            ],
        },
        {
            key: "purchase",
            label: "Purchase",
            icon: <ShoppingCartOutlined />,
            children: [
                {
                    key: "vendors",
                    label: "Vendors",
                },
                {
                    key: "purchaseOrder",
                    label: "Purchase Order",
                },
            ],
        },
        {
            key: "design",
            label: "Design & Development",
            icon: <DatabaseOutlined />,
            children: [
                {
                    key: "products",
                    label: "Products",
                },
            ],
        },
    ];

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (navItems.map((item) => item.key).includes(latestOpenKey)) {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        } else {
            setOpenKeys(keys);
        }
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
                onClick={(e) => {
                    navigate(`/${e.key}`);
                    setActive(e.key);
                }}
                theme="dark"
                items={navItems}
                style={{
                    background: "#000",
                    color: "white",
                    fontSize: "0.7rem",
                    textAlign: "left",
                }}
            />
            <style jsx>{`
                .ant-menu-item:hover {
                    background-color: #22b378 !important;
                }
                .ant-menu-item-selected {
                    background-color: #22b378 !important;
                }
                .ant-menu-item-selected {
                    color: white !important;
                }
                .ant-menu-submenu > .ant-menu-sub {
                    background-color: #181c2e !important;
                }
            `}</style>
        </Sider>
    );
};

export default Sidebar;
