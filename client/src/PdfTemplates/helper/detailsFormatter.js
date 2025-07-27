import {
    jsDateIntoDayjsDate,
    currentFinancialYear,
} from "Helper/EpochConveter";
export const customPageHeader = (entity, data, entityPrefix) => {
    let array = [];
    switch (entity) {
        case "invoices":
            array = [
                {
                    label: "Invoice No",
                    value: `${entityPrefix}/${currentFinancialYear(
                        data.invoiceDate
                    )}/${data["no"]}`, // This would be dynamic
                },
                {
                    label: "Invoice Date",
                    value: jsDateIntoDayjsDate(data["invoiceDate"]),
                },
                {
                    label: "Due Date",
                    value: jsDateIntoDayjsDate(data["invoiceDate"]),
                },
            ];
            break;
        case "quotations":
            array = [
                {
                    label: "Quotation No",
                    value: `${entityPrefix}/${currentFinancialYear(
                        data?.quoteDate
                    )}/${data["no"]}`,
                },
                {
                    label: "Quotation Date",
                    value: jsDateIntoDayjsDate(data["quoteDate"]),
                },
                {
                    label: "Due Date",
                    value: jsDateIntoDayjsDate(data["expiryDate"]),
                },
            ];
            break;
        case "purchases":
            array = [
                {
                    label: "Purchase No",
                    value: `${entityPrefix}/${currentFinancialYear(
                        data?.purchaseDate
                    )}/${data["no"]}`,
                },
                {
                    label: "Purchase Date",
                    value: jsDateIntoDayjsDate(data["purchaseDate"]),
                },
                {
                    label: "Delivery Date",
                    value: jsDateIntoDayjsDate(data["deliveryDate"]),
                },
            ];
            break;
        case "challans":
            array = [
                {
                    label: "Challan No",
                    value: `${entityPrefix}/${currentFinancialYear(
                        data?.challanDate
                    )}/${data["no"]}`,
                },
                {
                    label: "Challan Date",
                    value: jsDateIntoDayjsDate(data["challanDate"]),
                },
                {
                    label: "Challan Type",
                    value: data["challanType"],
                },
            ];
            break;
        case "workorders":
            array = [
                {
                    label: "Workorder No",
                    value: `${entityPrefix}/${currentFinancialYear()}/${
                        data["no"]
                    }`,
                },
                {
                    label: "Workorder Date",
                    value: jsDateIntoDayjsDate(data["startDate"]),
                },
                {
                    label: "Delivery Date",
                    value: jsDateIntoDayjsDate(data["dueDate"]),
                },
                {
                    label: "Workorder Type",
                    value: data["type"],
                },
                {
                    label: "Incharge",
                    value: data["incharge"],
                },
            ];
            break;
        default:
            break;
    }
    return array;
};

