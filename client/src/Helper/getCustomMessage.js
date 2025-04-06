const getCustomMessage = (entity, details, recipient, tenantId, id) => {
    const { no, grandTotal } = details;
    const FrntendUrl =
        process.env.NODE_ENV === "production"
            ? "https://ftms.myfac8ry.com/"
            : "http://localhost:3000/";

    const pdfUrl = `${FrntendUrl}pdfDetails/${entity}/${no}/${tenantId}/${id}`;
    let message = "";

    switch (entity) {
        case "quotations":
            const { quoteDate } = details;
            message = `
               ${recipient.toUpperCase()} Details of *Quotation*

                \`\`\`Quotation Number:\`\`\` ${no}
                \`\`\`Quotation Date:\`\`\` ${quoteDate}
                \`\`\`Grand Total:\`\`\` ₹ ${grandTotal}

                For downloading the PDF, click ${pdfUrl}
            `.trim();
            break;

        case "invoices":
            const { invoiceDate, dueDate } = details;
            message = `
               ${recipient.toUpperCase()} Details of *Invoice*

                \`\`\`Invoice Number:\`\`\` ${no}
                \`\`\`Invoice Date:\`\`\` ${invoiceDate}
                \`\`\`Invoice Due Date:\`\`\` ${dueDate}
                \`\`\`Grand Total:\`\`\` ₹ ${grandTotal}

                For downloading the PDF, click  ${pdfUrl}
            `.trim();
            break;

        case "purchases":
            const { purchaseDate } = details;
            message = `
               ${recipient.toUpperCase()} Details of *Purchase Order*

                \`\`\`Purchase Order Number:\`\`\` ${no}
                \`\`\`Purchase Date:\`\`\` ${purchaseDate}
                \`\`\`Grand Total:\`\`\` ₹ ${grandTotal}

                For downloading the PDF, click  ${pdfUrl}
            `.trim();
            break;

        case "challans":
            const { challanType, challanDate, vehicleNo } = details;
            message = `
               ${recipient.toUpperCase()} Details of *Challan*

                \`\`\`Challan Number:\`\`\` ${no}
                \`\`\`Challan Type:\`\`\` ${challanType}
                \`\`\`Challan Date:\`\`\` ${challanDate}
                \`\`\`Vehicle Number:\`\`\` ${vehicleNo}

                For downloading the PDF, click ${pdfUrl}
            `.trim();
            break;

        default:
            message = "Invalid entity type.";
            break;
    }

    return message;
};
export default getCustomMessage;
