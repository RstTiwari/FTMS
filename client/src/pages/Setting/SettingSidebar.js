import { CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import React, { useState } from "react";

const SettingSidebar = ({ open, setOpen, childern }) => {
    return (
        <Drawer
            title={"SETTINGS"}
            open={open}
            onClose={() => setOpen(!open)}
            maskClosable={false}
            closeIcon={<CloseOutlined style={{right:0,color:"red"}} />}
        >
            {childern}
        </Drawer>
    );
};

export default SettingSidebar;
