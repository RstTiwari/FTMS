import { Space, Flex, Dropdown, Typography, Form, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { items } from "./LeadData";
import { TableAction } from "components/TableAction";
import { convertUnixTimestampToDate, jsDateIntoDayjsDate } from "Helper/EpochConveter";
import Taglabel from "components/SmallComponent/Taglabel";
const { Text } = Typography;

const quotationData = {
    listColumns: [
        {
            title: <Taglabel text={"NUMBER#"}  type={"heading"}/>,
            dataIndex: "quoteNo",
            key: "srno",
            width: 100,
        },
        {
            title:<Taglabel  text={"CUSTOMER"} type={"heading"}/>,
            dataIndex: "client",
            key: "source",
            width: 300,
            render: (_, record) => (
                <>
                    <Taglabel type="customer" text= {`${record?.customer?.customerName}`} />
                </>
            ),
        },
        {
            title: <Taglabel text={"RECEIVED DATE"} type={"heading"} />,
            dataIndex: "quoteDate",
            key: "company",
            responsive: ["lg"],
            width: 150,
            render: (_, record) => (
                <>
                <Taglabel type={"text"} text= {jsDateIntoDayjsDate(record.quoteDate)}/>
                </>
            ),
        },
        {
            title: <Taglabel text={"DUE DATE"} type={"heading"} />,
            dataIndex: "expiryDate",
            key: "expiryDate",
            responsive: ["lg"],
            width: 150,
            render: (_, record) => (
                <>
                <Taglabel type={"text"} text= {jsDateIntoDayjsDate(record.expiryDate)}/>
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
            title:<Taglabel text={"GROSS TOTAL"}  type={"heading"}/>,
            dataIndex: "grossTotal",
            width: 200,
            key: "subTotal",
            render: (_, record) => (
                <>{<Taglabel  type="amount" text={`${record.grossTotal}`} weight={1000}/>}</>
            ),
        },
        
        {
            title:<Taglabel text={"GRAND TOTAL"} type={"heading"} />,
            dataIndex: "grandTotal",
            key: "subTotal",
            width: 200,
            render: (_, record) => (
                <>{<Taglabel  type="amount" text={`${record.grandTotal}`} weight={1000}/>}</>
            ),
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
