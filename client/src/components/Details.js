import React from "react";
import { Button } from "antd";
import { useNavigate,useParams } from "react-router-dom";
import DetailsHeader from "./DetailsHeader";
import DetailsModule from "module/DetailsModule/Details";

const Details = () => {
    const {entity,id} = useParams()
    const navigate = useNavigate();
    return (
        <>
            <DetailsHeader />
            <DetailsModule entity ={entity} payload={""}/>
        </>
    );
};

export default Details;
