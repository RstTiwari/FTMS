import { Typography } from "antd";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
import { TableAction } from "components/TableAction";
const { Text } = Typography;

const paymentData = {
    listColumns: [
        {
            title: "Customer",
            dataIndex: "invoice",
            key: "company",
            width: 300,
            render: (_, record) => (
                <>
                    <Text type="success">
                        {record.invoice.customer.customerName}
                    </Text>
                </>
            ),
        },
        {
            title: "Invoice#",
            dataIndex: "invoice",
            width: 100,
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    <Text>{record.invoice.invoiceNo}</Text>
                </>
            ),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            width: 100,
        },

        {
            title: " Date",
            dataIndex: "paymentDate",
            key: "createdDate",
            width: 100,

            render: (_, record) => (
                <>
                    <Text>
                        {convertUnixTimestampToDate(record.createdDate)}
                    </Text>
                </>
            ),
        },
        {
            title: "PAYMNET MODE",
            dataIndex: "paymentMode",
            key: "paymentMode",
            width: 200,
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
            width: 200,
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    <Text type="text">{record.note}</Text>
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
