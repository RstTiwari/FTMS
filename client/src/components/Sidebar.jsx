import React, { useState } from "react";
import {
    Box,
    Diveder,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    useTheme,
    Typography,
    Drawer,
    iconClasses,
    ListItemText,
} from "@mui/material";

import {
    SetMealOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    AdminPanelSettingsOutlined,
    Leaderboard,
    RequestQuote,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const Sidebar = ({
    user ,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isLaptop,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const navItems = [
        {
            text: "Dashboard",
            icon: <HomeOutlined />,
        },
        {
            text: "Sales & Marketing",
            icon: null,
        },
        {
            text: "Overview",
            icon: <Leaderboard />,
        },
        {
            text: "Lead",
            icon: < PointOfSaleOutlined />,
        },
        {
            text: "Quotation",
            icon: <RequestQuote />,
        },
        {
            text: "Customers",
            icon: <Groups2Outlined />,
        },
        {
            text: "Client Facing",
            icon: null,
        },
        {
            text: "Products",
            icon: <ShoppingCartOutlined />,
        },
        {
            text: "Transactions",
            icon: <ReceiptLongOutlined />,
        },
        {
            text: "Geography",
            icon: <PublicOutlined />,
        },
 
        {
            text: "Management",
            icon: null,
        },
        {
            text: "Admin",
            icon: <AdminPanelSettingsOutlined />,
        },
        {
            text: "Performance",
            icon: <TrendingUpOutlined />,
        },
    ];

    return (
        <Box >
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="permanent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isLaptop ? 0 : "0.5px",
                        },
                    }}
                >
                    <Box >
                        <Box m={'1rem 2rem 0 5rem'}>
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box
                                    display={"block"}
                                    alignItems={"right"}
                                    gap={"0.5"}
                                >
                                    <Typography
                                        variant="h4"
                                        fontWeight={"bold"}
                                    >
                                        FTMS
                                    </Typography>
                                </Box>
                                {!isLaptop && (
                                    <IconButton
                                        onClick={() =>
                                            setIsSidebarOpen(!isSidebarOpen)
                                        }
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{ m: "1rem  1rem 2rem" }}
                                        >
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette
                                                              .secondary[300]
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette
                                                              .primary[600]
                                                        : theme.palette
                                                              .secondary[500],
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    ml: "3rem ",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette
                                                                  .primary[600]
                                                            : theme.palette
                                                                  .secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemButton>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined
                                                    sx={{ ml: "auto" }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
