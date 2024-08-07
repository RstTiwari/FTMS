import PDFDocument from "pdfkit";
import { quote } from "../../../data/quote.js";
import axios from "axios";
import fs from "fs";
import { epochInDDMMYY } from "../../../Helper/timehelper.js";
import {
    calculateHeaderPosition,
    calculateStreetPostion,
    downloadAndSaveImage,
} from "../../../Helper/pdfHelper.js";

const quotationPdf = async (req, res, next, quoteData) => {
    try {
        const { orgnization, customer, items } = quoteData;
        const imagePath = await downloadAndSaveImage(
            orgnization.logo,
            orgnization.tenantId
        );
        const doc = new PDFDocument({ size: [595, 842] });
        doc.pipe(res);
        doc.image(imagePath, 5, 5, { fit: [100, 100] });

        const { orgnizationHeaderText, orgnizationHeaderPostion, fontSize } =
            calculateHeaderPosition(orgnization.companyName);
        doc.fontSize(fontSize)
            .fillColor("#0047AB")
            .font("Helvetica-Bold")
            .text(orgnizationHeaderText, orgnizationHeaderPostion + 30, 20);
        //compnay Address
        const { orgnizationStreet, streetPostion } = calculateStreetPostion(
            orgnization.address.street
        );
        doc.fontSize(9)
            .fillColor("#4B4E4F")
            .text(orgnizationStreet, streetPostion, 40);
        doc.fontSize(9)
            .fillColor("#4B4E4F")
            .text(
                `${orgnization.address.city} ,${orgnization.address.state}, ${orgnization.address.pinCode}`,
                225
            );

        doc.fontSize(15)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text("QUOTATION", 255, doc.y + 10);

        //customer details Left side of page
        doc.fontSize(14).fillColor("#0047AB").text("QUOTATION TO :", 20, 120);
        doc.fontSize(13)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text(customer.customerName, 20, 140);
        doc.fontSize(10)
            .fillColor("#4B4E4F")
            .text(customer.billingAddress.street, 20, 155, { width: 300 });
        doc.fontSize(10)
            .fillColor("#4B4E4F")
            .text(
                `${customer.billingAddress.city} , ${customer.billingAddress.state}`,
                20,
                doc.y + 5,
                { width: 300 }
            );
        doc.fontSize(10)
            .fillColor("#4B4E4F")
            .text(`${customer.billingAddress.pinCode}`, 20, doc.y + 5, {
                width: 300,
            });
        doc.fontSize(13)
            .font("Helvetica-Bold")
            .fillColor("#1E1F20")
            .text(
                `DATE VALID FROM : ${epochInDDMMYY(quoteData.quoteDate)}`,
                350,
                120,
                {
                    width: 300,
                }
            );
        doc.fontSize(13)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text(
                `DATE VALID TO : ${epochInDDMMYY(quoteData.quoteExpiryDate)}`,
                370,
                140,
                {
                    width: 300,
                }
            );
        doc.fontSize(13)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text(`QUOTATION NO : #${quoteData.no}`, 370, 160, {
                width: 300,
            });

        // Creating table for Items
        // Add table headers
        doc.rect(10, 230, 550, 30) // x, y, width, height
            .fill("#0047AB");
        doc.font("Helvetica-Bold").fill("#fff").text("Description", 20, 240);
        doc.text("Unit Price", 230, 240);
        doc.text("Qty", 380, 240);
        doc.text("Total", 480, 240);

        let y = 270;
        doc.fill("#000");
        items.forEach((item) => {
            if (item.description.length > 25) {
                let subString = item.description.substring(0, 25) + "..";
                item.description = subString;
            }
            doc.font("Helvetica").text(item.description, 20, y);
            doc.text(Math.ceil(item.rate), 240, y);
            doc.text(item.qty, 390, y);
            doc.text(Math.ceil(item.finalAmount), 490, y);
            y += 30;
        });
        doc.rect(10, y + 5, 550, 5).fill("#0047AB");
        //table End here

        doc.fill("#000");
        doc.font("Helvetica-Bold");
        doc.text("Gross Total :", 390, y + 30);
        doc.text("Tax(%) :", 390, y + 60);
        doc.text("Transport :", 390, y + 90);
        doc.rect(370, y + 110, 200, 30).fill("#0047AB");
        doc.fill("#fff");
        doc.text("Grand Total :", 390, y + 120);

        doc.fill("#000");
        doc.text(`${quoteData.grossTotal}`, 475, y + 30);
        doc.text(`${quoteData.taxPercent}`, 475, y + 60);
        doc.text(`${quoteData.transPortAmount}`, 475, y + 90);
        doc.fill("#fff");
        doc.text(`${quoteData.grossTotal}`, 475, y + 120);
        y = y + 120; // current y value

        // Check if adding "THANK YOU FOR BUSINESS" exceeds the page height
        if (doc.y + 250 > doc.page.height) {
            doc.addPage();
        }

        doc.fill("#0047AB").text("TERMS AND CONDITIONS", 20, y + 50);
        doc.fill("#000");
        doc.fontSize(12);
        doc.text(`1. ${quoteData.paymentsCondition}.`, 20, y + 80);
        doc.text(`2. ${quoteData.deliveryCondition}.`, 20);
        doc.text(`3. ${quoteData.cancellationCondition}.`, 20);
        doc.text(`4. ${quoteData.validityCondition}.`, 20);

        doc.fill("#0047AB").text("THANK YOU FOR BUISNESS", 225, doc.y + 50);
        doc.end();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="outPut.pdf"'
        );
        // fs.unlink(imagePath)
    } catch (error) {
        console.error(error);
        return error.message;
    }
};

export default quotationPdf;
