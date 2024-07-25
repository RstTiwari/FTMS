export const organizationData = {
        companyName: "HKB Development  and the compny Pvt Ltd",
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
        contactDetails: {
            phone: "+91-1234567890",
            email: "info@techsolutions.com",
            website: "www.techsolutions.com",
        },
        bankDetails: {
            bankName: "State Bank of India",
            accountNo: "123456789012",
            ifscCode: "SBIN0000123",
        },
        tenantId:"q3933292"
};
export const  entityData = {
    customer: {
        customerName: "Ramkumar",
        contactPerson: "Ramkumar",
        customerPhone: 7848286984,
        customerEmail: "khbDevlopement@gmail.com",
        billingAddress: {
            street1:
                "New Address for the given Value of the concept that utilzes",
            street2:"the nw address dpends",
            city: "New Munbai",
            state: "Goa",
            pincode:123456,
        },
        shippingAddress: {
            street1:
                "New Address for the given Value of the concept that utilzes",
            street2:"the nw address dpends",
            city: "New Munbai",
            state: "Goa",
            pincode:123435
        },

    },
    invoiceNo: "11",
    status: "DRAFT",
    payment: [],
    items: [
        {
            description: "New Product for Testing the Product Value",
            hsnCode: "12334",
            rate: 12000.25,
            qty: 1,
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
