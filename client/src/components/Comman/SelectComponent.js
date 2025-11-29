import React, { useState } from "react";
import { Select } from "antd";

const SelectComponent = ({ options = [], form, name, entity }) => {
    const [value,setValue] = useState(form.getFieldValue(name))
    console.log(value,"value")
        const handleChange = (value) => {
        form.setFieldsValue({ [name]: value });
        setValue(value)
        console.log("ent",entity,value  )
        if (entity === "quotations" && value == "PERFORMA INVOICE") {
        }
        console.log(form.getFieldsValue(),"==")
    };

    return (
        <Select
            style={{ width: "100%", textAlign: "left" }}
            value={value}
            dropdownStyle={{ textAlign: "left" }}
            options={options}
            onChange={handleChange}
        />
    );
};

export default SelectComponent;
