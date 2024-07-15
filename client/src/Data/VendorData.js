import { items } from "./LeadData";
import { Space, Dropdown } from "antd";

import { DownOutlined } from "@ant-design/icons";
import { TableAction } from "components/TableAction";
import Taglabel from "components/SmallComponent/Taglabel";

const vendorData = {
    listColumns: [
        {
            title: <Taglabel text={"VENDOR NAME"} />,
            dataIndex: "vendorName",
            key: "vendorName",
            render: (_, record) => (
                <>
                    <Taglabel text={record.vendorName} type={"customer"} />
                </>
            ),
        },
        {
            title: <Taglabel text={"PHONE NO"} type={"heading"} />,
            dataIndex: "vendorPhone",
            key: "vendorPhone",
            render: (_, record) => (
                <>
                    <Taglabel text={record.vendorPhone} type={"text"} />
                </>
            ),
        },
        {
            title: <Taglabel text={"EMAIL ID"} type={"heading"} />,
            dataIndex: "vendorEmail",
            key: "vendorEmail",
            render: (_, record) => (
                <>
                    <Taglabel text={record.vendorEmail} type={"text"} />
                </>
            ),
        },
        {
            title: <Taglabel text={"GST NO"} type={"heading"} />,
            dataIndex: "gstNo",
            key: "gstNo",
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    <Taglabel text={record.gstNo} type={"text"} />
                </>
            ),
        },
        {
            title: <Taglabel text={"PAN NO"} type={"heading"} />,
            dataIndex: "panNo",
            key: "panNo",
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    <Taglabel text={record.panNo} type={"text"} />
                </>
            ),
        },
    ],
};

export default vendorData;
