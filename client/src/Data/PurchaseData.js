import { Space, Flex, Dropdown, Typography, Form, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { items } from "./LeadData";
import { TableAction } from "components/TableAction";
import {
    convertUnixTimestampToDate,
    jsDateIntoDayjsDate,
} from "Helper/EpochConveter";
import Taglabel from "components/SmallComponent/Taglabel";
const { Text } = Typography;

const getColumns = (details) => [
    {
        title: (
            <Taglabel text={"PURCHASE#"} type={"heading"} details={details} />
        ),
        dataIndex: "purchaseNo",
        render: (_, record) => (
            <>
                <Taglabel
                    type={"number"}
                    text={record.vendor ? record.purchaseNo : ""}
                    details={details}
                />
            </>
        ),
    },
    {
        title: (
            <Taglabel type={"heading"} text={"VENDOR NAME"} details={details} />
        ),
        dataIndex: "vendor",
        key: "source",
        width: 250,
        render: (_, record) => (
            <>
                <Taglabel
                    type={"customer"}
                    text={record.vendor ? record.vendor.vendorName : ""}
                    details={details}
                />
            </>
        ),
    },
    {
        title: <Taglabel type={"heading"} text={"DATE"} details={details} />,
        dataIndex: "purchaseDate",
        key: "company",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <>
                <Taglabel
                    type={"text"}
                    text={jsDateIntoDayjsDate(
                        record.purchaseDate ? record.purchaseDate : ""
                    )}
                    details={details}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"STATUS"} type={"heading"} details={details} />,
        dataIndex: "status",
        key: "expiryDate",
        responsive: details ? [] : ["lg"],
        width: 100,
        render: (_, record) => (
            <>
                <Taglabel
                    type={"text"}
                    text={record.status}
                    details={details}
                />
            </>
        ),
    },

    {
        title: (
            <Taglabel text={"GROSS TOTAL"} type={"heading"} details={details} />
        ),
        dataIndex: "grossTotal",
        responsive: details ? [] : ["lg"],
        key: "subTotal",
        render: (_, record) => (
            <>
                <Taglabel
                    type={"amount"}
                    text={record.grossTotal ? record.grossTotal : ""}
                    details={details}
                />
            </>
        ),
    },
    {
        title: (
            <Taglabel text={"GRAND TOTAL"} type={"heading"} details={details} />
        ),
        dataIndex: "grandTotal",
        key: "subTotal",
        responsive: details ? [] : ["lg"],

        render: (_, record) => (
            <>
                <Taglabel
                    type={"amount"}
                    text={record.grandTotal ? record.grandTotal : ""}
                    details={details}
                />
            </>
        ),
    },
];

export const purchaseData = {
    getColumns,
};
export default purchaseData;
