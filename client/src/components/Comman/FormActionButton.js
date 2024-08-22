import React from "react";
import { Form, Row } from "antd";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CoustomButton"; // Assuming your CustomButton is imported from the correct path

const FormActionButtons = ({ isUpdating, showCancel = true }) => {
    const navigate = useNavigate();
    const mariginLeft = 200;

    const handleCancelClick = () => {
        navigate(-1);
    };
    return (
        <div>
            <Row>
                <Form.Item>
                    {isUpdating ? (
                        <CustomButton htmlType="submit" text="Update" />
                    ) : (
                        <CustomButton htmlType="submit" text="Save" />
                    )}
                    {showCancel ? (
                        <CustomButton
                            onClick={handleCancelClick}
                            isCancel={true}
                            text="Cancel"
                        />
                    ) : (
                        ""
                    )}
                </Form.Item>
            </Row>
        </div>
    );
};

export default FormActionButtons;
