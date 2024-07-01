import React from "react";
import { Col, Row, Button, Divider } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import CoustomButton from "./SmallComponent/CoustomButton";

const HeaderComponent = ({ onlyTitle = false }) => {
    const { tenantId, entity } = useParams();
    const navigate = useNavigate();
    const handelAddNewClick = () => {
        navigate(`/app/${tenantId}/${entity}/create`);
    };
    return (
        <>
            {!onlyTitle ? (
                <Row
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop:"5px 0px 5px 0px"
                    }}
                >
                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        style={{
                            color: "black",
                            fontSize: "1.5rem",
                            color: "#22b378",
                        }}
                    >
                        LIST OF ALL {entity?.toUpperCase()}
                    </Col>
                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        style={{marginRight:"-10ox",textAlign:"right" }}
                    >
                        <CoustomButton
                            onClick={handelAddNewClick}
                            text={"New"}
                            withIcon={true}
                        />
                    </Col>
                </Row>
            ) : (
                <Row
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        style={{
                            fontSize: "1.5rem",
                            color: "#22b378",
                        }}
                    >
                        NEW {entity.slice(0,entity.length -1)?.toUpperCase()}
                    </Col>
                </Row>
            )}
        </>
    );
};

export default HeaderComponent;
