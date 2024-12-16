import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useMediaQuery } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const CustomLayout = ({ profile }) => {
    const isLaptop = useMediaQuery("(min-width: 600px)");
    const [isSideBarClosed, setIsSidebarClosed] = useState(false); // State to manage sidebar open/close
    const contentWidth = window.innerWidth - (isSideBarClosed ? 80 : 200);
    const contentMarginLeft = isSideBarClosed ? 80 : 200;

    useEffect(() => {
    }, [profile]);

    return (
        <Layout style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
            {/* Sidebar */}
            <Sidebar
                drawerWidth="200px"
                isSideBarClosed={isSideBarClosed} // Pass current state to Sidebar
                setIsSidebarClosed={setIsSidebarClosed} // Pass setter function to Sidebar
                isLaptop={isLaptop}
                sidebar={profile?.tenant?.sidebar}
                tenantId={profile?.tenant?.tenantId}
            />

            {/* Main content area */}
            <div
                style={{
                    marginLeft: `${contentMarginLeft}px`,
                    width: `${contentWidth}px`,
                }}
            >
                <Navbar
                    width={contentWidth}
                    margin={contentMarginLeft}
                />
                <Content
                    style={{
                        marginTop: "50px",
                        overflow: "initial",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            minHeight: 360,
                            width: contentWidth,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </div>
        </Layout>
    );
};

export default CustomLayout;
