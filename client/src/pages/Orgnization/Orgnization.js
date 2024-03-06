import React, { useEffect,useState } from "react";
import { Flex } from "antd";
import OrganizationForm from "Forms/OrgnizationForm";
import { useAuth } from "state/AuthProvider";
import {useParams} from "react-router-dom"

const Orgnization = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState("");
    const { readData } = useAuth();
    const { entity, id } = useParams();

    let fetchData = async () => {
        const { success, result, message } = await readData({
            entity: entity,
            id: id,
        });
        if (success === 1) {
            setData(result);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                padding: "2rem",
                backgroundColor: "#f1f1f1",
                borderRadius: "1rem",
            }}
        ></Flex>
    );
};

export default Orgnization;
