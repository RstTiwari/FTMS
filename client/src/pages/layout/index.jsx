import React, { useState ,useEffect} from 'react';
import { Layout } from 'antd';
import { useMediaQuery } from '@mui/material';
import { useCookies } from 'react-cookie';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const { Header, Content } = Layout;

const CustomLayout = () => {
    const isLaptop = useMediaQuery('(min-width: 600px)');
    const [isSideBarClosed, setIsSidebarClosed] = useState(false); // State to manage sidebar open/close
    const [cookies] = useCookies([]);
    const data = cookies['authData'] || {};
    const contentWidth = window.innerWidth- (isSideBarClosed ? 80 : 200)
    const contentMarginLeft = isSideBarClosed ? 80 :200
 

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sidebar
                user={data}
                drawerWidth="200px"
                isSideBarClosed={isSideBarClosed} // Pass current state to Sidebar
                setIsSidebarClosed={setIsSidebarClosed} // Pass setter function to Sidebar
                isLaptop={isLaptop}
            />

            {/* Main content area */}

            <div
                style={{
                    marginLeft: `${contentMarginLeft}px`,
                    width: `${contentWidth}px`,

                }}
            >
                <Navbar user={data}  width = {contentWidth} margin = {contentMarginLeft}  />
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 360, width:contentWidth }}
                    >
                        {/* Content Area */}
                        {/* Replace with your content components */}
                    </div>
                </Content>
            </div>
        </Layout>
    );
};

export default CustomLayout;
