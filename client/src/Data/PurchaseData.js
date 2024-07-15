import { Space, Flex, Dropdown, Typography, Form, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { items } from "./LeadData";
import { TableAction } from "components/TableAction";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
import Taglabel from "components/SmallComponent/Taglabel";
const { Text } = Typography;

export const purchaseData = {
    listColumns: [
        {
            title: <Taglabel text={"PURCHASE#"} type={"heading"} />,
            dataIndex: "purchaseNo",
            render: (_, record) => (
                <>
                    <Taglabel
                        type={"heading"}
                        text={record.vendor ? record.vendor.vendorName : ""}
                    />
                </>
            ),
        },
        {
            title: <Taglabel type={"heading"} text={"VENDOR NAME"} />,
            dataIndex: "vendor",
            key: "source",
            width: 250,
            render: (_, record) => (
                <>
                    <Taglabel
                        type={"customer"}
                        text={record.vendor ? record.vendor.vendorName : ""}
                    />
                </>
            ),
        },
        {
            title: <Taglabel type={"heading"} text={"DATE"} />,
            dataIndex: "purchaseDate",
            key: "company",
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    <Taglabel
                        type={"text"}
                        text={convertUnixTimestampToDate(
                            record.purchaseDate ? record.purchaseDate : ""
                        )}
                    />
                </>
            ),
        },
        {
            title: <Taglabel text={"STATUS"} type={"heading"} />,
            dataIndex: "status",
            key: "expiryDate",
            responsive: ["lg"],
            width: 100,
            render: (_, record) => (
                <>
                <Taglabel type={"text"} text= {(record.status)}/>
                </>
            ),
        },

        {
            title:<Taglabel text={"GROSS TOTAL"} type={"heading"} />,
            dataIndex: "grossTotal",
            key: "subTotal",
            render: (_, record) => (
                <>
                    <Taglabel
                        type={"amount"}
                        text={(
                            record.grossTotal ? record.grossTotal : ""
                        )}
                    />
                </>
            ),
        },
        {
            title: <Taglabel text={"GRAND TOTAL"}  type={"heading"}/>,
            dataIndex: "grandTotal",
            key: "subTotal",
            render: (_, record) => (
                <>
                    <Taglabel
                        type={"amount"}
                        text={(
                            record.grandTotal ? record.grandTotal : ""
                        )}
                    />
                </>
            ),
        },
    ],
};
export default purchaseData;
