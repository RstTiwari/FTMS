import { Typography } from "antd";
import {
    convertUnixTimestampToDate,
    jsDateIntoDayjsDate,
} from "Helper/EpochConveter";
import Taglabel from "components/Comman/Taglabel";
import MoreActionDropDown from "components/Comman/MoreActionDropDown";
import MoreActionDropDownData from "./MoreActionDropDownData";
import ShowEntityNo from "components/Comman/ShowEntityNo";

const { Text } = Typography;
const getColumns = (details) => [
    {
        title: (
            <Taglabel text={"#No"} type={"heading"} details={details} />
        ),
        dataIndex: "no",
        key: "no",
        width: 100,
        render: (_, record) => (
            <ShowEntityNo
                prefix={record.prefix}
                no={record.no}
                suffix={record.suffix}
            />
        ),
    },
    {
        title: (
            <Taglabel text={"VENDOR"} type={"heading"} details={details} />
        ),
        dataIndex: "vendor",
        key: "vendor",
        render: (_, record) => (
            <Taglabel
                type="customer"
                text={record?.vendor?.name || ""}
                details={details}
            />
        ),
    },
    {
        title: <Taglabel text={"DATE"} type={"heading"} details={details} />,
        dataIndex: "paymentDate",
        key: "paymentDate",
        responsive: details ? [] : ["lg"],
        width: 100,
        render: (_, record) => (
            <Taglabel
                type={"text"}
                text={jsDateIntoDayjsDate(record.createdDate)}
                details={details}
            />
        ),
    },
    {
        title: <Taglabel text={"AMOUNT"} type={"heading"} details={details} />,
        dataIndex: "amount",
        key: "amount",
        width: details ? 100 : 80,
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel
                type="amount"
                text={record?.amount || ""}
                details={details}
            />
        ),
    },
    {
        title: (
            <Taglabel
                text={"PAYMENT MODE"}
                type={"heading"}
                details={details}
            />
        ),
        dataIndex: "paymentMode",
        key: "paymentMode",
        width: 200,
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel
                type="text"
                text={record?.paymentMode || ""}
                details={details}
            />
        ),
    },
    {
        title: <Taglabel text={"NOTE"} type={"heading"} details={details} />,
        dataIndex: "note",
        key: "note",
        width: details ? 200 : 150,
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel type="text" text={record?.note || ""} details={details} />
        ),
    },
    {
         dataIndex: "operation",
            fixed: "right",
            render: (_, record) => (
              <MoreActionDropDown
                entity="paymentsmade"
                items={MoreActionDropDownData("paymentsmade")}
                rowData={record}
              />
            ),
          },
];
const paymentData = {
    getColumns,
};

export default paymentData;

export const paymentMode = [
    {
        label: "UPI",
        value: "UPI",
    },
    {
        label: "DEBIT CARD",
        value: "DEBIT CARD",
    },
    {
        label: "CASH",
        value: "CASH",
    },
    {
        label: "CHECK",
        value: "CHECK",
    },
];
