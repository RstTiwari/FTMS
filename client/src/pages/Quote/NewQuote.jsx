import React, { useState } from 'react'
import { Flex ,Form, Select} from 'antd'
import Header from 'components/Header'
import QuotationForm from "../../Forms/QuotationForm.js"
import { epochConveter } from 'Helper/EpochConveter.js'


const NewLead = () => {
  const [quoteNo,setQuoteNo] = useState("123456")
  const quoteMessage= "Kindly find attached Quote for the Play Equipments / Outdoor Gym Equipments / Rubber Flooring / Benches / Dustbins.Terms & Conditions for Supply, Installation, Services and Warranty are as follows"
  const onQuoteFormFinish =(value)=>{
   console.log(value);

   let epochQuoteDate = epochConveter(value.quoteDate.$d)
   let epochExpiryDate = epochConveter(value.quoteDate.$d)
   value.quoteDate = epochQuoteDate
   value.quoteExpiryDate = epochExpiryDate
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
        initialValues={{remeber:true ,"quoteNo":quoteNo,message:quoteMessage} }
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
