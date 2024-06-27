import React, { useState } from "react";
import {
    SettingOutlined,
    UserOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import { Layout, Typography, Button, Avatar, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import SettingSidebar from "pages/Setting/SettingSidebar";
import SettingList from "../pages/Setting/SettingList";
import PageLoader from "pages/PageLoader";

const { Header } = Layout;

const NavBar = ({ user, width }) => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();
    const [openSettingSideBar, setOpenSettingSidebar] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const isLaptop = window.innerWidth >= 900;

    const handleLogout = () => {
        setIsLoggingOut(true);
        // Perform logout operation
        logoutUser().then(() => {
            setIsLoggingOut(false);
            navigate("/login");
        });
    };
    console.log(user)
    const menu = (
        <Menu style={{ width: 150 }}>
            <Menu.Item key="user" icon={<UserOutlined />}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography.Text>{user.name.toUpperCase()}</Typography.Text>
                </div>
            </Menu.Item>
            <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ marginTop: "1rem",color:'red' }}
            >
                Logout
            </Menu.Item>
           
        </Menu>
    );

    return (
        <Header
            className="navbar"
            style={{
                position: "fixed",
                zIndex: 1000,
                height: "48px",
                width: width,
                backgroundColor: "#ededf7",
                borderBottom: "1px solid #f0f0f0",
                padding: "0 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div className="center" style={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "center" }}>
                {isLaptop && (
                    <>
                        {user && user.companyLogo && (
                            <Avatar
                                src={user.companyLogo}
                                alt="Company Logo"
                                size="small"
                                style={{ marginRight: 8 }}
                            />
                        )}
                        <Typography.Text style={{ textTransform: "uppercase", color: "black", marginLeft: "0.5rem" }}>
                            {user.companyName}
                        </Typography.Text>
                    </>
                )}
            </div>
            
            <div className="right" style={{ display: "flex", alignItems: "center" }}>
                <Button
                    icon={<SettingOutlined />}
                    onClick={() => setOpenSettingSidebar(!openSettingSideBar)}
                    style={{ color: "#333", border: "none", background: "transparent", marginRight: "1rem" }}
                />
              
                <Dropdown overlay={menu} trigger={['click']}>
                    <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
                </Dropdown>
            </div>

            <SettingSidebar
                open={openSettingSideBar}
                setOpen={setOpenSettingSidebar}
                children={<SettingList closeSideBar={openSettingSideBar} />}
            />
            <PageLoader isLoading={isLoggingOut} text="Logging out..." />
        </Header>
    );
};

export default NavBar;
