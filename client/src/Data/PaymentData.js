import { Typography } from "antd";
import { convertUnixTimestampToDate, jsDateIntoDayjsDate } from "Helper/EpochConveter";
import { TableAction } from "components/TableAction";
import Taglabel from "components/SmallComponent/Taglabel";
import { render } from "@testing-library/react";
const { Text } = Typography;

const paymentData = {
    listColumns: [

        {
            title: <Taglabel text={" DATE"}  type={"heading"}/>,
            dataIndex: "paymentDate",
            key: "createdDate",
            width: 100,

            render: (_, record) => (
                <>
                        {jsDateIntoDayjsDate(record.createdDate)}
                </>
            ),
        },
        {
            title: <Taglabel text={" PAYMENT #"} type={"heading"} />,
            dataIndex: "paymentDate",
            key: "createdDate",
            width: 100,

            render: (_, record) => (
                <>
                    <Taglabel  text={`${record.paymentNo}`}  type={"no"}/>
                </>
            ),
        },
        {
            title: <Taglabel text={"CUSTOMER"}  type={"heading"} />,
            dataIndex: "invoice",
            key: "company",
            width: 300,
            render: (_, record) => (
                <>
                    <Taglabel
                        type="customer"
                        text={
                            record?.customer?.customerName
                                ? record?.customer?.customerName
                                : ""
                        }
                    />
                </>
            ),
        },
        {
            title: <Taglabel text={"AMOUNT"} />,
            dataIndex: "amount",
            key: "amount",
            width: 100,
            render: (_, record) => (
                <>
                    <Taglabel
                        type="amount"
                        text={record?.amount ? record.amount : ""}
                    />
                </>
            ),
        },

        {
            title: <Taglabel text={"PAYMENT MODE"} type={"heading"} />,
            dataIndex: "paymentMode",
            key: "paymentMode",
            width: 200,
            render: (_, record) => (
                <>
                    <Taglabel
                        type="text"
                        text={record?.paymentMode ? record.paymentMode : ""}
                    />
                </>
            ),
        },
        {
            title: <Taglabel text={"NOTE"}  type={"heading"}/>,
            dataIndex: "note",
            key: "note",
            width: 200,
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    <Taglabel
                        type="text"
                        text={record?.note ? record.note : ""}
                    />
                </>
            ),
        },
    ],
};

export default paymentData;

export const paymentMode = [
    {
        label: "UPI",
        value: "UPI",
    },
    {
        label: "DEBIT CARD",
        value: "DEBIT CARD",
    },
    {
        label: "CASH",
        value: "CASH",
    },
    {
        label: "CHECK",
        value: "CHECk",
    },
];
