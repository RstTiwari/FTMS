import React, { useState, useEffect } from "react";
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Button,
  Avatar,
  Dropdown,
  Menu,
  Image,
} from "antd";
import { useAuth } from "state/AuthProvider";
import SettingSidebar from "pages/Setting/SettingSidebar";
import SettingList from "../pages/Setting/SettingList";
import { useCookies } from "react-cookie";

const { Header } = Layout;

const NavBar = ({ width }) => {
  const { removeLocalData } = useAuth();
  const [openSettingSideBar, setOpenSettingSidebar] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["profile", "token"]);
  const isLaptop = window.innerWidth >= 900;

  // Handle logout by removing profile and token from cookies
  const handleLogout = () => {
    removeLocalData("token");
    removeLocalData("profile");
    removeCookie("profile");
  };

  // Menu for user dropdown (profile and logout)
  const menu = (
    <Menu style={{ width: 150 }}>
      <Menu.Item key="user" icon={<UserOutlined />}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text>
            {cookies.profile?.user?.name?.toUpperCase()}
          </Typography.Text>
        </div>
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{ marginTop: "1rem", color: "red" }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  // Effect hook to detect changes in cookies.profile
  useEffect(() => {
    if (cookies.profile) {
      console.log("Updated Profile from Cookies: ", cookies.profile);
    }
  }, [cookies.profile]); // Re-run when profile in cookies changes

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
      <div
        className="center"
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {isLaptop && (
          <>
            {
              // Use cookies.profile logo if it's available
              <Image
                src={cookies.profile?.user?.logo} // Default fallback image if no logo in cookies
                alt="Company Logo"
                size="small"
                preview={false}
                style={{
                  marginRight: 8,
                  width: 35,
                  height: 35,
                  borderRadius: "10px",
                }}
              />
            }
            <Typography.Text
              style={{
                textTransform: "uppercase",
                color: "#000",
                fontWeight: 500,
                marginLeft: "0.5rem",
              }}
            >
              {cookies.profile?.user?.companyName}
              {/* Fallback to default name if cookies are empty */}
            </Typography.Text>
          </>
        )}
      </div>

      <div className="right" style={{ display: "flex", alignItems: "center" }}>
        <Button
          icon={<SettingOutlined />}
          onClick={() => setOpenSettingSidebar(!openSettingSideBar)}
          style={{
            color: "#333",
            border: "none",
            background: "transparent",
            marginRight: "1rem",
          }}
        />

        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Dropdown>
      </div>

      <SettingSidebar
        open={openSettingSideBar}
        setOpen={setOpenSettingSidebar}
        children={
          <SettingList
            closeSideBar={openSettingSideBar}
            setCloseSideBar={setOpenSettingSidebar}
          />
        }
      />
    </Header>
  );
};

export default NavBar;
