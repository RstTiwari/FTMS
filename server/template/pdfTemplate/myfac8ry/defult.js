import PDFDocument from "pdfkit";
import { epochInDDMMYY } from "../../../Helper/timehelper.js";
import {
    downloadAndSaveImage,
    downloadImage,
    calculateStreetPostion,
    calcultTitlePostion,
    addBankDetails,
} from "../../../Helper/pdfHelper.js";

const defaultPdfTemplate = async (
    req,
    res,
    next,
    entityData,
    organizationData,
    entity
) => {
    try {
        const { customer, items } = entityData;
        const imageBuffer = await downloadImage(organizationData.companyLogo);

        if (!imageBuffer) {
            throw new Error("Failed to download the image");
        }

        const doc = new PDFDocument({ size: [595, 842] });
        doc.pipe(res);
        
        // Add page border
        addPageBorder(doc);
        
        // Header Section
        addHeader(doc, organizationData, imageBuffer);

        // // Details Section
        // addDetails(doc, entityData, entity);

        // // Items Section
        // addItemsTable(doc, items, entity);

        // // Footer Section
        // addFooter(doc, entityData);

        doc.end();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="output.pdf"'
        );
    } catch (error) {
        console.error(error);
        return error.message;
    }
};

// Add Header Function
// const addHeader = (doc, organization, imagePath) => {
//     doc.image(imagePath, 5, 5, { fit: [100, 100] });

//     const { orgnizationHeaderText, orgnizationHeaderPostion, fontSize } =
//         calcultTitlePostion(organization.companyName);
//     doc.fontSize(fontSize)
//         .fillColor("#0047AB")
//         .font("Helvetica-Bold")
//         .text(orgnizationHeaderText, orgnizationHeaderPostion + 30, 20);

//     const { orgnizationStreet, streetPostion } = calculateStreetPostion(
//         organization.address.line1
//     );
//     doc.fontSize(9)
//         .fillColor("#4B4E4F")
//         .text(orgnizationStreet, streetPostion, 40);
//     doc.text(`${organization.address.line2}`, streetPostion, 55);
//     doc.text(
//         `${organization.address.city}, ${organization.address.state}, ${organization.address.postalCode}`,
//         streetPostion,
//         70
//     );
//     doc.text(`${organization.address.country}`, streetPostion, 85);
// };

const addHeader = (doc, organization, imageBuffer) => {
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Image Section
    const imageWidth = 100;
    const imageHeight = 100;
    const imageX = 5; // X position for the image
    const imageY = 5; // Y position for the image

    if (imageBuffer) {
        // Check if the imageBuffer is valid
        try {
            doc.image(imageBuffer, imageX, imageY, { width: imageWidth, height: imageHeight });
            // Draw a border below the image
            // const borderWidth = 1;
            // const borderColor = "#000000"; // Dark black color
            // const borderX = imageX; // X position for the border
            // const borderY = imageY + imageHeight + 5; // Y position just below the image
            // doc.rect(borderX, borderY, imageWidth, borderWidth)
            //     .lineWidth(borderWidth)
            //     .fillColor(borderColor)
            //     .fill();
        } catch (error) {
            console.error('Error adding image to PDF:', error);
        }
    } else {
        console.log('No image buffer provided');
    }

    // Header Text Section
    const headerText = organization.companyName;
    const headerFontSize = 16; // Font size for the header
    const headerTextColor = "#0047AB"; // Color for the header text

    // Calculate header text position
    const headerTextWidth = doc.widthOfString(headerText, { fontSize: headerFontSize });
    const headerTextX = (pageWidth - headerTextWidth) / 2;
    const headerTextY = 20; // Y position for the header text, aligned with image

    doc.fontSize(headerFontSize)
        .fillColor(headerTextColor)
        .font("Helvetica-Bold")
        .text(headerText, headerTextX, headerTextY);

    // Address Section
    const street1 = organization.address.street1;
    const street2 = organization.address.street2 || ''; // Handle cases where street2 may be undefined
    const city = organization.address.city;
    const state = organization.address.state;
    const pinCode = organization.address.pinCode;

    const addressFontSize = 9;
    const addressColor = "#4B4E4F";

    // Concatenate address lines and calculate position
    const fullAddress = `${street1}${street2 ? ', ' + street2 : ''}\n${city}, ${state}, ${pinCode}`;
    const addressWidth = doc.widthOfString(fullAddress, { fontSize: addressFontSize });
    const addressX = (pageWidth - addressWidth) / 2;

    // Y position for address text, below the company name
    const addressY = headerTextY + 20; // Add some spacing below the header text

    doc.fontSize(addressFontSize)
        .fillColor(addressColor)
        .font("Helvetica")
        .text(fullAddress, addressX, addressY, { lineBreak: true });

    // Move down for additional spacing or elements if needed
    doc.moveDown(2); // Adjust the spacing as needed
};



// Usage Example
// const doc = new PDFDocument();
// addHeader(doc, organizationData, imageBuffer);

