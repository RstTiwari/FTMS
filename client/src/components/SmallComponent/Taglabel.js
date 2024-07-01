import React from 'react'
import {Typography} from 'antd'
const {Text} = Typography

const Taglabel = ({type ="secondary",text,weight =700}) => {
  return (
    <Text  type={type} style={{fontFamily:"sans-serif",fontWeight:weight}}>
      {text.toUpperCase()}
    </Text >
  )
}

export default Taglabel
