import { Space, Flex, Dropdown, Typography, Form, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { items } from "./LeadData";
import { TableAction } from "components/TableAction";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
const { Text } = Typography;

const quotationData = {
    listColumns: [
        {
            title: "#Number",
            dataIndex: "quoteNo",
            key: "srno",
            width: 100,
        },
        {
            title: "Client",
            dataIndex: "client",
            key: "source",
            width: 300,
            render: (_, record) => (
                <>
                    <Text type="success">{record.customer.customerName}</Text>
                </>
            ),
        },
        {
            title: "Recived Date",
            dataIndex: "quoteRecivedDate",
            key: "company",
            responsive: ["lg"],
            width: 200,
            render: (_, record) => (
                <>{convertUnixTimestampToDate(record.quoteDate)}</>
            ),
        },
        {
            title: "Expired Date",
            dataIndex: "quoteExpiredDate",
            key: "quoteExpiredDate",
            responsive: ["lg"],
            width: 200,
            render: (_, record) => (
                <>{convertUnixTimestampToDate(record.quoteExpiryDate)}</>
            ),
        },
        {
            title: "Gross Total",
            dataIndex: "grossTotal",
            width: 250,
            key: "subTotal",
        },
        {
            title: "Grand Total",
            dataIndex: "grandTotal",
            key: "subTotal",
            width: 250,
        },
    ],
};

export default quotationData;

export const quoteMessage =
    "Kindly find attached Quote for the Play Equipments / Outdoor Gym Equipments / Rubber Flooring / Benches / Dustbins.Terms & Conditions for Supply, Installation, Services and Warranty are as follows";
export const deliveryCondition =
    "Delivery shall be made within 10/25 days after receiving confirmed Purchase Order along with Advance Payment as per terms and conditions.";
export const validityCondition =
    "This Quotation shall be valid for 10 / 15 days Only.";
export const paymentsCondition =
    "Advance with PO 50% & against Delivery 50 % . After Instoletion % Cheque should be drawn in favour of vipplay";
export const cancellationCondition =
    "Order once placed will not be cancelled in any circumstances.";
export const installationCondition =
    "Civil materials such as cement, metal, sand, water, electricity along with unskilled labours to be arranged by Client.";
export const facilityCondition =
    "Proper storage space will be provided by the client for safety & security of materials at site upon delivery. Security of materials delivered st site shall be responsibility ofclient only";
