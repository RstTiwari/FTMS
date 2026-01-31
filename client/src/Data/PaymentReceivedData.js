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
        type: <Taglabel text={"#No"} type={"heading"} details={details} />,
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
        type: (
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
        type: <Taglabel text={"DATE"} type={"heading"} details={details} />,
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
        type: <Taglabel text={"AMOUNT"} type={"heading"} details={details} />,
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
        type: (
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
        type: <Taglabel text={"NOTE"} type={"heading"} details={details} />,
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
    label: "GST@3%",
    type: "GST",
    value: "gst_3",
    rate: 3,
  },
  {
    label: "IGST@3%",
    type: "IGST",
    value: "igst_3",
    rate: 3,
  },

  {
    label: "GST@5%",
    type: "GST",
    value: "gst_5",
    rate: 5,
  },
  {
    label: "IGST@5%",
    type: "IGST",
    value: "igst_5",
    rate: 5,
  },

  {
    label: "CGST@12%",
    type: "GST",
    value: "cgst_12",
    rate: 12,
  },
  {
    label: "IGST@12%",
    type: "IGST",
    value: "igst_12",
    rate: 12,
  },

  {
    label: "CGST@18%",
    type: "GST",
    value: "cgst_18",
    rate: 18,
  },
  {
    label: "IGST@18%",
    type: "IGST",
    value: "igst_18",
    rate: 18,
  },

  {
    label: "CGST@28%",
    type: "GST",
    value: "cgst_28",
    rate: 28,
  },
  {
    label: "IGST@28%",
    type: "IGST",
    value: "igst_28",
    rate: 28,
  },

  {
    label: "CGST@40%",
    type: "GST",
    value: "cgst_40",
    rate: 40,
  },
  {
    label: "IGST@40%",
    type: "IGST",
    value: "igst_40",
    rate: 40,
  },

  {
    label: "EXEMPT",
    type: "EXEMPT",
    value: "exempt",
    rate: 0,
  },
];
