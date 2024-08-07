import PDFDocument from "pdfkit";
import { jsDateIntoDDMMYY } from "../../../Helper/timehelper.js";
import {
    downloadAndSaveImage,
    downloadImage,
    calculateStreetPostion,
    addBankDetails,
    calculateHeaderPosition,
} from "../../../Helper/pdfHelper.js";

const borderColor = "#000000"; // Color for the border
const defaultPdfTemplate = async (
    req,
    res,
    next,
    entityData,
    organizationData,
    entity,
    entityPrefix
) => {
    try {
        const imageBuffer = await downloadImage(organizationData?.logo);

        const doc = new PDFDocument({ size: [595, 842], margin: 5 });
        doc.pipe(res);

        // Add page border
        addPageBorder(doc);

        // Header Section
        addHeader(
            doc,
            organizationData,
            imageBuffer,
            entity,
            entityData,
            entityPrefix
        );

        // Details Section
        addDetails(doc, entityData, entity, organizationData);

        // Items Section
        addItemsTable(doc, entityData, entity, organizationData);

        // Footer Section
        addFooter(doc, entityData, entity, organizationData);

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

const addHeader = (
    doc,
    organization,
    imageBuffer,
    entity,
    entityDetails,
    entityPrefix
) => {
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const headerTextColor = "#0047AB"; // Color for the header text
    const borderColor = "#000000"; // Color for the border
    const borderWeight = 1; // Weight for the border

    let entityX = 0;
    let entityY = 10;

    // Adding Entity to Doc
    const title =
        entity == "invoices"
            ? "Tax Invoice"
            : entity == "quotations"
            ? "Quotation"
            : entity == "purchases"
            ? "Purchase Order"
            : entity == "challans"
            ? "Delivery Challan"
            : "";

    doc.fontSize(12)
        .fillColor("#000000")
        .font("Helvetica-Bold")
        .text(title, entityX, entityY, {
            align: "center",
        });
    doc.moveTo(4, doc.y) // Adjust the Y position if necessary
        .lineTo(pageWidth - 4, doc.y)
        .stroke(borderColor);

    // Image Section
    const imageWidth = 75;
    const imageHeight = 75;
    const imageX = 5; // X position for the image
    const imageY = doc.y + 5; // Y position for the image
    if (imageBuffer) {
        try {
            doc.image(imageBuffer, imageX, imageY, {
                width: imageWidth,
                height: imageHeight,
            });
        } catch (error) {
            console.error("Error adding image to PDF:", error);
        }
    } else {
        console.log("No image buffer provided");
    }

    const { headerText } = calculateHeaderPosition(
        organization?.companyName,
        doc
    );

    // Address Section
    let address = "";
    if (organization.billingAddress) {
        address = `${organization?.billingAddress?.street1 || ""},${
            organization?.billingAddress?.street2 || ""
        },${organization?.billingAddress?.city || ""},${
            organization?.billingAddress?.state || ""
        },${organization?.address?.pincode || ""}`;
    } else {
        address = "No address Found:";
    }

    const phoneNumber = organization?.phone || "";
    const email = organization?.email || "";
    const website = organization?.website || "";
    const gstNo = organization?.gstNo || "";
    const panNo = organization?.panNo || "";

    const addressFontSize = 8.5;
    const addressColor = "#000000";

    // Concatenate address lines and calculate position
    let fullAddress = `${address}\nPhone: ${phoneNumber},\nEmail: ${email}\nWebsite: ${website}\nGST No: ${gstNo}, PAN No ${panNo}`;
    const headerTextY = entityY + 20;

    // Y position for text elements

    // Draw text
    doc.fontSize(12)
        .fillColor(headerTextColor)
        .font("Helvetica-Bold")
        .text(headerText, 80, headerTextY, { width: 275, align: "left" });

    doc.fontSize(addressFontSize)
        .fillColor(addressColor)
        .font("Helvetica")
        .text(fullAddress, { width: 275, align: "left" });

    doc.moveTo(4, doc.y) // Adjust the Y position if necessary
        .lineTo(pageWidth - 4, doc.y)
        .stroke(borderColor);

    // Draw line from the end of the address section up to the entity border
    doc.moveTo(355, doc.y)
        .lineTo(355, entityY + 13) // Adjust 'entityY + 13' to match the position of the entity border
        .stroke(borderColor);

    // Add dynamic header details based on entity
    let detailsY = headerTextY;
    const detailFontSize = 13;
    const detailWidth = 150;

    if (entity.toLowerCase() === "invoices") {
        doc.fontSize(detailFontSize)
            .fillColor("#000000")
            .font("Helvetica-Bold")
            .text(`Invoice No:`, 360, detailsY, {
                width: detailWidth,
                align: "left",
            });
        doc.font("Helvetica").text(
            `${entityPrefix}/${entityDetails?.no}`,
            460,
            detailsY,
            { width: detailWidth, align: "left" }
        );
        detailsY += 20;
        doc.font("Helvetica-Bold").text(`Invoice Date:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });
        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(entityDetails.invoiceDate)}`,
            460,
            detailsY,
            { width: detailWidth, align: "left" }
        );
        detailsY += 20;
        doc.font("Helvetica-Bold").text(`Due Date:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });
        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(entityDetails.dueDate)}`,
            460,
            detailsY,
            { width: detailWidth, align: "left" }
        );
    } else if (entity.toLowerCase() === "quotations") {
        doc.fontSize(detailFontSize)
            .fillColor("#000000")
            .font("Helvetica-Bold")
            .text(`Quote No:`, 360, detailsY, {
                width: detailWidth,
                align: "left",
            });
        doc.font("Helvetica").text(
            `${entityPrefix}/${entityDetails.no}`,
            460,
            detailsY,
            {
                width: detailWidth,
                align: "left",
            }
        );
        detailsY += 20;
        doc.font("Helvetica-Bold").text(`Quote Date:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });
        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(entityDetails.quoteDate)}`,
            460,
            detailsY,
            { width: detailWidth, align: "left" }
        );
        detailsY += 20;
        doc.font("Helvetica-Bold").text(`Due Date:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });

        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(entityDetails.expiryDate)}`,
            460,
            detailsY,
            {
                width: detailWidth,
                align: "left",
            }
        );
    } else if (entity.toLowerCase() === "purchases") {
        doc.fontSize(detailFontSize)
            .fillColor("#000000")
            .font("Helvetica-Bold")
            .text(`Purchase No:`, 360, detailsY, {
                width: detailWidth,
                align: "left",
            });
        doc.font("Helvetica").text(
            `${entityPrefix}/${entityDetails.no}`,
            460,
            detailsY,
            {
                width: detailWidth,
                align: "left",
            }
        );
        detailsY += 20;
        doc.font("Helvetica-Bold").text(`Purchase Date:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });
        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(entityDetails.purchaseDate)}`,
            460,
            detailsY,
            { width: detailWidth, align: "left" }
        );
        detailsY += 20;
        doc.font("Helvetica-Bold").text(`Delivery Date:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });

        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(entityDetails.deliveryDate)}`,
            460,
            detailsY,
            {
                width: detailWidth,
                align: "left",
            }
        );
    } else if (entity.toLowerCase() === "challans") {
        doc.fontSize(detailFontSize)
            .fillColor("#000000")
            .font("Helvetica-Bold")
            .text(`Challan No:`, 360, detailsY, {
                width: detailWidth,
                align: "left",
            });
        doc.font("Helvetica").text(
            `${entityPrefix}/${entityDetails?.no}`,
            460,
            detailsY,
            {
                width: detailWidth,
                align: "left",
            }
        );
        detailsY += 20;
        doc.font("Helvetica-Bold").text(`Challan Date:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });
        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(entityDetails?.challanDate)}`,
            460,
            detailsY,
            { width: detailWidth, align: "left" }
        );
        doc.y = detailsY;
        detailsY += 20;
        doc.font("Helvetica-Bold").text(`Challan Type:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });

        doc.font("Helvetica").text(
            `${entityDetails?.challanType}`,
            460,
            detailsY,
            {
                width: detailWidth,
                align: "left",
            }
        );
        detailsY += 20;
        let vehicleDetails = `VehicleNo : ${entityDetails?.vehicleNo || ""} `;
        doc.font("Helvetica-Bold")
            .fontSize(9)
            .text(`${vehicleDetails}`, 360, detailsY, {
                width: 150,
                align: "left",
            });
        let deriveDetails = `Mob : ${entityDetails?.contactNo || ""}`;
        doc.font("Helvetica-Bold").text(`${deriveDetails}`, 485, detailsY, {
            width: 150,
            align: "left",
        });
        doc.y = detailsY;
    }

    // Optional: Move down for additional spacing or elements if needed
    doc.moveDown(2); // Adjust the spacing as needed
};

const addDetails = (doc, entityData, entity, organizationData) => {
    let detailsFunction = () => {};

    switch (entity) {
        case "invoices":
            detailsFunction = detailsForInvoice;
            break;
        case "quotations":
            detailsFunction = detailsForQuotation;
            break;
        case "purchases":
            detailsFunction = detailsForPurchaseOrder;
            break;
        case "challans":
            detailsFunction = detailsForChallan;
            break;
        default:
            break;
    }

    detailsFunction(doc, entityData, organizationData);
};

// Add Items Table Function
const addItemsTable = (doc, entityData, entity) => {
    const headers = getTableHeaders(entity);
    const headerHeight = 30;
    const cellPadding = 5;
    const items = entityData?.items;
    // Draw header background
    let tableHeaderY = doc.y + 15;
    doc.rect(10, doc.y + 2, 575, headerHeight).fill("#0047AB");

    // Draw header text
    let x = 20;
    doc.fontSize(8).font("Helvetica-Bold").fill("#fff");
    headers.forEach((header) => {
        doc.text(header.title, x, tableHeaderY);
        x += header.width;
    });

    // Draw item rows
    let y = tableHeaderY + headerHeight + cellPadding;
    doc.fill("#000000").font("Helvetica-Bold");
    items.forEach((item) => {
        let x = 20;
        headers.forEach((header, index) => {
            switch (header.title.toUpperCase()) {
                case "ITEM & DESCRIPTION":
                    doc.text(item.description, x, y, {
                        width: header.width,
                        align: "left",
                    });
                    break;
                case "HSN CODE":
                    doc.text(item.hsnCode, x + cellPadding, y);
                    break;
                case "RATE":
                    doc.text(Math.ceil(item.rate), x + cellPadding, y);
                    break;
                case "QTY":
                    doc.text(item.qty, x + cellPadding, y);
                    break;
                case "GST%":
                    doc.text(`${item?.gstPercent || 0}%`, x + cellPadding, y);
                    break;
                case "TOTAL AMOUNT":
                    doc.text(Math.ceil(item.finalAmount), x + cellPadding, y);
                    break;
                default:
                    break;
            }
            x += header.width;
        });
        y += headerHeight;
    });

    // Draw footer background
    doc.rect(10, y + cellPadding, 575, cellPadding).fill("#0047AB");
};

const addFooter = (doc, entityData, entity, organizationData) => {
    let footerDetails = () => {};
    switch (entity) {
        case "invoices":
            footerDetails = footerForInvoice;
            break;
        case "quotations":
            footerDetails = footerForQuotation;
        case "purchases":
            footerDetails = footerForPurchaseOrder;
            break;
        case "challans":
            footerDetails = footerForChallan;
            break;
        default:
            break;
    }

    footerDetails(doc, entityData, organizationData);
};
const addPageBorder = (doc) => {
    const borderColor = "#000000"; // Dark black color
    const borderWidth = 1; // Border width in points
    const margin = 4; // Margin from the edges in points
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Calculate the dimensions for the border with the specified margin
    const innerWidth = pageWidth - 2 * margin; // Width considering margins on both sides
    const innerHeight = pageHeight - 2 * margin; // Height considering margins on top and bottom

    // Draw the border around the page
    doc.rect(
        margin, // X position (4px from the left)
        margin, // Y position (4px from the top)
        innerWidth, // Width of the rectangle (pageWidth - 2 * margin)
        innerHeight // Height of the rectangle (pageHeight - 2 * margin)
    )
        .lineWidth(borderWidth)
        .stroke(borderColor);
};
// Get Table Headers Function
const getTableHeaders = (entity) => {
    switch (entity.toLowerCase()) {
        case "invoices":
            return [
                { title: "ITEM & DESCRIPTION", width: 225 },
                { title: "HSN CODE", width: 70 },
                { title: "RATE", width: 70 },
                { title: "QTY", width: 50 },
                { title: "GST%", width: 50 },
                { title: "TOTAL AMOUNT", width: 100 },
            ];
        case "quotations":
            return [
                { title: "ITEM & DESCRIPTION", width: 275 },
                { title: "RATE", width: 100 },
                { title: "QTY", width: 100 },
                { title: "TOTAL AMOUNT", width: 100 },
            ];
        case "purchases":
            return [
                { title: "ITEM & DESCRIPTION", width: 275 },
                { title: "RATE", width: 70 },
                { title: "QTY", width: 50 },
                { title: "GST%", width: 50 },
                { title: "TOTAL AMOUNT", width: 100 },
            ];
        case "challans":
            return [
                { title: "ITEM & DESCRIPTION", width: 275 },
                { title: "RATE", width: 70 },
                { title: "QTY", width: 50 },
                { title: "GST%", width: 50 },
                { title: "TOTAL AMOUNT", width: 100 },
            ];
        default:
            return [];
    }
};

// adding other helper Function as per need
const detailsForInvoice = (doc, invoiceData, entity, curY) => {
    const leftX = 20; // X position for the left side
    const rightX = 320; // X position for the right side
    const initialY = doc.y; // Initial Y position for the details
    const detailSpacing = 10; // Spacing between details
    const borderColor = "#000000"; // Color for the border
    const { customer } = invoiceData;

    // Customer Billing Details
    doc.fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#0047AB")
        .text("BILLING TO:", leftX, initialY);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(customer?.name, leftX, initialY + 15);
    doc.fontSize(9)
        .fillColor("#4B4E4F")
        .text(
            `${customer?.billingAddress?.street1},${customer?.billingAddress?.street2}`,
            leftX,
            doc.y + 5,
            { width: 250, align: "left" }
        );
    doc.text(
        `${customer?.billingAddress?.city}, ${customer?.billingAddress?.state}, ${customer?.billingAddress?.pincode}`,
        leftX,
        doc.y + 5,
        { width: 250 }
    );

    // Add GST No and PAN No with bold labels
    const currentY = doc.y + 5;
    let gst = `GST No :${customer?.gstNo || ""}`;
    let pan = `PAN No :${customer?.panNo || ""}`;

    doc.font("Helvetica-Bold").text(gst, leftX, currentY, {
        width: 200,
    });

    doc.font("Helvetica-Bold").text(pan, 160, currentY, { width: 200 });

    const billingEndY = doc.y;

    // Customer Shipping Details
    doc.fontSize(12)
        .fillColor("#0047AB")
        .text("SHIPPING TO:", rightX, initialY);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(customer?.name, rightX, initialY + 15);
    doc.fontSize(9)
        .fillColor("#4B4E4F")
        .text(
            `${customer?.shippingAddress?.street1},${customer?.shippingAddress?.street2}`,
            rightX,
            doc.y + 5,
            { width: 250, align: "left" }
        );
    doc.text(
        `${customer?.shippingAddress?.city}, ${customer?.shippingAddress?.state}, ${customer?.shippingAddress?.pincode}`,
        rightX,
        doc.y + 5,
        { width: 250 }
    );

    const shippingEndY = doc.y;

    // Draw horizontal line after billing details
    const endY = Math.max(billingEndY, shippingEndY) + 5;
    doc.moveTo(5, endY)
        .lineTo(doc.page.width - 4, endY)
        .stroke(borderColor);

    // Draw vertical line separating billing and shipping sections
    doc.moveTo(300, initialY - 10)
        .lineTo(300, endY)
        .stroke(borderColor);

    // Update doc.y to ensure it starts after the details section
    doc.y = endY;
};

const detailsForQuotation = (doc, quotationData, organizationData, curY) => {
    const customer = quotationData?.customer;
    const sub = quotationData?.sub;
    const salesPerson = quotationData?.salesPerson;
    let initialY = doc.y;
    let leftX = 8;

    // Calculate width of "TO:" text
    doc.fontSize(12).font("Helvetica-Bold");
    const toText = "To:";
    const toTextWidth = doc.widthOfString(toText);

    // Customer Details
    doc.fillColor("#1E1F20").text(toText, leftX, initialY);
    doc.fontSize(12)
        .fillColor("#1E1F20")
        .text(customer?.name || "", leftX + toTextWidth + 5, initialY);

    // Optional subject line
    if (sub) {
        let subText = `Sub : ${quotationData?.sub || ""}`;
        doc.fontSize(12)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text(subText, leftX, doc.y + 5);
    }
    // Optional subject line
    if (salesPerson) {
        let subText = `Sales Executive : ${quotationData?.salesPerson || ""}`;
        doc.fontSize(12)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text(subText, leftX, doc.y + 5);
    }

    const customerEndY = doc.y;

    // Draw horizontal line after customer details
    doc.moveTo(4, customerEndY + 5)
        .lineTo(doc.page.width - 4, customerEndY + 5)
        .stroke(borderColor);
    doc.y = customerEndY + 5;
};

const detailsForPurchaseOrder = (
    doc,
    purchaseOrderData,
    organizationData,
    curY
) => {
    const leftX = 20; // X position for the left side
    const rightX = 310; // X position for the right side
    const initialY = doc.y; // Initial Y position for the details
    const detailSpacing = 10; // Spacing between details
    const borderColor = "#000000"; // Color for the border
    const { vendor, deliveryAddress, deliverTo } = purchaseOrderData;

    // Supplier Details
    let vendorAddress = "";
    if (vendor?.billingAddress) {
        let street1 = vendor?.billingAddress?.street1 || "";
        let street2 = vendor?.billingAddress?.street2 || "";
        let city = vendor?.billingAddress?.city || "";
        let state = vendor?.billingAddress?.state || "";
        let pincode = vendor?.billingAddress?.pincode;
        let gstNo = vendor?.gstNo || "";
        let panNo = vendor?.panNo || "";
        vendorAddress = `${street1} ${street2} \n${city} ${state} ${pincode} \nGST No: ${gstNo} , PAN No: ${panNo}`;
    }
    doc.fontSize(12).fillColor("#0047AB").text("SUPPLIER:", leftX, initialY);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(vendor?.name || "", leftX, initialY + 15);
    doc.fontSize(9)
        .fillColor("#4B4E4F")
        .text(vendorAddress, leftX, doc.y + 5, { width: 300, align: "left" });

    const supplierEndY = doc.y;

    // Delivery To Details
    doc.fontSize(12)
        .fillColor("#0047AB")
        .text("DELIVERY TO:", rightX, initialY);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(deliverTo, rightX, initialY + 15);
    doc.fontSize(9)
        .fillColor("#4B4E4F")
        .text(
            `${deliveryAddress?.street1},${deliveryAddress?.street2}`,
            rightX,
            doc.y + 5,
            { width: 280, align: "left" }
        );
    doc.text(
        `${deliveryAddress?.city}, ${deliveryAddress?.state}, ${deliveryAddress?.pincode}`,
        rightX,
        doc.y + 5,
        { width: 280 }
    );

    const deliveryEndY = doc.y;

    // Draw horizontal line after supplier and delivery details
    const endY = Math.max(supplierEndY, deliveryEndY) + 5;
    doc.moveTo(5, endY)
        .lineTo(doc.page.width - 4, endY)
        .stroke(borderColor);

    // Draw vertical line separating supplier and delivery sections
    doc.moveTo(300, initialY - 11)
        .lineTo(300, endY)
        .stroke(borderColor);

    // Update doc.y to ensure it starts after the details section
    doc.y = endY;
};
const detailsForChallan = (doc, challanDataa, organizationData, curY) => {
    const leftX = 20; // X position for the left side
    const rightX = 320; // X position for the right side
    const initialY = doc.y; // Initial Y position for the details
    const detailSpacing = 10; // Spacing between details
    const borderColor = "#000000"; // Color for the border
    const { customer } = challanDataa;
    console.log(challanDataa, "==");

    // Dispatch To (Customer Billing Details)
    doc.fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#0047AB")
        .text("DISPATCH TO:", leftX, initialY);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(customer?.name, leftX, initialY + 15);
    doc.fontSize(9)
        .fillColor("#4B4E4F")
        .text(
            `${customer?.billingAddress?.street1},${customer?.billingAddress?.street2}`,
            leftX,
            doc.y + 5,
            { width: 250, align: "left" }
        );
    doc.text(
        `${customer?.billingAddress?.city}, ${customer?.billingAddress?.state}, ${customer?.billingAddress?.pincode}`,
        leftX,
        doc.y + 5,
        { width: 250 }
    );

    // Add GST No and PAN No with bold labels
    const currentY = doc.y + 5;
    let gst = `GST No :${customer?.gstNo || ""}`;
    let pan = `PAN No :${customer?.panNo || ""}`;
    doc.font("Helvetica-Bold").text(gst, leftX, currentY, {
        width: 150,
    });
    doc.font("Helvetica-Bold").text(pan, 165, currentY, { width: 150 });

    const dispatchToEndY = doc.y;

    doc.fontSize(12)
        .fillColor("#0047AB")
        .text("DISPATCH FROM:", rightX, initialY);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(organizationData?.companyName, rightX, initialY + 15);
    doc.fontSize(9)
        .fillColor("#4B4E4F")
        .text(
            `${organizationData?.billingAddress?.street1},${organizationData?.billingAddress?.street2}`,
            rightX,
            doc.y + 5,
            { width: 250, align: "left" }
        );
    doc.text(
        `${organizationData?.billingAddress?.city}, ${organizationData?.billingAddress?.state}, ${organizationData?.billingAddress?.pincode}`,
        rightX,
        doc.y + 5,
        { width: 250 }
    );

    const dispatchFromEndY = doc.y;

    // Draw horizontal line after dispatch details
    const endY = Math.max(dispatchToEndY, dispatchFromEndY) + 5;
    doc.moveTo(5, endY)
        .lineTo(doc.page.width - 4, endY)
        .stroke(borderColor);

    // Draw vertical line separating Dispatch To and Dispatch From sections
    doc.moveTo(300, initialY - 10)
        .lineTo(300, endY)
        .stroke(borderColor);

    // Update doc.y to ensure it starts after the details section
    doc.y = endY;
};

const footerForInvoice = (doc, invoiceData, organizationData) => {
    const initialY = doc.y + 20;

    doc.fontSize(10);
    doc.fill("#000");
    // Gross Total and Tax Amount on the right
    doc.font("Helvetica-Bold");
    const startX = 390;
    const valueX = 475;
    const startY = initialY + 30;

    doc.text("Gross Total:", startX, startY);
    doc.text("Tax Amount:", startX, startY + 30);
    doc.rect(startX - 20, startY + 60, 200, 30).fill("#0047AB");
    doc.fill("#fff");
    doc.text("Grand Total:", startX, startY + 70).fillColor("#000");

    doc.fill("#000");
    doc.text(`${invoiceData?.grossTotal || ""}`, valueX, startY);
    doc.text(`${invoiceData?.taxAmount || ""}`, valueX, startY + 30);
    doc.fill("#fff");
    doc.text(`${invoiceData?.grandTotal}`, valueX, startY + 70);

    // Organization Banking Details on the left
    const bankDetailsStartX = 30;
    const bankDetailsStartY = initialY + 30;

    doc.fill("#000");
    doc.font("Helvetica-Bold");
    doc.text("Banking Details:", bankDetailsStartX, bankDetailsStartY);
    doc.font("Helvetica-Bold");
    doc.text(`Bank Name: `, bankDetailsStartX, bankDetailsStartY + 15, {
        continued: true,
    })
        .font("Helvetica")
        .text(`${organizationData?.bankName || ""}`);
    doc.font("Helvetica-Bold");
    doc.text(`Account No: `, bankDetailsStartX, bankDetailsStartY + 30, {
        continued: true,
    })
        .font("Helvetica")
        .text(`${organizationData?.accountNo}`);
    doc.font("Helvetica-Bold");
    doc.text(`IFSC Code: `, bankDetailsStartX, bankDetailsStartY + 45, {
        continued: true,
    })
        .font("Helvetica")
        .text(`${organizationData?.ifscCode}`);

    // Thank you message
    const thankYouY = startY + 110; // Adjust this value to position the thank you message properly
    doc.fill("#0047AB").text("THANK YOU FOR YOUR BUSINESS", 225, thankYouY);
};

const footerForQuotation = (doc, quotationData) => {
    const initialY = doc.y + 20;

    doc.fontSize(10);
    doc.fill("#000");

    // Gross Total and Grand Total on the right
    doc.font("Helvetica-Bold");
    const startX = 390;
    const valueX = 475;
    let startY = initialY + 30;

    doc.text("Gross Total:", startX, startY);
    doc.text(`${quotationData?.grossTotal}`, valueX, startY);

    // Adjust startY if there is a transport amount
    if (quotationData?.transportAmount) {
        startY += 30;
        doc.text("Transport:", startX, startY);
        doc.text(`${quotationData?.transportAmount}`, valueX, startY);
    }

    // Move to the next line for Tax Percent if it exists
    if (quotationData?.gstPercent) {
        startY += 30;
        doc.text("Tax Percent:", startX, startY);
        doc.text(`${quotationData?.gstPercent}%`, valueX, startY);
    }

    if (quotationData?.taxAmount) {
        startY += 30;
        doc.text("Tax Amount:", startX, startY);
        doc.text(`${quotationData?.taxAmount}%`, valueX, startY);
    }

    // Draw rectangles and Grand Total text
    startY += 30;
    doc.rect(startX - 20, startY, 200, 30).fill("#0047AB");
    doc.fill("#fff");
    doc.text("Grand Total:", startX, startY + 10).fillColor("#000");
    doc.fill("#fff");
    doc.text(`${quotationData?.grandTotal}`, valueX, startY + 10).fillColor(
        "#000"
    );

    // Terms and Conditions on the left
    const termsStartX = 20;
    let termsStartY = doc.y + 20; // Adjust this value to position the Terms and Conditions properly
    if (
        quotationData?.paymentCondition ||
        quotationData?.deliveryCondition ||
        quotationData?.validityCondition ||
        quotationData?.cancellationCondition
    ) {
        doc.fill("#000");
        doc.font("Helvetica-Bold");
        doc.text("Terms and Conditions:", termsStartX, termsStartY);
        doc.font("Helvetica");

        // Define line height and max width for wrapping
        const lineHeight = 5; // Adjust this value as needed for line spacing
        const maxWidth = 450; // Adjust this value as needed for text wrapping

        let currentY = termsStartY + lineHeight * 2; // Start position for the first line after the "Terms and Conditions" heading

        const addCondition = (conditionName, conditionValue) => {
            let conditionText = `${conditionName.toUpperCase()} : ${conditionValue}`;
            if (conditionName) {
                doc.font("Helvetica-Bold").text(
                    `${conditionText} : `,
                    termsStartX,
                    currentY,
                    { width: maxWidth }
                );
                currentY = doc.y + lineHeight; // Adjust Y position for the next condition
            }
        };

        addCondition("Delivery Condition", quotationData?.deliveryCondition);
        addCondition("Payment Condition", quotationData?.paymentsCondition);
        addCondition("Validity Condition", quotationData?.validityCondition);
        addCondition(
            "Cancellation Condition",
            quotationData?.cancellationCondition
        );

        // Thank you message
        const thankYouY = currentY + 20; // Adjust this value to position the thank you message properly
        doc.fill("#0047AB").text("THANK YOU FOR YOUR BUSINESS", 225, thankYouY);
    }
};

const footerForPurchaseOrder = (doc, purchaseOrderData) => {
    const initialY = doc.y + 20;

    doc.fontSize(10);
    doc.fill("#000");

    // Gross Total and Grand Total on the right
    doc.font("Helvetica-Bold");
    const startX = 390;
    const valueX = 475;
    let startY = initialY + 30;

    doc.text("Gross Total:", startX, startY);
    doc.text(`${purchaseOrderData?.grossTotal}`, valueX, startY);

    // Move to the next line for Tax Amount if it exists
    startY += 30;
    doc.text("Tax Amount:", startX, startY);
    doc.text(`${purchaseOrderData?.taxAmount || 0}`, valueX, startY);

    // Draw rectangles and Grand Total text
    startY += 30;
    doc.rect(startX - 20, startY, 200, 30).fill("#0047AB");
    doc.fill("#fff");
    doc.text("Grand Total:", startX, startY + 10).fillColor("#000");
    doc.fill("#fff");
    doc.text(`${purchaseOrderData?.grandTotal}`, valueX, startY + 10).fillColor(
        "#000"
    );

    // Terms and Conditions on the left, only if payment or cancellation conditions exist
    if (
        purchaseOrderData?.paymentCondition ||
        purchaseOrderData?.cancellationCondition
    ) {
        const termsStartX = 20;
        let termsStartY = doc.y + 20; // Adjust this value to position the Terms and Conditions properly

        doc.fill("#000");
        doc.font("Helvetica-Bold");
        doc.text("Terms and Conditions:", termsStartX, termsStartY);
        doc.font("Helvetica");

        // Define line height and max width for wrapping
        const lineHeight = 5; // Adjust this value as needed for line spacing
        const maxWidth = 450; // Adjust this value as needed for text wrapping

        let currentY = termsStartY + 20; // Start position for the first line after the "Terms and Conditions" heading

        const addCondition = (conditionName, conditionValue) => {
            if (conditionValue) {
                let conditionText = `${conditionName.toUpperCase()} : ${conditionValue}`;
                doc.font("Helvetica-Bold").text(
                    `${conditionText}.`,
                    termsStartX,
                    currentY,
                    { width: 500, align: "left" }
                );
                currentY = doc.y + lineHeight; // Adjust Y position for the next condition
            }
        };

        addCondition("Payment Condition", purchaseOrderData?.paymentCondition);
        addCondition(
            "Cancellation Condition",
            purchaseOrderData?.cancellationCondition
        );

        // Thank you message
        const thankYouY = currentY + 20; // Adjust this value to position the thank you message properly
        doc.fill("#0047AB").text("THANK YOU FOR YOUR BUSINESS", 225, thankYouY);
    } else {
        // Thank you message, in case there are no terms and conditions
        const thankYouY = doc.y + 40; // Adjust this value to position the thank you message properly
        doc.fill("#0047AB").text("THANK YOU FOR YOUR BUSINESS", 225, thankYouY);
    }
};
const footerForChallan = (doc, quotationData) => {
    const initialY = doc.y + 20;

    doc.fontSize(10);
    doc.fill("#000");

    // Gross Total and Grand Total on the right
    doc.font("Helvetica-Bold");
    const startX = 390;
    const valueX = 475;
    let startY = initialY + 30;

    doc.text("Gross Total:", startX, startY);
    doc.text(`${quotationData?.grossTotal}`, valueX, startY);

    // Adjust startY if there is a transport amount
    if (quotationData?.transportAmount) {
        startY += 30;
        doc.text("Transport:", startX, startY);
        doc.text(`${quotationData?.transportAmount}`, valueX, startY);
    }

    // Move to the next line for Tax Percent if it exists
    if (quotationData?.taxAmount) {
        startY += 30;
        doc.text("Tax Amount:", startX, startY);
        doc.text(`${quotationData?.taxAmount}`, valueX, startY);
    }

    // Draw rectangles and Grand Total text
    startY += 30;
    doc.rect(startX - 20, startY, 200, 30).fill("#0047AB");
    doc.fill("#fff");
    doc.text("Grand Total:", startX, startY + 10).fillColor("#000");
    doc.fill("#fff");
    doc.text(`${quotationData?.grandTotal}`, valueX, startY + 10).fillColor(
        "#000"
    );

    // // Terms and Conditions on the left
    // const termsStartX = 20;
    // let termsStartY = doc.y + 20; // Adjust this value to position the Terms and Conditions properly
    // if (
    //     quotationData?.paymentCondition ||
    //     quotationData?.deliveryCondition ||
    //     quotationData?.validityCondition ||
    //     quotationData?.cancellationCondition
    // ) {
    //     doc.fill("#000");
    //     doc.font("Helvetica-Bold");
    //     doc.text("Terms and Conditions:", termsStartX, termsStartY);
    //     doc.font("Helvetica");

    //     // Define line height and max width for wrapping
    //     const lineHeight = 5; // Adjust this value as needed for line spacing
    //     const maxWidth = 450; // Adjust this value as needed for text wrapping

    //     let currentY = termsStartY + lineHeight * 2; // Start position for the first line after the "Terms and Conditions" heading

    //     const addCondition = (conditionName, conditionValue) => {
    //         let conditionText = `${conditionName.toUpperCase()} : ${conditionValue}`;
    //         if (conditionName) {
    //             doc.font("Helvetica-Bold").text(
    //                 `${conditionText} : `,
    //                 termsStartX,
    //                 currentY,
    //                 { width: maxWidth }
    //             );
    //             currentY = doc.y + lineHeight; // Adjust Y position for the next condition
    //         }
    //     };

    //     addCondition("Delivery Condition", quotationData?.deliveryCondition);
    //     addCondition("Payment Condition", quotationData?.paymentsCondition);
    //     addCondition("Validity Condition", quotationData?.validityCondition);
    //     addCondition(
    //         "Cancellation Condition",
    //         quotationData?.cancellationCondition
    //     );

    // Thank you message
    const thankYouY = doc.y + 20; // Adjust this value to position the thank you message properly
    doc.fill("#0047AB").text("THANK YOU FOR YOUR BUSINESS", 225, thankYouY);
    // }
};

export default defaultPdfTemplate;
