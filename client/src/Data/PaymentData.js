import { Typography } from "antd";
import { convertUnixTimestampToDate, jsDateIntoDayjsDate } from "Helper/EpochConveter";
import { TableAction } from "components/TableAction";
import Taglabel from "components/SmallComponent/Taglabel";
import { render } from "@testing-library/react";
const { Text } = Typography;

const paymentData = {
    listColumns: [
        {
            title: <Taglabel text={"CUSTOMER"} />,
            dataIndex: "invoice",
            key: "company",
            width: 300,
            render: (_, record) => (
                <>
                    <Taglabel
                        type="warning"
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
            title: <Taglabel text={" DATE"} />,
            dataIndex: "paymentDate",
            key: "createdDate",
            width: 100,

            render: (_, record) => (
                <>
                    <Text>
                        {jsDateIntoDayjsDate(record.createdDate)}
                    </Text>
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
                        type="success"
                        text={record?.amount ? record.amount : ""}
                    />
                </>
            ),
        },

        {
            title: <Taglabel text={"PAYMNET MODE"} />,
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
            title: "Note",
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
