import VendorForm from "../../Forms/VendorForm";
import { Flex, Form, Col, Button } from "antd";
import PageLoader from "pages/PageLoader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useNavigate } from "react-router-dom";

const UpdateVendors = () => {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [toUpdateObj, setToUpdateObj] = useState(false);
    const { entity, id } = useParams();
    const { readData, updateData } = useAuth();
    const navigate = useNavigate();

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

    const handleUpdateFormFinish = async (value) => {
        if (!toUpdateObj) {
            // checking if anything to update
            return NotificationHandler.error("Nothing to Update");
        }
        value._id = data._id;
        let payload = fomulatePayload(value);
        const { success, result, message } = await updateData(payload);
        if (!success) {
            return NotificationHandler.error(message);
        } else {
            navigate("/vendors");
            return NotificationHandler.success(message);
        }
    };
    const handleValueChange = (updatedValue, allValues) => {
        setToUpdateObj(true);
    };

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
    }, []);

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
                title={` Update VENDOR - ${entity} Details`}
                subTitle={""}
                cancelRoute={"vendors"}
            />
            <PageLoader
                text={`Please hold Fetching ${entity}`}
                isLoading={isLoading}
            />
            {!isLoading && data ? (
                <>
                    <VendorForm
                        handleFormFinish={handleUpdateFormFinish}
                        value={data}
                        disabled={false}
                        handleValueChange={handleValueChange}
                        notShowCopy={true}
                    />
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default UpdateVendors;
