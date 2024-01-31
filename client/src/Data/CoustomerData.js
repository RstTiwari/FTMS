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
        fixed: "right",
        render: (_,record) => (
          <TableAction params={record._id} page={"customer"}/>
        ),
    },
]

export const coustomerDataSource = [
    {
        companyName:"Royal Play",
        gstNo:98765432109876,
        panNo:"Gsx12334555",
        phoneNo:8767948130,
        email:"myfac8ry@gmail.com"

    },
    {
        companyName:"VIP Play",
        gstNo:98765432109875,
        panNo:"Gsx1232334555",
        phoneNo:8767948131,
        email:"myfac8ry1@gmail.com"

    },
    {
        companyName:"ARHIANT PlAY",
        gstNo:98765432109875,
        panNo:"Gsx1232334555",
        phoneNo:8767948131,
        email:"myfac8ry1@gmail.com"

    }
]