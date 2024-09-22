import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Select, Space, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import useInitialFormValues from "Hook/useIntialFormValues";
import PageLoader from "pages/PageLoader";
import getCustomMessage from "./getCustomMessage";
const WhatsAppMessageSender = ({ onClose }) => {
    const { entity, tenantId, id } = useParams();
    const [mobileNumber, setMobileNumber] = useState("");
    const { appApiCall } = useAuth();
    const [recipient, setRecipient] = useState("");
    const { initialValues, isFetching, fetchInitialValues } =
        useInitialFormValues(entity, "get", id);

    useEffect(() => {
        fetchInitialValues();
    }, [fetchInitialValues, entity, id]);

    useEffect(() => {
        if (initialValues) {
            setMobileNumber(initialValues.customer?.phone || "");
            setRecipient(initialValues.customer?.name || "");
        }
    }, [initialValues]);

    const sendWhatsAppMessage = () => {
        let message = getCustomMessage(
            entity,
            initialValues,
            recipient,
            tenantId,
            id
        );

        const encodedMessage = encodeURIComponent(message);
        const url = `https://web.whatsapp.com/send?phone=${mobileNumber}&text=${encodedMessage}`;

        // Open the URL in a new tab
        window.open(url, "_blank");
        const markSend = async () => {
            await appApiCall(
                "patch",
                "patch",
                {
                    action: "set",
                    keyName: "status",
                    values: "SEND",
                    id: id,
                },
                { entity: entity }
            );
        };
        markSend();

        onClose(); // Close modal after sending
    };

    return (
        <>
            <Modal
                title="Send WhatsApp Message"
                open={true}
                onCancel={onClose}
                footer={null}
            >
                {isFetching ? (
                    <>
                        <PageLoader
                            isLoading={true}
                            text={"Hold on..."}
                            height="20px"
                        />
                    </>
                ) : (
                    <>
                        <Row>
                            <Input
                                placeholder="Select Recipent"
                                value={recipient}
                                onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                }
                            />
                        </Row>
                        <Space></Space>
                        <Row>
                            <Input
                                placeholder="Enter mobile number"
                                value={mobileNumber}
                                onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                }
                            />
                        </Row>

                        <Button
                            type="primary"
                            onClick={sendWhatsAppMessage}
                            style={{ marginTop: 16 }}
                        >
                            Send Message
                        </Button>
                    </>
                )}
            </Modal>
        </>
    );
};

export default WhatsAppMessageSender;
