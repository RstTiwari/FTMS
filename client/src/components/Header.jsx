import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import {Row,Col,Button, Divider} from "antd"


const Header = ({ title, subTitle , addRoute ,cancelRoute}) => { 
    const onCloseClick = ()=>{
        window.history.back()
    }
    const naviogate = useNavigate()
    const onAddClick = ()=>{
        naviogate(`/${addRoute}`)
    }
    const onCancelClick =()=>{
        naviogate(`/${cancelRoute}`)
    }
     const titleSpane =  subTitle ? 15 : addRoute ? 15 :21;
     const isLaptop = useMediaQuery("(min-width:1000px)")
     const fontSize = isLaptop ? "1.3rem":"0.7rem"
     
    return (
        <Row align={"middle"} gutter={20}>
            <Col
                xs={6}
                sm={12}
                md={12}
                lg={titleSpane}
                style={{ color: "black", fontSize: fontSize }}
            >
                {title}
            </Col>
            {subTitle ? (
                <>
                     <Col xs={6} sm={12} md={6} lg={3}>
                        <Button
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            Refresh
                        </Button>
                    </Col>
                    <Col xs={6} sm={12} md={6} lg={3}>
                        <Button onClick={onAddClick} type="primary" style={{fontSize:"0.7rem"}}>
                            {subTitle}
                        </Button>
                    </Col>
               
                </>
            ) : (
                ""
            )}
                <Col xs={6} sm={12} md={6} lg={3}   push ={2}>
                        <CloseIcon
                            onClick={onCloseClick}
                            style={{
                                cursor: "pointer",
                                fontSize: fontSize,
                                color: "red",
                            }}
                        />
                
            </Col>
            <Divider/>
        </Row>
    );
};

export default Header
