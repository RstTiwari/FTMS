import { jsPDF } from "jspdf";
import "jspdf-autotable";
import fs from "fs";
import axios from "axios"; // To fetch the image from a URL
import { downloadImage } from "../../Helper/pdfHelper.js";
const headerTextColor = "#0047AB"; // Color for the header text
const borderColor = "#000000"; // Color for the border
const borderWeight = 0.25; // Weight for the border
const leftMargin = 5; // Define the left margin (adjust as needed)
const topMargin = 5; // Define the top margin (adjust as needed)

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
    // add border to it
    addPageBorder(doc);
    // adding header to the page
    // Header Section
    const imageBuffer = await downloadImage(organizationData?.logo);
    addHeader(
        doc,
        organizationData,
        imageBuffer,
        entity,
        entityData,
        entityPrefix
    );

    // Add a title to the PDF

    // Define the headers and data for the table
    const headers = [getTableHeaders(entity, preCol)];
    const data = [
        [
            1,
            "the whoel text for the textqwertqwweejjjkjjs niiiwewwe",
            12300,
            0,
            12300,
        ],
        [
            2,
            "the whoel text for the textqwertqwweejjjkjjs niiiwewwe",
            12300,
            0,
            12300,
        ],
        [
            3,
            "the whoel text for the textqwertqwweejjjkjjs niiiwewwe",
            12300,
            0,
            12300,
        ],
    ];

    // Generate a table in the PDF
    doc.autoTable({
        head: headers,
        body: data,
        startY: 40, // Starting position for the table
    });

    // Send the PDF to the client as an attachment
    const pdfOutput = doc.output(); // Get the PDF output as a string (default base64)
    const pdfBuffer = Buffer.from(pdfOutput, "binary"); // Convert the output to a buffer
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');
    // Send the PDF buffer as a response
    res.send(pdfBuffer);

    console.log("PDF generated and saved as output.pdf");
};
const addPageBorder = (doc) => {
    // Get page width and height from jsPDF internal object
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Calculate the dimensions for the border with the specified margin
    const innerWidth = pageWidth - 2 * leftMargin; // Width considering margins on both sides
    const innerHeight = pageHeight - 2 * topMargin; // Height considering margins on top and bottom

    // Draw the border around the page
    doc.setLineWidth(borderWeight); // Set the border width
    doc.setDrawColor(borderColor); // Set the border color

    doc.rect(
        leftMargin, // X position (left margin)
        topMargin, // Y position (top margin)
        innerWidth, // Width of the rectangle (page width minus margins)
        innerHeight // Height of the rectangle (page height minus margins)
    );

    doc.stroke(); // Render the border stroke
};
// Function to add an image with proper y positioning
const addImageWithSpacing = (
    doc,
    imageBuffer,
    x,
    y,
    imageWidth,
    imageHeight,
    spacing = 10
) => {
    if (imageBuffer) {
        try {
            doc.image(imageBuffer, x, y, {
                width: imageWidth,
                height: imageHeight,
            });
            return doc.y + imageHeight + spacing; // Return new y position after image
        } catch (error) {
            console.error("Error adding image to PDF:", error);
            return y; // Return same y if image fails
        }
    }
    return y; // Return same y if no image
};
const addHeader = (
    doc,
    organization,
    imageBuffer,
    entity,
    entityDetails,
    entityPrefix
) => {
    const pageWidth = doc.internal.pageSize.getWidth();

    // Adding Entity Title to Doc
    const title =
        entity == "invoices"
            ? "Tax Invoice"
            : entity == "quotations"
            ? "Quotation"
            : entity == "purchases"
            ? "Purchase Order"
            : entity == "challans"
            ? "Delivery Challan"
            : entity == "workorders"
            ? "Work Order"
            : "";

    // Title text
    const centerX = pageWidth / 2;

    // Title text
    doc.setFontSize(12)
        .setTextColor("#000000")
        .setFont("helvetica", "bold")
        .text(title, centerX, leftMargin + 5, { align: "center" });

    // Draw border under title, 10mm from both sides
    doc.setLineWidth(borderWeight)
        .setDrawColor(borderColor)
        .line(
            leftMargin, // Start 10mm from left
            leftMargin + 7.5, // Y position of the line (10mm below the title)
            pageWidth - 5, // End 10mm before the right edge
            leftMargin + 7.5 // Same Y position
        );

    // Image Section
    const imageWidth = 20;
    const imageHeight = 20;
    if (imageBuffer) {
        try {
            doc.addImage(
                imageBuffer,
                "JPEG",
                leftMargin,
                leftMargin,
                imageWidth,
                imageHeight
            );
        } catch (error) {
            console.error("Error adding image to PDF:", error);
        }
    } else {
        console.log("No image buffer provided");
    }

    // Address Section
    let address = "";
    if (organization.billingAddress) {
        address = `${organization.billingAddress.street1 || ""} ${
            organization.billingAddress.street2 || ""
        } ${organization.billingAddress.city || ""}, ${
            organization.billingAddress.state || ""
        } - ${organization.billingAddress.pincode || ""}`
            .trim()
            .replace(/\s+/g, " ");
    } else {
        address = "No address found.";
    }

    const phoneNumber = organization?.phone || "";
    const email = organization?.email || "";
    const gstNo = organization?.gstNo || "";
    const panNo = organization?.panNo || "";
    let website = organization?.website;

    const addressFontSize = 8.5;
    const addressColor = "#000000";

    // Concatenate address lines
    let fullAddress =
        `${address}\n` + `Phone: ${phoneNumber}\n` + `Email: ${email}\n`;

    if (website) {
        fullAddress += `Website: ${website}\n`;
    }

    fullAddress += `GST No: ${gstNo}\nPAN No: ${panNo}`;

    // Address text
    doc.setFontSize(12)
        .setTextColor(headerTextColor)
        .setFont("helvetica", "bold")
        .text(
            organization?.companyName?.toUpperCase(),
            leftMargin + imageWidth + 10,
            leftMargin + 25
        );

    doc.setFontSize(addressFontSize)
        .setTextColor(addressColor)
        .setFont("helvetica", "normal")
        .text(fullAddress, leftMargin + imageWidth + 10, leftMargin + 35);

    // Header dynamic details based on entity
    let detailsY = leftMargin + 25;
    const detailFontSize = 10;
    const detailWidth = 150;
    const xForRightSide = 310;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    if (entity.toLowerCase() === "invoices") {
        doc.setFontSize(detailFontSize)
            .setTextColor("#000000")
            .setFont("helvetica", "bold")
            .text(`Invoice No:`, 360, detailsY);
        doc.setFont("helvetica", "normal").text(
            `${entityPrefix}/${entityDetails?.no}`,
            460,
            detailsY
        );
        detailsY += 10;

        doc.setFont("helvetica", "bold").text(`Invoice Date:`, 360, detailsY);
        doc.setFont("helvetica", "normal").text(
            formatDate(entityDetails.invoiceDate),
            460,
            detailsY
        );
        detailsY += 10;

        doc.setFont("helvetica", "bold").text(`Due Date:`, 360, detailsY);
        doc.setFont("helvetica", "normal").text(
            formatDate(entityDetails.dueDate),
            460,
            detailsY
        );
    } else if (entity.toLowerCase() === "quotations") {
        doc.setFontSize(detailFontSize)
            .setTextColor("#000000")
            .setFont("helvetica", "bold")
            .text(`Quote No:`, xForRightSide, detailsY);
        doc.setFont("helvetica", "normal").text(
            `${entityPrefix}/${entityDetails?.no}`,
            xForRightSide + 75,
            detailsY
        );
        detailsY += 10;

        doc.setFont("helvetica", "bold").text(
            `Quote Date:`,
            xForRightSide,
            detailsY
        );
        doc.setFont("helvetica", "normal").text(
            formatDate(entityDetails.quoteDate),
            xForRightSide + 75,
            detailsY
        );
        detailsY += 10;

        doc.setFont("helvetica", "bold").text(
            `Due Date:`,
            xForRightSide,
            detailsY
        );
        doc.setFont("helvetica", "normal").text(
            formatDate(entityDetails.expiryDate),
            xForRightSide + 75,
            detailsY
        );
    }
    // ... You can add other entities like 'purchases', 'challans', 'workorders' similarly

    // Draw a horizontal line after the header details
    doc.setLineWidth(borderWeight)
        .setDrawColor(borderColor)
        .line(leftMargin, detailsY + 10, pageWidth - leftMargin, detailsY + 10);

    doc.setDrawColor(borderColor)
        .setLineWidth(1)
        .line(300, leftMargin + 15, 300, detailsY + 10); // vertical line between sections

    return doc;
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
