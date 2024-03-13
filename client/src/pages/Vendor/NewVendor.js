import { Flex, Form, Col, Button } from "antd";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import CoustomerForm from "../../Forms/CoustomersForm.js";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider.js";
import NotificationHandler from "EventHandler/NotificationHandler.jsx";
import VendorForm from "Forms/VendorForm.js";
import SaveBottmComponent from "components/SaveBottomComponent.js";

const NewVendor = ({ checkHeader, afterAdd }) => {
    const entity = "vendors";
    const [intialFormValue, setIntialFormValue] = useState();
    const navigate = useNavigate();
    const { createData } = useAuth();
    const fomulatePayload = (value) => {
        value["billingAddress"] = {
            street: value.billingStreet,
            city: value.billingCity,
            state: value.billingState,
            pinCode: value.billingPincode,
        };
        value["shippingAddress"] = {
            street: value.shippingStreet,
            city: value.shippingCity,
            state: value.shippingState,
            pinCode: value.shippingPincode,
        };

        delete value.shippingStreet;
        delete value.shippingState;
        delete value.shippingCity;
        delete value.shippingPincode;
        delete value.billingStreet;
        delete value.billingState;
        delete value.billingCity;
        delete value.billingPincode;
        return { entity: entity, value };
    };

    const handCusotmerSubmit = async (value) => {
        const payload = fomulatePayload(value);
        const { success, result, message } = await createData(payload);
        if (!success) {
            return NotificationHandler.error(message);
        } else {
            if (afterAdd) {
                afterAdd(result);
            } else {
                navigate("/vendors");
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
            {checkHeader ? (
                <Header
                    title={"NEW VENDOR"}
                    subTitle={""}
                    cancelRoute={"vendors"}
                />
            ) : (
                ""
            )}
            <VendorForm handleFormFinish={handCusotmerSubmit} value={{}}  disabled={false} notShowCopy={false} />
        </Flex>
    );
};

export default NewVendor;
