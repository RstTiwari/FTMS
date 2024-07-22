import { Space, Dropdown, Flex, Typography } from "antd";
import { convertUnixTimestampToDate } from "../Helper/EpochConveter";
const { Text, Link } = Typography;
export const sourceOptions = [
    {
        label: "IndiaMart",
        value: "indiaMart",
    },
    {
        label: "JustDial",
        value: "justdial",
    },
    {
        label: "Ads",
        value: "ads",
    },
    {
        label: "Website",
        value: "website",
    },
    {
        label: "SalesAgent",
        value: "salesAgent",
    },
];
export const companyDetails = [
    {
        label: "Royal play Equipment",
        value: "1234",
    },
    {
        label: "Vip play Equipment",
        value: "12222",
    },
    {
        label: "ZOho play Equipment",
        value: "12334445",
    },
    {
        label: "TOho play Equipment",
        value: "9890232280",
    },
];

export const leadStatus = [
    {
        label: "Draft",
        value: "draft",
    },
    {
        label: "Quote Sended",
        value: "quoateSended",
    },
    {
        label: "Waiting",
        value: "waiting",
    },
    {
        label: "Order Recived",
        vlaue: "orderRecived",
    },
];

export const items = [
    {
        key: "1",
        label: "SHOW",
    },
    {
        key: "2",
        label: "EDIT",
    },
    {
        key: "3",
        label: "DOWNLOAD",
    },
];

export const leadtData = {
    listColumns: [
        {
            title: "Source",
            dataIndex: "source",
            key: "source",
        },
        {
            title: "Customer",
            dataIndex: "customer",
            key: "company",
            render: (_, record) => (
                <>
                    <Text type="success">{record.customer.customerName}</Text>
                </>
            ),
        },

        {
            title: "Recived Date",
            dataIndex: "recivedDate",
            key: "recivedDate",
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    <Text>
                        {convertUnixTimestampToDate(record.recivedDate)}
                    </Text>
                </>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Comments",
            dataIndex: "comments",
            width: 250,
            key: "comments",
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    <Space>
                        <Flex vertical>
                            {record.comments.map((comment) => {
                                return (
                                    <div>
                                        <Text code>
                                            DATE:{" "}
                                            {convertUnixTimestampToDate(
                                                comment.date
                                            )}
                                        </Text>
                                        <Space style={{ margin: "0.3rem" }}>
                                            <Text type="success">
                                                {comment.comment}
                                            </Text>
                                        </Space>
                                    </div>
                                );
                            })}
                        </Flex>
                    </Space>
                </>
            ),
        },
    ],
};

export default leadtData;
