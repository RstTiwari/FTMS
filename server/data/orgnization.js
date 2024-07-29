 const organizationData = {
    companyName: "Royal Play equipment pvt and Ltd",
    companyLogo:
        "https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg",
    gstNo: "22AAAAA0000A1Z5",
    panNo: "AAAAA1234A",
    address: {
        street1: "123, Tech Park and the valley road ",
        street2: "Silicon Valley near the hospital road",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
        country: "India",
    },

    phone: "+91-1234567890",
    email: "info@techsolutions.com",
    website: "www.techsolutions.com",

    bankName: "State Bank of India",
    accountNo: "123456789012",
    ifscCode: "SBIN0000123",

    tenantId: "q3933292",
};
const invoicesData = {
    customer: {
        customerName: "Ramkumar Pvt LTD",
        contactPerson: "Ramkumar",
        customerPhone: 7848286984,
        customerEmail: "khbDevlopement@gmail.com",
        billingAddress: {
            street1:
                "New Address for the given Value of the concept that utilzes",
            street2: "the nw address dpends",
            city: "New Munbai",
            state: "Goa",
            pincode: 123456,
        },
        shippingAddress: {
            street1: "New Address for the given Value of the concept ",
            street2: "the nw address dpends",
            city: "New Munbai",
            state: "Goa",
            pincode: 123435,
        },
    },
    invoiceNo: "11",
    invoiceDate: "2024-07-19T10:45:45.194+00:00",
    dueDate: "2024-07-19T10:45:45.194+00:00",
    status: "DRAFT",
    payment: [],
    items: [
        {
            description:
                "New Product for Testing the Product Value that utilzes the numbe task fivwe on the row oif tesk",
            hsnCode: "12334",
            rate: 12000.25,
            qty: 1,
            gstPercent: 12,
            finalAmount: 12000.25,
            _id: {
                $oid: "66963462adbf6e5811bf4f14",
            },
        },
        {
            description: "New Product for Testing the Product Value",
            hsnCode: "12334",
            rate: 12000,
            qty: 1,
            finalAmount: 12000,
            _id: {
                $oid: "66963462adbf6e5811bf4f15",
            },
        },
    ],
    grossTotal: 24001,
    grandTotal: 26161,
    tenantId: "667e75df8da55d3c07a22626",
    __v: 0,
};
const quotationsData = {
    customer: {
        customerName: "Ramkumar Pvt LTD",
        contactPerson: "Ramkumar",
    },
    sub: " Quotation Date for the Rquriment of Your new Taks",
    quoteNo: "00090",
    quoteDate:"2024-07-19T10:45:45.194Z",
    salesPerson: "Rohit Tiwari",
    expiryDate: {
        $date: "2024-07-19T10:45:46.938Z",
    },
    items: [
        {
            description: "New Product for Testing the Product Value for the outer product type",
            rate: 12000,
            qty: 1,
            finalAmount: 12000,
        },
        {
            description: "New Product for Testing the Product Value",
            rate: 12000,
            qty: 1,
            finalAmount: 12000,
        },
        {
            description: "New Product for Testing the Product Value",
            rate: 12000,
            qty: 1,
            finalAmount: 12000,
        },
        {
            description: "New Product for Testing the Product Value",
            rate: 12000,
            qty: 1,
            finalAmount: 12000,
        },
    ],
    grossTotal: 12000,
    taxPercent: 18,
    grandTotal: 14160,
    deliveryCondition:"the Delivery Should be amde in 50 days not more than that time to check the delibar time requiered fot he particular asspects",
    paymentCondition:"THe payment will be reicev in just 40 days and 30 days",
    validityCondition:"Only vlaid for thee next 50 days only",
    cancellationCondition:"Order palced cna not be cancelled"


};
export const industryType = [
    { label: "Automotive", value: "AUTOMOTIVE" },
    { label: "Aerospace", value: "AEROSPACE" },
    { label: "Electronics", value: "ELECTRONICS" },
    { label: "Pharmaceuticals", value: "PHARMACEUTICALS" },
    { label: "Machinery", value: "MACHINERY" },
    { label: "Food Processing", value: "FOOD_PROCESSING" },
    { label: "Textiles", value: "TEXTILES" },
    { label: "Chemicals", value: "CHEMICALS" },
    { label: "Plastics", value: "PLASTICS" },
    { label: "Metal Fabrication", value: "METAL_FABRICATION" },
    { label: "Sheet Metal", value: "SHEET_METAL" },
    { label: "Laser", value: "LASER" },
    { label: "Molding", value: "MOLDING" },
    { label: "Fabrication", value: "FABRICATION" },
];

export const fetchEntityData = (entity) => {
    let data = "";
    switch (entity) {
        case "invoices":
            data = invoicesData;

            break;
        case "quotations":
            data = quotationsData;

            break;
        case "organizations":
            data = organizationData
            break;

        default:
            break;
    }
    return data
};
