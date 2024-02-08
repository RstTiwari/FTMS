import PDFDocument from "pdfkit";
import { quote } from "../../data/quote.js";
import { epochInDDMMYY } from "../../Helper/timehelper.js"
const generatePdf = async (req, res, next) => {
    try {
        const { entity, entityNo } = req.query;
        const { company, customer, items } = quote;
        const doc = new PDFDocument({ size: "A4" });
        doc.pipe(res);

        //setting the icon and title of the image
        const { companyHeaderText, companyHeaderPostion } = calcultTitlePostion(
            company.companyName
        );
        doc.fontSize(20)
            .fillColor("#33D7FF")
            .text(companyHeaderText, companyHeaderPostion, 20);
        //compnay Address
        const { companyStreet, companyStreetPostion } = calculateStreetPostion(
            company.address.street
        );
        doc.fontSize(12)
            .fillColor("#4B4E4F")
            .text(companyStreet, companyStreetPostion, 50);
        doc.fontSize(12)
            .fillColor("#4B4E4F")
            .text(
                `${company.address.city} ,${company.address.state}, ${company.address.pinCode}`,
                225
            );
        
        //customer details Left side of page
        doc.fontSize(14).fillColor("#33D7FF").text("QUOTATION TO :", 20, 120);
        doc.fontSize(13)
            .fillColor("#1E1F20")
            .text(customer.customerName, 20, 140);
        doc.fontSize(12)
            .fillColor("#4B4E4F")
            .text(customer.billingAddress.street, 20, 155, { width: 300 });
        doc.fontSize(12)
            .fillColor("#4B4E4F")
            .text(
                `${customer.billingAddress.city} , ${customer.billingAddress.state}`,
                20,
                170,
                { width: 300 }
            );
        doc.fontSize(13)
            .fillColor("#1E1F20")
            .text(`DATE VALID FROM : ${epochInDDMMYY(quote.quoteDate)}`, 350, 120, {
                width: 300,
            });
        doc.fontSize(13)
            .fillColor("#1E1F20")
            .text(`DATE VALID TO : ${epochInDDMMYY(quote.quoteExpiryDate)}`, 370, 140, {
                width: 300,
            });
        doc.fontSize(13)
            .fillColor("#1E1F20")
            .text(`QUOTATION NO : #${quote.quoteNo}`, 370, 160, {
                width: 300,
            });
        
        // check Weather Atten person to print ot Not


        doc.end();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="outPut.pdf"'
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to generate PDF");
    }
};

const calcultTitlePostion = (companyName) => {
    let companyHeaderText = companyName.replace(/\s+/g, " ").toUpperCase();
    let companyHeaderPostion =
        companyHeaderText.length <= 15
            ? 225
            : companyHeaderText.length <= 25
            ? 200
            : companyHeaderText.length <= 35
            ? 120
            : 120;
    return { companyHeaderText, companyHeaderPostion };
};

const calculateStreetPostion = (street) => {
    let companyStreet = street.replace(/\s+/g, " ");
    let companyStreetPostion =
        companyStreet.length <= 30
            ? 225
            : companyStreet.length <= 45
            ? 190
            : companyStreet.length <= 55
            ? 175
            : 150;

    return { companyStreet, companyStreetPostion };
};

export default generatePdf;
