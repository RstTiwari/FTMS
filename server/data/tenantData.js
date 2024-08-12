const tenSpecificData = {
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
                    key: "payments",
                    label: "Payments",
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
            key: "design",
            label: "Design",
            icon: "DatabaseOutlined",
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
    ],
};

export default tenSpecificData;
