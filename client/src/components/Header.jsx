import React from "react";
import { Col, Row, Button, Divider } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import CoustomButton from "./SmallComponent/CoustomButton";

const HeaderComponent = ({ onlyTitle = false, details }) => {
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
                        marginTop: "5px 0px 5px 0px",
                    }}
                >
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        style={{
                            color: "black",
                            fontSize: details ? "0.8rem" : "1.5rem",
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
                        style={{
                            textAlign: "right",
                            fontSize: details ? "0.55rem" : "1rem",
                        }}
                    >
                        <CoustomButton
                            onClick={handelAddNewClick}
                            text={"New"}
                            withIcon={true}
                            details={details}
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
                            marginRight: 5,
                        }}
                    >
                        NEW {entity.slice(0, entity.length - 1)?.toUpperCase()}
                    </Col>
                </Row>
            )}
        </>
    );
};

export default HeaderComponent;
