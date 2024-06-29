import React from "react";
import { Form, Row } from "antd";
import { useNavigate } from "react-router-dom";
import CustomButton from "../SmallComponent/CoustomButton"; // Assuming your CustomButton is imported from the correct path
import useWindowWidth from "Hook/useWindowWidth";

const FormActionButtons = ({ isUpdating }) => {
    const navigate = useNavigate();
    const mariginLeft = 200;
    const width = useWindowWidth();

    const handleCancelClick = () => {
        navigate(-1);
    };

    return (
        <Row
            style={{
                bottom: 0,
                height: "4rem",
                left: 0,
                width: "100%",
                backgroundColor: "#ffffff",
                zIndex: 100,
                marginLeft: mariginLeft,
            }}
        >
            <Form.Item>
                {isUpdating ? (
                    <CustomButton htmlType="submit" text="Update" />
                ) : (
                    <CustomButton htmlType="submit" text="Save" />
                )}
                <CustomButton
                    onClick={handleCancelClick}
                    isCancel={true}
                    text="Cancel"
                />
            </Form.Item>
        </Row>
    );
};

export default FormActionButtons;
