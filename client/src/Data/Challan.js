import { Typography } from "antd";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
import { TableAction } from "components/TableAction";
import Taglabel from "components/SmallComponent/Taglabel";
const { Text } = Typography;

const challanData = {
    listColumns: [
        {
            title: <Taglabel text={"CHALLAN #"} type={"heading"} />,
            dataIndex: "challanNo",
            key: "challanNumber",
            render: (_, record) => (
                <>
                    <Taglabel type={"no"} text={record.challanNo} />
                </>
            ),
        },
        {
            title: <Taglabel text={"CUSTOMER NAME"} type={"heading"} />,
            dataIndex: "customer",
            key: "name",
            render: (_, record) => (
                <>
                    <Taglabel
                        type="success"
                        text={record.customer.customerName}
                    ></Taglabel>
                </>
            ),
        },
        {
            title: <Taglabel text={"DATE"} type={"heading"} />,
            dataIndex: "createdDate",
            key: "createdDate",
            render: (_, record) => (
                <>
                    <Taglabel type={"text"} text={record.createdDate} />
                </>
            ),
        },

        {
            title: <Taglabel text={"STATUS"} type={"heading"} />,
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <>
                    <Taglabel type={"status"} text={record.status} />
                </>
            ),
        },
    ],
};

export default challanData;

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