export const entityDetailsFormatter = (entity, data, organization) => {
    let array = [];
    let { customer, vendor } = data;
    let billingAddress, shippingAddress, name;
    let vendorBillingAddress, vendorShippingAddress, vendorName;
    let orgBillingAddress, orgShippingAddress, orgName;

    if (customer) {
        billingAddress = customer["billingAddress"];
        shippingAddress = customer["shippingAddress"];
        name = customer["name"];
    }
    if (entity === "invoices") {
        shippingAddress = data["shippingAddress"];
    }

    if (vendor) {
        vendorBillingAddress = vendor["billingAddress"];
        vendorShippingAddress = vendor["shippingAddress"];
        vendorName = vendor["name"];
    }

    if (organization) {
        orgBillingAddress = organization["billingAddress"];
        orgShippingAddress = organization["deliveryAddress"];
        orgName = organization["companyName"];
    }

    switch (entity) {
        case "invoices":
            const mergedBillingAddress = `${billingAddress?.street1} ${billingAddress?.street2}, ${billingAddress?.city},${billingAddress?.state} - ${billingAddress?.pincode}`;
            const mergedShippingAddress = `${shippingAddress?.street1} ${shippingAddress?.street2}, ${shippingAddress?.city},${shippingAddress?.state} - ${shippingAddress?.pincode}`;

            array = [
                [
                    {
                        label: "BILLING TO :",
                        value: "",
                        type: "heading",
                    },
                    {
                        label: "",
                        value:customer &&  name?.toUpperCase(),
                        type: "subheading",
                    },
                    {
                        label: "",
                        value: mergedBillingAddress,
                        type: "value",
                    },
                    {
                        label: "",
                        value: `GST NO: ${(customer && customer["gstNo"] )|| ""} `,
                        type: "value",
                    },
                    {
                        label: "",
                        value: `PAN NO: ${(customer && customer["panNo"] )|| ""}`,
                        type: "value",
                    },
                ],
                [
                    {
                        label: "SHIPPING TO :",
                        value: "",
                        type: "heading",
                    },
                    {
                        label: "",
                        value: (shippingAddress && shippingAddress["name"]?.toUpperCase())|| "",
                        type: "subheading",
                    },
                    {
                        label: "",
                        value: mergedShippingAddress,
                        type: "value",
                    },
                    {
                        label: "",
                        value: `GST NO : ${(customer && customer["gstNo"]) || ""}`,
                        type: "value",
                    },
                    {
                        label: "",
                        value: `PAN NO : ${(customer && customer["panNo"]) || ""}`,
                        type: "value",
                    },
                ],
            ];
            break;

        case "quotations":
            let sub = data.sub ? `Sub : ${data["sub"]}` : "";
            let executive = data["salesPerson"]
                ? `Sales Executive : ${data["salesPerson"]}`
                : "";
            let buyer =
                customer && customer.name
                    ? `Buyer : ${customer["name"].toUpperCase()}`
                    : "";
            let attn =
                data && data.attn ? `Kindly Attn :- ${data["attn"]}` : "";

            array = [
                [
                    {
                        label: buyer,
                        type: "subheading",
                    },
                    {
                        label: sub,
                        type: "subheading",
                    },
                    {
                        label: executive,
                        type: "subheading",
                    },
                    {
                        label: attn,
                        type: "subheading",
                    },
                ],
            ];
            break;

        case "purchases":
            const vendorComBillingAddress = `${vendorBillingAddress?.street1} ${vendorBillingAddress?.street2}, ${vendorBillingAddress?.city},${vendorBillingAddress?.state} - ${vendorBillingAddress?.pincode}`;
            const orgComBillingAddress = `${orgBillingAddress?.street1} ${orgBillingAddress?.street2}, ${orgBillingAddress?.city},${orgBillingAddress?.state} - ${orgBillingAddress?.pincode}`;
            console.log(entity, data, organization);
            let deliveryAddress = data && data["delivery"] && data["delivery"]["address"];
            const delComAddress = `${deliveryAddress?.street1} ${deliveryAddress?.street2}, ${deliveryAddress?.city},${deliveryAddress?.state} - ${deliveryAddress?.pincode}`;
            let deliverTo = data  && data["delivery"] &&data["delivery"]["to"];

            array = [
                [
                    {
                        label: "Seller Details",
                        type: "heading",
                    },
                    {
                        type: "subheading",
                        value: (vendor && vendorName?.toUpperCase()) || "",
                    },
                    {
                        label: "",
                        value: vendorComBillingAddress,
                    },
                ],
                [
                    {
                        label: "Buyer Details",
                        type: "heading",
                    },
                    {
                        type: "subheading",
                        value: orgName?.toUpperCase(),
                    },
                    {
                        label: "",
                        value: orgComBillingAddress,
                        type: "value",
                    },
                ],
                [
                    {
                        label: "Delivery Address",
                        type: "heading",
                    },
                    {
                        type: "subheading",
                        value: (deliverTo && deliverTo?.toUpperCase()) || "",
                    },
                    {
                        label: "",
                        value: (delComAddress &&delComAddress) ||"",
                        type: "value",
                    },
                ],
            ];

            break;

        case "challans":
            const challanBillingAddress = `${orgBillingAddress?.street1} ${orgBillingAddress?.street2}, ${orgBillingAddress?.city},${orgBillingAddress?.state} - ${orgBillingAddress?.pincode}`;
            let address =
                data && data["delivery"] && data["delivery"]["address"];
            const challanShippingAddress = `${address?.street1} ${address?.street2}, ${address?.city},${address?.state} - ${address?.pincode}`;
            let challanTo = data && data["delivery"] && data["delivery"]["to"];

            array = [
                [
                    {
                        label: "Shipping From",
                        value: "",
                        type: "heading",
                    },
                    {
                        label: "",
                        value: (orgName && orgName?.toUpperCase())||"",
                        type: "subheading",
                    },
                    {
                        labe: "",
                        value: (challanBillingAddress &&challanBillingAddress) ||"",
                    },
                    {
                        label: `Vehicle No : ${(data && data["vehicleNo"]) || ""}`,
                        value: "",
                        type: "subheading",
                    },
                    {
                        label: `Contact No : ${(data && data["contactNo"]) || ""}`,
                        value: "",
                        type: "subheading",
                    },
                ],
                [
                    {
                        label: "Shipping To",
                        type: "heading",
                        value: "",
                    },
                    {
                        label: "",
                        value: (challanTo && challanTo?.toUpperCase())|| "",
                        type: "subheading",
                    },
                    {
                        label: "",
                        value: (challanBillingAddress && challanShippingAddress)||"",
                    },
                ],
            ];
            break;

        default:
            break;
    }
    return array;
};

