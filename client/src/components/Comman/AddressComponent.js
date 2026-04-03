import React, { useEffect, useState } from "react";
import {
    Form,
    Button,
    Select,
    Modal,
    Divider,
    message,
    Row,
    Col,
    Card,
} from "antd";
import { useAuth } from "../../state/AuthProvider";
import FormItemCol from "./FormItemCol";
import CustomLabel from "./CustomLabel";
import CoustomerData from "Data/CoustomerData";

const AddressComponent = ({ id, entity, showShipping }) => {
    const { appApiCall } = useAuth();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [editType, setEditType] = useState(null); // "billing" or "shipping"

    // Fetch Data
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await appApiCall(
                "get",
                "get",
                {},
                { id, entity }
            );
            if (res?.result) {
                setData(res.result);
            }
        } catch (error) {
            message.error("Failed to fetch address data.");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (id) {
            setOpen(false);
            setEditType(null);
            form.resetFields();
            fetchData();
        }
    }, [id]);

    const handleEditClick = (type) => {
        if (!data) return;

        setEditType(type);

        const addressData =
            type === "billing"
                ? { ...data.billingAddress, name: data.name }
                : data.shippingAddress;

        form.setFieldsValue({
            [`${type}Address`]: addressData || {},
        });

        setOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            const updatedAddress = values[`${editType}Address`];
            const payload = {
                ...data,
                [`${editType}Address`]: updatedAddress,
            };

            if (editType === "billing" && updatedAddress.name) {
                payload.name = updatedAddress.name;
            }

            await appApiCall(
                "post",
                "update",
                { values: payload },
                { id, entity }
            );

            message.success(
                `${editType === "billing" ? "Billing" : "Shipping"} address updated successfully.`
            );

            setData(payload);
            setOpen(false);
            setEditType(null);
        } catch (error) {
            message.error("Update failed.");
        }
    };

    // ✅ New function to copy billing to shipping directly
    const handleSameAsBillingDirect = async () => {
        if (!data?.billingAddress) {
            message.warning("No billing address found.");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                ...data,
                shippingAddress: { ...data.billingAddress },
            };

            await appApiCall(
                "post",
                "update",
                { values: payload },
                { id, entity }
            );

            setData(payload); // update UI immediately

            message.success("Shipping address updated same as Billing address.");
        } catch (error) {
            message.error("Failed to update shipping address.");
        } finally {
            setLoading(false);
        }
    };

    const renderAddressBlock = (type) => {
        const address = data?.[`${type}Address`];
        const title = type === "billing" ? "Billing Address" : "Shipping Address";

        let name;

        if (entity === "tenant") {
            name = data?.companyName;
        } else {
            name = address?.name;
        }

        return (
            <Col span={6}>
                <Card
                    title={title}
                    extra={
                        <>
                            {type === "shipping" && (
                                <Button
                                    type="link"
                                    onClick={handleSameAsBillingDirect}
                                    loading={loading}
                                    style={{ padding: 0, marginRight: 8 }}
                                >
                                    Same as Billing
                                </Button>
                            )}
                            <Button
                                type="link"
                                onClick={() => handleEditClick(type)}
                            >
                                Edit
                            </Button>
                        </>
                    }
                >
                    {address ? (
                        <>
                            {name && <b>NAME: {name}</b>}
                            <div>{address.street1 || ""}</div>
                            <div>{address.street2 || ""}</div>
                            <div>
                                {address.city || ""},{" "}
                                {address.state || ""} -{" "}
                                {address.pincode || ""}
                            </div>
                        </>
                    ) : (
                        <div>No {type} address found.</div>
                    )}
                </Card>
            </Col>
        );
    };

    return (
        <div>
            {data && (
                <Row gutter={24} style={{ marginBottom: 16 }}>
                    {!showShipping && renderAddressBlock("billing")}
                    {renderAddressBlock("shipping")}
                </Row>
            )}

            {/* Modal for editing selected address */}
            <Modal
                title={`Edit ${editType === "billing" ? "Billing" : "Shipping"} Address`}
                open={open}
                onOk={handleUpdate}
                onCancel={() => setOpen(false)}
                okText="Update"
                confirmLoading={loading}
                destroyOnClose
                width={600}
                maskClosable={false}
               
            >
                <Form form={form} layout="vertical">
                    {editType && (
                        <>
                       
                            <FormItemCol
                                name={[`${editType}Address`, "name"]}
                                label="Name"
                                type="text"
                                required
                                labelAlign="left"
                                width="30vw"
                                labelCol={{ span: 8 }}
                            />

                            <FormItemCol
                                name={[`${editType}Address`, "street1"]}
                                label="Street 1"
                                type="text"
                                required
                                labelAlign="left"
                                width="30vw"
                                labelCol={{ span: 8 }}
                            />

                            <FormItemCol
                                name={[`${editType}Address`, "street2"]}
                                label="Street 2"
                                type="text"
                                labelAlign="left"
                                width="30vw"
                                labelCol={{ span: 8 }}
                            />

                            <FormItemCol
                                name={[`${editType}Address`, "city"]}
                                label="City"
                                type="text"
                                required
                                labelAlign="left"
                                width="30vw"
                                labelCol={{ span: 8 }}
                            />

                            <FormItemCol
                                name={[`${editType}Address`, "pincode"]}
                                label="Pincode"
                                type="text"
                                required
                                labelAlign="left"
                                width="30vw"
                                labelCol={{ span: 8 }}
                            />

                            <Form.Item
                                label={<CustomLabel label="State" required />}
                                name={[`${editType}Address`, "state"]}
                                labelAlign="left"
                                labelCol={{ span: 5 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a state",
                                    },
                                ]}
                            >
                                <Select
                                    options={CoustomerData.states}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
        </div>
    );
};

export default AddressComponent;
