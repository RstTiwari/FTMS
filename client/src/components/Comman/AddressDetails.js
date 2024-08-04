import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Form, Input, Button } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Taglabel from "./Taglabel";
import AddressForm from "Forms/AddressForm";
import CoustomButton from "./CoustomButton";
import FormActionButtons from "./FormActionButton";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useAuth } from "state/AuthProvider";

const AddressDetails = ({
    initialRender,
    entity,
    entityName,
    keyName,
    id,
    address,
    updateInForm,
    updateInCustomModal
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const { appApiCall } = useAuth();

    const addressString = `${address?.street1 || ""}, ${address?.street2 || ""}, ${address?.city || ""}, ${address?.state || ""}, ${address?.pincode || ""}`;

    const handleEditClick = () => {
        setIsEditing(true);
        setIsModalVisible(true);
        if (address) {
            form.setFieldsValue(address);
        }
    };

    const handleAddClick = () => {
        setIsEditing(false);
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleFormFinish = async (values) => {
        try {
            let response = await appApiCall(
                "patch",
                "patch",
                { action: "set", keyName: keyName, values: values, id: id },
                { entity }
            );
            if (!response.success) {
                return NotificationHandler.error(response.message);
            }
            setIsModalVisible(false);
            updateInCustomModal(values, keyName)
            updateInForm(values);
        } catch (errorInfo) {
            return NotificationHandler.error(errorInfo.message);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    useEffect(() => {
        if (isModalVisible && !isEditing) {
            form.resetFields(); // Reset form fields again when the modal opens for adding a new address
        }
    }, [isModalVisible, isEditing, form]);

    return (
        <div>
            {initialRender && (
                <>
                    {address ? (
                        <>
                            <Row align="middle" style={{ marginBottom: "2px" }}>
                                <Col span={20}>
                                    <Taglabel
                                        text={entityName.toUpperCase()}
                                        details={true}
                                    />
                                </Col>
                                <Col span={4} style={{ textAlign: "right" }}>
                                    <EditOutlined onClick={handleEditClick} />
                                </Col>
                            </Row>
                            <Row style={{ fontSize: "0.875rem" }}>
                                <Col span={24}>{addressString}</Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <Row align="middle" style={{ marginBottom: "4px" }}>
                                <Col span={20}>
                                    <Taglabel
                                        text={`No ${entityName}`}
                                        details={true}
                                    />
                                </Col>
                                <Col span={4} style={{ textAlign: "right" }}>
                                    <PlusOutlined onClick={handleAddClick} />
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            )}
            <Modal
                title={isEditing ? `EDIT ${entityName?.toUpperCase()} ADDRESS` : `ADD ${entityName.toUpperCase()} ADDRESS`}
                open={isModalVisible}
                onCancel={handleCancel}
                maskClosable={false}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFormFinish}
                >
                    <AddressForm />
                    <FormActionButtons isUpdating={isEditing} showCancel={false} />
                </Form>
            </Modal>
        </div>
    );
};

export default AddressDetails;
