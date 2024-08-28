import { Typography } from "antd";
import {
    convertUnixTimestampToDate,
    jsDateIntoDayjsDate,
} from "Helper/EpochConveter";
import Taglabel from "components/Comman/Taglabel";

const { Text } = Typography;
const getColumns = (details) => [
    {
        title: (
            <Taglabel text={"NAME"} type={"heading"} details={details} />
        ),
        dataIndex: "name",
        key: "name",
        width: details ? 300 : 200,
        render: (_, record) => (
            <Taglabel
                type="customer"
                text={record?.name || ""}
                details={details}
            />
        ),
    },
    {
        title: <Taglabel text={"EMAIL"} type={"heading"} details={details} />,
        dataIndex: "email",
        key: "email",
        width: 100,
        render: (_, record) => (
            <Taglabel type={"text"} text={`${record.email}`} details={details} />
        ),
    },
    {
        title: <Taglabel text={"ROLE"} type={"heading"} details={details} />,
        dataIndex: "role",
        key: "role",
        responsive: details ? [] : ["lg"],
        width: 100,
        render: (_, record) => (
            <Taglabel
                type={"text"}
                text={(record.role)}
                details={details}
            />
        ),
    },
  

];
const SubUserData = {
    getColumns,
};

export default SubUserData;

export const role = [
    {
        label:"ADMIN",
        value:"admin"
    },
    {
        label:"USER",
        value:"user"
    },
    {
        label:"CUSTOM",
        value:"custom"
    },
    {
        label:"SUPER ADMIN",
        value:"superadmin"
    }
]

