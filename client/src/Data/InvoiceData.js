import { TableAction } from "components/TableAction";
import { Space, Flex, Dropdown, Typography, Form, Input } from "antd";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
const { Text } = Typography;

const invoiceData = {
    listColumns: [
        {
            title: "#Invoice",
            dataIndex: "invoiceNo",
            key: "invoiceNo",
        },
        {
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
            render: (_, record) => (
                <>
                    <Text type="success">{record.customer.customerName}</Text>
                </>
            ),
        },
        {
            title: "Date",
            dataIndex: "invoiceDate",
            key: "customer",

            render: (_, record) => (
                <>{convertUnixTimestampToDate(record.invoiceDate)}</>
            ),
        },
        {
            title: "Exipred Date",
            dataIndex: "invoiceExpiredDate",
            key: "customer",
            responsive: ["lg"],
            render: (_, record) => (
                <>{convertUnixTimestampToDate(record.invoiceExpiredDate)}</>
            ),
        },
        {
            title: "Gross Total",
            dataIndex: "grossTotal",
            key: "grossTotal",
            responsive: ["lg"],
        },
        {
            title: "Grand Total",
            dataIndex: "grandTotal",
            key: "grandTotal",
        },
    ],
    formField: {
        customer: {
            label: "Select Customer",
            name: "customer",
            type: "model",
            required: true,
            show: true,
            rules: [{ required: true, message: "Please Select Customer" }],
        },
        invoiceNo: {
            label: "#Invoice",
            name: "invoiceNo",
            type: "input",
            show: true,
            rules: [{ required: true, message: "Please Provide Invoice No" }],
        },
        quoteDate: {
            label: "Invoice Date",
            name: "quoteDate",
            type: "date",
            show: true,
            rules: [{ required: true, message: "Please Select Invoice Date" }],
        },
        expiryDate: {
            label: "Due Date",
            name: "dueDate",
            type: "date",
            show: true,
            rules: [{ required: true, message: "Please Select Due Date" }],
        },
        items: {
            type: "list",
            fields: [
                {
                    name: "description",
                    label: "Description",
                    type: "modal",
                    rules: [
                        {
                            message: "Please Select the description",
                        },
                    ],
                },
                { name: "hsnCode", label: "HSN CODE", type: "input" },
                { name: "qty", label: "Qty", type: "number" },
                { name: "rate", label: "Rate", type: "number" },
                { name: "taxPercent", label: "Tax%", type: "number" },
                {
                    name: "finalAmount",
                    label: "Final Amount",
                    type: "number",
                    readOnly: true,
                },
            ],
        },
        grossTotal: {
            label: "Gross Total",
            name: "grossTotal",
            type: "number",
            show: true,
        },
        taxAmount: {
            label: "Tax Amount ",
            name: "taxAmount",
            type: "number",
            show: true,
        },
        totalAmount: {
            label: "Tax Amount ",
            name: "totalAmount",
            type: "number",
            show: true,
        },
    },
};

export default invoiceData;

// export const invoiceData = [
//     {
//         invoiceNo:"121",
//         customer:"Royal Play Equipments",
//         invoiceDate:"21-1-24",
//         invoiceExpiredDate:"23-03-24",
//         grossTotal:23000,
//         grandTotal:24000,
//         status:"SEND",
//     },
//     {
//         invoiceNo:"122",
//         customer:"Vip Play Equipments",
//         invoiceDate:"21-1-24",
//         invoiceExpiredDate:"23-03-24",
//         grossTotal:23000,
//         grandTotal:24000,
//         status:"SEND",
//     }
// ]
