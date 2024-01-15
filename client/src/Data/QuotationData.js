import {Space,Flex,Dropdown, Typography,Form,Input} from "antd"
import {DownOutlined} from "@ant-design/icons"
import { items } from "./LeadData";
import DropDownCoustom from "components/DropDownCoustom";
const {Text} = Typography

export const quotationColumn = [
    {
        title: "SrNo",
        dataIndex: "srNo",
        width:"100px",
        key: "srno",
    },
    {
        title: "Source",
        dataIndex: "source",
        key: "source",
    },
    {
        title: "Company",
        dataIndex: "company",
        key: "company",
    },
    {
        title: "Recived Date",
        dataIndex: "recivedDate",
        key: "recivedDate",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      render: (_,record) => (
        <>
             <Space>
              <Flex vertical>
              {
                record.comments.map((comment)=>{
                  return(
                      <div>
                      <Text code>
                       DATE: {comment.date}
                      </Text>
                      <Space style={{margin:"0.3rem"}}>
                      <Text type="success">
                        {comment.comment}
                      </Text>
                      </Space>
                 
                      </div>
                     
                  )
                })
               }
              </Flex>
             
             </Space>
        </>
      ),
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
];

export const quoteMessage= "Kindly find attached Quote for the Play Equipments / Outdoor Gym Equipments / Rubber Flooring / Benches / Dustbins.Terms & Conditions for Supply, Installation, Services and Warranty are as follows"
const handleItemInputChange = ()=>{
    
}
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