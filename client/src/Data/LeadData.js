import {Space,Dropdown,Flex,Typography } from "antd"
import {DownOutlined} from "@ant-design/icons"
import {TableAction} from "components/TableAction";
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
        value :"9890232280"
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

export const items = [
    {
        key: "1",
        label: "SHOW",
    },
    {
        key: "2",
        label: "EDIT",
    },
    {
      key: "3",
      label: "DOWNLOAD",
  },
];

export const leadColumns = [
    {
        title: "Source",
        dataIndex: "source",
        key: "source",
        
    },
    {
        title: "Client",
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
      key: "comments",
      responsive:["lg"],
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
            <TableAction/>
        ),
    },
];

export const leadDataSource = [
     {
      source:"indiamart",
      company:"Reliance Nippon",
      status:"Draft",
      recivedDate:"21-1-23",
      comments:[
        {
          date: '23-1-23',
          comment: "Quote Sended",
        },
        {
          date: '21-1-23',
          comment: "Called Him For Detialsd",
        },
        {
          date: '21-1-23',
          comment: "Lead Reviced",
        },
            ]
     },
     {
      source:"Just Dial",
      company:"Arihant Play",
      status:"Draft",
      recivedDate:"21-1-23",
      comments:[
        {
          date: '23-1-23',
          comment: "Quote Sended",
        },
        {
          date: '21-1-23',
          comment: "Called Him For Detialsd",
        },
        {
          date: '21-1-23',
          comment: "Lead Reviced",
        },
            ]
     },
     {
      source:"salesAgent",
      company:"Adani Foundation",
      status:"Draft",
      recivedDate:"21-1-23",
      comments:[
        {
          date: '23-1-23',
          comment: "Quote Sended",
        },
        {
          date: '21-1-23',
          comment: "Called Him For Detialsd",
        },
        {
          date: '21-1-23',
          comment: "Lead Reviced",
        },
            ]
     },
     {
      source:"salesAgent",
      company:"Adani Foundation",
      status:"Draft",
      recivedDate:"21-1-23",
      comments:[
        {
          date: '23-1-23',
          comment: "Quote Sended",
        },
        {
          date: '21-1-23',
          comment: "Called Him For Detialsd",
        },
        {
          date: '21-1-23',
          comment: "Lead Reviced",
        },
            ]
     },
     {
      source:"salesAgent",
      company:"Adani Foundation",
      status:"Draft",
      recivedDate:"21-1-23",
      comments:[
        {
          date: '23-1-23',
          comment: "Quote Sended",
        },
        {
          date: '21-1-23',
          comment: "Called Him For Detialsd",
        },
        {
          date: '21-1-23',
          comment: "Lead Reviced",
        },
            ]
     },
     {
      source:"salesAgent",
      company:"Adani Foundation",
      status:"Draft",
      recivedDate:"21-1-23",
      comments:[
        {
          date: '23-1-23',
          comment: "Quote Sended",
        },
        {
          date: '21-1-23',
          comment: "Called Him For Detialsd",
        },
        {
          date: '21-1-23',
          comment: "Lead Reviced",
        },
            ]
     },  {
      source:"salesAgent",
      company:"Adani Foundation",
      status:"Draft",
      recivedDate:"21-1-23",
      comments:[
        {
          date: '23-1-23',
          comment: "Quote Sended",
        },
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

 