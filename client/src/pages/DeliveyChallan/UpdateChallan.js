import DeliveryChallanForm from "Forms/DeliveryChallanForm";
import { Flex } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "state/AuthProvider";
import { useParams,useNavigate } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";
import Header from "components/Header";
import { epochConveter } from "Helper/EpochConveter";


const UpdateChallan = () => {
    const { entity, id } = useParams();
    const navigate = useNavigate()
    const { readData,updateData } = useAuth();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        const { success, result, message } = await readData({ entity, id });
        if (!success) {
            setIsLoading(false);
            return NotificationHandler.error(message);
        } else {
            setIsLoading(false);
            setData(result);
        }
    };
    const updateChallan = async(value)=>{
        value.challanDate =  epochConveter(value.challanDate.$d)
        value._id = id
        const payload = {entity:entity,value}
        const {success,result,message} = await updateData(payload)
        if(!success){
            return NotificationHandler.error(message)
        }else{
            navigate("/deliverychallan")
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

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
                title={"UPDATE CHALLAN "}
                cancelRoute={"/deliverychallan"}
            />
            <PageLoader isLoading={isLoading}  text={"Pleas Wait Fecthing Challan"}/>
            {
              data.items ? (
                <DeliveryChallanForm onFinish={updateChallan} value={data}  />
              ):
              ("")

            }
        </Flex>
    );
};

export default UpdateChallan;
