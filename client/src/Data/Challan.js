import { Typography } from "antd";
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
    key: "challanNumber",
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
      <Taglabel text={"DELIVERED  TO"} type={"heading"} details={details} />
    ),
    dataIndex: "customer",
    key: "name",
    render: (_, record) => (
      <>
        <Taglabel
          type="customer"
          text={record.delivery ? record.delivery.to : ""}
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
        <Taglabel type={"status"} text={record.status} details={details} />
      </>
    ),
  },
  {
    dataIndex: "operation",
    fixed: "right",
    render: (_, record) => (
      <MoreActionDropDown
        entity="challans"
        items={MoreActionDropDownData("challans")}
        rowData={record}
      />
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
