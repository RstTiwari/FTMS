import React, { useState } from 'react'
import { Flex ,Form, Select} from 'antd'
import Header from 'components/Header'
import QuotationForm from "../../Forms/QuotationForm.js"
import { epochConveter } from 'Helper/EpochConveter.js'
import { quoteMessage } from 'Data/QuotationData.js'
import { useForm } from 'antd/es/form/Form.js'


const NewQuote = () => {
  const [form]  = Form.useForm()
  const [quoteNo,setQuoteNo] = useState("123456")
  const onQuoteFormFinish =(value)=>{
   let epochQuoteDate = epochConveter(value.quoteDate.$d)
   let epochExpiryDate = epochConveter(value.quoteDate.$d)
   value.quoteDate = epochQuoteDate
   value.quoteExpiryDate = epochExpiryDate
   console.log(value,"value");
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
        form={form}
        name='qouteForm'
        labelCol={{span:8}}
        wrapperCol={{span:8}}
        initialValues={{remeber:true ,"quoteNo":quoteNo,message:quoteMessage,} }
        onFinish={onQuoteFormFinish}
        layout='horizontal'
        > 
        <Header  title ={"New Quotation" }   cancelRoute={"quotation"} />
        <QuotationForm current = {form} />
        </Form>
    </Flex >
  )
}

export default NewQuote