import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const Details = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Button onClick={() => navigate(-1)}>Back</Button>
        </div>
    );
};

export default Details;
