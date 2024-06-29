import React from "react";
import { Col, Row, Button } from "antd";
import { Refresh } from "@mui/icons-material"; // Assuming you have an icon library for Refresh
import { PlusOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import CoustomButton from "./SmallComponent/CoustomButton";

const HeaderComponent = ({}) => {
    const { tenantId, entity } = useParams();
    const navigate = useNavigate();
    const handelAddNewClick = () => {
        navigate(`/app/${tenantId}/${entity}/create`);
    };
    return (
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
                style={{ color: "black", fontSize: "1rem", color: "#22b378" }}
            >
                LIST OF ALL {entity?.toUpperCase()}
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} style={{ textAlign: "right" }}>
                <CoustomButton
                    onClick={handelAddNewClick}
                    text={"New"}
                    withIcon={true}
                />
            </Col>
        </Row>
    );
};

export default HeaderComponent;
