import React, { useState } from "react";
import { Flex, Form, Select, Col, Button } from "antd";
import Header from "components/Header";

import { useAuth } from "state/AuthProvider.js";
import NotificationHandler from "EventHandler/NotificationHandler.jsx";
import ProductForm from "Forms/ProductFrom.js";

const NewProduct = ({checkHeader, afterAdd }) => {
    const { createData } = useAuth();
    const entity = "product";
    const onFormFinish = async (value) => {
        const payload = { entity: entity, value };
        const { success, result, message } = await createData(payload);
        console.log(result);
        if (success) {
            afterAdd(value);
            return NotificationHandler.success(message);
        } else {
            return NotificationHandler.error(message);
        }
    };

    return (
        <Flex
        
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