export const getTableHeaders2 = (entity, preCol = []) => {
    // Define the additional columns that may be added based on preCol
    let toAddColumn = [
        { title: "CODE", property: "code", width: 40 },
        { title: "IMAGE", property: "image", width: 80 },
        { title: "HSN", property: "hsnCode", width: 40 },
        { title: "DIS%", property: "discountPercent", width: 35 },
        { title: "DIS AMT", property: "discountAmount", width: 50 },
        { title: "TAX AMT", property: "taxAmount", width: 55 },
    ];

    // Default headers
    const allHeaders = [
        { title: "#", property: "srNo", width: 20 },
        { title: "DESCRIPTION", property: "description", width: 395 }, // Initial width of description column
        { title: "RATE", property: "rate", width: 55 },
        { title: "QTY", property: "qty", width: 30 },
        { title: "TAX%", property: "gstPercent", width: 40 },
        { title: "TOTAL AMOUNT", property: "finalAmount", width: 70 },
    ];

    // Create a map from preCol to handle status true columns
    const preColMap = {};
    preCol.forEach((col) => {
        if (col.status) {
            preColMap[col.value] = col.label; // Map property to label for easier access
        }
    });

    // Order in which columns should appear
    const order = [
        "srNo",
        "code",
        "description",
        "image",
        "hsnCode",
        "rate",
        "discountPercent",
        "discountAmount",
        "qty",
        "gstPercent",
        "taxAmount",
        "finalAmount",
    ];

    let finalHeaders = [];

    // Start by adding the default headers
    order.forEach((property) => {
        let header = allHeaders.find((header) => header.property === property);
        // Check if the header is from preCol and has status true
        if (preColMap[property]) {
            let additionalHeader = toAddColumn.find(
                (col) => col.property === property
            );
            if (additionalHeader) {
                finalHeaders.push({
                    title: preColMap[property], // Use label from preCol
                    property: additionalHeader.property,
                    width: additionalHeader.width,
                });
            }
        } else if (header) {
            // Add default headers that aren't from preCol
            finalHeaders.push(header);
        }
    });

    // Calculate the total width of added columns based on actual column widths
    const totalWidthAdded = finalHeaders
        .filter((header) => preColMap[header.property]) // Only the added columns from preCol
        .reduce((total, header) => total + header.width, 0);

    // Adjust the width of the description column based on the total width of added columns
    const descriptionHeader = finalHeaders.find(
        (header) => header.property === "description"
    );
    if (descriptionHeader) {
        descriptionHeader.width = descriptionHeader.width - totalWidthAdded;
    }

    // Return headers based on entity type or dynamic processing
    switch (entity.toLowerCase()) {
        case "workorders":
            return [
                {
                    title: "PRODUCT DETAILS",
                    property: "description",
                    width: 350,
                },
                { title: "IMAGE", property: "image", width: 100 },
                { title: "TOTAL QTY", property: "qty", width: 100 },
            ];
        default:
            return finalHeaders;
    }
};

export const grandAndOtherChargesFormatter = (entity, data) => {
    if (entity === "workorders") return []; // Don't display amount table when entity is workorders
    let array = [
        {
            label: "GROSS TOTAL",
            value: data["grossTotal"],
        },
        {
            label: "Tax CGST + SGST (12%)",
            value: data["cgstAndSgst12"],
        },
        {
            label: " Tax CGST + SGST (18%)",
            value: data["cgstAndSgst18"],
        },
        {
            label: " Tax CGST + SGST (28%)",
            value: data["cgstAndSgst28"],
        },
        {
            label: "Tax IGST (12%)",
            value: data["igst12"],
        },
        {
            label: "Tax IGST (18%)",
            value: data["igst18"],
        },
        {
            label: " Tax IGST (28%)",
            value: data["igst28"],
        },
    ];

    if (data.otherCharges && data.otherCharges.length >= 0) {
        data.otherCharges.forEach((element) => {
            array.push({
                label: element["chargeName"].toUpperCase(),
                value: element["amount"],
            });
        });
    }
    array.push({
        label: "GRAND TOTAL",
        value: data["grandTotal"],
    });

    return array;
};

export const bankDetailsFormatter = (entity, bankDetails, panNo) => {
    // Find the bank detail object where isPrimary is true
    const primaryBankDetail = bankDetails.find((detail) => detail.isPrimary);
    let obj = {
        "Bank Name": primaryBankDetail["bankName"],
        "Branch Name": primaryBankDetail["branchName"],
        "Account No": primaryBankDetail["accountNo"],
        "IFSC CODE": primaryBankDetail["ifscCode"],
        "PAN NO": panNo ? panNo : "",
    };
    return obj;
};

