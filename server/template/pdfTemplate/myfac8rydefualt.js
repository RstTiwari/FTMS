//import PDFDocument from "pdfkit";
import PDFDocumentWithTables from "pdfkit-table";
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
    entityPrefix,
    preCol
) => {
    try {
        const imageBuffer = await downloadImage(organizationData?.logo);
        const doc = new PDFDocumentWithTables({
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

        // Function to add items to pages

        // addItemsTable(doc, entityData, entity, organizationData, preCol);
        addItemsTable2(doc, entityData, entity, organizationData, preCol);

        // Footer Section
        const gapThreshold = 300;
        // Footer Section
        checkAndAddPage(doc, gapThreshold); // Check before adding Amount Details
        addAmountDetails(doc, entityData, organizationData, entity);

        checkAndAddPage(doc, gapThreshold); // Check before adding Notes Table
        addNotesTable(doc, entityData);

        checkAndAddPage(doc, gapThreshold); // Check before adding Terms and Thank You
        addTermsAndThankYou(doc, entityData);
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
const checkAndAddPage = (doc, requiredHeight) => {
    const availableSpace = doc.page.height - doc.y;
    console.log(availableSpace, doc.y, doc.page.height, "===");
    if (availableSpace < requiredHeight) {
        doc.addPage(); // Add new page if there's not enough space
        addPageBorder(doc);
    }
};

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
    if (organization?.billingAddress) {
        address = `${organization?.billingAddress?.street1 || ""} ${
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
            `${entityPrefix}/${entityDetails?.no}`,
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

// const addItemsTable = (doc, entityData, entity, organizationData, preCol) => {
//     // const items = entityData?.items;
//     // const headers = getTableHeaders2(entity, preCol); // Dynamically get headers based on the first item
//     // const headerHeight = 30;
//     // const cellPadding = 5;
//     // const borderColor = "#000000"; // Border color
//     // const pageMargin = 10; // Margin for the page
//     // const rowGap = 15; // Adjusted gap between rows
//     // const minRowHeightForNewPage = 100; // Minimum space required to add new row before adding a new page

//     // const drawTableHeader = () => {
//     //     let tableHeaderY = doc.y + 12.5;
//     //     doc.rect(
//     //         pageMargin,
//     //         doc.y,
//     //         doc.page.width - pageMargin * 2,
//     //         headerHeight
//     //     ).fill(borderColor); // Fill the background of header

//     //     // Draw header text
//     //     let x = pageMargin;
//     //     doc.fontSize(8.5).font("Helvetica-Bold").fill("#fff");
//     //     headers.forEach((header) => {
//     //         doc.text(header.title, x, tableHeaderY, {
//     //             width: header.width,
//     //             align: "center",
//     //         });
//     //         x += header.width;
//     //     });

//     //     return tableHeaderY + headerHeight; // Return Y position after header
//     // };

//     // const addNewPageIfNeeded = (rowHeight) => {
//     //     if (doc.y + rowHeight > doc.page.height - minRowHeightForNewPage) {
//     //         doc.addPage(); // Add a new page if the space left is less than the minimum required
//     //         doc.y = pageMargin; // Reset Y position for the new page
//     //         return drawTableHeader(); // Redraw the table header on the new page
//     //     }
//     //     return doc.y;
//     // };

//     // // Draw the initial table header
//     // let y = drawTableHeader();
//     // doc.fill("#000000").font("Helvetica").fontSize(8.5);

//     // // Store initial x positions for the vertical lines
//     // const initialXPositions = [];
//     // let x = pageMargin;
//     // headers.forEach((header) => {
//     //     initialXPositions.push(x + header.width);
//     //     x += header.width + 3; // Add extra spacing after each header
//     // });

//     // // Draw item rows
//     // // Draw item rows
//     // items?.forEach((item, index) => {
//     //     let x = pageMargin;

//     //     // Calculate the description height dynamically
//     //     const descriptionHeight = doc.heightOfString(item.description, {
//     //         width: headers.find((h) => h.value === "description").width,
//     //     });

//     //     // Calculate row height based on description height + padding
//     //     let textY = doc.y + 10;

//     //     let rowHeight = Math.max(
//     //         descriptionHeight + cellPadding + 10,
//     //         headerHeight
//     //     );
//     //     console.log(doc.y, rowHeight);

//     //     // Add new page if needed before drawing each row
//     //     y = addNewPageIfNeeded(rowHeight);

//     //     // Calculate vertical position for centered text within the row (dynamic adjustment)

//     //     // Draw vertical lines after each row
//     //     headers.forEach((header) => {
//     //         switch (header.value) {
//     //             case "srNo":
//     //                 doc.text(index + 1, x, textY, {
//     //                     width: header.width,
//     //                     align: "center",
//     //                 });
//     //                 break;
//     //             case "code":
//     //                 doc.text(item.code, x + cellPadding, textY, {
//     //                     width: header.width,
//     //                     align: "center",
//     //                 });
//     //                 break;
//     //             case "description":
//     //                 doc.text(item.description, x + cellPadding, textY, {
//     //                     width: header.width,
//     //                     align: "center",
//     //                 });
//     //                 break;
//     //             case "image":
//     //                 if (item?.image) {
//     //                     doc.text("", x + cellPadding, textY, {
//     //                         width: header.width,
//     //                         align: "center",
//     //                     });
//     //                     // Add image logic here if applicable
//     //                 }
//     //                 break;
//     //             case "hsnCode":
//     //                 doc.text(item.hsnCode || "", x + cellPadding, textY, {
//     //                     width: header.width,
//     //                     align: "center",
//     //                 });
//     //                 break;
//     //             case "rate":
//     //                 doc.text(Math.ceil(item.rate), x + cellPadding, textY, {
//     //                     width: header.width,
//     //                     align: "center",
//     //                 });
//     //                 break;
//     //             case "discountPercent":
//     //                 doc.text(
//     //                     `${item.discountPercent}%`,
//     //                     x + cellPadding,
//     //                     textY,
//     //                     {
//     //                         width: header.width,
//     //                         align: "center",
//     //                     }
//     //                 );
//     //                 break;
//     //             case "discountAmount":
//     //                 doc.text(
//     //                     Math.ceil(item.discountAmount),
//     //                     x + cellPadding,
//     //                     textY,
//     //                     {
//     //                         width: header.width,
//     //                         align: "center",
//     //                     }
//     //                 );
//     //                 break;
//     //             case "qty":
//     //                 doc.text(item.qty, x + cellPadding, textY, {
//     //                     width: header.width,
//     //                     align: "center",
//     //                 });
//     //                 break;
//     //             case "gstPercent":
//     //                 doc.text(
//     //                     `${item?.gstPercent || 0}%`,
//     //                     x + cellPadding,
//     //                     textY,
//     //                     {
//     //                         width: header.width,
//     //                         align: "center",
//     //                     }
//     //                 );
//     //                 break;
//     //             case "taxAmount":
//     //                 doc.text(
//     //                     `${item?.taxAmount || 0}`,
//     //                     x + cellPadding,
//     //                     textY,
//     //                     {
//     //                         width: header.width,
//     //                         align: "center",
//     //                     }
//     //                 );
//     //                 break;
//     //             case "finalAmount":
//     //                 doc.text(
//     //                     Math.ceil(item.finalAmount),
//     //                     x + cellPadding,
//     //                     textY,
//     //                     {
//     //                         width: header.width,
//     //                         align: "center",
//     //                     }
//     //                 );
//     //                 break;
//     //             default:
//     //                 if (item[header.value] !== undefined) {
//     //                     doc.text(item[header.value], x + cellPadding, textY);
//     //                 }
//     //                 break;
//     //         }

//     //         x += header.width;
//     //     });

//     //     // Draw horizontal line after each row
//     //     doc.moveTo(pageMargin, y + rowHeight)
//     //         .lineTo(doc.page.width - pageMargin, y + rowHeight)
//     //         .stroke(borderColor);

//     //     // Move Y position down for the next row
//     //     y += rowHeight;
//     // });

//     // // Draw the bottom closing rectangle after the last row
//     // doc.rect(pageMargin, y, doc.page.width - 2 * pageMargin, 5).fill(
//     //     borderColor
//     // );
//     const items = entityData?.items.map((item, index) => ({
//         srNo: index + 1,
//     }));
//     const headers = getTableHeaders2(entity, preCol);

//     // Ensure headers are well-defined
//     const tableHeaders = headers.map((header) => ({
//         label: header.title,
//         property: header.property,
//         width: header.width,
//         padding: 1, // default padding
//     }));

//     const table = {
//         headers: tableHeaders, // Correctly pass headers
//         datas: items,
//         rows: [], // You can define rows manually if needed
//     };

//     // Add the table to the PDF
//     doc.moveDown().table(table, {
//         prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
//         prepareRow: (row, i) => doc.font("Helvetica").fontSize(7),
//         padding: 5, // Add default padding in case it's missing
//     });
// };

const addItemsTable2 = (doc, entityData, entity, organizationData, preCol) => {
    // Add serial number (srNo) to each item
    const items = entityData?.items.map((item, index) => ({
        srNo: index + 1,
        code: item.code,
        description: item.description,
        image: item.image,
        hsnCode: item.hsnCode,
        rate: item.rate,
        discountPercent: item.discountPercent,
        discountAmount: item.discountAmount,
        gstPercent: item.gstPercent,
        qty: item.qty,
        taxAmount: item.taxAmount,
        finalAmount: item.finalAmount,
    }));

    const headers = getTableHeaders2(entity, preCol);
    console.log(headers);

    // Ensure headers are well-defined and add default padding
    const tableHeaders = headers.map((header) => ({
        label: header.title,
        property: header.property,
        width: header.width,
        padding: 1, // default padding for headers
    }));

    const table = {
        headers: tableHeaders, // Pass headers correctly
        datas: items, // Data (with added srNo)
        rows: [], // Define rows manually if needed
    };
    // Add border when a new page is added
    // Add border when a new page is added, only if gap from bottom is less than 200
    doc.on("pageAdded", () => {
        addPageBorder(doc); // Call your border function
    });

    // Add the table to the PDF
    doc.moveDown().table(table, {
        x: leftMargin,
        y: doc.y,
        prepareHeader: () => {
            doc.font("Helvetica-Bold").fontSize(9);
            // No height setting here; adjust lineGap instead
        },
        prepareRow: (row, i) => {
            doc.fillColor("#000000").font("Helvetica-Bold").fontSize(8);
        },
        padding: 1, // Add default padding for rows
        lineGap: 10, // Adjust line gap for row height

        columnStyles: {
            0: { align: "left" }, // Align the first column (srNo) to center
        },
        drawHeaderCell: (cell, rect) => {
            // Set font size and color for header
            doc.fontSize(10).fillColor("#000000").font("Helvetica-Bold");

            // Draw header with center alignment and vertical lines
            doc.fillColor("#000000").text(
                cell.label,
                rect.x + 10,
                rect.y + rect.height / 2,
                {
                    width: doc.page.width - 20, // Full width minus margins
                    height: rect.height,
                    align: "center", // Center-align headers
                    valign: "center", // Vertically center-align headers
                }
            );

            // Draw vertical lines
            doc.rect(rect.x, rect.y, rect.width, rect.height).stroke();
        },

        drawRowCell: (cell, rect) => {
            // Set font size and color for rows
            doc.fontSize(9).fillColor("#000000").font("Helvetica");

            // Center-align row cells and draw vertical lines
            doc.text(cell, rect.x + 10, rect.y + rect.height / 2, {
                width: doc.page.width - 20, // Full width minus margins
                height: rect.height,
                align: "center", // Center-align rows
                valign: "center", // Vertically center-align rows
            });

            // Draw vertical lines
            doc.rect(rect.x, rect.y, rect.width, rect.height).stroke();
        },
        afterPage: () => {
            // Draw border around the entire page after each page is generated
            addPageBorder(doc); // Call your border function here
        },
    });
};

const addAmountDetails = (doc, data, organizationData, entity) => {
    const bankDetailsTableData = [];

    // If entity is "invoices", add banking details as a table
    if (entity === "invoices") {
        const { bankDetails } = organizationData;
        let primaryBank = getPrimaryOrFirstBank(bankDetails);

        // Add banking details to the table data
        bankDetailsTableData.push({
            field: "Bank Name",
            value: `${primaryBank?.bankName || ""}`,
        });
        bankDetailsTableData.push({
            field: "Account No",
            value: `${primaryBank?.accountNo || ""}`,
        });
        bankDetailsTableData.push({
            field: "IFSC Code",
            value: `${primaryBank?.ifscCode || ""}`,
        });
        bankDetailsTableData.push({
            field: "Branch",
            value: `${primaryBank?.branch || ""}`,
        });
    }

    // Prepare data for the amount details table
    const amountDetailsTableData = [];

    // Gross Total
    if (data?.grossTotal) {
        amountDetailsTableData.push({
            description: "Gross Total",
            amount: `${data.grossTotal}`,
        });
    }

    // Tax Amount
    if (data?.taxAmount >= 0) {
        amountDetailsTableData.push({
            description: "Tax Amount",
            amount: `${data.taxAmount}`,
        });
    }

    // Other Charges
    if (data?.otherCharges?.length > 0) {
        data.otherCharges.forEach((charge) => {
            let pre = charge?.rsOrPercent === "rupee" ? "Rs" : "%";
            amountDetailsTableData.push({
                description: capitalizeFirstLetter(`${charge.chargeName}`),
                amount: `${charge.amount} ${pre}`,
            });
        });
    }

    // Grand Total
    if (data?.grandTotal) {
        amountDetailsTableData.push({
            description: "Grand Total",
            amount: `${data.grandTotal}`,
        });
    }

    // Define banking details table structure
    const bankDetailsTable = {
        headers: [
            { label: "", property: "field", width: 100 },
            { label: "", property: "value", width: 150 },
        ],
        datas: bankDetailsTableData,
    };

    // Define amount details table structure
    const amountDetailsTable = {
        headers: [
            { label: "", property: "description", width: 200 },
            { label: "", property: "amount", width: 100 },
        ],
        datas: amountDetailsTableData,
    };

    // Calculate table positions
    const tableSpacing = 10; // Spacing between the two tables
    const bankTableX = 10; // Start X position for the bank table
    let bankTableY = doc.y;
    const amountTableX = doc.page.width - 300 - 10; // Start X position for the amount table
    doc.fillColor(borderColor).fontSize(10).font("Helvetica-Bold");

    // Render bank details table on the left
    if (bankDetailsTableData.length > 0) {
        doc.table(bankDetailsTable, {
            x: bankTableX,
            y: bankTableY,
            prepareHeader: () => {
                doc.font("Helvetica-Bold").fontSize(10);
            },
            prepareRow: (row, i) => {
                doc.fillColor("#000000").font("Helvetica").fontSize(9);
            },
            padding: 5,
            lineGap: 5,
            columnStyles: {
                0: { align: "left" },
                1: { align: "left" },
            },
            drawHeaderCell: (cell, rect) => {
                doc.fontSize(10).fillColor("#000000").font("Helvetica-Bold");
                doc.text(cell.label, rect.x + 10, rect.y + 2, {
                    width: rect.width - 20,
                    align: "left",
                    valign: "center",
                });
                doc.rect(rect.x, rect.y, rect.width, rect.height).stroke();
            },
            drawRowCell: (cell, rect) => {
                doc.fontSize(9).fillColor("#000000").font("Helvetica");
                doc.text(cell, rect.x + 10, rect.y + 5, {
                    width: rect.width - 20,
                    align: "left",
                    valign: "center",
                });
                doc.rect(rect.x, rect.y, rect.width, rect.height).stroke();
            },
        });
    }

    // Render amount details table on the right
    doc.fillColor(borderColor).fontSize(10).font("Helvetica-Bold");

    if (amountDetailsTableData.length > 0) {
        doc.table(amountDetailsTable, {
            x: amountTableX,
            y: bankTableY, // Align with the current Y position
            prepareHeader: () => {
                doc.font("Helvetica-Bold").fontSize(10);
            },
            prepareRow: (row, i) => {
                doc.fillColor("#000000").font("Helvetica").fontSize(9);
            },
            padding: 5,
            lineGap: 5,
            columnStyles: {
                0: { align: "left" },
                1: { align: "right" },
            },
            drawHeaderCell: (cell, rect) => {
                doc.fontSize(10).fillColor("#000000").font("Helvetica-Bold");
                doc.text(cell.label, rect.x + 10, rect.y + 2, {
                    width: rect.width - 20,
                    align: "left",
                    valign: "center",
                });
                doc.rect(rect.x, rect.y, rect.width, rect.height).stroke();
            },
            drawRowCell: (cell, rect) => {
                doc.fontSize(9).fillColor("#000000").font("Helvetica");
                doc.text(cell, rect.x + 10, rect.y + 5, {
                    width: rect.width - 20,
                    align: "right",
                    valign: "center",
                });
                doc.rect(rect.x, rect.y, rect.width, rect.height).stroke();
            },
        });
    }
};

const addNotesTable = (doc, data) => {
    if (data?.notes?.length > 0) {
        const notesStartY = doc.y; // Starting Y position
        const notesTableX = 10; // Align to the left with margin

        // Prepare the notes data for the table
        const notesData = data.notes.map((note) => ({
            note: note,
        }));

        // Define the table structure
        const table = {
            title: "Notes",
            headers: [
                { label: "", property: "note", width: 575 }, // Adjust width as needed
            ],
            datas: notesData,
        };

        // Draw the title in bold
        doc.font("Helvetica-Bold").fontSize(12);

        // Add the table to the PDF
        doc.table(table, {
            prepareHeader: () => {
                doc.font("Helvetica-Bold").fontSize(10);
            },
            prepareRow: (row, i) => {
                doc.fillColor("#000").font("Helvetica").fontSize(10);
            },
            padding: 5, // Padding for cells
            columnStyles: {
                0: { align: "left" }, // Align notes to the left
            },
            drawHeaderCell: (cell, rect) => {
                // No header, so we skip this
            },
            drawRowCell: (cell, rect) => {
                doc.text(cell, rect.x + 5, rect.y + 5, {
                    width: rect.width - 10, // Adjust padding
                    height: rect.height,
                });
                // Draw cell border with bold lines
                doc.lineWidth(1.5); // Set line width for borders
                doc.rect(rect.x, rect.y, rect.width, rect.height).stroke(); // Draw cell border
            },
            drawHeader: (cell, rect) => {
                // Optional: Add header borders if needed
                doc.lineWidth(1.5); // Set line width for header borders
                doc.rect(rect.x, rect.y, rect.width, rect.height).stroke();
            },
            // Positioning the table on the left
            x: notesTableX,
            y: notesStartY, // Adjust Y position for the table
        });
    }
};

const addTermsAndThankYou = (doc, data) => {
    if (data?.terms?.length > 0) {
        const termsStartY = doc.y;
        const termsTableX = 10; // Align to the left

        // Define the table structure
        const table = {
            title: "Terms and Conditions",
            headers: [
                { label: "Condition", property: "name", width: 100 }, // Adjust width as needed
                { label: "Description", property: "value", width: 475 }, // Adjust width as needed
            ],
            datas: data.terms,
        };
        // Draw the title in bold
        doc.font("Helvetica-Bold").fontSize(12);

        // Add the table to the PDF
        doc.table(table, {
            prepareHeader: () => {
                doc.font("Helvetica-Bold").fontSize(10);
            },
            prepareRow: (row, i) => {
                doc.fillColor("#000").font("Helvetica").fontSize(10);
            },
            padding: 5, // Padding for cells
            columnStyles: {
                0: { align: "left" }, // Align condition to the left
                1: { align: "left" }, // Align description to the left
            },
            drawHeaderCell: (cell, rect) => {
                doc.text(cell, rect.x + 5, rect.y + 5);
                doc.rect(rect.x, rect.y, rect.width, rect.height).stroke(); // Draw header cell border
            },
            drawRowCell: (cell, rect) => {
                doc.text(cell, rect.x + 5, rect.y + 5, {
                    width: rect.width - 10, // Adjust padding
                    height: rect.height,
                });
                doc.rect(rect.x, rect.y, rect.width, rect.height).stroke(); // Draw cell border
            },
            // Positioning the table on the left
            x: termsTableX,
            y: termsStartY, // Adjust Y position for the table
        });
    }

    // Thank you message
    const thankYouY = doc.y + 50; // Adjust this value to position the thank you message properly
    doc.fill("#0047AB").text("THANK YOU FOR YOUR BUSINESS", 225, thankYouY);
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
const getTableHeaders2 = (entity, preCol = []) => {
    // Define the additional columns that may be added based on preCol
    let toAddColumn = [
        { title: "CODE", property: "code", width: 40 },
        { title: "IMAGE", property: "image", width: 50 },
        { title: "HSN CODE", property: "hsnCode", width: 50 },
        { title: "DIS%", property: "discountPercent", width: 30 },
        { title: "DIS AMT", property: "discountAmount", width: 50 },
        { title: "TAX AMT", property: "taxAmount", width: 40 },
    ];

    // Default headers
    const allHeaders = [
        { title: "#", property: "srNo", width: 20 },
        { title: "DESCRIPTION", property: "description", width: 330 }, // Initial width of description column
        { title: "RATE", property: "rate", width: 50 },
        { title: "QTY", property: "qty", width: 40 },
        { title: "TAX%", property: "gstPercent", width: 50 },
        { title: "TOTAL AMOUNT", property: "finalAmount", width: 80 },
    ];

    // Create a map from preCol to handle status true columns
    const preColMap = {};
    preCol.forEach((col) => {
        if (col.status) {
            preColMap[col.value] = col.label; // Map property to label for easier access
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
    order.forEach((property) => {
        let header = allHeaders.find((header) => header.property === property);
        // Check if the header is from preCol and has status true
        if (preColMap[property]) {
            let additionalHeader = toAddColumn.find(
                (col) => col.property === property
            );
            if (additionalHeader) {
                finalHeaders.push({
                    title: preColMap[property], // Use label from preCol
                    property: additionalHeader.property,
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
        .filter((header) => preColMap[header.property]) // Only the added columns from preCol
        .reduce((total, header) => total + header.width, 0);

    // Adjust the width of the description column based on the total width of added columns
    const descriptionHeader = finalHeaders.find(
        (header) => header.property === "description"
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
    doc.moveTo(leftMargin, endY)
        .lineTo(doc.page.width - leftMargin, endY)
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
    doc.moveTo(leftMargin, endY)
        .lineTo(doc.page.width - leftMargin, endY)
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
    doc.moveTo(leftMargin, endY)
        .lineTo(doc.page.width - leftMargin, endY)
        .stroke(borderColor);

    // Draw vertical line separating Dispatch To and Dispatch From sections
    doc.moveTo(300, initialY).lineTo(300, endY).stroke(borderColor);
    doc.moveTo(300, initialY).lineTo(300, endY).stroke(borderColor);

    // Update doc.y to ensure it starts after the details section
    doc.y = endY;
};

const itemTableForWorkOrder = (doc, entityData, entity) => {
    // Define headers for the work orders table
    const headers = getTableHeaders2(entity);

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
