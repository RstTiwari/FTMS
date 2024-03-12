import PDFDocument from "pdfkit";
import { epochInDDMMYY } from "../../../Helper/timehelper.js"
import { downloadAndSaveImage,calculateStreetPostion,calcultTitlePostion ,addBankDetails} from "../../../Helper/pdfHelper.js";

const invoicePdf = async(req,res,next,invocieData) => {
    try {
        const { orgnization, customer, items } = invocieData;
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
            .text("INVOICE", 255, doc.y + 10);

        //customer details Left side of page
        doc.fontSize(14).fillColor("#0047AB").text("INVOICE TO :", 20, 120);
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
                `DATE VALID FROM : ${epochInDDMMYY(invocieData.invoiceDate)}`,
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
                `DATE VALID TO : ${epochInDDMMYY(
                    invocieData.invoiceExpiredDate
                )}`,
                370,
                140,
                {
                    width: 300,
                }
            );
        doc.fontSize(13)
            .fillColor("#1E1F20")
            .font("Helvetica-Bold")
            .text(`INVOICE NO : #${invocieData.invoiceNo}`, 370, 160, {
                width: 300,
            });

        doc.rect(10, 230, 550, 30) // x, y, width, height
            .fill("#0047AB");
        let x = 20;
        doc.fontSize(8)
            .font("Helvetica-Bold")
            .fill("#fff")
            .text("Description", 20, 240);
        doc.text("HSN CODE", 135, 240);
        doc.text("RATE", 200, 240);
        doc.text("Qty", 243, 240);
        doc.text("Taxable Amount", 275, 240);
        doc.text("SGST%", 345, 240);
        doc.text("CGST%", 387, 240);
        doc.text("IGST%", 427, 240);
        doc.text("Total Amount", 465, 240);

        let y = 270;
        doc.fill("#000");
        items.forEach((item) => {
            if (item.description.length > 25) {
                let subString = item.description.substring(0, 25) + "..";
                item.description = subString;
            }
            doc.fontSize(7.5);
            doc.font("Helvetica").text(item.description, 20, y);
            doc.text(item.hsnCode, 135, y);
            doc.text(Math.ceil(item.rate), 200, y);
            doc.text(item.qty, 243, y);
            doc.text(Math.ceil(item.taxableAmount), 276, y);
            doc.text(item.sgstPercent, 347, y);
            doc.text(item.cgstPercent, 390, y);
            doc.text(item.igstPercent, 429, y);
            doc.text(Math.ceil(Math.ceil(item.finalAmount)), 470, y);
            y += 30;
        });
        doc.rect(10, y + 5, 550, 5).fill("#0047AB");
        //table End here
       

       addBankDetails(doc ,orgnization)

        doc.fontSize(10);
        doc.fill("#000");
        doc.font("Helvetica-Bold");
        doc.text("Gross Total :", 390, y + 30);
        doc.text("TotalTaxAmount :", 390, y + 60);
        doc.rect(370, y + 80, 200, 30).fill("#0047AB");
        doc.fill("#fff");
        doc.text("Grand Total :", 390, y + 90).fillColor("#000");

        doc.text(`${invocieData.grossTotal}`, 475, y + 30);
        doc.text(`${invocieData.totalTaxAmount}`, 475, y + 60);
        doc.fill("#fff");
        doc.text(`${invocieData.grossTotal}`, 475, y + 90);
        y = y + 120; //current y value

        // Check if adding "THANK YOU FOR BUSINESS" exceeds the page height
        if (doc.y + 250 > doc.page.height) {
            doc.addPage();
        }

        doc.fill("#0047AB").text("THANK YOU FOR BUISNESS", 225, doc.y + 100);
        doc.end();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="outPut.pdf"'
        );
    } catch (error) {
        console.error(error);
        return error.message;
    }
};

export default invoicePdf;