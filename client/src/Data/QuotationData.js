import {Space,Flex,Dropdown, Typography,Form,Input} from "antd"
import {DownOutlined} from "@ant-design/icons"
import { items } from "./LeadData";
import {TableAction} from "components/TableAction";
const {Text} = Typography

export const quotationColumn = [
    {
        title: "Number",
        dataIndex: "quoteNumber",
        width:"100px",
        key: "srno",
    },
    {
        title: "Client",
        dataIndex: "client",
        key: "source",
    },
    {
        title: "Recived Date",
        dataIndex: "quoteRecivedDate",
        key: "company",
    },
    {
        title: "Expired Date",
        dataIndex: "quoteExpiredDate",
        key: "quoteExpiredDate",
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
    {
        title: "Status",
        dataIndex: "status",
        key: "subTotal",
    },
    {
        fixed: "right",
        render: () => (
            <TableAction/>
        ),
    },
];

export const quoteMessage= "Kindly find attached Quote for the Play Equipments / Outdoor Gym Equipments / Rubber Flooring / Benches / Dustbins.Terms & Conditions for Supply, Installation, Services and Warranty are as follows"
export const  deliveryCondition = "Delivery shall be made within 10/25 days after receiving confirmed Purchase Order along with Advance Payment as per terms and conditions."
export const validityCondition = "This Quotation shall be valid for 10 / 15 days Only."
export const paymentsCondition = "Advance with PO 50% & against Delivery 50 % . After Instoletion % Cheque should be drawn in favour of vipplay"
export const cancellationCondition = "Order once placed will not be cancelled in any circumstances."
export const installationCondition = "Civil materials such as cement, metal, sand, water, electricity along with unskilled labours to be arranged by Client."
export const facilityCondition = "Proper storage space will be provided by the client for safety & security of materials at site upon delivery. Security of materials delivered st site shall be responsibility ofclient only"
// export const quoteAddProductColumn = [
//    {
//     title:"SrNo",
//     dataIndex:"srNo",
//     key:"srNo"
//    },
//    {
//     title:"Item Detials",
//     dataIndex:"items",
//     key:"item",
//     render:(_,menu) =>(
//         <>
//         <DropDownCoustom 
//         option ={menu}
//         placeHolder={"Select ITtem"}
//         buttonName={"ADD New Item"}
//         onInputChange={handleItemInputChange}
//         />
//         </>
//     )
//    },
//    {
//     title:"Rate",
//     dataIndex:"rate",
//     key:"rate",
//     render:(_,data)=>(
//        <>
//         <Form.Item  name={"rate"}>
//             <Input/>
//         </Form.Item>
//        </>
//     )
//    },
//    {
//     title:"Discount %",
//     dataIndex:"discount",
//     key:"rate",
//     render:(_,data)=>(
//        <>
//         <Form.Item  name={"discount"}>
//             <Input/>
//         </Form.Item>
//        </>
//     )
//    },
//    {
//     title:"Discount %",
//     dataIndex:"discount",
//     key:"rate",
//     render:(_,data)=>(
//        <>
//         <Form.Item  name={"discount"}>
//             <Input/>
//         </Form.Item>
//        </>
//     )
//    }
   
// ]

export const quotationDataSource = [
    {
        quoteNumber:"10",
        client:"BHEL Corporation",
        quoteRecivedDate:"31-1-23",
        quoteExpiredDate:"12-3-23",
        grossTotal:2899,
        grandTotal:3100,
        status:"SEND"
    },
    {
        quoteNumber:"23",
        client:"SBI Park ASAM",
        quoteRecivedDate:"3-1-23",
        quoteExpiredDate:"1-3-23",
        grossTotal:28990,
        grandTotal:31000,
        status:"DRAFT"
    },
    {
        quoteNumber:"22",
        client:"GOderej Corporation",
        quoteRecivedDate:"1-1-23",
        quoteExpiredDate:"1-3-23",
        grossTotal:2899,
        grandTotal:3100,
        status:"SEND"
    },
    {
        quoteNumber:"15",
        client:"SAIL Corporation",
        quoteRecivedDate:"01-1-23",
        quoteExpiredDate:"2-3-23",
        grossTotal:2899,
        grandTotal:3100,
        status:"SEND"
    },
    {
        quoteNumber:"10",
        client:"BHEL Corporation",
        quoteRecivedDate:"31-1-23",
        quoteExpiredDate:"12-3-23",
        grossTotal:2899,
        grandTotal:3100,
        status:"SEND"
    }
]