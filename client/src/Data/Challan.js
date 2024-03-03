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
        title: "STATUS",
        dataIndex: "status",
        key: "status",
    },


    {
        fixed: "right",
        render: (_, record) => (
            <TableAction params={record._id} page={"deliverychallan"} />
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
