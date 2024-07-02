import React from "react";
import { Input, DatePicker, InputNumber, Select } from "antd";
import CustomDropDown from "./CustomDropDown"; // Assuming you have created CustomDrop component
import CustomerModal from "components/CustomerModal";
import VendorModal from "components/VendorModal";
const CustomInput = ({ type,readOnly,width ="150px", ...restProps }) => {
    switch (type) {
        case "text":
            return <Input  readOnly {...restProps} />;
        case "date":
            return <DatePicker {...restProps} />;
        case "number":
            return <InputNumber {...restProps} style={{ width: width }} />;
        case "box":
            return <Input.TextArea {...restProps}   style={{width:width}} />;
        case "select":
            return <CustomDropDown width={width} {...restProps} />;
        case "model":
            return <CustomerModal {...restProps} />
        case "vendormodel":
            return <VendorModal  {...restProps}/>
        default:
            return <Input {...restProps} />;
    }
};

export default CustomInput;
