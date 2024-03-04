import { items } from "./LeadData"
import {Space,Dropdown}  from "antd"

import {DownOutlined}  from "@ant-design/icons"
import {TableAction} from "components/TableAction"

export const coustomerColumns = [
    {
        title:"Company Name",
        dataIndex:"customerName",
        key:"customerName"
    },
    {
        title:"PHONE NO",
        dataIndex:"customerPhone",
        key:"customerPhone"
    },
    {
        title:"Email Id",
        dataIndex:"customerEmail",
        key:"customerEmail"
    },
    {
        title:"GST NO",
        dataIndex:"gstNo",
        key:"gstNo",
        responsive: ["lg"],

        
    },
    {
        title:"PAN NO",
        dataIndex:"panNo",
        key:"panNo",
        responsive: ["lg"],

    },
 
    {
        fixed: "right",
        render: (_,record) => (
          <TableAction params={record._id} page={"customer"} />
        ),
    },
]

