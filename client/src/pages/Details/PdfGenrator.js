import React, { useEffect, useState } from "react";
import { useAuth } from "state/AuthProvider";
import PageLoader from "pages/PageLoader";
import NotFound from "pages/Notfound";

const PDFGenerator = ({ entity, id }) => {
    const { pdfGenerate } = useAuth();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generatePdf = async () => {
            try {
                setLoading(true);
                const url = await pdfGenerate(entity, id, "display");
                setPdfUrl(url);
                setLoading(false);
            } catch (error) {
                console.error("Error generating PDF:", error);
                setLoading(false);
            }
        };

        generatePdf();

        // Cleanup URL object on component unmount
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [entity, id]);

    if (loading) {
        return <PageLoader isLoading={loading} text={"Displaying Pdf pls wait"} />;
    }

    return (
        <div style={{ margin: '10px' }}>
            {pdfUrl ? (
                <iframe
                    style={{ width: "100%", height: "100vh" }}
                    src={pdfUrl}
                    title="PDF Document"
                />
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default PDFGenerator;
