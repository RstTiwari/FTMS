import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    EditOutlined,
    MailOutlined,
    ShareAltOutlined,
    DownloadOutlined,
    DeleteOutlined,
    CloseOutlined,
    DownCircleOutlined,
} from "@ant-design/icons";
import { Row, Col, Modal, Form } from "antd";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";

const DetailsHeader = ({ values }) => {
    const { entity, tenantId, pageNo, pageSize, id } = useParams();
    const navigate = useNavigate();
    const { pdfGenerate } = useAuth();

    const handleEditClick = () => {
        navigate(`/app/${tenantId}/update/${entity}/${id}`);
    };
    const handleRecordPaymentClick = () => {
        let paymentEntity =
            entity === "customers" ? "paymentsreceived" : "paymentsmade";
        navigate(`/app/${tenantId}/${paymentEntity}/${id}/recordPayment`);
    };

    const handleEmailSend = () => {
        navigate(`/app/${tenantId}/${entity}/${id}/sendmail`);
    };
    useEffect(() => {}, [id]);
    const handlePdfDownload = async () => {
        await pdfGenerate(entity, values?._id, values?.no, "download");
    };

    return (
        <>
            <Row>
                <Col
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                        zIndex: 100000,
                    }}
                >
                    <CloseOutlined
                        onClick={() =>
                            navigate(
                                `/app/${tenantId}/${entity}/${pageNo}/${pageSize}`
                            )
                        }
                        style={{
                            color: "red",
                            cursor: "pointer",
                            fontSize: 16,
                            padding: "5px 20px",
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
                    onClick={handleEditClick}
                >
                    <EditOutlined style={{ marginRight: 3 }} />
                    Edit
                </Col>
                {entity !== "customers" &&
                entity !== "vendors" &&
                entity !== "products" &&
                entity != "paymentsmade" &&
                entity != "paymnetsreceived" ? (
                    <>
                        <Col span={2} onClick={() => handleEmailSend()}>
                            <MailOutlined style={{ marginRight: 3 }} />
                            Mail
                        </Col>
                        <Col
                            span={3}
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                            }}
                            onClick={() => handlePdfDownload()}
                        >
                            <DownloadOutlined style={{ marginRight: 3 }} />
                            Download
                        </Col>
                    </>
                ) : entity === "customers" || entity === "vendors" ? (
                    <Col
                        span={4}
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={handleRecordPaymentClick}
                    >
                        <DownCircleOutlined style={{ marginRight: 3 }} />
                        Record Payment
                    </Col>
                ) : (
                    ""
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
