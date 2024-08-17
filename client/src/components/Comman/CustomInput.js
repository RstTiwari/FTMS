import React, { useState, useEffect } from "react";
import { Input, DatePicker, InputNumber, Select, Checkbox } from "antd";
import dayjs from "dayjs";
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
    const { onChange, preFillValue, updateInForm, disabled, ...otherProps } =
        restProps;
    const [date, setDate] = useState("");
    // Convert preFillValue to dayjs object if it's a date
    useEffect(() => {
        if (preFillValue && type === "date") {
            setDate(dayjs(preFillValue));
        }
    }, [preFillValue, type]);

    const handleDateChange = (date) => {
        setDate(date);
        if (onChange) {
            let dateString = date.toDate();
            onChange(dateString); // Convert dayjs to JS Date object
            updateInForm(dateString);
        }
    };

    const handleCheckboxChange = (e) => {
        if (onChange) {
        }
        onChange(e.target.checked);
        updateInForm(e.target.checked);
    };

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
            return (
                <DatePicker
                    value={date}
                    format={"DD/MM/YYYY"}
                    onChange={handleDateChange}
                />
            );
        case "number":
            return (
                <InputNumber
                    {...restProps}
                    readOnly={readOnly}
                    style={{ width: width }}
                    controls={false} // Remove the up/down controls
                    min={0} // Prevent value from being less than 0
                    disabled={disabled}
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
                    preFillValue
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
            return (
                <CustomCounters
                    entity={entity}
                    preFillValue={preFillValue}
                    {...restProps}
                />
            );
        case "image":
            return <UploadImage {...restProps} />;
        case "checkbox":
            return (
                <Checkbox
                    onChange={handleCheckboxChange}
                    checked={preFillValue}
                    {...otherProps}
                >
                    {restProps.label}
                </Checkbox>
            );
        default:
            return <Input readOnly={readOnly} {...restProps} />;
    }
};

export default CustomInput;
