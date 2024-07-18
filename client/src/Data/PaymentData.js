import { Typography } from "antd";
import { convertUnixTimestampToDate, jsDateIntoDayjsDate } from "Helper/EpochConveter";
import Taglabel from "components/SmallComponent/Taglabel";

const { Text } = Typography;
const getColumns = (details) => [
  
    {
        title: <Taglabel text={"PAYMENT#"} type={"heading"} details ={details} />,
        dataIndex: "paymentNo",
        key: "paymentNo",
        width: 100,
        render: (_, record) => (
            <Taglabel type={"no"} text={`${record.paymentNo}`}  details ={details}/>
        ),
    },
    {
        title: <Taglabel text={"CUSTOMER"} type={"heading"} details ={details} />,
        dataIndex: "customer",
        key: "customer",
        width: details ? 300 : 200,
        render: (_, record) => (
            <Taglabel type="customer" text={record?.customer?.customerName || ""}  details ={details}/>
        ),
    },
    {
        title: <Taglabel text={"DATE"} type={"heading"}  details ={details}/>,
        dataIndex: "paymentDate",
        key: "paymentDate",
        responsive: details ? [] : ["lg"],
        width: 100,
        render: (_, record) => (
            <Taglabel type={"text"} text={jsDateIntoDayjsDate(record.createdDate)} details ={details} />
        ),
    },
    {
        title: <Taglabel text={"AMOUNT"} type={"heading"} details ={details} />,
        dataIndex: "amount",
        key: "amount",
        width: details ? 100 : 80,
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel type="amount" text={record?.amount || ""} details ={details} />
        ),
    },
    {
        title: <Taglabel text={"PAYMENT MODE"} type={"heading"} details ={details} />,
        dataIndex: "paymentMode",
        key: "paymentMode",
        width: details ? 200 : 120,
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel type="text" text={record?.paymentMode || ""} details ={details}/>
        ),
    },
    {
        title: <Taglabel text={"NOTE"} type={"heading"}  details ={details}/>,
        dataIndex: "note",
        key: "note",
        width: details ? 200 : 150,
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel type="text" text={record?.note || ""} details ={details} />
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
