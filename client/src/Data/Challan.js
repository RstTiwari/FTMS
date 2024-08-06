import { Typography } from "antd";
import {
    convertUnixTimestampToDate,
    jsDateIntoDayjsDate,
} from "Helper/EpochConveter";
import Taglabel from "components/Comman/Taglabel";
const getColumns = (details) => [
    {
        title: (
            <Taglabel text={"CHALLAN #"} type={"heading"} details={details} />
        ),
        dataIndex: "challanNo",
        key: "challanNumber",
        render: (_, record) => (
            <>
                <Taglabel
                    type={"no"}
                    text={record.challanNo}
                    details={details}
                />
            </>
        ),
    },
    {
        title: (
            <Taglabel
                text={"CUSTOMER NAME"}
                type={"heading"}
                details={details}
            />
        ),
        dataIndex: "customer",
        key: "name",
        render: (_, record) => (
            <>
                <Taglabel
                    type="customer"
                    text={record.customer ? record.customer.name : ""}
                    details={details}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"DATE"} type={"heading"} details={details} />,
        dataIndex: "challanDate",
        responsive: details ? [] : ["lg"],
        key: "createdDate",
        render: (_, record) => (
            <>
                <Taglabel
                    type={"text"}
                    text={jsDateIntoDayjsDate(record.challanDate)}
                    details={details}
                />
            </>
        ),
    },

    {
        title: <Taglabel text={"STATUS"} type={"heading"} />,
        dataIndex: "status",
        key: "status",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <>
                <Taglabel
                    type={"status"}
                    text={record.status}
                    details={details}
                />
            </>
        ),
    },
];

let challanData = {
    getColumns,
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
