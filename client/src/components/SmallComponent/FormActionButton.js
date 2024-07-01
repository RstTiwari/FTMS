import React from "react";
import { Form, Row } from "antd";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CoustomButton"; // Assuming your CustomButton is imported from the correct path
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
