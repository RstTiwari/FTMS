import React from 'react'
import { Flex ,Form, Select} from 'antd'
import Header from 'components/Header'
import QuotationForm from "../../Forms/QuotationForm.js"
import { epochConveter } from 'Helper/EpochConveter.js'


const NewLead = () => {
  const onQuoteFormFinish =(value)=>{
   console.log(value);

   let epochQuoteDate = epochConveter(value.quoteDate.$d)
   let epochExpiryDate = epochConveter(value.quoteDate.$d)
   value.quoteDate = epochQuoteDate
   value.quoteExpiryDate = epochExpiryDate
   value.message = undefined || null ? ""
  }
  return (
    <Flex 
    gap={"middle"}
    vertical
    style={{
        margin: "1.5rem 2rem",
        padding: "1rem",
        backgroundColor: "#ffffff",
    }}
    >
        <Form 
        name='qouteForm'
        labelCol={{span:8}}
        wrapperCol={{span:8}}
        initialValues={{remeber:true}}
        onFinish={onQuoteFormFinish}
        layout='horizontal'
        > 
        <Header  title ={"New Quotation" }  subTitle={"Save"} cancelRoute={"quotation"}/>
        <QuotationForm />
        </Form>
    </Flex >
  )
}

export default NewLead
