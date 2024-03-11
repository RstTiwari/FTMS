import NotificationHandler from "EventHandler/NotificationHandler";
import DeliveryChallanForm from "Forms/DeliveryChallanForm";
import { epochConveter } from "Helper/EpochConveter";
import { Flex } from "antd";
import dayjs from 'dayjs';
import Header from "components/Header";
import React from "react";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";
import SaveBottmComponent from "components/SaveBottomComponent";
const entity = "deliverychallan"

const NewChallan = () => {
    const {createData} = useAuth()
    const navigate = useNavigate()
    const onFinish =async(value)=>{
        value.challanDate = epochConveter(value.challanDate.$d)
        const payload = {entity:entity,value}
        const {success,result,message} = await createData(payload)
        if(!success){
            NotificationHandler.error(message)
        }else{
            navigate("/deliverychallan")
            return NotificationHandler.success(message)
        }

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
            <DeliveryChallanForm onFinish={onFinish} value={false}  submitText={"SAVE AS DRAFT"}/>
        </Flex>
    );
};

export default NewChallan;
