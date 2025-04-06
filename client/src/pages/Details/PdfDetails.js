import React, { useEffect, useState } from "react";
import { useAuth } from "state/AuthProvider";
import { useParams } from "react-router-dom";
import PageLoader from "pages/PageLoader";
import NotificationHandler from "EventHandler/NotificationHandler";
import { Row } from "antd";

const PdfDetails = () => {
    const { pdfGenerate } = useAuth();
    const { entity, no, tenantId, id } = useParams();
    const { appApiCall } = useAuth();
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
            } catch (error) {
                NotificationHandler.info({
                    content: "Error in downloading PDF",
                });
            } finally {
                setLoading(false);
            }
        };
        downloadPdf();
        const markDownloaded = async () => {
            await appApiCall(
                "patch",
                "patch",
                {
                    action: "set",
                    keyName: "status",
                    values: "DOWNLOADED",
                    id: id,
                },
                { entity: entity }
            );
        };
        markDownloaded();
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
