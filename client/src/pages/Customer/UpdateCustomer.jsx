import CoustomersForm from "Forms/CoustomersForm";
import { Flex, Form, Col, Button } from "antd";
import PageLoader from "pages/PageLoader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import NotificationHandler from "EventHandler/NotificationHandler";

const UpdateCustomer = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toUpdateObj, setToUpdateObj] = useState(false);
    const { entity, id } = useParams();
    const { readData, updateData } = useAuth();

    const fomulatePayload = (value) => {
        value["billingAddress"] = {
            address: value.billingStreet,
            city: value.billingCity,
            state: value.billingState,
            pinCode: value.billingPincode,
        };
        value["shippingAddress"] = {
            address: value.shippingStreet,
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
            return NotificationHandler.error("Nothing to Update");
        }
        value._id = data._id;
        let payload = fomulatePayload(value);
        const { success, result, message } = await updateData(payload);
        if (success) {
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
            <PageLoader
                text={`Please hold Fetching ${entity}`}
                isLoading={isLoading}
            />
            {!isLoading && data ? (
                <>
                    <Header
                        title={` Update - ${entity} Details`}
                        subTitle={""}
                    />

                    <Form
                        name="updateCustomer"
                        onFinish={(value) => handleUpdateFormFinish(value)} // Correct the function name here
                        onValuesChange={handleValueChange}
                        initialValues={{
                            remeber: true,
                            customerName: data.customerName,
                            contactPerson: data.contactPerson,
                            customerPhone: data.customerPhone,
                            customerEmail: data.customerEmail,
                            panNo: data.panNo,
                            gstNo: data.gstNo,
                            billingStreet: data.billingAddress.address,
                            billingCity: data.billingAddress.city,
                            billingState: data.billingAddress.state,
                            billingPincode: data.billingAddress.pinCode,
                            shippingStreet: data.shippingAddress.address,
                            shippingCity: data.shippingAddress.city,
                            shippingState: data.shippingAddress.state,
                            shippingPincode: data.shippingAddress.pinCode,
                        }}
                    >
                        <CoustomersForm current={form} disabled={true} />
                        <Col className="gutter-row" span={6}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<PlusOutlined />}
                                    block
                                >
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>
                    </Form>
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default UpdateCustomer;
