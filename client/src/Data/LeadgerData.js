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
        title: <Taglabel text={"Particulars"} />,
        dataIndex: "",
        render: (_, record) => <Taglabel text={record.particulars} type={"text"} />,
    },
    {
        title: <Taglabel text={"Vch Type"} />,
        dataIndex: "category",
        key: "category",
        render: (_, record) => (
            <>
                <Taglabel
                    type="text"
                    text={record.voucherNo  && record.voucherType + "-"+ record.voucherNo}
                />
            </>
        ),
    },
     {
        title: <Taglabel text={"Vch No"} />,
        dataIndex: "category",
        key: "category",
        render: (_, record) => (
            <>
                <Taglabel
                    type="text"
                    text={record.voucherNo}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"Debit"} />,
        dataIndex: "amount",
        key: "total",
        render: (_, record) => (
            <>
                <Taglabel
                    type={"amount"}
                    text={record.debit ? record.debit : ""}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"Credit"} />,
        key: "total",
        render: (_, record) => (
            <>
                <Taglabel
                    type="text"
                    text={record.credit ? record.credit : ""}
                />
            </>
        ),
    },
   {
        title: <Taglabel text={"BALANCE"} />,
        key: "total",
        render: (_, record) => (
            <>
                <Taglabel
                    type="text"
                    text={
                        Number(record.balance) < 0
                            ? `${Math.abs(Number(record.balance))} Advance Recived`
                            : record.balance
                    }
                />
            </>
        ),
    },
];



export default LeadgerData;
