import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
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
    Avatar
} from "@mui/material";
 import { theme } from '@mui/material';
import { useAuth } from 'state/AuthProvider';
// import profileImage from  "assets/"
const icon = "https://res.cloudinary.com/drkxpdxr5/image/upload/v1702446552/samples/smile.jpg"

const NavBar = ({user,isSidebarOpen,setIsSidebarOpen,isLaptop}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()
    const [profileImage,setProfileImage] = useState("")
    const [anchorEl,setAnchorEl] = useState(null);
    const [isOpen,setIsopen] = useState(false)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsopen(!isOpen)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
         setProfileImage(icon)
      return () => {
        
      }
    }, [profileImage])
    const {isLoggedIn,loginUser,logoutUser} = useAuth();
    const logOut = ()=>{
        navigate("/login")
    }
  return (
      <AppBar
          sx={{
              position: "static",
              background:"none"
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
                      <Box
                          component="img"
                          alt="companyProfile"
                          src={
                              "https://res.cloudinary.com/drkxpdxr5/image/upload/v1702446560/cld-sample-3.jpg"
                          }
                          height="20px"
                          weidth="20px"
                          borderRadius="25%"
                          sx={{
                              objectFit: "cover",
                          }}
                      />
                      <Typography>Myfac8ry.com</Typography>
                  </FlexBetween>
              ) : (
                  ""
              )}

              {/**Right Side of Navbar */}
              <FlexBetween gap={"2rem"}>
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
                          }}
                      >
                          {profileImage ? (
                              <Box
                                  component="img"
                                  alt="profile"
                                  src={profileImage}
                                  height="20px"
                                  weidth="20px"
                                  borderRadius="25%"
                                  sx={{
                                      objectFit: "cover",
                                  }}
                              />
                          ) : (
                              <Avatar sx={{ backgroundColor: "#fff" }} />
                          )}

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
                                  onClick={() => logoutUser()}
                                  sx={{width:"200px", paddingRight:"20px"}}
                               
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
  );
}

export default NavBar