import React, { useState } from 'react'
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
    LoginOutlined,

} from "@mui/icons-material";
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
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
} from "@mui/material";
 import { theme } from '@mui/material';
// import profileImage from  "assets/"
const profileImage = "https://res.cloudinary.com/drkxpdxr5/image/upload/v1702446552/samples/smile.jpg"

const NavBar = ({user,isSidebarOpen,setIsSidebarOpen,isLaptop}) => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const [anchorEl,setAnchorEl] = useState(null);
    const [isOpen,setIsopen] = useState(false)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsopen(!isOpen)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      <MenuIcon />
                  </IconButton>

                  {isLaptop ? (
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
                  ) : (
                      ""
                  )}
              </FlexBetween>
              {isLaptop ? (
                  <FlexBetween>
                      <Box
                          component="img"
                          alt="companyProfile"
                          src={
                              "https://res.cloudinary.com/drkxpdxr5/image/upload/v1702446560/cld-sample-3.jpg"
                          }
                          height="30px"
                          weidth="30px"
                          borderRadius="60px"
                          sx={{
                              objectFit: "cover",
                          }}
                      />
                      <Typography>HKB DEVELOPMENT PVT LTD</Typography>
                  </FlexBetween>
              ) : (
                  ""
              )}

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
                  <FlexBetween>
                      <Button
                          onClick={handleClick}
                          sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              textTransform: "none",
                              gap: "1rem",
                          }}
                      >
                          <Box
                              component="img"
                              alt="profile"
                              src={profileImage}
                              height="30px"
                              weidth="30px"
                              borderRadius="60px"
                              sx={{
                                  objectFit: "cover",
                              }}
                          />
                          <Box sx={{ textAlign: "left" }}>
                              <Typography
                                  fontWeight={"bold"}
                                  fontSize={"0.9rem"}
                                  sx={{ color: theme.palette.secondary[100] }}
                              >
                                  {user.name}
                              </Typography>
                              <Typography
                                  fontSize={"0.75rem"}
                                  sx={{ color: theme.palette.secondary[200] }}
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
                                  onClick={console.log(
                                      "fu"
                                  )}
                              >
                                  <FlexBetween>
                                      <IconButton>
                                          <LoginOutlined />
                                      </IconButton>
                                      <Typography >LogOut</Typography>
                                  </FlexBetween>
                              </MenuItem>
                          </Menu>
                      </Button>
                  </FlexBetween>
              </FlexBetween>
          </Toolbar>
      </AppBar>
  );
}

export default NavBar