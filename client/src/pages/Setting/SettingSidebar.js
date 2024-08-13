import { CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import React, { useState } from "react";

const SettingSidebar = ({ open, setOpen, children }) => {
    return (
        <Drawer
            title={"SETTINGS"}
            open={open}
            onClose={() => setOpen(!open)}
            maskClosable={false}
            closeIcon={<CloseOutlined style={{right:0,color:"red",}} />}
           
        >
            {children}
        </Drawer>
    );
};

export default SettingSidebar;
