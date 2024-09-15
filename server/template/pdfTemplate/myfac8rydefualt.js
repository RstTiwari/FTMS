import PDFDocument from "pdfkit";
import { jsDateIntoDDMMYY } from "../../Helper/timehelper.js";
import {
    downloadImage,
    getPrimaryOrFirstBank,
    capitalizeFirstLetter,
} from "../../Helper/pdfHelper.js";

const borderColor = "#000000"; // Color for the border
const leftMargin = 10;
const topMargin = 10;
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
        const doc = new PDFDocument({
            size: [595, 842],
            margin: 50,
            bufferPages: true,
        });
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

        // Items Section with Logic for Page Breaks
        const itemsPerPage = 18; // Number of items per page
        const totalItems = entityData.items.length;

        // Calculate the number of pages needed
        let totalPages = Math.ceil(totalItems / itemsPerPage);

        // Ensure the number of pages based on total items and rules
        if (totalItems <= 15) {
            totalPages = 1;
        } else if (totalItems > 15 && totalItems <= 30) {
            totalPages = 2;
        } else if (totalItems > 30 && totalItems <= 45) {
            totalPages = 3;
        } else {
            totalPages = Math.ceil(totalItems / itemsPerPage);
        }

        // Function to add items to pages
        const addItemsWithPagination = (doc, entityData, itemsPerPage) => {
            let currentPage = 1;
            let itemIndex = 0;
            doc.rect(leftMargin, doc.y, doc.page.width - 20, 30).fill(
                "#000000"
            );

            while (currentPage <= totalPages) {
                const itemsForPage = entityData.items.slice(
                    itemIndex,
                    itemIndex + itemsPerPage
                );

                // Add Items Table for the current page
                if (entity.toLowerCase() === "workorders") {
                    itemTableForWorkOrder(
                        doc,
                        entityData,
                        entity,
                        organizationData
                    );
                } else {
                    addItemsTable(
                        doc,
                        { ...entityData, items: itemsForPage },
                        entity,
                        organizationData
                    );
                }

                itemIndex += itemsPerPage;

                if (currentPage < totalPages) {
                    doc.addPage();
                    addPageBorder(doc); // Add border for the new page
                }

                currentPage++;
            }
            // After the last page's table, calculate and add the bottom border
            const bottomBorderY = doc.page.height - 20; // Adjust y position as needed

            // Draw footer background
        };

        // Add items with pagination logic
        addItemsWithPagination(doc, entityData, itemsPerPage);

        // Footer Section
        // addFooter(doc, entityData, entity, organizationData);

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
    const headerTextColor = "#0047AB"; // Color for the header text
    const borderColor = "#000000"; // Color for the border
    const borderWeight = 1; // Weight for the border

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
            : entity == "workorders"
            ? "Work Order"
            : "";

    doc.fontSize(12)
        .fillColor("#000000")
        .font("Helvetica-Bold")
        .text(title, leftMargin + 5, leftMargin + 5, {
            align: "center",
        });
    let titleBorder = doc.y;
    doc.moveTo(leftMargin, doc.y) // Adjust the Y position if necessary
        .lineTo(pageWidth - leftMargin, doc.y)
        .stroke(borderColor);

    // Image Section
    const imageWidth = 50;
    const imageHeight = 50;
    const imageY = doc.y + 5; // Y position for the image
    if (imageBuffer) {
        try {
            doc.image(imageBuffer, leftMargin + 5, doc.y + 5, {
                width: imageWidth,
                height: imageHeight,
            });
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

    // Concatenate address lines and calculate position
    let fullAddress =
        `${address}\n` + // Ensure a new line for address
        `Phone: ${phoneNumber}\n` + // Phone number in one line
        `Email: ${email}\n`; // Email in one line with spacing above

    // Add website only if it's present
    if (website) {
        fullAddress += `Website: ${website}\n`;
    }

    fullAddress += `GST No: ${gstNo}\nPAN No: ${panNo}`; // GST and PAN in the last line

    const headerTextY = imageY;

    // Draw text
    doc.fontSize(12)
        .fillColor(headerTextColor)
        .font("Helvetica-Bold")
        .text(
            organization?.companyName?.toUpperCase(),
            leftMargin + imageWidth + 10,
            doc.y + 5,
            {
                width: 230,
                align: "left",
            }
        );

    doc.fontSize(addressFontSize)
        .fillColor(addressColor)
        .font("Helvetica")
        .text(fullAddress, leftMargin + imageWidth + 10, doc.y, {
            width: 230,
            align: "left",
        });

    let leftY = doc.y;
    // Add dynamic header details based on entity
    let detailsY = imageY;
    const detailFontSize = 10;
    const detailWidth = 150;
    const xForRightSide = 310;

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
        console.log(detailsY, "==");
    } else if (entity.toLowerCase() === "quotations") {
        doc.fontSize(detailFontSize)
            .fillColor("#000000")
            .font("Helvetica-Bold")
            .text(`Quote No:`, xForRightSide, detailsY, {
                width: detailWidth,
                align: "left",
            });
        doc.font("Helvetica").text(
            `${entityPrefix}/${entityDetails.no}`,
            xForRightSide + 75,
            detailsY,
            {
                width: detailWidth,
                align: "left",
            }
        );
        detailsY += 20;
        doc.font("Helvetica-Bold").text(
            `Quote Date:`,
            xForRightSide,
            detailsY,
            {
                width: detailWidth,
                align: "left",
            }
        );
        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(entityDetails.quoteDate)}`,
            xForRightSide + 75,
            detailsY,
            { width: detailWidth, align: "left" }
        );
        detailsY += 20;
        doc.font("Helvetica-Bold").text(`Due Date:`, xForRightSide, detailsY, {
            width: detailWidth,
            align: "left",
        });

        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(entityDetails.expiryDate)}`,
            xForRightSide + 75,
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
        let vehicleDetails = `Vehicle No: ${entityDetails?.vehicleNo || ""}`;
        doc.font("Helvetica-Bold")
            .fontSize(9)
            .text(vehicleDetails, 360, detailsY, {
                width: detailWidth,
                align: "left",
            });
    } else if (entity.toLowerCase() === "workorders") {
        const { type, no, startDate, dueDate, incharge, status } =
            entityDetails;

        // Draw Work Order Type
        doc.fontSize(10)
            .fillColor("#000000")
            .font("Helvetica-Bold")
            .text(`Workorder Type:`, 360, detailsY, {
                width: detailWidth,
                align: "left",
            });
        doc.font("Helvetica").text(`${type}`, 460, detailsY, {
            width: detailWidth,
            align: "left",
        });
        detailsY += 20;

        // Draw Work Order No
        doc.font("Helvetica-Bold").text(`Work Order No:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });
        doc.font("Helvetica").text(`${no}`, 460, detailsY, {
            width: detailWidth,
            align: "left",
        });
        detailsY += 20;

        // Draw Start Date
        doc.font("Helvetica-Bold").text(`Start Date:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });
        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(startDate)}`,
            460,
            detailsY,
            {
                width: detailWidth,
                align: "left",
            }
        );
        detailsY += 20;

        // Draw Due Date
        doc.font("Helvetica-Bold").text(`Due Date:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });
        doc.font("Helvetica").text(
            `${jsDateIntoDDMMYY(dueDate)}`,
            460,
            detailsY,
            {
                width: detailWidth,
                align: "left",
            }
        );
        detailsY += 20;

        // Draw In Charge
        doc.font("Helvetica-Bold").text(`In Charge:`, 360, detailsY, {
            width: detailWidth,
            align: "left",
        });
        doc.font("Helvetica").text(`${incharge}`, 460, detailsY, {
            width: detailWidth,
            align: "left",
        });
        detailsY += 20;
    }

    // Adjust doc.y to the greater Y value between left and right sections
    // Adjust doc.y to the greater Y value between left and right sections
    let headerY = Math.max(leftY, detailsY);
    // Draw a horizontal line after the header details
    const horizontalLineY = headerY + 10;
    doc.moveTo(leftMargin, horizontalLineY) // Starting at x=4, y=horizontalLineY
        .lineTo(pageWidth - leftMargin, horizontalLineY - 2) // Ending at x=pageWidth - 4, y=horizontalLineY
        .stroke(borderColor);
    // Draw a horizontal line after the header details
    doc.moveTo(300, horizontalLineY)
        .lineTo(300, titleBorder)
        .stroke(borderColor);
    doc.y = horizontalLineY;

    return doc;
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