// Add Details Function
const addDetails = (doc, entityData, entity) => {
    const { customer, invoiceData } = entityData;
    doc.fontSize(15)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(entity.toUpperCase(), 255, doc.y + 10);

    // Customer Details
    doc.fontSize(14).fillColor("#0047AB").text("TO :", 20, 120);
    doc.fontSize(13)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(customer.customerName, 20, 140);
    doc.fontSize(10)
        .fillColor("#4B4E4F")
        .text(customer.billingAddress.street, 20, 155, { width: 300 });
    doc.text(
        `${customer.billingAddress.city}, ${customer.billingAddress.state}`,
        20,
        doc.y + 5,
        { width: 300 }
    );
    doc.text(`${customer.billingAddress.postalCode}`, 20, doc.y + 5, {
        width: 300,
    });

    // Invoice/Quote Details
    doc.fontSize(13)
        .font("Helvetica-Bold")
        .fillColor("#1E1F20")
        .text(`DATE: ${epochInDDMMYY(invoiceData.invoiceDate)}`, 350, 120, {
            width: 300,
        });
    doc.text(
        `DUE DATE: ${epochInDDMMYY(invoiceData.invoiceExpiredDate)}`,
        350,
        140,
        {
            width: 300,
        }
    );
    doc.text(`NO: #${invoiceData.invoiceNo}`, 350, 160, {
        width: 300,
    });
};

// Add Items Table Function
const addItemsTable = (doc, items, entity) => {
    doc.rect(10, 230, 550, 30).fill("#0047AB");
    const headers = getTableHeaders(entity);
    let x = 20;
    doc.fontSize(8).font("Helvetica-Bold").fill("#fff");
    headers.forEach((header) => {
        doc.text(header.title, x, 240);
        x += header.width;
    });

    let y = 270;
    doc.fill("#000");
    items.forEach((item) => {
        doc.fontSize(7.5).font("Helvetica").text(item.description, 20, y);
        doc.text(item.hsnCode, 135, y);
        doc.text(Math.ceil(item.rate), 200, y);
        doc.text(item.qty, 243, y);
        doc.text(Math.ceil(item.taxableAmount), 276, y);
        doc.text(item.sgstPercent, 347, y);
        doc.text(item.cgstPercent, 390, y);
        doc.text(item.igstPercent, 429, y);
        doc.text(Math.ceil(item.finalAmount), 470, y);
        y += 30;
    });
    doc.rect(10, y + 5, 550, 5).fill("#0047AB");
};

// Get Table Headers Function
const getTableHeaders = (entity) => {
    switch (entity) {
        case "invoice":
            return [
                { title: "Description", width: 100 },
                { title: "HSN CODE", width: 50 },
                { title: "RATE", width: 50 },
                { title: "Qty", width: 50 },
                { title: "Taxable Amount", width: 70 },
                { title: "SGST%", width: 50 },
                { title: "CGST%", width: 50 },
                { title: "IGST%", width: 50 },
                { title: "Total Amount", width: 70 },
            ];
        case "quote":
            return [
                { title: "Description", width: 100 },
                { title: "RATE", width: 50 },
                { title: "Qty", width: 50 },
                { title: "Total Amount", width: 70 },
            ];
        default:
            return [];
    }
};

// Add Footer Function
const addFooter = (doc, entityData) => {    
    const { invoiceData } = entityData;
    doc.fontSize(10);
    doc.fill("#000");
    doc.font("Helvetica-Bold");
    doc.text("Gross Total:", 390, doc.y + 30);
    doc.text("Total Tax Amount:", 390, doc.y + 60);
    doc.rect(370, doc.y + 80, 200, 30).fill("#0047AB");
    doc.fill("#fff");
    doc.text("Grand Total:", 390, doc.y + 90).fillColor("#000");

    doc.text(`${invoiceData.grossTotal}`, 475, doc.y + 30);
    doc.text(`${invoiceData.totalTaxAmount}`, 475, doc.y + 60);
    doc.fill("#fff");
    doc.text(`${invoiceData.grossTotal}`, 475, doc.y + 90);

    doc.fill("#0047AB").text("THANK YOU FOR BUISNESS", 225, doc.y + 100);
    doc.end();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="outPut.pdf"');
};

const addPageBorder = (doc) => {
    const borderColor = "#000000"; // Dark black color
    const borderWidth = 1; // Border width in points
    const margin = 4; // Margin from the edges in points
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Calculate the dimensions for the border with the specified margin
    const innerWidth = pageWidth - (2 * margin);  // Width considering margins on both sides
    const innerHeight = pageHeight - (2 * margin); // Height considering margins on top and bottom

    // Draw the border around the page
    doc.rect(
        margin, // X position (4px from the left)
        margin, // Y position (4px from the top)
        innerWidth,  // Width of the rectangle (pageWidth - 2 * margin)
        innerHeight  // Height of the rectangle (pageHeight - 2 * margin)
    )
    .lineWidth(borderWidth)
    .stroke(borderColor);
};



export default defaultPdfTemplate;
