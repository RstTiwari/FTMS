import { Flex, Form, Col, Button } from "antd";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider.js";
import NotificationHandler from "EventHandler/NotificationHandler.jsx";
import PurchaseOrder from "Forms/PurchaseOrderForm.js";
import { epochConveter } from "Helper/EpochConveter";

const NewPurchaseOrder = ({afterAdd}) => {
    const entity = "purchaseorder";
    const [intialFormValue, setIntialFormValue] = useState();
    const navigate = useNavigate();
    const { createData } = useAuth();

    const handCusotmerSubmit = async (value) => {
        console.log(value,"before");
        value.purchaseDate = epochConveter(value.purchaseDate.$d)
        console.log(value);
        const payload = { entity: entity, value };
        const { success, result, message } = await createData(payload);
        if (!success) {
            return NotificationHandler.error(message);
        } else {
            if (afterAdd) {
                afterAdd();
            } else {
                navigate("/purchaseorder");
            }
        }
    };

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
            <Header
                title={"NEW PURCHASE ORDER"}
                subTitle={""}
                cancelRoute={"purchaseorder"}
            />

            <PurchaseOrder handleFormFinish={handCusotmerSubmit} value={{}}/>
        </Flex>
    );
};

export default NewPurchaseOrder;
