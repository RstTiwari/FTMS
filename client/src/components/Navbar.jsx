import React, { useState } from "react";
import {
    MenuOutlined,
    SettingOutlined,
    DownOutlined,
    LogoutOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography, Button, Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import SettingSidebar from "pages/Setting/SettingSidebar";
import SettingList from "../pages/Setting/SettingList";
import PageLoader from "pages/PageLoader";

const { Header } = Layout;

const NavBar = ({ user, width, margin,isLaptop }) => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();
    const [openSettingSideBar, setOpenSettingSidebar] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = () => {
        setIsLoggingOut(true);
        // Perform logout operation
        logoutUser().then(() => {
            setIsLoggingOut(false);
        });
    };

    return (
        <Header
            className="navbar"
            style={{
                position: "fixed",
                zIndex: 1000,
                width: width,
                backgroundColor: "#f7f7fe",
                borderBottom: "1px solid rgba(131, 129, 149, 0.6)",
                padding: "0 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div className="left">
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
                        <Typography.Text style={{ textTransform: "uppercase", marginLeft: "0.5rem" }}>
                            {user.companyName}
                        </Typography.Text>
                    </>
                )}
            </div>
            
            <div className="right" style={{ display: "flex", alignItems: "center" , }}>
                <Button
                    icon={<SettingOutlined />}
                    onClick={() => setOpenSettingSidebar(!openSettingSideBar)}
                    style={{ color: "#333", border: "none", background: "transparent", marginRight: "1rem" }}
                />
              
                <Dropdown >
                 <Avatar icon ={<UserOutlined />} />
                </Dropdown>
                {/* <Menu
                    className="user-menu"
                    mode="horizontal"
                    onClick={() => setOpenSettingSidebar(!openSettingSideBar)}
                    style={{ lineHeight: "48px", border: "none", background: "transparent", marginTop: "2rem" }}
                >
                    <Menu.Item key="user" icon={<Avatar src={user.photo} size="small" />}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <Typography.Text strong>{user.name}</Typography.Text>
                            <Typography.Text>{user.occupation}</Typography.Text>
                        </div>
                    </Menu.Item>
                </Menu>
                <Menu
                    className="logout-menu"
                    onClick={() => setOpenSettingSidebar(!openSettingSideBar)}
                    style={{ marginTop: "2rem" }}
                >
                    <Menu.Item onClick={handleLogout}>
                        <LogoutOutlined />
                        Logout
                    </Menu.Item>
                </Menu> */}
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
