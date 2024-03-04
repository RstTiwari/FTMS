import { Typography } from "antd";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
import { TableAction } from "components/TableAction";
const { Text } = Typography;

export const expensesColumns = [
    {
        title: " Date",
        dataIndex: "expenseDate",
        key: "expenseDate",
        render: (_, record) => (
            <>
                <Text>{convertUnixTimestampToDate(record.expenseDate)}</Text>
            </>
        ),
    },
    {
        title: "Expense Category",
        dataIndex: "category",
        key: "category",
        render: (_, record) => (
            <>
                <Text type="success">{record.categoryName}</Text>
            </>
        ),
    },
    {
        title: "Total",
        dataIndex: "amount",
        key: "total",
        render: (_, record) => (
            <>
                <Text type="danger">{record.amount}</Text>
            </>
        ),
    },
    {
        title: "NOTE",
        dataIndex: "note",
        key: "total",
        responsive: ["lg"],
        render: (_, record) => (
            <>
                <Text >{record.note}</Text>
            </>
        ),
    },

 
];

export const categoryOption = [
    {
        label: "Labour",
        value: "Labour",
    },
    {
        label: "Materials",
        value: "Materials",
    },
    {
        label: "IT & Internet",
        value: "IT & Internet",
    },
    {
        label: "Office Stationary",
        value: "Office Stationary",
    },
    {
        label: "Repair & Maintainance",
        value: "Repair & Maintainance",
    },
    {
        label: "Travel",
        value: "Travel",
    },
];
