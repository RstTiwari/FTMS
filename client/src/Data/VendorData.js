import { items } from "./LeadData";
import { Space, Dropdown } from "antd";

import { DownOutlined } from "@ant-design/icons";
import Taglabel from "components/Comman/Taglabel";
import MoreActionDropDown from "components/Comman/MoreActionDropDown";
import MoreActionDropDownData from "./MoreActionDropDownData";

const getColumns = (details) => [
    {
        title: <Taglabel text={"VENDOR NAME"} details={details} />,
        dataIndex: "name",
        key: "vendorName",
        render: (_, record) => (
            <>
                <Taglabel
                    text={record.name}
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
                    text={record.phone}
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
                    text={record.email}
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
                <Taglabel text={record?.gstNo ||""} type={"text"} details={details} />
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
                <Taglabel text={record?.panNo || ""} type={"text"} details={details} />
            </>
        ),
    },
      {
        dataIndex: "operation",
        fixed: "right",
        render: (_, record) => (
          <MoreActionDropDown
            entity="vendors"
            items={MoreActionDropDownData("vendors")}
            rowData={record}
          />
        ),
      },
];
const vendorData = {
    getColumns,
};

export default vendorData;
