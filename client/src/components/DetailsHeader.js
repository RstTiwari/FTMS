import React from "react";
import { useNavigate } from "react-router-dom";
import {
    EditOutlined,
    MailOutlined,
    ShareAltOutlined,
    DownloadOutlined,
    DeleteOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { Row, Col } from "antd";

const DetailsHeader = () => {
    const navigate = useNavigate();
    return (
        <>
            <Row
                style={{
                    backgroundColor: "#dbdcdd",
                    padding: 10,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Col
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        borderRight: "1px solid #ccc",
                    }}
                >
                    <EditOutlined style={{ marginRight: 5 }} />
                    Edit
                </Col>
                <Col
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        borderRight: "1px solid #ccc",
                    }}
                >
                    <MailOutlined style={{ marginRight: 5 }} />
                    Mails
                </Col>
                <Col
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        borderRight: "1px solid #ccc",
                    }}
                >
                    <ShareAltOutlined style={{ marginRight: 5 }} />
                    Share
                </Col>
                <Col
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        borderRight: "1px solid #ccc",
                    }}
                >
                    <DownloadOutlined style={{ marginRight: 5 }} />
                    Download
                </Col>
                <Col
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        borderRight: "1px solid #ccc",
                    }}
                >
                    <DeleteOutlined style={{ marginRight: 5 }} />
                    Delete
                </Col>
                <Col
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <CloseOutlined
                        onClick={() => navigate(-1)}
                        style={{
                            color: "red",
                            cursor: "pointer",
                            fontSize: 16,
                            padding: "5px 10px",
                            border: "1px solid red",
                            borderRadius: 4,
                            backgroundColor: "#fff",
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default DetailsHeader;
