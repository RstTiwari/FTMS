import React, { useState } from "react";
import { Input, Button, Modal } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import CustomForm from "../CustomForm"; // Replace with your custom modal component
import { useParams } from "react-router-dom";

const CustomInputWithModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const { entity } = useParams();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleModalOk = () => {
        // Handle OK button click inside modal if needed
        setModalVisible(false);
    };

    const handleModalCancel = () => {
        // Handle Cancel button click inside modal if needed
        setModalVisible(false);
    };

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
                <CustomForm
                    entityOfModal={"entityNo"}
                    height="25vh"
                    isModal={true}
                    header={false}
                />
            </Modal>
        </div>
    );
};

export default CustomInputWithModal;
