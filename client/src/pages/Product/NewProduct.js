import React, { useState } from "react";
import { Flex, Form, Select, Col, Button } from "antd";
import Header from "components/Header";

import { useAuth } from "state/AuthProvider.js";
import NotificationHandler from "EventHandler/NotificationHandler.jsx";
import ProductForm from "Forms/ProductFrom.js";
import { useNavigate } from "react-router-dom";

const NewProduct = ({ checkHeader, afterAdd }) => {
    const { createData } = useAuth();
    const navigate = useNavigate();
    const entity = "product";
    const onFormFinish = async (value) => {
        const payload = { entity: entity, value };
        const { success, result, message } = await createData(payload);
        if (success) {
            afterAdd(value);
            NotificationHandler.success(message);
            navigate("/dashbord");
        } else {
            return NotificationHandler.error(message);
        }
    };

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
            {checkHeader ? (
                <Header title={"ADD NEW PRODUCT"} cancelRoute={"products"} />
            ) : (
                ""
            )}
            <ProductForm onFormFinish={onFormFinish} initalValue={""} />
        </Flex>
    );
};

export default NewProduct;
