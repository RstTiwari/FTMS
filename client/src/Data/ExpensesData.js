import { Typography } from "antd";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
import { TableAction } from "components/TableAction";
const { Text } = Typography;

export const expensesColumns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Expense Category",
        dataIndex: "category",
        key: "category",
        render: (_, record) => (
            <>
                <Text type="success">{record.category}</Text>
            </>
        ),
    },
    {
        title: "Total",
        dataIndex: "total",
        key: "total",
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
            <TableAction params={record._id} page={"expenses"} />
        ),
    },
];

export const categoryOption = [
    {
        label:"Labour",
        value:"Labour"

    },
    {
        label:"Materials",
        value:"Materials"

    },
    {
        label:"IT & Internet",
        value:"IT & Internet"

    },
    {
        label:"Office Stationary",
        value:"Office Stationary"

    },
    {
        label:"Repair & Maintainance",
        value:"Repair & Maintainance"

    },
    {
        label:"Travel",
        value:"Travel"
    },
   
]