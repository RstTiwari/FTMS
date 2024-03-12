import { epochInDDMMYY } from "../../../Helper/timehelper.js";
import fs from "fs";
import PDFDocument from "pdfkit";
import { downloadAndSaveImage } from "../../..//Helper/pdfHelper.js";

async function creatQuotation(req, res, next, quoteData) {
    try {
        const { orgnization, customer, items } = quoteData;
        const imagePath = await downloadAndSaveImage(
            orgnization.logo,
            orgnization.tenantId
        );

        let doc = new PDFDocument({ size: "A4", margin: 50 });
        doc.pipe(res);
        
        generateHeader(doc, orgnization, imagePath);
        generateCustomerInformation(doc, customer, quoteData);
        generateInvoiceTable(doc, items, quoteData,orgnization);
        genrateTermsAndCondition (doc,quoteData)
        // generateFooter(doc);
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

async function generateCustomerInformation(doc, customer, quoteData) {
    doc.fillColor("#444444").fontSize(20).text("Qutation", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc.fontSize(10)
        .text("Quotation Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(quoteData.quoteNo, 150, customerInformationTop)
        .font("Helvetica")
        .text("Quotation Date:", 50, customerInformationTop + 15)
        .text(
            epochInDDMMYY(quoteData.quoteDate),
            150,
            customerInformationTop + 15
        )

        .font("Helvetica-Bold")
        .text(customer.customerName,300,customerInformationTop, { width: 200, }) // Adjust the width as needed
        .font("Helvetica")
        .text(customer.billingAddress.street,300,customerInformationTop+15, { width:300}) // Adjust the width as needed
        
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

async function generateInvoiceTable(doc, items, quoteData,orgnization) {
    let i;
    const invoiceTableTop = 270;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Description",
        "Unit Price",
        "Qty",
        "Total",
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
            Math.ceil(item.rate),
            item.qty,
            item.finalAmount,
           
        );

        generateHr(doc, position + 20);
    }
    const y = doc.y;

    doc.font("Helvetica")
        .fontSize(10)
        .text(`Subtotal :${quoteData.grossTotal}`, 410, doc.y + 20);

    doc.font("Helvetica")
        .fontSize(10)
        .text(`Tax (%) :${quoteData.transPortAmount}`, 410, doc.y + 10);
    doc.font("Helvetica")
        .fontSize(10)
        .text(`Transport:${quoteData.taxPercent}`, 410, doc.y + 10);

    doc.font("Helvetica-Bold")
        .fontSize(12)
        .text(`Grand  Total:${quoteData.grandTotal}`, 410, doc.y + 10);
}

function generateTableRow(doc, y, Description, UnitCost, Quantity, FinalTotal) {
    doc.fontSize(10)
        .text(
            Description.length >= 20
                ? Description.substring(0, 18) + ".."
                : Description,
            50,
            y
        )
        .text(UnitCost, 200, y)
        .text(Quantity, 300, y)
        .text(FinalTotal, 400, y);
}

function genrateTermsAndCondition(doc, quoteData) {
    doc.font("Helvetica-Bold")
    .text("TERMS AND CONDITIONS", 20, doc.y + 50);
    doc.font("Helvetica")
    doc.fontSize(10);
    doc.text(`1. ${quoteData.paymentsCondition}.`, 20,);
    doc.text(`2. ${quoteData.deliveryCondition}.`, 20);
    doc.text(`3. ${quoteData.cancellationCondition}.`, 20);
    doc.text(`4. ${quoteData.validityCondition}.`, 20);
    doc.fill("#0047AB").text("THANK YOU FOR BUISNESS", 225, doc.y + 50);
}

function generateHr(doc, y) {
    doc.strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}


export default creatQuotation;
