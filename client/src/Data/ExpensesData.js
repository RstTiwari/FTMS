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
        title: <Taglabel text={"DATE"} details={details} />,
        dataIndex: "expenseDate",
        key: "expenseDate",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel
                type="text"
                text={jsDateIntoDayjsDate(record.expenseDate)}
                details={details}
            />
        ),
    },
    {
        title: <Taglabel text={"#No"} details={details} />,
        dataIndex: "no",
        key: "expenseDate",
        render: (_, record) => (
            <>
                <Taglabel
                    text={record.no}
                    type={"no"}
                    details={details}
                />
            </>
        ),
    },
    {
        title: (
            <Taglabel text={"CATEGORY"} type={"heading"} details={details} />
        ),
        dataIndex: "category",
        key: "category",
        render: (_, record) => (
            <>
                <Taglabel
                    type="text"
                    text={record.categoryName}
                    details={details}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"AMOUNT"} type={"heading"} details={details} />,
        dataIndex: "amount",
        key: "total",
        render: (_, record) => (
            <>
                <Taglabel
                    type={"amount"}
                    text={record.amount}
                    details={details}
                />
            </>
        ),
    },
    {
        title: <Taglabel type={"heading"} text={"NOTE"} details={details} />,
        dataIndex: "note",
        key: "total",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <>
                <Taglabel type="text" text={record.note} details={details} />
            </>
        ),
    },
    {
        dataIndex: "operation",
        fixed: "right",
        render: (_, record) => (
          <MoreActionDropDown
            entity="expenses"
            items={MoreActionDropDownData("expenses")}
            rowData={record}
          />
        ),
      },
];

export const expenseData = {
    getColumns,
};
export default expenseData;

export const categoryOption = [
    {
        label: "Labour",
        value: "Labour",
    },
    {
        label: "Materials",
        value: "Materials",
    },
    {
        label: "IT & Internet",
        value: "IT & Internet",
    },
    {
        label: "Office Stationary",
        value: "Office Stationary",
    },
    {
        label: "Repair & Maintainance",
        value: "Repair & Maintainance",
    },
    {
        label: "Travel",
        value: "Travel",
    },
];
