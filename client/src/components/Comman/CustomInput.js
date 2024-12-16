import React, { useState, useEffect } from "react";
import { Input, DatePicker, InputNumber, Select, Checkbox } from "antd";
import dayjs from "dayjs";
import CustomSelect from "./CustomSelect"; // Assuming you have created CustomDrop component
import CustomModal from "components/CustomModal";
import UploadImage from "components/UploadImage";
import CustomCounters from "./CustomCounters";
import PaymentMode from "./PaymentMode";
import TaxPercent from "./TaxPercent";
import OtherChargesForm from "../../Forms/App/OtherCharges";
import TermsAndConditionsForm from "../../Forms/App/TermsAndCondition";
import NotesForm from "Forms/App/NoteForm";
import ProductCategory from "./ProductType";
import UserRole from "./UserRole";
import UserPermission from "Forms/App/UserPermissionForm";
import CoustomButton from "./CoustomButton";
import { DeleteOutlined } from "@mui/icons-material";

const CustomInput = ({
    type,
    readOnly = false,
    entity,
    entityName,
    fieldName,
    width = "150px",
    preFillValue,
    ...restProps
}) => {
    const { onChange, updateInForm, disabled, form, ...otherProps } = restProps;
    const [date, setDate] = useState("");
    //Convert preFillValue to dayjs object if it's a date
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
                    style={{ width: width }}
                />
            );
        case "itemType":
            return (
                <ProductCategory
                    entity={entity}
                    fieldName={fieldName}
                    width={width}
                    preFillValue={preFillValue}
                    updateInForm={updateInForm}
                />
            );
        case "date":
            return (
                <DatePicker
                    value={date}
                    format={"DD/MM/YYYY"}
                    onChange={handleDateChange}
                    style={{ width: width }}
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
        case "othercharges":
            return (
                <OtherChargesForm
                    form={form}
                    updateInForm={updateInForm}
                    width={width}
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
                    preFillValue={preFillValue}
                    {...restProps}
                />
            );
        case "modal":
            return (
                <CustomModal
                    entity={entity}
                    fieldName={fieldName}
                    width={width}
                    preFillValue={preFillValue}
                    {...restProps}
                />
            );
        case "paymentmode":
            return (
                <PaymentMode
                    entity={entity}
                    fieldName={fieldName}
                    width={width}
                    preFillValue={preFillValue}
                    {...restProps}
                />
            );
        case "gstPercent":
            return (
                <TaxPercent
                    entity={entity}
                    fieldName={fieldName}
                    width={width}
                    preFillValue={preFillValue}
                    {...restProps}
                />
            );
        case "counters":
            return (
                <CustomCounters
                    entity={entity}
                    preFillValue={preFillValue}
                    {...restProps}
                    width={width}
                />
            );
        case "image":
            return (
                <UploadImage
                    {...restProps}
                    preFillValue={preFillValue}
                    style={{ width: width }}
                />
            );
        case "checkbox":
            return (
                <Checkbox
                    onChange={handleCheckboxChange}
                    checked={preFillValue}
                    style={{ width: width }}
                    {...otherProps}
                >
                    {restProps.label}
                </Checkbox>
            );
        case "terms":
            return (
                <TermsAndConditionsForm
                    form={form}
                    updateInForm={updateInForm}
                    width= {width}
                />
            );
        case "notes":
            return (
                <NotesForm
                    form={form}
                    updateInForm={updateInForm}
                    width={width}
                />
            );
        case "role":
            return (
                <UserRole
                    form={form}
                    updateInForm={updateInForm}
                    width={width}
                    preFillValue={preFillValue}
                />
            );

        case "permissions":
            return (
                <UserPermission
                    form={form}
                    updateInForm={updateInForm}
                    width={width}
                />
            );

        case "delete":
            return (
                <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={updateInForm}
                />
            );
        default:
            return (
                <Input
                    readOnly={readOnly}
                    {...restProps}
                    style={{ width: width }}
                />
            );
    }
};

export default CustomInput;
