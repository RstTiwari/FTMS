import React from "react";
import { Button, Form } from "antd";
import { useNavigate } from "react-router-dom";

const FormActionButtons = ({ isUpdating }) => {
    const navigate = useNavigate();
    return (
        <Form.Item>
            {isUpdating ? (
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            ) : (
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            )}
            <Button onClick={() => navigate(-1)} style={{ marginLeft: 10 }}>
                Cancel
            </Button>
        </Form.Item>
    );
};

export default FormActionButtons;
