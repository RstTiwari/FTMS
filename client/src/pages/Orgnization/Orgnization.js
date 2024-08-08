import React, { useEffect, useState } from "react";
import { Flex } from "antd";
import OrganizationForm from "Forms/App/OrgnizationForm";
import { useAuth } from "state/AuthProvider";
import { useParams } from "react-router-dom";
import Header from "components/Header";
import SaveBottmComponent from "components/SaveBottomComponent";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";
import { useNavigate } from "react-router-dom";

const Orgnization = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [formUpdated,setFormUpdate] = useState(false)
    const { adminApiCall } = useAuth();
    const { entity, id } = useParams();
    const navigate = useNavigate()

    let fetchData = async () => {
        const payload = {};
        const params = { entity: entity };
        const {success,result,message} = await adminApiCall(
            "get",
            "read",
            payload,
            params
        );
        if (!success) {
            return NotificationHandler.error(message);
        } else {
            setData(result);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onFormSubmit = async (value) => {
        setIsLoading(true)
        const payload = {entity:entity,value}
        const {success,result, message} = await adminApiCall("post","update",payload)
        if (!success) {
            setIsLoading(false);
            NotificationHandler.error(message);
        } else {
            navigate("/dashboard");
            return NotificationHandler.success(message);
        }
    };
    const handleValueChange =()=>{
        setFormUpdate(true)
    }

    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                padding: "2rem",
                backgroundColor: "#f1f1f1",
                borderRadius: "1rem",
                marginBottom: "2rem",
            }}
        >
            <Header
                title={"SETUP ORGNIZATION DETAILS"}
                cancelRoute={"dashboard"}
            />
            <PageLoader
                isLoading={isLoading}
                text={" PLEASE WAIT"}
            />
            {!isLoading && data ? (
                <>
                    <OrganizationForm  value ={data} handleFormSubmit = {onFormSubmit} handleValueChange={handleValueChange} />
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default Orgnization;
