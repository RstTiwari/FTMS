import PDFDocumentWithTables from "pdfkit-table";
import "pdfkit-table";
import fs from "fs";

const pdftem2 = (
    req,
    res,
    next,
    entityData,
    organizationData,
    entity,
    entityPref
) => {
    // Create a new PDF document
    const doc = new PDFDocumentWithTables();

    // Save the PDF to a file
    doc.pipe(res);

    // Add title
    doc.fontSize(18).text("PDF Table Example", { align: "center" });

    // Define the table data
    const table = {
        title: "Sample Table", // Optional Title
        headers: ["ID", "Name", "Age", "Country"],
        rows: [
            [1, "John Doe", 29, "USA"],
            [2, "Jane Smith", 34, "UK"],
            [3, "Michael Johnson", 45, "Canada"],
            [4, "Sarah Williams", 28, "Australia"],
        ],
    };

    // Add the table to the PDF
    doc.moveDown().table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
        prepareRow: (row, i) => doc.font("Helvetica").fontSize(10),
    });

    // Finalize the PDF and end the stream
    doc.end();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');

    console.log("PDF created successfully!");
};
export default pdftem2;
