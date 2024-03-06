import { Flex, Form, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import CoustomersForm from "Forms/CoustomersForm";
import PageLoader from "pages/PageLoader";
const ReadCustomer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState("");
    const { readData } = useAuth();
    const { entity, id } = useParams();
    const [form] = Form.useForm();
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
            <PageLoader
                text={"Fetching Customer Detail Please Waiti"}
                isLoading={isLoading}
            />
            {!isLoading && data ? (
                <>
                    <Header
                        title={` Customer Details - ${data.customerName}`}
                        subTitle={""}
                        cancelRoute={"customers"}
                    />
                    <Form
                        name="coustomerForm"
                        form={form}
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
                        disabled={true}
                    >
                        <CoustomersForm current={form} disabled={true} />
                    </Form>
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default ReadCustomer;
