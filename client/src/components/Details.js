import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import DetailsHeader from "./DetailsHeader";
const Details = () => {
    const navigate = useNavigate();
    return (
        <>
            <DetailsHeader />
        </>
    );
};

export default Details;
