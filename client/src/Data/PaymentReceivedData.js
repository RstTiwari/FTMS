import { Typography } from "antd";
import {
    convertUnixTimestampToDate,
    jsDateIntoDayjsDate,
} from "Helper/EpochConveter";
import Taglabel from "components/Comman/Taglabel";
import MoreActionDropDown from "components/Comman/MoreActionDropDown";
import MoreActionDropDownData from "./MoreActionDropDownData";

const { Text } = Typography;
const getColumns = (details) => [
    {
        title: <Taglabel text={"#No"} type={"heading"} details={details} />,
        dataIndex: "no",
        key: "no",
        width: 100,
        render: (_, record) => (
            <Taglabel type={"no"} text={`${record.no}`} details={details} />
        ),
    },
    {
        title: (
            <Taglabel text={"CUSTOMER"} type={"heading"} details={details} />
        ),
        dataIndex: "customer",
        key: "customer",
        render: (_, record) => (
            <Taglabel
                type="customer"
                text={record?.customer?.name || ""}
                details={details}
            />
        ),
    },
    {
        title: <Taglabel text={"DATE"} type={"heading"} details={details} />,
        dataIndex: "paymentDate",
        key: "paymentDate",
        responsive: details ? [] : ["lg"],
        width: 200,
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
        width: 200 ,
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
            entity="paymentsreceived"
            items={MoreActionDropDownData("paymentsreceived")}
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
    label: "UPI TRANSFER",
    value: "UPI_TRANSFER",
  },
  {
    label: "CASH TRANSACTION",
    value: "CASH_TRANSACTION",
  },
  {
    label: "CHEQUE",
    value: "CHEQUE",
  },
  {
    label: "BANK TRANSFER",
    value: "BANK_TRANSFER",
  },

  {
    label: "CREDIT CARD",
    value: "CREDIT_CARD",
  },
];
export const taxPercent = [
    {
        label: "Tax:0%",
        value: 0,
    },
    {
        label: "Tax:3%",
        value: 3,
    },
    {
        label: "Tax:5%",
        value: 5,
    },
    {
        label: "Tax:12%",
        value: 12,
    },

    {
        label: "Tax:18%",
        value: 18,
    },
    {
        label: "Tax:28%",
        value: 28,
    },
];
