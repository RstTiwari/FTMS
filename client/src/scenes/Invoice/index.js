import React from 'react'
import { Flex,Table } from 'antd'
import Header from 'components/Header'
import { invoiceColumns ,invoiceData} from 'Data/InvoiceData'

const index = () => {
  return (
    <Flex  
    gap={"middle"}
    vertical
    style={{
        padding: "2rem",
        backgroundColor: "#ffffff",
        borderRadius:"1rem"
    }}
    >  
    <Header  title={"Invoice List"}  subTitle={"ADD INVOiCES"}  addRoute={"invoice/create"}/> 
    <Table columns={invoiceColumns} dataSource={invoiceData}/>
    </Flex>
  )
}

export default index
