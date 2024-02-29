import {TableAction} from "components/TableAction";
import {Space,Flex,Dropdown, Typography,Form,Input} from "antd"
import { convertUnixTimestampToDate } from "Helper/EpochConveter";
const {Text} = Typography

export const invoiceColumns = [
    {
        title:"Number",
        dataIndex:"invoiceNo",
        key:"invoiceNo"
    },
    {
        title:"Customer",
        dataIndex:"customer",
        key:"customer",
        render:(_,record)=>(
            <>
            <Text type="success">
                {record.customer.customerName}
            </Text>
            </>
        )

    },
    {
        title:"Date",
        dataIndex:"invoiceDate",
        key:"customer", 
        render:(_,record)=>(
            <>
                {convertUnixTimestampToDate(record.invoiceDate)}
            </>
        ) 
    },
    {
        title:"Exipred Date",
        dataIndex:"invoiceExpiredDate",
        key:"customer",  
        render:(_,record)=>(
            <>
                {convertUnixTimestampToDate(record.invoiceExpiredDate)}
            </>
        ) 
    },
    {
        title:"Gross Total",
        dataIndex:"grossTotal",
        key:"grossTotal",  
    },
    {
        title:"Grand Total",
        dataIndex:"grandTotal",
        key:"grandTotal",  
    },
    {
        fixed: "right",
        render: (_,record)  => (
             <TableAction  params = {record._id} page ={"invoice"} entityNo={record.invoiceNo} download={true} payment = {true} data = {record}/>
        )
            
    }
]
export const invoiceData = [
    {
        invoiceNo:"121",
        customer:"Royal Play Equipments",
        invoiceDate:"21-1-24",
        invoiceExpiredDate:"23-03-24",
        grossTotal:23000,
        grandTotal:24000,
        status:"SEND",
    },
    {
        invoiceNo:"122",
        customer:"Vip Play Equipments",
        invoiceDate:"21-1-24",
        invoiceExpiredDate:"23-03-24",
        grossTotal:23000,
        grandTotal:24000,
        status:"SEND",
    }
]