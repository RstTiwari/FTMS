// export const productOption = [
//     {
//         _id:"623gt23v23v23vg23vg2v2",
//         productName:"Laptop Bag",
//         hsnCode:"11111",
//         rate:1000,
//         image:""
//     },
//     {
//         productName:"Plastic water Bottel",
//         hsnCode:"22222",
//         rate:2000,
//         image:""
//     },
//     {
//         productName:"Coffe Mug Dispenser",
//         hsnCode:"3333",
//         rate:1000,
//         image:""
//     },
//     {
//         productName:"Box of Of Parker Pen ",
//         hsnCode:"44444",
//         rate:1000,
//         image:""
//     }
// ]

import { Space, Flex, Dropdown, Typography, Form, Input, Image } from "antd";
import Details from "components/Details";
import Taglabel from "components/SmallComponent/Taglabel";
import { TableAction } from "components/TableAction";
const { Text } = Typography;

const getColumns = (details) => [
    {
        title: (
            <Taglabel
                text={"PRODUCT NAME"}
                type={"heading"}
                details={details}
            />
        ),
        dataIndex: "productName",
        key: "srno",
        render: (_, record) => (
            <>
                <Taglabel
                    text={record.productName}
                    type={"customer"}
                    details={details}
                />
            </>
        ),
    },
    {
        title: (
            <Taglabel text={"HSN CODE"} type={"heading"} details={details} />
        ),
        dataIndex: "hsnCode",
        key: "source",
        responsive: details ? [] : ["lg"],

        render: (_, record) => (
            <>
                <Taglabel
                    text={record.hsnCode}
                    type={"text"}
                    details={details}
                />
            </>
        ),
    },
    {
        title: <Taglabel text={"IMAGE"} type={"heading"} details={details} />,
        dataIndex: "image",
        key: "source",
        responsive: details ? [] : ["lg"],
        render: (_, record) => (
            <>
                {record.image ? (
                    <img
                        width={100}
                        height={25}
                        src={record.image}
                        details={details}
                        visible={false}
                    />
                ) : (
                    "NO IMAGE FOUND"
                )}
            </>
        ),
    },
    {
        title: <Taglabel text={"RATE"} type={"heading"} details={details} />,
        dataIndex: "rate",
        key: "subTotal",
        responsive: details ? [] : ["lg"],

        render: (_, record) => (
            <>
                <Taglabel
                    text={record.rate}
                    type={"amount"}
                    details={details}
                />
            </>
        ),
    },
];

const productData = {
    getColumns,
};

export default productData;
