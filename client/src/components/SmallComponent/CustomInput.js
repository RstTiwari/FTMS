import React from "react";
import { Input, DatePicker, InputNumber, Select } from "antd";
import CustomDropDown from "./CustomDropDown"; // Assuming you have created CustomDrop component
import CustomModal from "components/CustomModal";
import VendorModal from "components/VendorModal";
import UploadImage from "components/UploadImage";
import CustomEntityNo from "./CustomEntityNo";

const CustomInput = ({ type, readOnly,entity, width = "150px", ...restProps }) => {
    switch (type) {
        case "text":
            return <Input readOnly={readOnly} {...restProps} style={{ width: "100%" }} />;
        case "date":
            return <DatePicker {...restProps}  format={"DD/MM/YYYY"}/>;
        case "number":
            return <InputNumber {...restProps} style={{ width: width }} />;
        case "box":
            return <Input.TextArea {...restProps} style={{ width: width }} />;
        case "select":
            return <CustomDropDown width={width} {...restProps} />;
        case "model":
            return <CustomModal entity = {entity} width={width} {...restProps} />;
        case "entityNo":
            return <CustomEntityNo  entity ={entity} />
        case "image":
            return <UploadImage {...restProps} />;
        default:
            return <Input {...restProps} />;
    }
};

export default CustomInput;