const addItemsTable = (doc, entityData, entity) => {
    const items = entityData?.items;
    console.log(items[0]);
    const headers = getTableHeaders(entity, items[0]); // Dynamically get headers based on the first item
    console.log(headers, "==");
    const headerHeight = 30;
    const cellPadding = 5;
    const borderColor = "#000000"; // Border color

    // Draw header background
    let tableHeaderY = doc.y + 12.5;

    // Draw header text
    let x = 20;
    doc.fontSize(8.5).font("Helvetica-Bold").fill("#fff");
    headers.forEach((header) => {
        doc.text(header.title, x, tableHeaderY, {
            width: header.width,
            align: "center",
        });
        x += header.width;
    });

    // Draw item rows
    let y = tableHeaderY + headerHeight + cellPadding;
    doc.fill("#000000").font("Helvetica").fontSize(8.5);

    items?.forEach((item, index) => {
        let x = 20;
        headers.forEach((header) => {
            switch (header.value) {
                case "srNo":
                    doc.text(index + 1, x, y); // Serial number
                    break;
                case "description":
                    doc.text(item.description, x, y, {
                        width: header.width,
                        align: "center",
                    });
                    break;
                case "hsnCode":
                    doc.text(item.hsnCode, x + cellPadding, y, {
                        width: header.width,
                        align: "center",
                    });
                    break;
                case "rate":
                    doc.text(Math.ceil(item.rate), x + cellPadding, y, {
                        width: header.width,
                        align: "center",
                    });
                    break;
                case "qty":
                    doc.text(item.qty, x + cellPadding, y, {
                        width: header.width,
                        align: "center",
                    });
                    break;
                case "gstPercent":
                    doc.text(`${item?.gstPercent || 0}%`, x + cellPadding, y, {
                        width: header.width,
                        align: "center",
                    });
                    break;
                case "gstAmount":
                    doc.text(`${item?.gstAmount || 0}`, x + cellPadding, y, {
                        width: header.width,
                        align: "center",
                    });
                    break;
                case "finalAmount":
                    doc.text(Math.ceil(item.finalAmount), x + cellPadding, y, {
                        width: header.width,
                        align: "center",
                    });
                    break;
                case "image":
                    // Handle image rendering if needed
                    break;
                default:
                    if (item[header.value] !== undefined) {
                        doc.text(item[header.value], x + cellPadding, y);
                    }
                    break;
            }
            x += header.width;
        });

        // Draw the bottom border for each row
        doc.moveTo(10, y + headerHeight - 5)
            .lineTo(doc.page.width - 10, y + headerHeight - 5) // Line covering the width of the table
            .stroke(borderColor);

        y += headerHeight;
    });
};

