import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import {Row,Col,Button} from "antd"


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
     const titleSpane =  subTitle ? 15 : addRoute ? 15 :21
    return (
        <Row align={"middle"} gutter={20}>
            {/* <Col
                xs={4}
                sm={12}
                md={12}
                lg={9}
                style={{ color: "#000000", cursor: "pointer" }}
            >
                <ArrowBackOutlined onClick={onBackClick} />
            </Col> */}

            <Col
                xs={6}
                sm={12}
                md={12}
                lg={titleSpane}
                style={{ color: "#000000", fontSize: "1.5rem" }}
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
                            Reresh
                        </Button>
                    </Col>
                    <Col xs={6} sm={12} md={6} lg={3}>
                        <Button onClick={onAddClick} type="primary">
                            {subTitle}
                        </Button>
                    </Col>
               
                </>
            ) : (
                ""
            )}
                <Col xs={6} sm={12} md={6} lg={3}>
                        <CloseIcon
                            onClick={onCloseClick}
                            style={{
                                cursor: "pointer",
                                fontSize: "2rem",
                                color: "red",
                            }}
                        />
                
            </Col>
        </Row>
    );
};

export default Header
