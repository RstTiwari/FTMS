import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    EditOutlined,
    MailOutlined,
    ShareAltOutlined,
    DownloadOutlined,
    DeleteOutlined,
    CloseOutlined,
    DownCircleOutlined,
    ArrowDownOutlined,
    FolderOpenOutlined,
} from "@ant-design/icons";
import { Row, Col, Dropdown, Menu } from "antd";
import { useAuth } from "state/AuthProvider";
import WhatsAppMessageSender from "Helper/Whatsappmessagesender";

const DetailsHeader = ({ values }) => {
    const { entity, tenantId, pageNo, pageSize, id } = useParams();
    const [isWhatsAppModalVisible, setWhatsAppModalVisible] = useState(false);
    const navigate = useNavigate();
    const { pdfGenerate } = useAuth();

    const handleEditClick = () => {
        navigate(`/app/${tenantId}/update/${entity}/${id}`);
    };

    const handleRecordPaymentClick = () => {
        const paymentEntity =
            entity === "customers" ? "paymentsreceived" : "paymentsmade";
        navigate(`/app/${tenantId}/${paymentEntity}/${id}/recordPayment`);
    };

    const handleEmailSend = () => {
        navigate(`/app/${tenantId}/${entity}/${id}/sendmail`);
    };
    const handleWhatsUpSend = () => {
        setWhatsAppModalVisible(true);
    };

    const handlePdfDownload = async () => {
        await pdfGenerate(
            entity,
            values?._id,
            values?.no,
            "download",
            tenantId
        );
    };

    const handleMenuClick = (action) => {
        switch (action) {
            case "delete":
                // Implement delete action
                break;
            case "share":
                // Implement share action
                break;
            case "mail":
                handleEmailSend();
                break;
            case "ledger":
                // Implement ledger action for customers or vendors
                break;
            default:
                break;
        }
    };

    const menu = (
        <Menu>
            {entity !== "customers" && entity !== "vendors" ? (
                <>
                    <Menu.Item key="share" onClick={handlePdfDownload}>
                        <DownloadOutlined style={{ marginRight: 3 }} />
                        Download PDF
                    </Menu.Item>
                    <Menu.Item
                        key="delete"
                        onClick={() => handleMenuClick("delete")}
                    >
                        <DeleteOutlined /> Delete
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item
                        key="delete"
                        onClick={() => handleMenuClick("delete")}
                    >
                        <DeleteOutlined /> Delete
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

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
                }}
            >
                <Col
                    span={2}
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={handleEditClick}
                >
                    <EditOutlined style={{ marginRight: 3 }} />
                    Edit
                </Col>
                {entity !== "customers" &&
                entity !== "vendors" &&
                entity !== "products" &&
                entity !== "paymentsmade" &&
                entity !== "paymentsreceived" ? (
                    <>
                        <Col span={2} onClick={() => handleWhatsUpSend()}>
                            <ShareAltOutlined style={{ marginRight: 1 }} />
                            Share
                        </Col>
                        <Col
                            span={2}
                            onClick={handleEmailSend}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <MailOutlined style={{ marginRight: 1 }} />
                            Mail
                        </Col>
                    </>
                ) : entity === "customers" || entity === "vendors" ? (
                    <Col
                        span={4}
                        onClick={handleRecordPaymentClick}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <DownCircleOutlined style={{ marginRight: 1 }} />
                        Record Payment
                    </Col>
                ) : null}

                <Col span={2} style={{ display: "flex", alignItems: "center" }}>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <FolderOpenOutlined
                            style={{ marginRight: 5, cursor: "pointer" }}
                        />
                    </Dropdown>
                </Col>
            </Row>
            {isWhatsAppModalVisible && (
                <WhatsAppMessageSender
                    onClose={() => setWhatsAppModalVisible(false)} // Prop to close modal
                />
            )}
        </>
    );
};

export default DetailsHeader;
