import {TableAction} from "components/TableAction";

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

    },
    {
        title:"Date",
        dataIndex:"invoiceDate",
        key:"customer",  
    },
    {
        title:"Exipred Date",
        dataIndex:"invoiceExpiredDate",
        key:"customer",  
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
        title:"Status",
        dataIndex:"status",
        key:"grandTotal",  
    },
    {
        fixed: "right",
        render: (_,items)  => (
            
             <TableAction  params = {items.invoiceNo} page ={"invoice"}/>
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