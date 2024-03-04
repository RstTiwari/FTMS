import React from "react";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";

const SaveBottmComponent = ({ action1,action2 ,action3 }) => {
    const navigate = useNavigate()
    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                height: "4rem",
                left: 0,
                width: "100%",
                backgroundColor: "#f0f0f0",
            }}
        >
            <Row justify={"center"}>
                {action1 ? (
                    <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                        <Button htmlType={"submit"} type="primary" onClick={()=>{action1()}}>SAVE AS DRAFT</Button>
                    </Col>
                ) : (
                    ""
                )}
                {action2 ? (
                    <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                        <Button onClick={()=>{action2()}}>SAVE AND DOWNLOAD</Button>
                    </Col>
                ) : (
                    ""
                )}
                {action3 ? (
                    <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                        <Button  danger  onClick={()=>{navigate(`/${action3}`)}}>
                        CANCEL
                        </Button>
                    </Col>
                ) : (
                    ""
                )}
            </Row>
        </div>
    );
};

export default SaveBottmComponent;
