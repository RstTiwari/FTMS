import React from "react";
import { Form, Select, Divider, Space, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const DropDownCoustom = ({
    option,
    placeHolder,
    buttonName,
    onInputChange,
}) => {
    console.log(option);
    const onChange = (e) => {
        onInputChange(e.target.value);
    };
    return (
        <div>
            {option}
            <Divider />
            <Button type="primary" style={{ width: 240, margin: "0.1rem" }}>
                Add New
            </Button>
        </div>
    );
};

export default DropDownCoustom;
