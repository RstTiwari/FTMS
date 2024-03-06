import CoustomersForm from "Forms/CoustomersForm";
import { Flex, Form, Col, Button } from "antd";
import PageLoader from "pages/PageLoader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useNavigate } from "react-router-dom";
import SaveBottmComponent from "components/SaveBottomComponent";

const UpdateCustomer = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toUpdateObj, setToUpdateObj] = useState(false);
    const { entity, id } = useParams();
    const { readData, updateData } = useAuth();
    const navigate = useNavigate()

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
        return { entity: "customer", value };
    };

    const handleUpdateFormFinish = async (value) => {
        if (!toUpdateObj) {
            // checking if anything to update
            return NotificationHandler.error("Nothing to Update Please Click CANCEL Page");
        }
        value._id = data._id;
        let payload = fomulatePayload(value);
        const { success, result, message } = await updateData(payload);
        if (!success) {
            return NotificationHandler.error(message)
        }else{
            navigate("/customers")
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

    const {
        customerName,
        contactPerson,
        customerPhone,
        customerEmail,
        panNo,
        gstNo,
        billingAddress,
        shippingAddress,
    } = data;

    const {
        street: addressB,
        city: cityB,
        state: stateB,
        pinCode: pinCodeB,
    } = billingAddress ? billingAddress : "";
    const {
        street: addressS,
        city: cityS,
        state: stateS,
        pinCode: pinCodeS,
    } = shippingAddress ? shippingAddress : "";

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
                        title={` Update - ${entity} Details`}
                        subTitle={""}
                        cancelRoute={"customers"}
                    />
            <PageLoader
                text={`Please hold Fetching ${entity}`}
                isLoading={isLoading}
            />
            {!isLoading && data ? (
                <>
                   

                    <Form
                        name="updateCustomer"
                        onFinish={(value) => handleUpdateFormFinish(value)} // Correct the function name here
                        onValuesChange={handleValueChange}
                        initialValues={{
                            remeber: true,
                            customerName: customerName ? customerName : "",
                            contactPerson: contactPerson ? contactPerson : "",
                            customerPhone: customerPhone ? customerPhone : "",
                            customerEmail: customerEmail ? customerEmail : "",
                            panNo: panNo ? panNo : "",
                            gstNo: gstNo ? gstNo : "",
                            billingStreet: addressB ? addressB : "",
                            billingCity: cityB ? cityB : "",
                            billingState: stateB ? stateB : "",
                            billingPincode: pinCodeB ? pinCodeB : "",
                            shippingStreet: addressS ? addressS : "",
                            shippingCity: cityS ? cityS : "",
                            shippingState: stateS ? stateS : "",
                            shippingPincode: pinCodeS ? pinCodeS : "",
                        }}
                    >
                        <CoustomersForm current={form} disabled={true} />
                         <SaveBottmComponent  buttonText={"UPDATE"} cancelRoute ={"customers"} />
                    </Form>
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default UpdateCustomer;
