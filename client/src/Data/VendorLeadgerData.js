
import { Typography } from "antd";
import { localDateString } from "Helper/EpochConveter";
import Taglabel from "components/Comman/Taglabel";



const vendorLeadgerData = [
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
        render: (_, record) => <Taglabel text={record.particulars} type={"text"} />,
    },
    {
        title: <Taglabel text={"DETAILS"} />,
        dataIndex: "category",
        key: "category",
        render: (_, record) => (
            <>
                <Taglabel
                    type="text"
                    text={record.voucherNo && record.voucherType + "-" + record.voucherNo}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"PURCHASE AMOUNT"} />,
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
        title: <Taglabel text={"PAYMENT MADE"} />,
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
                            ? `${Math.abs(Number(record.balance))} Advance Paid`
                            : record.balance
                    }
                />
            </>
        ),
    },
];
export default vendorLeadgerData