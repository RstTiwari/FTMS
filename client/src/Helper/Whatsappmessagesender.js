import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Select, Space, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import useInitialFormValues from "Hook/useIntialFormValues";
import PageLoader from "pages/PageLoader";

const WhatsAppMessageSender = ({ onClose }) => {
    const { entity, tenantId, id } = useParams();
    const [mobileNumber, setMobileNumber] = useState("");
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

    const getCustomMessage = (entity, details) => {
        const { no, grandTotal } = details;
        const FrntendUrl =
            process.env.NODE_ENV === "production"
                ? "https://ftms.myfac8ry.com/"
                : "https://localhost:3000/";

        const pdfUrl = `${FrntendUrl}pdfDetails/${entity}/${no}/${tenantId}/${id}`;
        let message = "";

        switch (entity) {
            case "quotations":
                const { quoteDate } = details;
                message = `
                   ${recipient.toUpperCase()} Details of *Quotation*
    
                    \`\`\`Quotation Number:\`\`\` ${no}
                    \`\`\`Quotation Date:\`\`\` ${quoteDate}
                    \`\`\`Grand Total:\`\`\` ₹ ${grandTotal}
    
                    For downloading the PDF, click ${pdfUrl}
                `.trim();
                break;

            case "invoices":
                const { invoiceDate, dueDate } = details;
                message = `
                   ${recipient.toUpperCase()} Details of *Invoice*
    
                    \`\`\`Invoice Number:\`\`\` ${no}
                    \`\`\`Invoice Date:\`\`\` ${invoiceDate}
                    \`\`\`Invoice Due Date:\`\`\` ${dueDate}
                    \`\`\`Grand Total:\`\`\` ₹ ${grandTotal}
    
                    For downloading the PDF, click  ${pdfUrl}
                `.trim();
                break;

            case "purchases":
                const { purchaseDate } = details;
                message = `
                   ${recipient.toUpperCase()} Details of *Purchase Order*
    
                    \`\`\`Purchase Order Number:\`\`\` ${no}
                    \`\`\`Purchase Date:\`\`\` ${purchaseDate}
                    \`\`\`Grand Total:\`\`\` ₹ ${grandTotal}
    
                    For downloading the PDF, click  ${pdfUrl}
                `.trim();
                break;

            case "challans":
                const { challanType, challanDate, vehicleNo } = details;
                message = `
                   ${recipient.toUpperCase()} Details of *Challan*
    
                    \`\`\`Challan Number:\`\`\` ${no}
                    \`\`\`Challan Type:\`\`\` ${challanType}
                    \`\`\`Challan Date:\`\`\` ${challanDate}
                    \`\`\`Vehicle Number:\`\`\` ${vehicleNo}
    
                    For downloading the PDF, click ${pdfUrl}
                `.trim();
                break;

            default:
                message = "Invalid entity type.";
                break;
        }

        return message;
    };

    const sendWhatsAppMessage = () => {
        let message = getCustomMessage(entity, initialValues);

        const encodedMessage = encodeURIComponent(message);
        const url = `https://web.whatsapp.com/send?phone=${mobileNumber}&text=${encodedMessage}`;

        // Open the URL in a new tab
        window.open(url, "_blank");
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
                        <PageLoader isLoading={true} text={"Hold on..."} />
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
