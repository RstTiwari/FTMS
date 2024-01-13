import React from 'react'
import { Flex ,Form, Select} from 'antd'
import Header from 'components/Header'
import QuotationForm from "../../Forms/QuotationForm.js"


const NewLead = () => {
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
        layout='horizontal'
        > 
        <Header  title ={"New Quotation" }  subTitle={"Save"} cancelRoute={"quotation"}/>
        <QuotationForm />
        </Form>
    </Flex >
  )
}

export default NewLead
