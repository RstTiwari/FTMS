import { epochInDDMMYY } from "../../../Helper/timehelper.js";
import fs from "fs";
import PDFDocument from "pdfkit";
import { downloadAndSaveImage } from "../../..//Helper/pdfHelper.js";

async function creatQuotation(req, res, next, challanData) {
    try {
        const { orgnization, customer, items } = challanData;
        const imagePath = await downloadAndSaveImage(
            orgnization.logo,
            orgnization.tenantId
        );

        let doc = new PDFDocument({ size: "A4", margin: 50 });
        doc.pipe(res);

        generateHeader(doc, orgnization, imagePath);
        generateCustomerInformation(doc, customer, challanData);
        generateInvoiceTable(doc, items, challanData, orgnization);
        addDeilverAndReciver(doc);
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

async function generateCustomerInformation(doc, customer, challanData) {
    doc.fillColor("#444444").fontSize(20).text("Challan", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc.fontSize(10)
        .text("Challan Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(challanData.no, 150, customerInformationTop)
        .font("Helvetica")
        .text("Challan Date:", 50, customerInformationTop + 15)
        .text(
            epochInDDMMYY(challanData.challanDate),
            150,
            customerInformationTop + 15
        )
        .text("Vehicle No:", 50, customerInformationTop + 25)

        .font("Helvetica-Bold")
        .text(customer.customerName, 300, customerInformationTop, {
            width: 200,
        }) // Adjust the width as needed
        .font("Helvetica")
        .text(
            customer.billingAddress.street,
            300,
            customerInformationTop + 15,
            { width: 300 }
        ) // Adjust the width as needed

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

async function generateInvoiceTable(doc, items, challanData, orgnization) {
    let i;
    const invoiceTableTop = 270;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Description",
        "Hsn Code",
        "Qty",
        "Unit"
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
            item.qty,
            item.unit
        );

        generateHr(doc, position + 20);
    }
    const y = doc.y;

    doc.font("Helvetica-Bold")
        .fontSize(12)
        .text(`Total Quantity:${challanData.totalQuantity}`, 410, doc.y + 35);
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

function addDeilverAndReciver(doc) {
    doc.fontSize(10)
        .font("Helvetica-Bold")
        .text("DELIVERED BY:", 50, doc.y + 20);
    doc.fontSize(10).text("DATE:", 50, doc.y + 10);
    doc.fontSize(10).text("SIGN:", 50, doc.y + 10);

    doc.fontSize(10)
        .font("Helvetica-Bold")
        .text("RECIVED BY:", 50, doc.y + 20);
    doc.fontSize(10).text("DATE:", 50, doc.y + 10);
    doc.fontSize(10)
        .text("SIGN:", 50, doc.y + 10)

        .moveDown();
}

function generateHr(doc, y) {
    doc.strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

export default creatQuotation;
