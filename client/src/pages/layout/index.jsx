import React , {useState}from 'react'
import { Box,useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import   Navbar from "components/Navbar"
import Sidebar from "components/Sidebar"
import { useCookies } from "react-cookie";
const Layout = () => {
  const isLaptop = useMediaQuery("(min-width:600px)")
  const [isSidebarOpen,setIsSidebarOpen]  = useState(false);
  const [cookies,setCookies] = useCookies([])
  let data = cookies["authData"]  
   return (
       <Box   display={isLaptop ? "flex":"block"} width="100%" height="100%" >
           <Sidebar
               user = {data || {}}
               isLaptop={isLaptop}
               drawerWidth="275px"
               isSidebarOpen={ isLaptop ? !isSidebarOpen :isSidebarOpen}
               setIsSidebarOpen={setIsSidebarOpen}
           /> 
           <Box flexGrow={1} >
               <Navbar
                   user = {data || {}}
                   isSidebarOpen={isSidebarOpen}
                   setIsSidebarOpen={setIsSidebarOpen}
                   isLaptop ={isLaptop}
               />
               <Outlet />
           </Box>
       </Box>
   );
}

export default Layout