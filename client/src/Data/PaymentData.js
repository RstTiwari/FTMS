import { Typography } from "antd";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
import { TableAction } from "components/TableAction";
const {Text} = Typography


export const paymentColumns = [
    {
        title: "Customer",
        dataIndex: "customer",
        key: "company",
        render: (_, record) => (
            <>
                <Text type="success">{record.customer.customerName}</Text>
            </>
        ),
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
    },

    {
        title: " Date",
        dataIndex: "createdDate",
        key: "createdDate",
        render: (_, record) => (
            <>
                <Text>{convertUnixTimestampToDate(record.createdDate)}</Text>
            </>
        ),
    },
    {
        title: "Invoice Number",
        dataIndex: "invoice",
        render: (_, record) => (
            <>
                <Text>{record.invoice.invoiceNo}</Text>
            </>
        ),
    },
    {
        title: "Payment Mode",
        dataIndex: "paymentMode",
        key: "paymentMode",
    },

    {
        fixed: "right",
        render: (_, record) => (
            <TableAction params={record._id} page={"payments"} />
        ),
    },
];
