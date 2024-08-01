import Taglabel from "components/Comman/Taglabel";
import { jsDateIntoDayjsDate } from "Helper/EpochConveter";

const getColumns = (details) => [
    {
        title: <Taglabel text={"QUOTE#"} type={"heading"} details={details} />,
        dataIndex: "quoteNo",
        key: "srno",
    },
    {
        title: (
            <Taglabel text={"CUSTOMER"} type={"heading"} details={details} />
        ),
        dataIndex: "client",
        key: "source",
        render: (_, record) => (
            <Taglabel
                type="customer"
                text={`${record?.customer?.customerName}`}
                details={details}
            />
        ),
    },
    {
        title: (
            <Taglabel
                text={"RECEIVED DATE"}
                type={"heading"}
                details={details}
            />
        ),
        dataIndex: "quoteDate",
        key: "company",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel
                type={"text"}
                text={jsDateIntoDayjsDate(record.quoteDate)}
                details={details}
            />
        ),
    },
    {
        title: (
            <Taglabel text={"DUE DATE"} type={"heading"} details={details} />
        ),
        dataIndex: "expiryDate",
        key: "expiryDate",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel
                type={"text"}
                text={jsDateIntoDayjsDate(record.expiryDate)}
                details={details}
            />
        ),
    },
    {
        title: <Taglabel text={"STATUS"} type={"heading"} details={details} />,
        dataIndex: "status",
        key: "expiryDate",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel type={"text"} text={record.status} details={details} />
        ),
    },
    {
        title: (
            <Taglabel text={"GROSS TOTAL"} type={"heading"} details={details} />
        ),
        dataIndex: "grossTotal",
        key: "subTotal",
        responsive: details ? [] : ["lg"],

        render: (_, record) => (
            <Taglabel
                type="amount"
                text={`${record.grossTotal}`}
                weight={1000}
                details={details}
            />
        ),
    },
    {
        title: (
            <Taglabel text={"GRAND TOTAL"} type={"heading"} details={details} />
        ),
        dataIndex: "grandTotal",
        key: "subTotal",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel
                type="amount"
                text={`${record.grandTotal}`}
                weight={1000}
                details={details}
            />
        ),
    },
];

const quotationData = {
    getColumns,
};

export default quotationData;

export const quoteMessage =
    "Kindly find attached Quote for the Play Equipments / Outdoor Gym Equipments / Rubber Flooring / Benches / Dustbins.Terms & Conditions for Supply, Installation, Services and Warranty are as follows";
export const deliveryCondition =
    "Delivery shall be made within 10/25 days after receiving confirmed Purchase Order along with Advance Payment as per terms and conditions.";
export const validityCondition =
    "This Quotation shall be valid for 10 / 15 days Only.";
export const paymentsCondition =
    "Advance with PO 50% & against Delivery 50 %. After Installation 50%. Cheque should be drawn in favour of VIP Play";
export const cancellationCondition =
    "Order once placed will not be cancelled in any circumstances.";
export const installationCondition =
    "Civil materials such as cement, metal, sand, water, electricity along with unskilled labors to be arranged by Client.";
export const facilityCondition =
    "Proper storage space will be provided by the client for safety & security of materials at site upon delivery. Security of materials delivered at site shall be responsibility of client only.";
