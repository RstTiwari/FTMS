import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
    LoginOutlined,
    SupervisedUserCircle,
} from "@mui/icons-material";
import { UserOutlined } from "@ant-design/icons";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import {
    AppBar,
    Button,
    IconButton,
    Input,
    InputBase,
    Toolbar,
    Typography,
    useTheme,
    Menu,
    Box,
    MenuItem,
    Avatar,
} from "@mui/material";
import { useAuth } from "state/AuthProvider";
import SettingSidebar from "pages/Setting/SettingSidebar";
import SettingList from "../pages/Setting/SettingList";
import PageLoader from "pages/PageLoader";

const NavBar = ({ user, isSidebarOpen, setIsSidebarOpen, isLaptop }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsopen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn, loginUser, logoutUser } = useAuth();
    const [openSettingSideBar, setOpenSettingSidebar] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsopen(!isOpen);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOutClick = () => {
        logoutUser();
    };
    return (
        <>
            <AppBar
                sx={{
                    position: "static",
                    background: "none",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between " }}>
                    {/**Left Side Off Navbar */}
                    <FlexBetween>
                        {!isLaptop ? (
                            <IconButton
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            ""
                        )}
                    </FlexBetween>
                    {isLaptop ? (
                        <FlexBetween>
                            {user && user.companyLog ? (
                                <Box
                                    component="img"
                                    alt="companyProfile"
                                    src={user.companyLogo || ""}
                                    height="20px"
                                    weidth="20px"
                                    borderRadius="25%"
                                    sx={{
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                ""
                            )}
                            <Typography>
                                {user.companyName
                                    ? user.companyName.toUpperCase()
                                    : ""}
                            </Typography>
                        </FlexBetween>
                    ) : (
                        ""
                    )}

                    {/**Right Side of Navbar */}
                    <FlexBetween gap={"2rem"}>
                        <IconButton>
                            <SettingsOutlined
                                sx={{ fontSize: "25px" }}
                                onClick={() =>
                                    setOpenSettingSidebar(!openSettingSideBar)
                                }
                            />
                        </IconButton>
                        <FlexBetween>
                            <Button
                                onClick={handleClick}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    textTransform: "none",
                                }}
                            >
                                {user && user.photo ? (
                                    <Box
                                        component="img"
                                        alt="profile"
                                        src={user.photo}
                                        height="20px"
                                        weidth="20px"
                                        borderRadius="25%"
                                        sx={{
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    ""
                                )}

                                <Box sx={{ textAlign: "left" }}>
                                    <Typography
                                        fontWeight={"bold"}
                                        fontSize={"0.9rem"}
                                        sx={{
                                            color: theme.palette.secondary[100],
                                        }}
                                    >
                                        {user.name
                                            ? user.name.toUpperCase()
                                            : ""}
                                    </Typography>
                                    <Typography
                                        fontSize={"0.75rem"}
                                        sx={{
                                            color: theme.palette.secondary[200],
                                        }}
                                    >
                                        {user.occupation}
                                    </Typography>
                                </Box>
                                <ArrowDropDownOutlined
                                    sx={{ color: theme.palette.secondary[300] }}
                                />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={isOpen}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => handleLogOutClick()}
                                        sx={{
                                            width: "200px",
                                            paddingRight: "20px",
                                        }}
                                    >
                                        <FlexBetween>
                                            <IconButton>
                                                <LoginOutlined />
                                            </IconButton>
                                            <Typography>LogOut</Typography>
                                        </FlexBetween>
                                    </MenuItem>
                                </Menu>
                            </Button>
                        </FlexBetween>
                    </FlexBetween>
                </Toolbar>
            </AppBar>
            <SettingSidebar
                open={openSettingSideBar}
                setOpen={setOpenSettingSidebar}
                childern={
                    <SettingList
                        closeSideBar={openSettingSideBar}
                        setCloseSideBar={setOpenSettingSidebar}
                    />
                }
            />
            <PageLoader
                isLoading={isLoading}
                text={"PLEASE WAIT LOGGIN YOU OUT FORM SYSTEM"}
            />
        </>
    );
};

export default NavBar;
