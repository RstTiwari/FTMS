const tenantSpecificData = {
    sidebar: [
        {
            key: "dashboard",
            label: "Dashboard",
            icon: "HomeOutlined",
        },
        {
            key: "sales",
            label: "Sales",
            icon: "LineChartOutlined",
            children: [
                {
                    key: "customers",
                    label: "Customers",
                },
                {
                    key: "quotations",
                    label: "Quotations",
                },
            ],
        },
        {
            key: "accounts",
            label: "Accounts",
            icon: "CalculatorOutlined",
            children: [
                {
                    key: "invoices",
                    label: "Invoices",
                },
                {
                    key: "paymentsreceived",
                    label: "Payments Received",
                },
                {
                    key: "paymentsmade",
                    label: "Payments Made",
                },
                {
                    key: "expenses",
                    label: "Expenses",
                },
            ],
        },
        {
            key: "purchase",
            label: "Purchase",
            icon: "ShoppingCartOutlined",
            children: [
                {
                    key: "vendors",
                    label: "Vendors",
                },
                {
                    key: "purchases",
                    label: "Purchase Orders",
                },
            ],
        },
        {
            key: "production",
            label: "Production",
            icon: "SnippetsOutlined",
            children: [
                {
                    key: "workorders",
                    label: "Work Order",
                },
            ],
        },
        {
            key: "design",
            label: "Design",
            icon: "CodeSandboxOutlined",
            children: [
                {
                    key: "products",
                    label: "Products",
                },
            ],
        },
        {
            key: "dispatch",
            label: "Dispatch",
            icon: "RocketOutlined",
            children: [
                {
                    key: "challans",
                    label: "Delivery Challans",
                },
            ],
        },
        {
            key: "myfac8ry",
            label: "Myfac8ry Market",
            icon: "ShopOutlined",
            children: [
                {
                    key: "enquiryreceived",
                    label: "Enquiry Received",
                },
                {
                    key: "enquiryrraised",
                    label: "Enquiry Raised",
                },
            ],
        },
    ],
    columns: [
        {
            label: "Item Code",
            value: "code",
        },
        {
            label: "Image",
            value: "image",
        },
        {
            label: "Hsn Code",
            value: "hsnCode",
        },
        {
            label: "Discount%",
            value: "discountPercent",
        },
        {
            label: "Tax Amount",
            value: "taxAmount",
        },
    ],
};

export default tenantSpecificData;
