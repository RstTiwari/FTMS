import PDFDocument from "pdfkit";
import fs from "fs";

// Function to generate the PDF
function generateInvoice(
    req,
    res,
    next,
    entityData,
    organizationData,
    entity,
    entityPrefix
) {
    const doc = new PDFDocument({
        size: [595, 842],
        margin: 5,
        bufferPages: true,
    });

    // Collect PDF into buffer
    const chunks = [];

    // Capture the chunks of the PDF as they are generated
    doc.on("data", (chunk) => {
        chunks.push(chunk);
    });

    // When PDF is finalized, send it to the response and write to file
    doc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);

        // Set headers to serve the PDF
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="output.pdf"'
        );
        res.send(pdfBuffer);

        // Save the same PDF to a file
        fs.writeFile("Invoice.pdf", pdfBuffer, (err) => {
            if (err) {
                console.error("Error saving PDF to file:", err);
            } else {
                console.log("PDF saved to Invoice.pdf");
            }
        });
    });

    // Call the respective sections
    addHeader(doc);
    addCompanyDetails(doc);
    addShippingBillingDetails(doc);
    addItemTable(doc);
    addFooter(doc);

    // Finalize the PDF
    doc.end();
}

// Function to add the header
function addHeader(doc) {
    doc.fontSize(18)
        .text("VIP PLAY AND ENGINEERING For the Manufactures tema and ", {
            align: "center",
        })
        .fontSize(10)
        .text(
            "Manufacturer of Children Play Equipments, Fitness Equipments, Rubber Flooring",
            { align: "center" }
        )
        .text(
            "House No-13716 MANGA TABELA GANAPADA DHANIV NALLA SOPARA (EAST) TAL-VASAI, DIST-PALGHAR 401209",
            { align: "center" }
        )
        .moveDown();
}

// Function to add company details and invoice information
function addCompanyDetails(doc) {
    doc.fontSize(10)
        .text("GSTIN: 27AATFV8758R1ZK", 50, 120)
        .text("State: MAHARASHTRA", 50, 140)
        .fontSize(12)
        .text("TAX INVOICE", 400, 110, { align: "right" })
        .fontSize(10)
        .text("Invoice No: VIP/334/24-25", 400, 130, { align: "right" })
        .text("Invoice Date: 06-09-2024", 400, 150, { align: "right" })
        .text("Vehicle No:", 400, 170, { align: "right" })
        .text("Transporter Name:", 400, 190, { align: "right" })
        .moveDown();
}

// Function to add billing and shipping details
function addShippingBillingDetails(doc) {
    doc.rect(50, 220, 500, 70)
        .stroke()
        .fontSize(10)
        .text("Billing Address:", 55, 230)
        .text("MAHESHWARI PLAYWORLD", 55, 245)
        .text(
            "Address: 103 SRI SVYAMBHU CHS ROAD NO 2, BORIVALI EAST, 400066, MAHARASTRA",
            55,
            260
        )
        .text("GST No: 27AASP4650C1ZP", 55, 275)
        .text("Shipping Address:", 300, 230)
        .text("Name: FEIZUDIN", 300, 245)
        .text("Address: PANVEL, PANVEL, 410106, MAHARASTRA", 300, 260)
        .moveDown();
}

// Function to add the item table
function addItemTable(doc) {
    let tableTop = 320;
    doc.fontSize(10);

    // Table Header
    doc.text("Sr.", 50, tableTop)
        .text("Description", 90, tableTop)
        .text("HSN Code", 230, tableTop)
        .text("Rate", 300, tableTop)
        .text("Qty", 360, tableTop)
        .text("Taxable Value", 410, tableTop)
        .text("SGST%", 470, tableTop)
        .text("CGST%", 520, tableTop)
        .text("Amount", 570, tableTop);

    // Table Rows
    let item1Top = tableTop + 20;
    doc.text("1", 50, item1Top)
        .text("FRP SLIDE 7FEET ONLY SLIDE", 90, item1Top)
        .text("9503", 230, item1Top)
        .text("18000", 300, item1Top)
        .text("2", 360, item1Top)
        .text("36000", 410, item1Top)
        .text("6%", 470, item1Top)
        .text("6%", 520, item1Top)
        .text("36000", 570, item1Top);

    let item2Top = item1Top + 20;
    doc.text("2", 50, item2Top)
        .text("FRP SLIDE 3FEET ONLY SLIDE", 90, item2Top)
        .text("9503", 230, item2Top)
        .text("7000", 300, item2Top)
        .text("1", 360, item2Top)
        .text("7000", 410, item2Top)
        .text("6%", 470, item2Top)
        .text("6%", 520, item2Top)
        .text("7000", 570, item2Top);
}

// Function to add the footer with bank details
function addFooter(doc) {
    doc.fontSize(10)
        .text("Bank Name: INDUSUND BANK", 50, 520)
        .text("Branch: VILE PARLE", 50, 535)
        .text("A/C No: 257400055223", 50, 550)
        .text("IFSC Code: INDB0000268", 50, 565)
        .text("PAN No: AATFV8758R", 50, 580);

    doc.text("Gross Total: 43000", 400, 520)
        .text("Add S.G.S.T: 2580", 400, 535)
        .text("Add C.G.S.T: 2580", 400, 550)
        .text("Add I.G.S.T: 0", 400, 565)
        .text("Tax Amount: 5160", 400, 580)
        .fontSize(12)
        .text("Grand Total: 48160", 400, 595);
}

// Generate the PDF
export default generateInvoice;
