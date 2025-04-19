import { Space, Flex, Dropdown, Typography, Form, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { items } from "./LeadData";
import {
    convertUnixTimestampToDate,
    jsDateIntoDayjsDate,
} from "Helper/EpochConveter";
import Taglabel from "components/Comman/Taglabel";
import MoreActionDropDown from "components/Comman/MoreActionDropDown";
import MoreActionDropDownData from "./MoreActionDropDownData";
import ShowEntityNo from "components/Comman/ShowEntityNo";

const getColumns = (details) => [
  {
    title: <Taglabel text={"#No"} type={"heading"} details={details} />,
    dataIndex: "no",
    render: (_, record) => (
      <ShowEntityNo
          prefix={record.prefix}
          no={record.no}
          suffix={record.suffix}
      />
  ),
  },
  {
    title: <Taglabel type={"heading"} text={"VENDOR NAME"} details={details} />,
    dataIndex: "vendor",
    key: "source",
    render: (_, record) => (
      <>
        <Taglabel
          type={"customer"}
          text={record.vendor ? record?.vendor?.name : ""}
          details={details}
        />
      </>
    ),
  },
  {
    title: <Taglabel type={"heading"} text={"DATE"} details={details} />,
    dataIndex: "purchaseDate",
    key: "company",
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
    render: (_, record) => (
      <>
        <Taglabel type={"text"} text={record.status} details={details} />
      </>
    ),
  },

  {
    title: <Taglabel text={"GROSS TOTAL"} type={"heading"} details={details} />,
    dataIndex: "grossTotal",
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
    title: <Taglabel text={"GRAND TOTAL"} type={"heading"} details={details} />,
    dataIndex: "grandTotal",
    key: "subTotal",

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
  {
    dataIndex: "operation",
    fixed: "right",
    render: (_, record) => (
      <MoreActionDropDown
        entity="purchases"
        items={MoreActionDropDownData("purchases")}
        rowData={record}
      />
    ),
  },
];

export const purchaseData = {
    getColumns,
};
export default purchaseData;
