import { Typography } from "antd";
import {
    convertUnixTimestampToDate,
    jsDateIntoDayjsDate,
} from "Helper/EpochConveter";
import { TableAction } from "components/TableAction";
import Taglabel from "components/SmallComponent/Taglabel";
const { Text } = Typography;

export const expenseData = {
    listColumns: [
        {
            title: <Taglabel text={"DATE"} />,
            dataIndex: "expenseDate",
            key: "expenseDate",
            render: (_, record) => (
                <Taglabel   type = "text" text= {jsDateIntoDayjsDate(record.expenseDate)}/>
            ),
        },
        {
            title: <Taglabel text={"EXPENSE#"} />,
            dataIndex: "expenseNo",
            key: "expenseDate",
            render: (_, record) => (
                <>
                    <Taglabel text={record.expenseNo} type={"no"} />
                </>
            ),
        },
        {
            title: <Taglabel text={"EXPENSE CATEGORY"} type={"heading"} />,
            dataIndex: "category",
            key: "category",
            render: (_, record) => (
                <>
                    <Taglabel type="text" text={record.categoryName} />
                </>
            ),
        },
        {
            title: <Taglabel text={"AMOUNT"} type={"heading"} />,
            dataIndex: "amount",
            key: "total",
            render: (_, record) => (
                <>
                    <Taglabel type={"amount"} text={record.amount} />
                </>
            ),
        },
        {
            title: <Taglabel type={"heading"} text={"NOTE"} />,
            dataIndex: "note",
            key: "total",
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    <Taglabel  type ="text" text={record.note}/>
                </>
            ),
        },
    ],
};
export default expenseData;

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
