import {Space,Dropdown,Flex,Typography } from "antd"
import {DownOutlined} from "@ant-design/icons"
const { Text, Link } = Typography;
export const LeadOption =  [
    {
        label:"IndiaMart",
        value:"indiaMart",

    },
    {
        label:"JustDial",
        value:"justdial",
        
    },
    {
        label:"Ads",
        value:"ads",
    },
    {
        label:"Website",
        value:"website",   
    },
    {
        label:"SalesAgent",
        value:"salesAgent",   
    }

]
export const companyDetails = [
     {
        label:"Royal play Equipment",
        value:"1234"
     },
     {
        label:"Vip play Equipment",
        value:"12222"
     },
     {
        label:"ZOho play Equipment",
        value:"12334445"
     },
     {
        label:"TOho play Equipment",
        vlaue :"9890232280"
     }
]

export const leadStatus = [
    {
        label:"Draft",
        value:"draft"
     },
     {
        label:"Quote Sended",
        value:"quoateSended"
     },
     {
        label:"Waiting",
        value:"waiting"
     },
     {
        label:"Order Recived",
        vlaue :"orderRecived"
     }
]

const items = [
    {
        key: "1",
        label: "Edit",
    },
    {
        key: "2",
        label: "Download",
    },
];

export const leadColumns = [
    {
        title: "SrNo",
        dataIndex: "srNo",
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
      title: "Comments",
      dataIndex: "comments",
      key: "comment",
      render: (_,record) => (
        <>
             <Space>
              <Flex vertical>
              {
                record.comments.map((comment)=>{
                  return(
                      <div>
                      <Text code>
                        {comment.date}
                      </Text>
                      <Text type="success">
                        {comment.comment}
                      </Text>
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

 export const leadDataSource = [
     {
      srNo:1,
      source:"indiamart",
      company:"Reliance Nippon",
      status:"Draft",
      recivedDate:"21-1-23",
      comments:[
        {
          date: '21-1-23',
          comment: "Called Him For Detialsd",
        },
        {
          date: '21-1-23',
          comment: "Lead Reviced",
        },
      ]
     }
 ]