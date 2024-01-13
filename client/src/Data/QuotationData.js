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