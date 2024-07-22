import React from "react";
import { Input, DatePicker, InputNumber, Select } from "antd";
import CustomSelect from "./CustomSelect"; // Assuming you have created CustomDrop component
import CustomModal from "components/CustomModal";
import UploadImage from "components/UploadImage";
import CustomCounters from "./CustomCounters";

const CustomInput = ({
    type,
    readOnly = false,
    entity,
    entityName,
    fieldName,
    width = "150px",
    ...restProps
}) => {
    const { onChange, ...otherProps } = restProps;
    switch (type) {
        case "text":
            return (
                <Input
                    readOnly={readOnly}
                    {...restProps}
                    style={{ width: "100%" }}
                />
            );
        case "date":
            return <DatePicker {...restProps} format={"DD/MM/YYYY"} />;
        case "number":
            return (
                <InputNumber
                    {...restProps}
                    readOnly={readOnly}
                    style={{ width: width }}
                    onChange={onChange}
                />
            );
        case "box":
            return <Input.TextArea {...restProps} style={{ width: width }} />;
        case "select":
            return (
                <CustomSelect
                    entity={entity}
                    entityName={entityName}
                    width={width}
                    {...restProps}
                />
            );
        case "model":
            return (
                <CustomModal
                    entity={entity}
                    fieldName={fieldName}
                    width={width}
                    {...restProps}
                />
            );
        case "counters":
            return <CustomCounters entity={entity} {...restProps} />;
        case "image":
            return <UploadImage {...restProps} />;
        default:
            return <Input readOnly ={readOnly} {...restProps} />;
    }
};

export default CustomInput;