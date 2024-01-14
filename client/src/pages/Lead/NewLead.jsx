import React from 'react'
import { Flex ,Form, Select,Row,Col} from 'antd'
import LeadForm from 'Forms/LeadForm'
import Header from 'components/Header'


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
        name='leadForm'
        labelCol={{span:8}}
        wrapperCol={{span:8}}
        initialValues={{remeber:true}}
        > 
        <Header  title ={"New Lead" }  cancelRoute={"lead"}/>
        <LeadForm />
        </Form>
    </Flex >
  )
}

export default NewLead
