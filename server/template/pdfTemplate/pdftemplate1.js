import { jsPDF } from "jspdf";
import "jspdf-autotable";
import fs from "fs";
import axios from "axios"; // To fetch the image from a URL
import { downloadImage } from "../../Helper/pdfHelper.js";

const generatePDF = async (
    req,
    res,
    next,
    entityData,
    organizationData,
    entity,
    entityPrefix,
    preCol
) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.setFontSize(18);
    doc.text("Sample PDF with jsPDF and AutoTable", 14, 20);

    // Add some description or content
    doc.setFontSize(12);
    doc.text(
        "This is a sample PDF document generated in Node.js with jsPDF.",
        14,
        30
    );

    // Define the headers and data for the table
    // Helper function to fetch image and convert it to base64
    const getImageBase64FromURL = async (url) => {
        try {
            const response = await axios.get(url, {
                responseType: "arraybuffer",
            });
            const imageBuffer = Buffer.from(response.data, "binary");
            return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
        } catch (error) {
            console.error("Error fetching image:", error);
            return null;
        }
    };
    const headers = [getTableHeaders(entity, preCol)];
    const data = [
        [
            1,
            "the whoel text for the textqwertqwweejjjkjjs niiiwewwe",
            "https://res.cloudinary.com/dyw4lrlzh/image/upload/v1726402714/myfac8ry66bc7ab04ad50474584b4432.png",
            12300,
            0,
            12300,
        ],
        [
            2,
            "the whoel text for the textqwertqwweejjjkjjs niiiwewwe",
            "https://res.cloudinary.com/dyw4lrlzh/image/upload/v1726402714/myfac8ry66bc7ab04ad50474584b4432.png",
            12300,
            0,
            12300,
        ],
        [
            3,
            "the whoel text for the textqwertqwweejjjkjjs niiiwewwe",
            "https://res.cloudinary.com/dyw4lrlzh/image/upload/v1726402714/myfac8ry66bc7ab04ad50474584b4432.png",
            12300,
            0,
            12300,
        ],
    ];
    // Map over the data and generate rows with image base64
    const tableDataPromises = data.map(async (row) => {
        const [id, description , image] = row;
        console.log(image);
        
        const imageBase64 = await downloadImage(image); // Fetch and convert to base64
        console.log(imageBase64,"===")

        return [
            id,
            description,
            image
                ? { image: imageBase64, fit: [30, 30] } // Add image with a specific size (30x30)
                : "No Image", // Fallback text if the image fails to load
        ];
    });
    console.log(entityData.items);
    const tableData = await Promise.all(tableDataPromises);

    // Generate a table in the PDF
    doc.autoTable({
        head: headers,
        body: tableData,
        startY: 40, // Starting position for the table
    });

    // Send the PDF to the client as an attachment
    const pdfOutput = doc.output(); // Get the PDF output as a string (default base64)
    const pdfBuffer = Buffer.from(pdfOutput, "binary"); // Convert the output to a buffer
    const outputFilePath = "./output.pdf";
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');
    // Send the PDF buffer as a response
    res.send(pdfBuffer);

    console.log("PDF generated and saved as output.pdf");
};
const getTableHeaders = (entity, preCol = []) => {
    // Define the additional columns that may be added based on preCol
    let toAddColumn = [
        { title: "CODE", value: "code", width: 40 },
        { title: "IMAGE", value: "image", width: 50 },
        { title: "HSN CODE", value: "hsnCode", width: 30 },
        { title: "DISCOUNT %", value: "discountPercent", width: 50 },
        { title: "DISCOUNT AMOUNT", value: "discountAmount", width: 50 },
        { title: "TAX AMOUNT", value: "taxAmount", width: 40 },
    ];

    // Default headers
    const allHeaders = [
        { title: "#", value: "srNo", width: 10 },
        { title: "DESCRIPTION", value: "description", width: 350 }, // Initial width of description column
        { title: "RATE", value: "rate", width: 50 },
        { title: "QTY", value: "qty", width: 40 },
        { title: "TAX%", value: "gstPercent", width: 30 },
        { title: "TOTAL AMOUNT", value: "finalAmount", width: 80 },
    ];

    // Create a map from preCol to handle status true columns
    const preColMap = {};
    preCol.forEach((col) => {
        if (col.status) {
            preColMap[col.value] = col.label; // Map value to label for easier access
        }
    });

    // Order in which columns should appear
    const order = [
        "srNo",
        "code",
        "description",
        "image",
        "hsnCode",
        "rate",
        "discountPercent",
        "discountAmount",
        "qty",
        "gstPercent",
        "taxAmount",
        "finalAmount",
    ];

    let finalHeaders = [];

    // Start by adding the default headers
    order.forEach((value) => {
        let header = allHeaders.find((header) => header.value === value);
        // Check if the header is from preCol and has status true
        if (preColMap[value]) {
            let additionalHeader = toAddColumn.find(
                (col) => col.value === value
            );
            if (additionalHeader) {
                finalHeaders.push({
                    title: preColMap[value], // Use label from preCol
                    value: additionalHeader.value,
                    width: additionalHeader.width,
                });
            }
        } else if (header) {
            // Add default headers that aren't from preCol
            finalHeaders.push(header);
        }
    });

    // Calculate the total width of added columns based on actual column widths
    const totalWidthAdded = finalHeaders
        .filter((header) => preColMap[header.value]) // Only the added columns from preCol
        .reduce((total, header) => total + header.width, 0);

    // Adjust the width of the description column based on the total width of added columns
    const descriptionHeader = finalHeaders.find(
        (header) => header.value === "description"
    );
    if (descriptionHeader) {
        descriptionHeader.width = descriptionHeader.width - totalWidthAdded;
    }

    // Return headers based on entity type or dynamic processing
    switch (entity.toLowerCase()) {
        case "workorders":
            return [
                { title: "CODE", width: 50 },
                { title: "NAME", width: 400 },
                { title: "QTY", width: 50 },
            ];
        default:
            return finalHeaders;
    }
};

// Generate the PDF

export default generatePDF;
