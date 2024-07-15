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
import Taglabel from "components/SmallComponent/Taglabel";
import { TableAction } from "components/TableAction";
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
const { Text } = Typography;

export const productData = {
    listColumns: [
        {
            title: <Taglabel text={"PRODUCT NAME"} type={"heading"} />,
            dataIndex: "productName",
            key: "srno",
            render: (_, record) => (
                <>
                    <Taglabel text={record.productName} type={"customer"} />
                </>
            ),
        },
        {
            title: <Taglabel text={"HSN CODE"} type={"heading"} />,
            dataIndex: "hsnCode",
            key: "source",
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    <Taglabel text={record.hsnCode} type={"text"} />
                </>
            ),
        },
        {
            title: <Taglabel text={"IMAGE"} type={"heading"} />,
            dataIndex: "image",
            key: "source",
            responsive: ["lg"],
            render: (_, record) => (
                <>
                    {record.image ? (
                        <Image  width = {100}  height ={25} src={record.image}/>
                    ):("NO IMAGE FOUND")}
                </>
            ),
        },
        {
            title: <Taglabel text={"RATE"}  type={"heading"}/>,
            dataIndex: "rate",
            key: "subTotal",
            render: (_, record) => (
                <>
                    <Taglabel text={record.rate} type={"amount"} />
                </>
            ),
        },

    ],
};
