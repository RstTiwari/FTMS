import React, { useEffect, useState } from "react";
import { useAuth } from "state/AuthProvider";
import { useParams } from "react-router-dom";
import PageLoader from "pages/PageLoader";
import NotificationHandler from "EventHandler/NotificationHandler";
import { Row } from "antd";

const PdfDetails = () => {
    const { pdfGenerate } = useAuth();
    const { entity, no, tenantId, id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const downloadPdf = async () => {
            try {
                const url = await pdfGenerate(
                    entity,
                    id,
                    no,
                    "download",
                    tenantId
                );
                // Create a link element to trigger the download
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${entity}_${id}.pdf`); // Set the filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link); // Clean up
            } catch (error) {
                NotificationHandler.info({
                    content: "Error in downloading PDF",
                });
            } finally {
                setLoading(false);
            }
        };

        downloadPdf();
    }, [entity, id, no, tenantId, pdfGenerate]);

    if (loading) {
        return <PageLoader isLoading={true} text={"Hold on, downloading..."} />;
    }

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            {/* You can add any additional content here if needed */}
        </Row>
    );
};

export default PdfDetails;
