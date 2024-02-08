import { Flex } from "antd";
import PageLoader from "pages/PageLoader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";

const QuotationPdf = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const {entity,id} = useParams()
    const { genratePdf } = useAuth();

    const handleGeneratePdf = async () => {
        try {
            const response = await fetch("http://localhost:5001/app/pdf"); // Assuming the endpoint is '/api/generate-pdf'
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            //you can initiate a download
            const a = document.createElement('a');
            a.href = url;
            a.download = `${entity}${id}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
        }
    };
   
     useEffect(()=>{
        handleGeneratePdf()
     },[])
    return (
        <div>
        </div>
    );
};

export default QuotationPdf;
