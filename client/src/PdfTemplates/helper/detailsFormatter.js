import { jsDateIntoDayjsDate } from "Helper/EpochConveter";
export const customPageHeader = (entity, data, entityPrefix) => {
  let array = [];
  switch (entity) {
    case "invoices":
      array = [
        {
          label: "Invoice No",
          value: `${entityPrefix}/${data["no"]}`, // This would be dynamic
        },

        {
          label: "Invoice Date",
          value: jsDateIntoDayjsDate(data["invoiceDate"]),
        },
        {
          label: "Due Date",
          value: jsDateIntoDayjsDate(data["invoiceDate"]),
        },
        {
          label: "Sales Executive",
          value: data["salesPerson"],
        },
      ];
      break;
    case "quotations":
      array = [
        {
          label: "Quotation No",
          value: `${entityPrefix}/${data["no"]}`,
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
          value: `${entityPrefix}/${data["no"]}`,
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
          value: `${entityPrefix}/${data["no"]}`,
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
            value: name?.toUpperCase(),
            type: "subheading",
          },
          {
            label: "",
            value: mergedBillingAddress,
          },
          {
            label: "",
            value: `GST NO: ${customer["gstNo"] || ""}      , PAN NO: ${
              customer["panNo"] || ""
            }`,
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
            value: name?.toUpperCase(),
            type: "subheading",
          },
          {
            label: "",
            value: mergedShippingAddress,
          },
          {
            label: "",
            value: `GST NO : ${customer["gstNo"] || ""}      , PAN NO : ${
              customer["panNo"] || ""
            }`,
          },
          {
            label: "DRIVER MOB NO :",
            value: "",
          },
        ],
      ];
      break;

    case "quotations":
      let sub = data["sub"] ? `Sub : ${data["sub"]}` : "";
      let executive = data["salesPerson"]
        ? `Sales Executive : ${data["salesPerson"]}`
        : "";
      let buyer = customer["name"]
        ? `Buyer : ${customer["name"].toUpperCase()}`
        : "";

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
        ],
      ];
      break;

    case "purchases":
      const vendorComBillingAddress = `${vendorBillingAddress?.street1} ${vendorBillingAddress?.street2}, ${vendorBillingAddress?.city},${vendorBillingAddress?.state} - ${vendorBillingAddress?.pincode}`;
      const orgComBillingAddress = `${orgBillingAddress?.street1} ${orgBillingAddress?.street2}, ${orgBillingAddress?.city},${orgBillingAddress?.state} - ${orgBillingAddress?.pincode}`;
      let deliveryAddress = data["delivery"]["address"];
      const delComAddress = `${deliveryAddress?.street1} ${deliveryAddress?.street2}, ${deliveryAddress?.city},${deliveryAddress?.state} - ${deliveryAddress?.pincode}`;
      let deliverTo = data["delivery"]["to"];

      array = [
        [
          {
            label: "Seller",
            type: "heading",
          },
          {
            type: "subheading",
            value: vendorName?.toUpperCase(),
          },
          {
            label: "",
            value: vendorComBillingAddress,
          },
        ],
        [
          {
            label: "Buyer",
            type: "heading",
          },
          {
            type: "subheading",
            value: orgName?.toUpperCase(),
          },
          {
            label: "",
            value: orgComBillingAddress,
          },
        ],
        [
          {
            label: "Delivery Address",
            type: "heading",
          },
          {
            type: "subheading",
            value: deliverTo?.toUpperCase(),
          },
          {
            label: "",
            value: delComAddress,
          },
        ],
      ];

      break;

    case "challans":
      const challanBillingAddress = `${orgBillingAddress?.street1} ${orgBillingAddress?.street2}, ${orgBillingAddress?.city},${orgBillingAddress?.state} - ${orgBillingAddress?.pincode}`;
      const challanShippingAddress = `${shippingAddress?.street1} ${shippingAddress?.street2}, ${shippingAddress?.city},${shippingAddress?.state} - ${shippingAddress?.pincode}`;

      array = [
        [
          {
            label: "Shipping From",
            value: "",
            type: "heading",
          },
          {
            label: "",
            value: orgName?.toUpperCase(),
            type: "subheading",
          },
          {
            labe: "",
            value: challanBillingAddress,
          },
          {
            label: `Vehicle No : ${data["vehicleNo"] || ""}`,
            value: "",
            type: "subheading",
          },
          {
            label: `Contact No : ${data["contactNo"] || ""}`,
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
            value: name?.toUpperCase(),
            type: "subheading",
          },
          {
            label: "",
            value: challanShippingAddress,
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
    { title: "IMAGE", property: "image", width: 50 },
    { title: "HSN CODE", property: "hsnCode", width: 50 },
    { title: "DIS%", property: "discountPercent", width: 30 },
    { title: "DIS AMT", property: "discountAmount", width: 50 },
    { title: "TAX AMT", property: "taxAmount", width: 40 },
  ];

  // Default headers
  const allHeaders = [
    { title: "#", property: "srNo", width: 20 },
    { title: "DESCRIPTION", property: "description", width: 330 }, // Initial width of description column
    { title: "RATE", property: "rate", width: 50 },
    { title: "QTY", property: "qty", width: 40 },
    { title: "TAX%", property: "gstPercent", width: 50 },
    { title: "TOTAL AMOUNT", property: "finalAmount", width: 80 },
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
        { title: "CODE", width: 50 },
        { title: "NAME", width: 400 },
        { title: "QTY", width: 50 },
      ];
    default:
      return finalHeaders;
  }
};
export const grandAndOtherChargesFormatter = (entity, data) => {
  if (entity === "workorder") {
    return [];
  }
  let array = [
    {
      label: "GROSS TOTAL",
      value: data["grossTotal"],
    },
    {
      label: "TAX AMOUNT",
      value: data["taxAmount"],
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

export const bankDetailsFormatter = (entity, bankDetails) => {
  // Find the bank detail object where isPrimary is true
  const primaryBankDetail = bankDetails.find((detail) => detail.isPrimary);
  let obj = {
    "Bank Name": primaryBankDetail["bankName"],
    "Account No": primaryBankDetail["accountNo"],
    "IFSC CODE": primaryBankDetail["ifscCode"],
    Upi: primaryBankDetail["upi"],
  };
  return obj;
};

export const entityNameFormatter = (entity) => {
  let entityName;
  switch (entity) {
    case "invoices":
      entityName = " TAX INVOICE";
      break;
    case "quotations":
      entityName = "QUOTATION BILL";
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
