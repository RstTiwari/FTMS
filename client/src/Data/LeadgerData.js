import { Typography } from "antd";
import { localDateString } from "Helper/EpochConveter";
import Taglabel from "components/Comman/Taglabel";

const LeadgerData = [
    {
        title: <Taglabel text={"DATE"} />,
        dataIndex: "date",
        key: "expenseDate",
        render: (_, record) => (
            <Taglabel type="text" text={localDateString(record.date)} />
        ),
    },
    {
        title: <Taglabel text={"TRANSACTIONS"} />,
        dataIndex: "",
        render: (_, record) => <Taglabel text={record.type} type={"text"} />,
    },
    {
        title: <Taglabel text={"DETAILS"} />,
        dataIndex: "category",
        key: "category",
        render: (_, record) => (
            <>
                <Taglabel
                    type="text"
                    text={record.details ? record.details : ""}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"AMOUNT"} />,
        dataIndex: "amount",
        key: "total",
        render: (_, record) => (
            <>
                <Taglabel
                    type={"amount"}
                    text={record.grandTotal ? record.grandTotal : ""}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"PAYMENT"} />,
        key: "total",
        render: (_, record) => (
            <>
                <Taglabel
                    type="text"
                    text={record.payment ? record.payment : ""}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"BALANCE"} />,
        key: "total",
        render: (_, record) => (
            <>
                <Taglabel type="text" text={record.balance} />
            </>
        ),
    },
];

export default LeadgerData;
