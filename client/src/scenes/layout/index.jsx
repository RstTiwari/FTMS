import React , {useState}from 'react'
import { Box,useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import   Navbar from "components/Navbar"
import Sidebar from "components/Sidebar"
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const [isSidebarOpen,setIsSidbarOpen]  = useState(true);

   return (
    <Box 
    display={isNonMobile ? "flext": "block"}
    width={"100%"}
    height={"100%"}
    >
      <Sidebar
      isNonMobile = {isNonMobile}
      drawerWidth = "250px"
      isSidebarOpen = {isSidebarOpen}
      setIsSidbarOpen = {setIsSidbarOpen } 
      />
    <Box>
        <Navbar
             isSidebarOpen = {isSidebarOpen}
             setIsSidbarOpen = {setIsSidbarOpen } 
        />
        <Outlet />
    </Box>

    </Box>
  )
}

export default Layout