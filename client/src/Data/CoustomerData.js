const CoustomerData = {
    listColumns: [
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Phone No",
            dataIndex: "customerPhone",
            key: "customerPhone",
        },
        {
            title: "Email Id",
            dataIndex: "customerEmail",
            key: "customerEmail",
        },
        {
            title: "Gst No",
            dataIndex: "gstNo",
            key: "gstNo",
            responsive: ["lg"],
        },
        {
            title: "Pan No",
            dataIndex: "panNo",
            key: "panNo",
            responsive: ["lg"],
        },
    ],
    formFields: [
        {
            label: "Customer Name",
            name: "customerName",
            required: true,
            type: "text",
            rules: [
                {
                    required: true,
                    message: "Please Provide Customer Name",
                },
            ],
        },
        {
            label: "Customer Phone",
            name: "customerPhone",
            required: true,
            type: "text",
            rules: [
                {
                    required: true,
                    message: "Please Provide Customer Phone",
                },
            ],
        },
        {
            label: "Customer Email",
            name: "customerEmail",
            required: true,
            type: "text",
            rules: [
                {
                    required: true,
                    message: "Please Provide Customer Email",
                },
            ],
        },
        {
            label: "Contact Person",
            name: "contactPerson",
            type: "text",
        },
        {
            label: "PAN NO",
            name: "panNo",
            type: "text",
            tooltip:
                "This data will be encrypted then stored, not visible to other people except those with access.",
        },
        {
            label: "GST NO",
            name: "gstNo",
            type: "text",
            tooltip:
                "This data will be encrypted then stored, not visible to other people except those with access.",
        },
        {
            label: "Billing Address",
            children: [
                {
                    label: "Street",
                    name: "billingStreet",
                    type: "textarea",
                },
                {
                    label: "City",
                    name: "billingCity",
                    type: "text",
                },
                {
                    label: "State",
                    name: "billingState",
                    type: "text",
                },
                {
                    label: "Pin Code",
                    name: "billingPincode",
                    type: "text",
                },
            ],
        },
        {
            label: "Shipping Address",
            children: [
                {
                    label: "Street",
                    name: "shippingStreet",
                    type: "textarea",
                },
                {
                    label: "City",
                    name: "shippingCity",
                    type: "text",
                },
                {
                    label: "State",
                    name: "shippingState",
                    type: "text",
                },
                {
                    label: "Pin Code",
                    name: "shippingPincode",
                    type: "text",
                },
            ],
        },
    ],
    states: [
        { label: "Andhra Pradesh", value: "Andhra Pradesh" },
        { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
        { label: "Assam", value: "Assam" },
        { label: "Bihar", value: "Bihar" },
        { label: "Chhattisgarh", value: "Chhattisgarh" },
        { label: "Goa", value: "Goa" },
        { label: "Gujarat", value: "Gujarat" },
        { label: "Haryana", value: "Haryana" },
        { label: "Himachal Pradesh", value: "Himachal Pradesh" },
        { label: "Jharkhand", value: "Jharkhand" },
        { label: "Karnataka", value: "Karnataka" },
        { label: "Kerala", value: "Kerala" },
        { label: "Madhya Pradesh", value: "Madhya Pradesh" },
        { label: "Maharashtra", value: "Maharashtra" },
        { label: "Manipur", value: "Manipur" },
        { label: "Meghalaya", value: "Meghalaya" },
        { label: "Mizoram", value: "Mizoram" },
        { label: "Nagaland", value: "Nagaland" },
        { label: "Odisha", value: "Odisha" },
        { label: "Punjab", value: "Punjab" },
        { label: "Rajasthan", value: "Rajasthan" },
        { label: "Sikkim", value: "Sikkim" },
        { label: "Tamil Nadu", value: "Tamil Nadu" },
        { label: "Telangana", value: "Telangana" },
        { label: "Tripura", value: "Tripura" },
        { label: "Uttar Pradesh", value: "Uttar Pradesh" },
        { label: "Uttarakhand", value: "Uttarakhand" },
        { label: "West Bengal", value: "West Bengal" },
        {
            label: "Andaman and Nicobar Islands",
            value: "Andaman and Nicobar Islands",
        },
        { label: "Chandigarh", value: "Chandigarh" },
        {
            label: "Dadra and Nagar Haveli and Daman and Diu",
            value: "Dadra and Nagar Haveli and Daman and Diu",
        },
        { label: "Lakshadweep", value: "Lakshadweep" },
        { label: "Delhi", value: "Delhi" },
        { label: "Puducherry", value: "Puducherry" },
        { label: "Ladakh", value: "Ladakh" },
        { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
    ],
    select:{
        customerName:1,
        customerPhone:1,
        customerEmail:1,
        gstNo:1,
        panNo:1
    }
    
};
export default CoustomerData;
