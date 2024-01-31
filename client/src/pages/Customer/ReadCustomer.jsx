import CoustomersForm from "Forms/CoustomersForm";
import { Flex } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
const ReadCustomer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [readData] = useAuth();
    const { id } = useParams();
    let fetcgData = async () => {
        let entity = "customer";
        const { success, result, message } = await readData(
            "get",
            "read:id",
            { entity: entity },
            { _id: id }
        );
        if (success === 1) {
            setIsLoading(false);
            setData(result);
        }
    };
    useEffect(() => {
        fetcgData();
    });
    console.log(data);
    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                margin: "1.5rem 2rem",
                padding: "2rem",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <CoustomersForm />?
        </Flex>
    );
};

export default ReadCustomer;
