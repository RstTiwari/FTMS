import React, { useState, useEffect } from "react";
import { Input, Button, Modal, Form } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Counters from "Forms/Counters";
import FormActionButtons from "./FormActionButton";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";

const CustomInputWithModal = ({ updateInForm }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [prefix, setPrefix] = useState("");
    const [nextNumber, setNextNumber] = useState("");
    const { tenantId, entity } = useParams();
    const { appApiCall } = useAuth();
    const [form] = Form.useForm();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        updateInForm(e.target.value);
    };

    const openModal = async () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleModalOk = () => {
        setModalVisible(false);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const handleFormFinish = async (values) => {
        const response = await appApiCall("post", "updateCountersNumber", {
            entity: "counters",
            values,
        });
        if (!response.success) {
            NotificationHandler.error(response.message);
        } else {
            handleModalCancel();
            fetchCountersNumber();
            updateInForm(response?.result?.nextNumber);
            NotificationHandler.success("Counters updated successfully");
        }
    };

    const fetchCountersNumber = async () => {
        const response = await appApiCall(
            "get",
            "fetchCountersNumber",
            {},
            { entity: "counters", entityName: entity }
        );
        if (response.success) {
            const { prefix, nextNumber } = response.result;
            setPrefix(prefix);
            setNextNumber(nextNumber);
            form.setFieldsValue({ prefix, nextNumber });
            setInputValue(nextNumber);
            updateInForm(nextNumber);
        } else {
            return NotificationHandler.error(response.message);
        }
    };
    useEffect(() => {
        fetchCountersNumber();
    }, []);

    return (
        <div>
            <Input
                value={inputValue}
                onChange={handleInputChange}
                style={{ paddingRight: "30px" }} // Adjust padding-right to accommodate button width
            />

            <Button
                icon={<SettingOutlined />}
                onClick={openModal}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 1,
                    border: "none",
                    background: "transparent",
                }}
            />

            <Modal
                title={`CONFIGURE YOUR ${entity.toLocaleUpperCase()} NUMBER PREFERENCES`}
                open={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                footer={null}
                width={"40vw"}
                style={{ padding: 20 }}
                bodyStyle={{
                    overflow: "auto",
                }}
            >
                <Form
                    form={form}
                    onFinish={handleFormFinish}
                    initialValues={{}}
                >
                    <Counters form={form} />
                    <FormActionButtons />
                </Form>
            </Modal>
        </div>
    );
};

export default CustomInputWithModal;
