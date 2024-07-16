import { TableAction } from "components/TableAction";
import { Space, Flex, Dropdown, Typography, Form, Input } from "antd";
import { convertUnixTimestampToDate, jsDateIntoDayjsDate } from "Helper/EpochConveter";
import Taglabel from "components/SmallComponent/Taglabel";
const { Text } = Typography;

const invoiceData = {
    listColumns: [
        {
            title: <Taglabel  text={"#INVOICE"}  type={"heading"}/>,
            dataIndex: "invoiceNo",
            key: "invoiceNo",
        },
        {
            title: <Taglabel  text={"CUSTOMER"} type={"heading"}/>,
            dataIndex: "customer",
            key: "customer",
            render: (_, record) => (
                <>
                    <Taglabel type="customer" text = {record.customer.customerName}/>
                </>
            ),
        },
        {
            title: <Taglabel text={"INVOICE DATE"} />,
            dataIndex: "invoiceDate",
            key: "customer",

            render: (_, record) => (
                <Taglabel type={"text"} text={jsDateIntoDayjsDate(record.invoiceDate)}/>
            ),
        },
        {
            title: <Taglabel  text={"DUE DATE"} type={"heading"}/>,
            dataIndex: "invoiceExpiredDate",
            key: "customer",
            responsive: ["lg"],
            render: (_, record) => (
                <Taglabel  type="text" text= {jsDateIntoDayjsDate(record.invoiceExpiredDate)}/>
            ),
        },
        {
            title: <Taglabel text={"STATUS"} type={"heading"} />,
            dataIndex: "status",
            key: "expiryDate",
            responsive: ["lg"],
            render: (_, record) => (
                <>
                <Taglabel type={"text"} text= {(record.status)}/>
                </>
            ),
        },
        {
            title: <Taglabel  text={"GROSS TOTAL"} type={"heading"}/>,
            dataIndex: "grossTotal",
            key: "grossTotal",
            responsive: ["lg"],
            render: (_, record) => (
                <Taglabel  type="amount" text= {(record.grossTotal)}/>
            ),
        },
        {
            title: <Taglabel text={"GRAND TOTAL"}  type={"heading"}/>,
            dataIndex: "grandTotal",
            key: "grandTotal",
            render: (_, record) => (
                <Taglabel  type="amount" text= {(record.grandTotal)}/>
            ),
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
