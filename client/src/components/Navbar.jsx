import React from 'react'
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import { AppBar, IconButton, Input, InputBase, Toolbar, useTheme } from '@mui/material';
// import profileImage from  "assets/"


const NavBar = ({isSidebarOpen,setIsSidebarOpen,isLaptop}) => {
    const dispatch = useDispatch()
    const theme = useTheme()
  return (
      <AppBar
          sx={{
              position: "static",
              background: "none",
              boxShadow: "none",
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
                  <FlexBetween
                      backgroundColor={theme.palette.background.alt}
                      borderRadius={"9px"}
                      gap={"3px"}
                      p={"0.1rem 1.5rem"}
                  >
                      <InputBase placeholder="Search ...">
                          <IconButton>
                              <Search />
                          </IconButton>
                      </InputBase>
                  </FlexBetween>
              </FlexBetween>
              {/**Right Side of Navbar */}
              <FlexBetween gap={"1.5rem"}>
                  <IconButton onClick={() => dispatch(setMode())}>
                      {theme.palette.mode === "dark" ? (
                          <DarkModeOutlined sx={{ fontSize: "25px" }} />
                      ) : (
                          <LightModeOutlined sx={{ fontSize: "25px" }} />
                      )}
                  </IconButton>
                  <IconButton>
                      <SettingsOutlined sx={{ fontSize: "25px" }} />
                  </IconButton>
              </FlexBetween>
          </Toolbar>
      </AppBar>
  );
}

export default NavBar