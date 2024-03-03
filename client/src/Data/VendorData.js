import { items } from "./LeadData"
import {Space,Dropdown}  from "antd"

import {DownOutlined}  from "@ant-design/icons"
import {TableAction} from "components/TableAction"

export const vendorColumns = [
    {
        title:"Vendor Name",
        dataIndex:"vendorName",
        key:"vendorName"
    },
    {
        title:"PHONE NO",
        dataIndex:"vendorPhone",
        key:"vendorPhone"
    },
    {
        title:"Email Id",
        dataIndex:"vendorEmail",
        key:"vendorEmail"
    },
    {
        title:"GST NO",
        dataIndex:"gstNo",
        key:"gstNo"
    },
    {
        title:"PAN NO",
        dataIndex:"panNo",
        key:"panNo"
    },
 
    {
        fixed: "right",
        render: (_,record) => (
          <TableAction params={record._id} page={"vendor"} />
        ),
    },
]