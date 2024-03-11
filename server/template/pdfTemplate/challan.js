import PDFDocument from "pdfkit";
import { quote } from "../../data/quote.js";
import axios from "axios";
import fs from "fs";
import { epochInDDMMYY } from "../../Helper/timehelper.js";
import {
    calcultTitlePostion,
    calculateStreetPostion,
    downloadAndSaveImage,
} from "../../Helper/pdfHelper.js";

const challanPdf = async (req, res, next, challanData) => {
    try {
        const { orgnization, customer, items } = challanData;
        const imagePath = await downloadAndSaveImage(
            orgnization.logo,
            orgnization.tenantId
        );
        const doc = new PDFDocument({ size: [595, 842] });
        doc.pipe(res);
        doc.image(imagePath, 5, 5, { fit: [100, 100] });

        const { orgnizationHeaderText, orgnizationHeaderPostion, fontSize } =
            calcultTitlePostion(orgnization.companyName);
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
            .text("CHALLAN", 255, doc.y + 10);

        //customer details Left side of page
        doc.fontSize(14).fillColor("#0047AB").text("CHALLAN TO :", 20, 120);
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
                `DATE VALID FROM : ${epochInDDMMYY(challanData.challanDate)}`,
                350,
                120,
                {
                    width: 300,
                }
            );

        doc.fontSize(13)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text(`CHALLAN NO : #${challanData.challanNumber}`, 370, 140, {
                width: 300,
            });
        doc.fontSize(13)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text(`VEHICLE NO : `, 370, 160, {
                width: 300,
            });

        // Creating table for Items
        // Add table headers
        doc.rect(10, 230, 550, 30) // x, y, width, height
            .fill("#0047AB");
        doc.font("Helvetica-Bold").fill("#fff").text("Description", 20, 240);
        doc.text("HSN CODE", 230, 240);
        doc.text("Qty", 380, 240);
        doc.text("UNIT", 480, 240);

        let y = 270;
        doc.fill("#000");
        items.forEach((item) => {
            if (item.description.length > 25) {
                let subString = item.description.substring(0, 25) + "..";
                item.description = subString;
            }
            doc.font("Helvetica").text(item.description, 20, y);
            doc.text(Math.ceil(item.hsnCode), 240, y);
            doc.text(item.qty, 390, y);
            doc.text(item.unit, 490, y);
            y += 30;
        });
        doc.rect(10, y + 5, 550, 5).fill("#0047AB");
        //table End here

        doc.fill("#000");
        doc.font("Helvetica-Bold");
        doc.fill("#000");
        doc.text(`TOTAL QUANTITY : ${challanData.totalQuantity}`, 350, y +50);


        // Check if adding "THANK YOU FOR BUSINESS" exceeds the page height
        if (doc.y + 250 > doc.page.height) {
            doc.addPage();
        }

         console.log(y,doc.y,doc.page.height);
        doc.fontSize(10)
        doc.fill("#000").text("RECIVED BY:", 20 ,y +65);
        doc.fill("#000").text("DATE:", 20);
        doc.fill("#000").text("SIGNATRE:", 20);

        doc.fill("#000").text("DEILVERD BY:", 20,);
        doc.fill("#000").text("DATE:", 20);
        doc.fill("#000").text("SIGNATRE:", 20);

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

export default challanPdf;
