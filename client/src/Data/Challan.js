import { Typography } from "antd";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
import { TableAction } from "components/TableAction";
const { Text } = Typography;

export const challanColumns = [
    {
        title: "Customer Name",
        dataIndex: "customer",
        key: "name",
        render: (_, record) => (
            <>
                <Text type="success">{record.customer.customerName}</Text>
            </>
        ),
    },
    {
        title: "Challan Number",
        dataIndex: "challanNumber",
        key: "challanNumber",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "total",
    },
    {
        title: "Invocie Status",
        dataIndex: "invoice",
        render: (_, record) => (
            <>
                <Text>{convertUnixTimestampToDate(record.invoice.status)}</Text>
            </>
        ),
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
        fixed: "right",
        render: (_, record) => (
            <TableAction params={record._id} page={"challan"} />
        ),
    },
];
