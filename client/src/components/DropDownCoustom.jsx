import React from "react";
import { Form, Select, Divider, Space, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const DropDownCoustom = ({
    option,
    buttonName,
}) => {
   
    return (
        <div>
            {option}
            <Divider />
            <Button type="primary" style={{ margin: "0.1rem" }}>
                {buttonName}
            </Button>
        </div>
    );
};

export default DropDownCoustom;
