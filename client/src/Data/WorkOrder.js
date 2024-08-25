import { Space, Flex, Dropdown, Typography, Form, Input } from "antd";
import {
    convertUnixTimestampToDate,
    jsDateIntoDayjsDate,
} from "Helper/EpochConveter";
import Taglabel from "components/Comman/Taglabel";

const { Text } = Typography;

const getColumns = (details) => [
    {
        title: <Taglabel text={"#NO"} type={"no"} details={details} />,
        dataIndex: "no",
        key: "no",
    },
    {
        title: <Taglabel text={"TYPE"} type={"heading"} details={details} />,
        dataIndex: "type",
        key: "type",
    },

    {
        title: <Taglabel text={"EXP DUE DATE"} />,
        dataIndex: "startDate",
        responsive: details ? [] : ["lg"],
        key: "customer",
        render: (_, record) => (
            <Taglabel
                type={"text"}
                text={jsDateIntoDayjsDate(record.startDate)}
                details={details}
            />
        ),
    },
    {
        title: <Taglabel text={"EXP DUE DATE"} type={"heading"} />,
        dataIndex: "dueDate",
        key: "dueDate",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel
                type="text"
                text={jsDateIntoDayjsDate(record.dueDate)}
                details={details}
            />
        ),
    },
    {
        title: <Taglabel text={"STATUS"} type={"status"} details={details} />,
        dataIndex: "status",
        key: "status",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel type={"text"} text={record.status} details={details} />
        ),
    },
];

const workOrderData = {
    getColumns,
    // formField: {
    //     customer: {
    //         label: "Select Customer",
    //         name: "customer",
    //         type: "model",
    //         required: true,
    //         show: true,
    //         rules: [{ required: true, message: "Please Select Customer" }],
    //     },
    //     no: {
    //         label: "#Invoice",
    //         name: "no",
    //         type: "input",
    //         show: true,
    //         rules: [{ required: true, message: "Please Provide Invoice No" }],
    //     },
    //     quoteDate: {
    //         label: "Invoice Date",
    //         name: "quoteDate",
    //         type: "date",
    //         show: true,
    //         rules: [{ required: true, message: "Please Select Invoice Date" }],
    //     },
    //     expiryDate: {
    //         label: "Due Date",
    //         name: "dueDate",
    //         type: "date",
    //         show: true,
    //         rules: [{ required: true, message: "Please Select Due Date" }],
    //     },
    //     items: {
    //         type: "list",
    //         fields: [
    //             {
    //                 name: "description",
    //                 label: "Description",
    //                 type: "modal",
    //                 rules: [
    //                     {
    //                         message: "Please Select the description",
    //                     },
    //                 ],
    //             },
    //             { name: "hsnCode", label: "HSN CODE", type: "input" },
    //             { name: "qty", label: "Qty", type: "number" },
    //             { name: "rate", label: "Rate", type: "number" },
    //             { name: "taxPercent", label: "Tax%", type: "number" },
    //             {
    //                 name: "finalAmount",
    //                 label: "Final Amount",
    //                 type: "number",
    //                 readOnly: true,
    //             },
    //         ],
    //     },
    //     grossTotal: {
    //         label: "Gross Total",
    //         name: "grossTotal",
    //         type: "number",
    //         show: true,
    //     },
    //     taxAmount: {
    //         label: "Tax Amount ",
    //         name: "taxAmount",
    //         type: "number",
    //         show: true,
    //     },
    //     totalAmount: {
    //         label: "Tax Amount ",
    //         name: "totalAmount",
    //         type: "number",
    //         show: true,
    //     },
    // },
};

export default workOrderData;
