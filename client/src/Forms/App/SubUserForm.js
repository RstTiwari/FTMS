import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select, notification } from "antd";
import { useCookies } from "react-cookie";
import FormItemCol from "components/Comman/FormItemCol";

const { Option } = Select;

const SubUserForm = ({ form }) => {
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies("");
    const [custom, setCustom] = useState(null);

    const onFinish = (values) => {};

    const handleItemsUpdate = (value, fieldName) => {
        if (fieldName === "role") {
            setCustom(true);
            form.setFieldsValue({ role: value });
        }
    };

    return (
        <>
            <FormItemCol
                label="User Name"
                name="name"
                required={true}
                labelCol={{ span: 8 }}
                rules={[
                    { required: true, message: "Please input the username!" },
                ]}
                width={"30vw"}
            />
            <FormItemCol
                label="Email Id"
                name="email"
                required={true}
                rules={[{ required: true, message: "Please input the email!" }]}
                width={"30vw"}
                labelCol={{ span: 8 }}
            />
            <FormItemCol
                label="Role"
                name="role"
                required={true}
                rules={[{ required: true, message: "Please Select the role!" }]}
                width={"30vw"}
                labelCol={{ span: 8 }}
                type={"role"}
                updateInForm={(value) => handleItemsUpdate(value, "role")}
            />
            {custom && (
                <FormItemCol
                    label="Permission"
                    name="permissions"
                    required={true}
                    rules={[
                        { required: true, message: "Please Select the role!" },
                    ]}
                    width={"30vw"}
                    labelCol={{ span: 8 }}
                    type={"permissions"}
                    updateInForm={(value) => handleItemsUpdate(value, "role")}
                    form={form}
                />
            )}
        </>
    );
};

export default SubUserForm;
