import React from "react";
import { Input, DatePicker, InputNumber, Select } from "antd";
import CustomDropDown from "./CustomDropDown"; // Assuming you have created CustomDrop component
import CustomerModal from "components/CustomerModal";
const CustomInput = ({ type,readOnly, ...restProps }) => {
    switch (type) {
        case "text":
            return <Input  readOnly {...restProps} />;
        case "date":
            return <DatePicker {...restProps} />;
        case "number":
            return <InputNumber {...restProps}  style={{width:"150px"}}/>;
        case "box":
            return <Input.TextArea {...restProps} size="large" />;
        case "customDrop":
            return <CustomDropDown {...restProps} />;
        case "model":
            return <CustomerModal {...restProps} />
        default:
            return <Input {...restProps} />;
    }
};

export default CustomInput;
