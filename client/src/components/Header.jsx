import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowBackOutlined , AddOutlined } from "@mui/icons-material";
import {Row,Col,Typography,Button} from "antd"


const Header = ({ title, subTitle }) => { 
    const onBackClick = ()=>{
        window.history.back()
    }
    return (
        <Row align={"middle"} gutter={20}>
            <Col xs={4}  sm={12} md ={12} lg={9} style={{color:"#000000"}}>
            <ArrowBackOutlined onClick = {onBackClick} />
            </Col>
           <Col xs={10}  sm={12} md ={12} lg={9} style={{color:"#000000", fontSize:"1rem"}} >
            {title}
           </Col>
           <Col xs={12} sm={12} md={6} lg={3}>
           <Button >
            Refresh
           </Button>
           </Col>
         
           <Col xs={12} sm={12} md={6} lg={3}>
           <Button type="primary">
            {subTitle}
           </Button>
           </Col>
        </Row>
    );
};

export default Header
