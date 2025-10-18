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
        title: <Taglabel text={"#No"} type={"heading"} details={details} />,
        dataIndex: "no",
        key: "no",
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
        render: (_, record) => (
            <Taglabel
                type={"text"}
                text={jsDateIntoDayjsDate(record.paymentDate)}
                details={details}
            />
        ),
    },
    {
        title: <Taglabel text={"AMOUNT"} type={"heading"} details={details} />,
        dataIndex: "amount",
        key: "amount",
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
        label: "Tax:2.5%",
        value: 2.5,
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
