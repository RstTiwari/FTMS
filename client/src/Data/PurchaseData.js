import { Space, Flex, Dropdown, Typography, Form, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { items } from "./LeadData";
import { TableAction } from "components/TableAction";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
const { Text } = Typography;

export const purchaseData = {
    listColumns: [
        {
            title: "PURCHASE #",
            dataIndex: "purchaseNo",
        },
        {
            title: "VENDOR",
            dataIndex: "vendors",
            key: "source",
            width: 250,
            render: (_, record) => (
                <>
                    <Text type="success">
                        {record.vendor ? record.vendor.vendorName : ""}
                    </Text>
                </>
            ),
        },
        {
            title: "DATE",
            dataIndex: "purchaseDate",
            key: "company",
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    {convertUnixTimestampToDate(
                        record.purchaseDate ? record.purchaseDate : ""
                    )}
                </>
            ),
        },

        {
            title: "Gross Total",
            dataIndex: "grossTotal",
            key: "subTotal",
        },
        {
            title: "Grand Total",
            dataIndex: "grandTotal",
            key: "subTotal",
        },
    ],
};
export default purchaseData;
