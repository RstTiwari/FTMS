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

import { Space, Flex, Dropdown, Typography, Form, Input } from "antd";
import { TableAction } from "components/TableAction";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
const { Text } = Typography;

export const productColumns = [
    {
        title: "PRODUCT NAME",
        dataIndex: "productName",
        key: "srno",
    },
    {
        title: "HSN CODE",
        dataIndex: "hsnCode",
        key: "source",
        render: (_, record) => (
            <>
                <Text type="success">{record.hsnCode}</Text>
            </>
        ),
    },
    {
        title: "RATE",
        dataIndex: "rate",
        key: "subTotal",
    },
    {
        fixed: "right",
        render: (_, record) => (
            <TableAction params={record._id} page={"customer"} />
        ),
    },
];