const addFooter = (doc, entityData, entity, organizationData) => {
    let footerDetails = () => {};
    switch (entity) {
        case "invoices":
            footerDetails = footerForQuotation;
            break;
        case "quotations":
            footerDetails = footerForQuotation;
            break;
        case "purchases":
            footerDetails = footerForQuotation;
            break;
        case "challans":
            footerDetails = footerForQuotation;
            break;
        default:
            break;
    }

    footerDetails(doc, entityData, organizationData, entity);
};
const addPageBorder = (doc) => {
    const borderColor = "#000000"; // Dark black color
    const borderWidth = 1; // Border width in points
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Calculate the dimensions for the border with the specified margin
    const innerWidth = pageWidth - 2 * leftMargin; // Width considering margins on both sides
    const innerHeight = pageHeight - 2 * topMargin; // Height considering margins on top and bottom

    // Draw the border around the page
    doc.rect(
        leftMargin, // X position (4px from the center)
        topMargin, // Y position (4px from the top)
        innerWidth, // Width of the rectangle (pageWidth - 2 * margin)
        innerHeight // Height of the rectangle (pageHeight - 2 * margin)
    )
        .lineWidth(borderWidth)
        .stroke(borderColor);
};
// Get Table Headers Function
const getTableHeaders = (entity, item) => {
    // Access the _doc property if available (Mongoose document case)
    const actualData = item._doc || item;
    switch (entity.toLowerCase()) {
        case "workorders":
            return [
                { title: "CODE", width: 50 },
                { title: "NAME", width: 400 },
                { title: "QTY", width: 50 },
            ];
        default:
            const allHeaders = [
                { title: "#", value: "srNo", width: 10 },
                { title: "CODE", value: "code", width: 30 },
                {
                    title: "DESCRIPTION",
                    value: "description",
                    width: 130,
                },
                { title: "IMAGE", value: "image", width: 50 },
                { title: "HSN CODE", value: "hsnCode", width: 30 },
                { title: "RATE", value: "rate", width: 30 },
                {
                    title: "DISCOUNT %",
                    value: "discountPercent",
                    width: 50,
                },
                {
                    title: "DISCOUNT AMOUNT",
                    value: "discountAmount",
                    width: 50,
                },
                { title: "QTY", value: "qty", width: 30 },
                { title: "GST%", value: "gstPercent", width: 25 },
                { title: "GST AMOUNT", value: "taxAmount", width: 40 },
                { title: "TOTAL AMOUNT", value: "finalAmount", width: 50 },
            ];
            // Filter headers based on keys present in the obj (or always include "serialNumber")
            // Log object keys for debugging

            // Filter headers based on matching keys in the obj (case-insensitive)
            return allHeaders.filter(
                (header) =>
                    header.value === "srNo" ||
                    Object.keys(actualData).some(
                        (key) =>
                            key.toLowerCase() === header.value.toLowerCase()
                    )
            );
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
        .text("BILLING TO:", leftX, initialY + 10);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(customer?.name, leftX, doc.y + 5);
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
    let pagGst = `GST No :${customer?.gstNo || ""}\nPAN No :${
        customer?.panNo || ""
    }`;

    doc.font("Helvetica-Bold").text(pagGst, leftX, currentY, {
        width: 200,
    });

    const billingEndY = doc.y;

    // Customer Shipping Details
    doc.fontSize(12)
        .fillColor("#0047AB")
        .font("Helvetica-Bold")
        .text("SHIPPING TO:", rightX, initialY + 10);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(customer?.name, rightX, doc.y + 5);
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
    doc.moveTo(300, initialY).lineTo(300, endY).stroke(borderColor);

    // Update doc.y to ensure it starts after the details section
    doc.y = endY;
};

const detailsForQuotation = (doc, quotationData, organizationData, curY) => {
    const customer = quotationData?.customer;
    const sub = quotationData?.sub;
    const salesPerson = quotationData?.salesPerson;
    let initialY = doc.y;
    let leftX = 15;

    // Calculate width of "TO:" text
    doc.fontSize(10).font("Helvetica-Bold");
    const toText = "Buyer:";
    const toTextWidth = doc.widthOfString(toText);

    // Customer Details
    doc.fillColor("#1E1F20").text(toText, leftX, initialY + 10);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .text(
            customer?.name?.toUpperCase() || "",
            leftX + toTextWidth + 5,
            initialY + 10
        );

    // Optional subject line
    if (sub) {
        let subText = `Sub : ${quotationData?.sub || ""}`;
        doc.fontSize(10)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text(subText, leftX, doc.y + 10);
    }
    // Optional subject line
    if (salesPerson) {
        let subText = `Sales Executive : ${quotationData?.salesPerson || ""}`;
        doc.fontSize(10)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text(subText, leftX, doc.y + 10);
    }

    const customerEndY = doc.y;

    // Draw horizontal line after customer details
    doc.moveTo(leftMargin, customerEndY + 5)
        .lineTo(doc.page.width - leftMargin, customerEndY + 5)
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
    const { vendor, deliveryAddress, delivery } = purchaseOrderData;

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
        vendorAddress = `${street1} ${street2} \n${city} ${state} ${pincode} \nGST No: ${gstNo}\nPAN No: ${panNo}`;
    }

    doc.fontSize(12)
        .fillColor("#0047AB")
        .font("Helvetica-Bold")
        .text("SUPPLIER:", leftX, initialY + 10);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(vendor?.name?.toUpperCase() || "", leftX, doc.y + 5);
    doc.fontSize(9)
        .fillColor("#4B4E4F")
        .text(vendorAddress, leftX, doc.y + 5, { width: 300, align: "left" });

    const supplierEndY = doc.y;

    // Delivery To Details
    const { to, address } = delivery;
    doc.fontSize(12)
        .fillColor("#0047AB")
        .font("Helvetica-Bold")
        .text("BUYER:", rightX, initialY + 10);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(to?.toUpperCase() || "", rightX, doc.y + 5);
    doc.fontSize(9)
        .fillColor("#4B4E4F")
        .text(`${address?.street1},${address?.street2}`, rightX, doc.y + 5, {
            width: 280,
            align: "left",
        });
    doc.text(
        `${address?.city}, ${address?.state}, ${address?.pincode}`,
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
    doc.moveTo(300, initialY).lineTo(300, endY).stroke(borderColor);

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

    // Dispatch To (Customer Billing Details)
    doc.fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#0047AB")
        .text("DISPATCH TO:", leftX, initialY + 10);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(customer?.name, leftX, doc.y + 5);
    doc.fontSize(9)
        .fillColor("#4B4E4F")
        .text(
            `${customer?.billingAddress?.street1},${customer?.billingAddress?.street2}`,
            leftX,
            doc.y + 5,
            { width: 250, align: "left" }
        );
    doc.text(
        `${customer?.billingAddress?.city}, ${
            customer?.billingAddress?.state
        }, ${customer?.billingAddress?.pincode}\nGST No :${
            customer?.gstNo || ""
        }\nPAN No :${customer?.panNo || ""}`,
        leftX,
        doc.y + 5,
        { width: 250 }
    );

    const dispatchToEndY = doc.y;

    doc.fontSize(12)
        .fillColor("#0047AB")
        .text("DISPATCH FROM:", rightX, initialY + 10);
    doc.fontSize(10)
        .fillColor("#1E1F20")
        .font("Helvetica-Bold")
        .text(organizationData?.companyName, rightX, doc.y + 5);
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
    doc.moveTo(300, initialY).lineTo(300, endY).stroke(borderColor);

    // Update doc.y to ensure it starts after the details section
    doc.y = endY;
};

const footerForQuotation = (doc, data, organizationData, entity) => {
    const initialY = doc.y + 20;
    doc.fontSize(10);
    doc.fill("#000");

    if (entity === "invoices") {
        // Organization Banking Details on the left
        const { bankDetails } = organizationData;
        let primaryBank = getPrimaryOrFirstBank(bankDetails);

        const bankDetailsStartX = 10;
        const bankDetailsStartY = initialY;

        doc.fill("#000");
        doc.font("Helvetica-Bold");
        doc.text("Banking Details:", bankDetailsStartX, bankDetailsStartY);
        doc.font("Helvetica-Bold");
        doc.text(`Bank Name: `, bankDetailsStartX, bankDetailsStartY + 15, {
            continued: true,
        })
            .font("Helvetica")
            .text(`${primaryBank?.bankName || ""}`);
        doc.font("Helvetica-Bold");
        doc.text(`Account No: `, bankDetailsStartX, bankDetailsStartY + 30, {
            continued: true,
        })
            .font("Helvetica")
            .text(`${primaryBank?.accountNo || ""}`);
        doc.font("Helvetica-Bold");
        doc.text(`IFSC Code: `, bankDetailsStartX, bankDetailsStartY + 45, {
            continued: true,
        })
            .font("Helvetica")
            .text(`${primaryBank?.ifscCode || ""}`);
    }

    // Gross Total and Grand Total on the right
    doc.font("Helvetica-Bold");
    const startX = 390;
    const valueX = 475;
    let startY = initialY;
    let amountSideLineStart = startY - 3;
    if (data?.grossTotal) {
        doc.text("Gross Total:", startX, startY);
        doc.text(`${data?.grossTotal}`, valueX, startY);
        doc.moveTo(startX - 20, doc.y + 1)
            .lineTo(doc.page.width - 4, doc.y + 1)
            .stroke(borderColor);
    }

    if (data?.taxAmount) {
        startY += 20;
        doc.text("Tax Amount:", startX, startY);
        doc.text(`${data?.taxAmount}`, valueX, startY);
        doc.moveTo(startX - 20, doc.y + 1)
            .lineTo(doc.page.width - 4, doc.y + 1)
            .stroke(borderColor);
    }
    // Draw a table for the other charges
    if (data?.otherCharges?.length > 0) {
        // Draw other charges
        startY += 20;
        data.otherCharges.forEach((charge, index) => {
            doc.text(
                capitalizeFirstLetter(`${charge.chargeName}:`),
                startX,
                startY
            );
            let pre = charge?.rsOrPercent === "rupee" ? "Rs" : "%";
            doc.text(`${charge.amount}  ${pre}`, valueX, startY);
            startY += 20;
            let othersy = doc.y + 1;
            doc.moveTo(startX - 20, othersy)
                .lineTo(doc.page.width - 4, othersy)
                .stroke(borderColor);
        });
    }

    // Draw rectangles and Grand Total text
    if (data?.grandTotal) {
        startY += 20;
        doc.moveTo(startX - 20, doc.y + 2)
            .lineTo(startX - 20, amountSideLineStart)
            .stroke(borderColor);
        doc.rect(startX - 20, doc.y + 2, 222, 30).fill("#0047AB");
        doc.fill("#fff");
        let grandY = doc.y + 12.5;
        doc.text("Grand Total:", startX, grandY).fillColor("#000");
        doc.fill("#fff");
        doc.text(`${data?.grandTotal}`, valueX, grandY).fillColor("#000");
    }

    // Terms and Conditions on the left
    if (data?.notes?.length > 0) {
        let termsStartY = doc.y + 15;
        let termsStartX = 4;

        doc.fill("#000");
        doc.font("Helvetica-Bold");
        doc.fontSize(12);
        doc.text("Note:", 4, termsStartY);
        doc.font("Helvetica");
        // Draw other charges
        doc.moveTo(termsStartX, termsStartY + 15)
            .lineTo(doc.page.width - 4, termsStartY + 15)
            .stroke(borderColor);
        let startX = 8;
        let startY = doc.y + 5;
        data.notes.forEach((note, index) => {
            doc.font("Helvetica");
            doc.fontSize(10);
            doc.text(capitalizeFirstLetter(`${index + 1}.`), startX, startY);
            doc.font("Helvetica");
            doc.text(`${note}`, startX + 10, startY);
            startY = doc.y + 10;
        });
        doc.moveTo(termsStartX, doc.y + 10)
            .lineTo(doc.page.width - 4, doc.y + 10)
            .stroke(borderColor);
    }

    // Terms and Conditions on the left
    if (data?.terms?.length > 0) {
        let termsStartY = doc.y + 30;
        let termsStartX = 4;

        doc.fill("#000");
        doc.font("Helvetica-Bold");
        doc.fontSize(12);
        doc.text("Terms and Conditions:", 4, termsStartY);
        doc.font("Helvetica");
        // Draw other charges
        doc.moveTo(termsStartX, termsStartY + 15)
            .lineTo(doc.page.width - 4, termsStartY + 15)
            .stroke(borderColor);
        let startX = 8;
        let startY = doc.y + 5;
        data.terms.forEach((term, index) => {
            doc.font("Helvetica-Bold");
            doc.fontSize(10);
            doc.text(capitalizeFirstLetter(`${term.name}:`), startX, startY);
            doc.font("Helvetica");
            doc.text(
                capitalizeFirstLetter(`${term.value}`),
                startX + 100,
                startY
            );
            startY = doc.y + 10;
            doc.moveTo(termsStartX, doc.y + 5)
                .lineTo(doc.page.width - 4, doc.y + 5)
                .stroke(borderColor);
        });
    }
    // Thank you message
    const thankYouY = doc.y + 50; // Adjust this value to position the thank you message properly
    doc.fill("#0047AB").text("THANK YOU FOR YOUR BUSINESS", 225, thankYouY);
};
const itemTableForWorkOrder = (doc, entityData, entity) => {
    // Define headers for the work orders table
    const headers = getTableHeaders(entity);

    const headerHeight = 30;
    const cellPadding = 5;
    const items = entityData?.items;
    const borderColor = "#000000"; // Border color

    // Draw header background
    let tableHeaderY = doc.y + 12.5;

    // Draw header text
    let x = 20;
    doc.fontSize(8).font("Helvetica-Bold").fill("#fff");
    headers.forEach((header) => {
        doc.text(header.title, x, tableHeaderY);
        x += header.width;
    });

    // Draw item rows
    let y = tableHeaderY + headerHeight + cellPadding;
    doc.fill("#000000").font("Helvetica");

    items?.forEach((item) => {
        let x = 20;

        headers.forEach((header) => {
            // Extract product details
            const productCode = item.product?.code || "";
            const productName = item.product?.name || "";
            const qty = item.qty || "";
            switch (header.title.toUpperCase()) {
                case "CODE":
                    doc.text(
                        capitalizeFirstLetter(`${item.product?.code}`) || "",
                        x,
                        y,
                        {
                            width: header.width,
                            align: "left",
                        }
                    );
                    break;
                case "NAME":
                    if (productName) {
                        doc.text(item.product?.name || "", x, y, {
                            width: header.width,
                            align: "left",
                        });
                    } else {
                        // Print a placeholder or empty string if the name is missing
                        doc.text("N/A", x, y, {
                            width: header.width,
                            align: "left",
                        });
                    }

                    break;
                case "QTY":
                    doc.text(item.qty || "", x, y, {
                        width: header.width,
                        align: "left",
                    });
                    break;
                default:
                    break;
            }
            x += header.width;
        });

        // Draw the bottom border for each row
        doc.moveTo(4, y + headerHeight - 5)
            .lineTo(591, y + headerHeight - 5) // Line covering the width of the table
            .stroke(borderColor);

        y += headerHeight;
    });
};

export default defaultPdfTemplate;
