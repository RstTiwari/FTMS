import React , {useState}from 'react'
import { Box,useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import   Navbar from "components/Navbar"
import Sidebar from "components/Sidebar"
import { useGetUserQuery } from 'state/api'
const Layout = () => {
  const isLaptop = useMediaQuery("(min-width:600px)")
  const [isSidebarOpen,setIsSidebarOpen]  = useState(true);
  const userId = useSelector((state)=>state.global.userId)
  const {data} = useGetUserQuery(userId)

   return (
       <Box   display={isLaptop ? "flex":"block"} width="100%" height="100%" >
           <Sidebar
               isLaptop={isLaptop}
               drawerWidth="250px"
               isSidebarOpen={isSidebarOpen}
               setIsSidebarOpen={setIsSidebarOpen}
           /> 
           <Box flexGrow={1} >
               <Navbar
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