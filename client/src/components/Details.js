import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import DetailsHeader from "./DetailsHeader";
import DetailsModule from "module/DetailsModule/Details";
const Details = () => {
    const { entity, id } = useParams();

    return (
        <>
            <DetailsHeader />
            <DetailsModule entity={entity}  id ={id}/>
        </>
    );
};

export default Details;
