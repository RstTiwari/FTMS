import React from "react";
import { Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const CoustomButton = ({
    onClick,
    text,
    htmlType = "button",
    isCancel = false,
    withIcon = false,
}) => {
    return (
        <Button
            icon={withIcon ? <PlusOutlined /> : null}
            onClick={onClick ? onClick : undefined}
            htmlType={onClick ? "button" : htmlType}
            style={{
                textAlign: "center", // Center text horizontally
                fontSize: "1rem",
                backgroundColor: isCancel ? "#f5f5f5" : "#22b378",
                color: isCancel ? "#000" : "#fff",
                borderRadius: "5px",
            }}
        >
            {text}
        </Button>
    );
};

export default CoustomButton;
