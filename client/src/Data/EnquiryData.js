import Taglabel from "components/Comman/Taglabel";

const getColumns = (details) => [
    {
        title: <Taglabel text={"ENQUIRY TYPE"} details={details} />,
        dataIndex: "type",
        key: "type",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <Taglabel type="text" text={record.type} details={details} />
        ),
    },
    {
        title: <Taglabel text={"Process"} details={details} />,
        dataIndex: "process",
        key: "process",
        render: (_, record) => (
            <>
                <Taglabel
                    text={record?.process}
                    type={"no"}
                    details={details}
                    p
                />
            </>
        ),
    },
    {
        title: (
            <Taglabel
                text={"Expected DATE"}
                type={"heading"}
                details={details}
            />
        ),
        dataIndex: "enquiryDate",
        key: "category",
        render: (_, record) => (
            <>
                <Taglabel
                    type="text"
                    text={record.enquiryDate}
                    details={details}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"Qty"} type={"heading"} details={details} />,
        dataIndex: "qty",
        key: "category",
        render: (_, record) => (
            <>
                <Taglabel type="text" text={record.qty} details={details} />
            </>
        ),
    },
];

export const enquiryReceivedData = {
    getColumns,
};
export default enquiryReceivedData;
