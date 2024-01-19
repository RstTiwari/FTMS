import { items } from "./LeadData"
import {Space,Dropdown}  from "antd"

import {DownOutlined}  from "@ant-design/icons"

export const coustomerColumns = [
    {
        title:"Company Name",
        dataIndex:"companyName",
        key:"companyName"
    },
    {
        title:"GST NO",
        dataIndex:"gstNo",
        key:"gstNo"
    },
    {
        title:"PAN NO",
        dataIndex:"panNo",
        key:"gstNo"
    },
    {
        title:"PHONE NO",
        dataIndex:"phoneNo",
        key:"phoneNo"
    },
    {
        title:"Email Id",
        dataIndex:"email",
        key:"phoneNo"
    },
    {
        fixed: "right",
        render: () => (
            <Space size="middle">
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <a>
                        <DownOutlined />
                    </a>
                </Dropdown>
            </Space>
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