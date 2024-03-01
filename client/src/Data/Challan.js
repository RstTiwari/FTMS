import { Typography } from "antd";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
import { TableAction } from "components/TableAction";
const { Text } = Typography;

export const challanColumns = [
    {
        title: "DELIVERY CHALLAN #",
        dataIndex: "challanNumber",
        key: "challanNumber",
    },
    {
        title: "CUSTOMER NAME",
        dataIndex: "customer",
        key: "name",
        render: (_, record) => (
            <>
                <Text type="success">{record.customer.customerName}</Text>
            </>
        ),
    },
    {
        title: "INVOICE #",
        dataIndex: "invoice",
        key: "challanNumber",
        render: (_, record) => (
            <>
                <Text type="success">{record.invoice.invoiceNo}</Text>
            </>
        ),
    },

    {
        title: "STATUS",
        dataIndex: "status",
        key: "total",
    },
    {
        title: "INVOICE STATUS",
        dataIndex: "invoice",
        render: (_, record) => (
            <>
                <Text>{convertUnixTimestampToDate(record.invoice.status)}</Text>
            </>
        ),
    },

    {
        title: " DATE",
        dataIndex: "createdDate",
        key: "createdDate",
        render: (_, record) => (
            <>
                <Text>{convertUnixTimestampToDate(record.challanDate)}</Text>
            </>
        ),
    },

    {
        fixed: "right",
        render: (_, record) => (
            <TableAction params={record._id} page={"challan"} />
        ),
    },
];
export const unitOptions = [
    {
        label: "Box",
        value: "Box",
    },
    {
        label: "Nos",
        value: "Nos",
    },
    {
        label: "Kg",
        value: "Kg",
    },
    {
        label: "Unit",
        value: "Unit",
    },
];
