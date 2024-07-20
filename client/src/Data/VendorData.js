import { items } from "./LeadData";
import { Space, Dropdown } from "antd";

import { DownOutlined } from "@ant-design/icons";
import { TableAction } from "components/TableAction";
import Taglabel from "components/SmallComponent/Taglabel";

const getColumns = (details) => [
    {
        title: <Taglabel text={"VENDOR NAME"} details={details} />,
        dataIndex: "vendorName",
        key: "vendorName",
        render: (_, record) => (
            <>
                <Taglabel
                    text={record.vendorName}
                    type={"customer"}
                    details={details}
                />
            </>
        ),
    },
    {
        title: (
            <Taglabel text={"PHONE NO"} type={"heading"} details={details} />
        ),
        dataIndex: "vendorPhone",
        key: "vendorPhone",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <>
                <Taglabel
                    text={record.vendorPhone}
                    type={"text"}
                    details={details}
                />
            </>
        ),
    },
    {
        title: (
            <Taglabel text={"EMAIL ID"} type={"heading"} details={details} />
        ),
        dataIndex: "vendorEmail",
        key: "vendorEmail",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <>
                <Taglabel
                    text={record.vendorEmail}
                    type={"text"}
                    details={details}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"GST NO"} type={"heading"} details={details} />,
        dataIndex: "gstNo",
        key: "gstNo",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <>
                <Taglabel text={record.gstNo} type={"text"} details={details} />
            </>
        ),
    },
    {
        title: <Taglabel text={"PAN NO"} type={"heading"} details={details} />,
        dataIndex: "panNo",
        key: "panNo",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <>
                <Taglabel text={record.panNo} type={"text"} details={details} />
            </>
        ),
    },
];
const vendorData = {
    getColumns,
};

export default vendorData;
