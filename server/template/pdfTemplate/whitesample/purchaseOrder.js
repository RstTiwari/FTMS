import { epochInDDMMYY } from "../../../Helper/timehelper.js";
import fs from "fs";
import PDFDocument from "pdfkit";
import { downloadAndSaveImage } from "../../..//Helper/pdfHelper.js";

async function createPurchaseOrder(req, res, next, purchaseData) {
    try {
        const { orgnization, vendor, items } = purchaseData;
        const imagePath = await downloadAndSaveImage(
            orgnization.logo,
            orgnization.tenantId
        );

        let doc = new PDFDocument({ size: "A4", margin: 50 });
        doc.pipe(res);

        generateHeader(doc, orgnization, imagePath);
        generateCustomerInformation(doc, vendor, purchaseData);
        generateInvoiceTable(doc, items, purchaseData, orgnization);
        doc.end();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="outPut.pdf"'
        );
    } catch (error) {
        return error.message;
    }
}

async function generateHeader(doc, orgnization, imagePath) {
    const { companyName, address } = orgnization;
    doc.image(imagePath, 50, 45, { fit: [100, 100] })
        .fillColor("#444444")
        .fontSize(12)
        .text(companyName, 200, 50, { align: "right" });
    doc.fontSize(10)
        .text(address.street, 200, 65, { align: "right" })
        .text(`${address.city},${address.state} ${address.pinCode}`, 200, 80, {
            align: "right",
        })
        .moveDown();
}

async function generateCustomerInformation(doc, vendor, purchaseData) {
    doc.fillColor("#444444").fontSize(20).text("Purchase Order", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc.fontSize(10)
        .text("Purchase Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(purchaseData.challanNo, 150, customerInformationTop)
        .font("Helvetica")
        .text("Purchase Date:", 50, customerInformationTop + 15)
        .text(
            epochInDDMMYY(purchaseData.challanDate),
            150,
            customerInformationTop + 15
        )
        .text("Vehicle No:", 50, customerInformationTop + 25)

        .font("Helvetica-Bold")
        .text(vendor.vendorName, 300, customerInformationTop, {
            width: 200,
        }) // Adjust the width as needed
        .font("Helvetica")
        .text(vendor.billingAddress.street, 300, customerInformationTop + 15, {
            width: 300,
        }) // Adjust the width as needed

        .text(
            vendor.billingAddress.city +
                ", " +
                vendor.billingAddress.state +
                ", " +
                vendor.billingAddress.pinCode,
            300,
            customerInformationTop + 30
        )
        .moveDown();

    generateHr(doc, 252);
}

async function generateInvoiceTable(doc, items, purchaseData, orgnization) {
    let i;
    const invoiceTableTop = 270;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Description",
        "Rate",
        "Qty",
        "Final Amount"
    );

    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < items.length; i++) {
        const item = items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.description,
            item.rate,
            item.qty,
            item.finalAmount
        );

        generateHr(doc, position + 20);
    }
    const y = doc.y;

    doc.font("Helvetica")
        .fontSize(12)
        .text(`Gross Total :${purchaseData.grossTotal}`, 410, doc.y + 35);
    doc.font("Helvetica")
        .fontSize(12)
        .text(`Tax Percnet(%):  ${purchaseData.taxPercent}%`, 410, doc.y + 10);
    doc.font("Helvetica")
        .fontSize(12)
        .text(`Tax Amount: ${purchaseData.taxAmount}`, 410, doc.y + 10);
    doc.font("Helvetica-Bold")
        .fontSize(12)
        .text(`Grand Total:${purchaseData.grandTotal}`, 410, doc.y + 10);
}

function generateTableRow(doc, y, Description, rate, Quantity, FinalTotal) {
    doc.fontSize(10)
        .text(
            Description.length >= 20
                ? Description.substring(0, 18) + ".."
                : Description,
            50,
            y
        )
        .text(rate, 200, y)
        .text(Quantity, 300, y)
        .text(FinalTotal, 400, y);
}

function generateHr(doc, y) {
    doc.strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

export default createPurchaseOrder;
