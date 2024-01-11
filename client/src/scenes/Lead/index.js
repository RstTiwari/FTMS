import React from 'react'
import { Flex ,} from 'antd'
import Header from 'components/Header'

const index = () => {
  return (
    <Flex gap={"middle"} vertical style={{
        margin:"1.5rem 2rem",
        padding:"1rem",
        backgroundColor:"#ffffff"
    }}>
        <Header  title = {"Lead List" } subTitle ={"ADD LEAD"}/>
        <Form></Form>
    </Flex>
 
  )
}

export default index
