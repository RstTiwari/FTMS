import React from "react";
import { useNavigate } from "react-router-dom";
import {
    EditOutlined,
    MailOutlined,
    ShareAltOutlined,
    DownloadOutlined,
    DeleteOutlined,
    CloseOutlined,
    DownCircleOutlined
} from "@ant-design/icons";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";

const DetailsHeader = () => {
    const {entity,tenantId,pageNo,pageSize} = useParams()
    const navigate = useNavigate();
    return (
        <>
            <Row>
                <Col
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <CloseOutlined
                        onClick={() => navigate(`/app/${tenantId}/${entity}/${pageNo}/${pageSize}`)}
                        style={{
                            color: "red",
                            cursor: "pointer",
                            fontSize: 16,
                            padding: "5px 10px",
                            borderRadius: 4,
                            backgroundColor: "#fff",
                        }}
                    />
                </Col>
            </Row>
            <Row
                style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                <Col
                    span={2}
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <EditOutlined style={{ marginRight: 5 }} />
                    Edit
                </Col>
                {entity !== "customers" ? (
                    <>
                        <Col
                            span={2}
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <MailOutlined style={{ marginRight: 5 }} />
                            Mail
                        </Col>
                        <Col
                            span={2}
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <ShareAltOutlined style={{ marginRight: 5 }} />
                            Share
                        </Col>
                        <Col
                    span={3}
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <DownloadOutlined style={{ marginRight: 5 }} />
                    Download
                </Col>
                    </>
                ) : (
                    <Col
                    span={4}
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <DownCircleOutlined style={{ marginRight: 5 }} />
                    Record Payment
                </Col>
                )}

           
               
                <Col
                    span={2}
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <DeleteOutlined style={{ marginRight: 5 }} />
                    Delete
                </Col>
            </Row>
        </>
    );
};

export default DetailsHeader;
