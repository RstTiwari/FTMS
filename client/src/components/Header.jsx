import React from "react";
import { Col, Row, Button } from "antd";
import { Refresh } from "@mui/icons-material"; // Assuming you have an icon library for Refresh
import { PlusOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

const HeaderComponent = ({
    title,
    subTitle,
    onAddClick,
    refreshThePageOnly,
    localDataKey,
}) => {
    const { tenantId, entity } = useParams();
    const navigate = useNavigate();
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
                <Button
                    icon={<PlusOutlined />}
                    onClick={() =>
                        navigate(`/app/${tenantId}/${entity}/create`)
                    }
                    style={{
                        fontSize: "1rem",
                        backgroundColor: "#22b378",
                        color: "#fff",
                        borderRadius: "5px",
                        alignItems: "center",
                    }}
                >
                    New
                </Button>
            </Col>
        </Row>
    );
};

export default HeaderComponent;
