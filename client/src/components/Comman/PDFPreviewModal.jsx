import React, { useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useAuth } from "state/AuthProvider"; // Assuming your hook is here

const PreviewModal = ({ open, onClose, width = 70, entity, id, no, tenantId ,callApi,localData}) => {
    const { pdfGenerate } = useAuth();
    const [loading, setLoading] = useState(true); // Track loading state
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const fetchPdfUrl = async () => {
            try {
                const url = await pdfGenerate(entity, id, no, "display", tenantId,callApi,localData);
                setPdfUrl(url); // Set the generated PDF URL
                setLoading(false); // Stop loading once URL is available
            } catch (error) {
                console.error("Failed to generate PDF:", error);
                setLoading(false); // Handle errors and stop loading
            }
        };

        if (open) { // Only generate the PDF when the modal is open
            setLoading(true); // Reset loading when opening the modal
            fetchPdfUrl();
        }
    }, [open, entity, id, no, tenantId, pdfGenerate]);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            closable={true}
            title={"PREVIEW PDF DETAILS"}
            closeIcon={<CloseCircleOutlined style={{ color: "red", fontSize: "1.5rem" }} />}
            width={`${width}%`}
            maskClosable={false}
            keyboard={false}
            zIndex={100000}
            footer={null}
            style={{marginTop:"-100px"}}
         
        >
            {loading ? (
                <div style={{ textAlign: "center" }}>
                    <Spin size="large" /> {/* Loading spinner */}
                    <p>Loading PDF...</p>
                </div>
            ) : (
                pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="700px" // Make iframe fill the modal
                        title="PDF Preview"
                        style={{ border: "none" }}
                    />
                )
            )}
        </Modal>
    );
};

export default PreviewModal;
