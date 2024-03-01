import DeliveryChallanForm from "Forms/DeliveryChallanForm";
import { Flex } from "antd";
import Header from "components/Header";
import React from "react";

const NewChallan = () => {
    const onFinish =async(value)=>{
        console.log(value);
    }
    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                padding: "2rem",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <Header 
            title={"NEW DELIVERY CHALLAN"}
            cancelRoute={"deliverychallan"}
            />
            <DeliveryChallanForm onFinish={onFinish} value ={{}} />
        </Flex>
    );
};

export default NewChallan;
