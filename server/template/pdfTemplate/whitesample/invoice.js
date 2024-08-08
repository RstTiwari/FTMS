import { epochInDDMMYY } from "../../../Helper/timehelper.js";
import fs from "fs";
import PDFDocument from "pdfkit";
import { downloadAndSaveImage } from "../../..//Helper/pdfHelper.js";

async function createInvoice(req, res, next, invocieData) {
    try {
        const { orgnization, customer, items } = invocieData;
        const imagePath = await downloadAndSaveImage(
            orgnization.logo,
            orgnization.tenantId
        );

        let doc = new PDFDocument({ size: "A4", margin: 50 });
        doc.pipe(res);
        generateHeader(doc, orgnization, imagePath);
        generateCustomerInformation(doc, customer, invocieData);
        generateInvoiceTable(doc, items, invocieData,orgnization);

        addBankDetails(doc, orgnization);
        generateFooter(doc);
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

async function generateCustomerInformation(doc, customer, invoiceData) {
    doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc.fontSize(10)
        .text("Invoice Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoiceData.no, 150, customerInformationTop)
        .font("Helvetica")
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(
            epochInDDMMYY(invoiceData.invoiceDate),
            150,
            customerInformationTop + 15
        )

        .font("Helvetica-Bold")
        .text(customer.customerName, 300, customerInformationTop)
        .font("Helvetica")
        .text(customer.billingAddress.street, 300, customerInformationTop + 15)
        .text(
            customer.billingAddress.city +
                ", " +
                customer.billingAddress.state +
                ", " +
                customer.billingAddress.pinCode,
            300,
            customerInformationTop + 30
        )
        .moveDown();

    generateHr(doc, 252);
}

async function generateInvoiceTable(doc, items, invoiceData,orgnization) {
    let i;
    const invoiceTableTop = 270;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Description",
        "HSN",
        "Cost",
        "Qty",
        "Total",
        "SGST%",
        "CGST%",
        "IGST%",
        "Final Total"
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
            item.hsnCode,
            Math.ceil(item.rate),
            item.qty,
            item.taxableAmount,
            item.sgstPercent,
            item.cgstPercent,
            item.igstPercent,
            item.finalAmount,
            item.finalAmount
        );

        generateHr(doc, position + 20);
    }
    const y = doc.y;

    doc.font("Helvetica")
        .fontSize(10)
        .text(`Subtotal :${invoiceData.grossTotal}`, 410, doc.y + 20);
    doc.font("Helvetica")
        .fontSize(10)
        .text(`TotalTaxAmount :${invoiceData.totalTaxAmount}`, 410, doc.y + 10);
    doc.font("Helvetica-Bold")
        .fontSize(12)
        .text(`Grand  Total:${invoiceData.grandTotal}`, 410, doc.y + 10);

    //here bank Details Can be Come
    doc.font("Helvetica-Bold")
        .fontSize(12)
        .fill("#000")
        .text("COMPANY AND BANK DETAILS", 50, y + 20);
    doc.fontSize(10);
    doc.text(`BANK NAME: ${orgnization.bankDetails.bankName}`, 50, y + 35);
    doc.text(`BANK BRANCH: ${orgnization.bankDetails.branch}`, 50, y + 45);
    doc.text(
        `ACCOUNT NO: ${orgnization.bankDetails.accountNo}`,
        50,
        y + 55
    );
    doc.text(`IFSC CODE: ${orgnization.bankDetails.ifscCode}`, 50, y + 65);
    doc.text(`PAN NO: ${orgnization.panNo}`, 50, y + 75);
    doc.text(`GST NO: ${orgnization.gstNo}`, 50, y + 85);
}

function generateFooter(doc) {
    doc.fontSize(10).text(
        "Payment is due within 15 days. Thank you for your business.",
        50,
        doc.y + 30,
        { align: "center", width: 500 }
    );
}

function generateTableRow(
    doc,
    y,
    Description,
    HSNCODE,
    UnitCost,
    Quantity,
    LinTotal,
    SGST,
    CGST,
    IGST,
    FinalTotal
) {
    doc.fontSize(10)
        .text(
            Description.length >= 20
                ? Description.substring(0, 18) + ".."
                : Description,
            50,
            y
        )
        .text(HSNCODE, 160, y)
        .text(UnitCost, 215, y)
        .text(Quantity, 265, y)
        .text(LinTotal, 305, y)
        .text(SGST, 350, y)
        .text(CGST, 390, y)
        .text(IGST, 445, y)
        .text(FinalTotal, 485, y);
}

function generateHr(doc, y) {
    doc.strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}
const addBankDetails = (doc, orgnization) => {};

export default createInvoice;