export const entityNameFormatter = (entity) => {
    let entityName;
    switch (entity) {
        case "invoices":
            entityName = "TAX INVOICE";
            break;
        case "quotations":
            entityName = "QUOTATION";
            break;
        case "purchases":
            entityName = "PURCHASE ORDER";
            break;
        case "challans":
            entityName = "CHALAAN BILL";
            break;
        case "workorders":
            entityName = "WORK ORDER";
            break;
        default:
            break;
    }
    return entityName;
};

export const workOrderTable = (entity, data) => {
    // Function to calculate total quantities of components, parts, and hardwares recursively
    function calculateTotalQty(product, parentQty = 1) {
        let result = {
            name: product.name,
            image: product.image || "",
            qty: parentQty,
            components: [],
            parts: [],
            hardwares: [],
        };

        // Calculate components if any
        if (product.components && product.components.length > 0) {
            product.components.forEach((component) => {
                // If component is of type "product", recursively calculate its quantities
                if (component.product.itemType === "product") {
                    const componentResult = calculateTotalQty(
                        component.product,
                        parentQty * component.qty
                    );
                    result.components.push(componentResult);
                } else {
                    // For non-product components, simply multiply the quantity
                    result.components.push({
                        name: component.product.name,
                        image: component.product.image || "",
                        totalQty: parentQty * component.qty,
                    });
                }
            });
        }

        // Calculate parts if any
        if (product.parts && product.parts.length > 0) {
            product.parts.forEach((part) => {
                result.parts.push({
                    name: part.product.name,
                    image: part.product.image || "",
                    totalQty: parentQty * part.qty,
                });
            });
        }

        // Calculate hardwares if any
        if (product.hardwares && product.hardwares.length > 0) {
            product.hardwares.forEach((hardware) => {
                result.hardwares.push({
                    name: hardware.product.name,
                    image: hardware.product.image || "",
                    totalQty: parentQty * hardware.qty,
                });
            });
        }

        return result;
    }

    // Final response array to store all the results
    let response = [];

    // Iterate over the workOrder array to calculate the quantities for each product
    data.forEach((item) => {
        if (item.product.itemType === "product") {
            // For products, calculate their quantities and any nested components
            const productResult = calculateTotalQty(item.product, item.qty);
            response.push(productResult);
        } else {
            // For other items (parts, hardwares), just return the basic details
            let temObj = {
                name: item?.product["name"],
                image: item?.product["image"] || "",
                qty: item["qty"],
            };
            response.push(temObj);
        }
    });
    return response;
};

export const vipPlayPageHeader = (entity, data, organization) => {};

// numberToWordsIndian.js
export const numberToWordsIndian = (amount) => {
    if (typeof amount !== "number") {
        amount = parseFloat(amount);
        if (isNaN(amount)) return "Invalid amount";
    }

    const a = [
        "",
        "ONE",
        "TWO",
        "THREE",
        "FOUR",
        "FIVE",
        "SIX",
        "SEVEN",
        "EIGHT",
        "NINE",
        "TEN",
        "ELEVEN",
        "TWELVE",
        "THIRTEEN",
        "FOURTEEN",
        "FIFTEEN",
        "SIXTEEN",
        "SEVENTEEN",
        "EIGHTEEN",
        "NINETEEN",
    ];

    const b = [
        "",
        "",
        "TWENTY",
        "THIRTY",
        "FORTY",
        "FIFTY",
        "SIXTY",
        "SEVENTY",
        "EIGHTY",
        "NINETY",
    ];

    const getWords = (num) => {
        if (num < 20) return a[num];
        const tens = Math.floor(num / 10);
        const units = num % 10;
        return b[tens] + (units ? " " + a[units] : "");
    };

    const numberToWords = (num) => {
        if (num === 0) return "ZERO";

        let result = "";

        const crore = Math.floor(num / 10000000);
        num %= 10000000;

        const lakh = Math.floor(num / 100000);
        num %= 100000;

        const thousand = Math.floor(num / 1000);
        num %= 1000;

        const hundred = Math.floor(num / 100);
        const remainder = num % 100;

        if (crore > 0) result += getWords(crore) + " CRORE ";
        if (lakh > 0) result += getWords(lakh) + " LAKH ";
        if (thousand > 0) result += getWords(thousand) + " THOUSAND ";
        if (hundred > 0) result += getWords(hundred) + " HUNDRED ";

        if (remainder > 0) {
            result += (result !== "" ? "AND " : "") + getWords(remainder) + " ";
        }

        return result.trim();
    };

    return numberToWords(amount) + " RUPEES ONLY";
};
