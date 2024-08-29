import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    Button,
    Checkbox,
    Select,
    notification,
    Col,
    Row,
    Space,
} from "antd";
import { useCookies } from "react-cookie";
import FormItemCol from "components/Comman/FormItemCol";
import Taglabel from "components/Comman/Taglabel";

const { Option } = Select;

const UserForm = ({ form }) => {
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies("");
    const [custom, setCustom] = useState(null);

    const handleItemsUpdate = (value, fieldName) => {
        if (fieldName === "role") {
            setCustom(true);
            form.setFieldsValue({ role: value });
        }

        if (fieldName === "role" && value !== "custom") {
            setCustom(false);
            form.setFieldsValue({ permissions: [] });
        }
    };

    useEffect(() => {
        let checkCustom = form.getFieldValue("role");
        if (checkCustom === "custom") {
            setCustom(true);
        }
    }, [custom]);

    return (
        <>
            <Row justify={"center"} style={{ margin: "10px" }}>
                <Taglabel
                    text={"Email Will be send to User For Onboarding process"}
                    weight={1000}
                />
            </Row>
            <FormItemCol
                label="Name"
                name="name"
                required={true}
                rules={[{ required: true, message: "Please input the name!" }]}
                width={"30vw"}
                labelCol={{ span: 8 }}
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
                preFillValue={form.getFieldValue("role") || ""}
            />
            <Col span={12}>
                <Form.Item
                    label={"Status"}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    name={"removed"}
                    initialValue={form.getFieldValue("removed") || false}
                >
                    <Select
                        options={[
                            { label: "ACTIVE", value: false },
                            { label: "DEACTIVE", value: true },
                        ]}
                        style={{ width: "30vw" }}
                    />
                </Form.Item>
            </Col>

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
                    labelAlign="left"
                    type={"permissions"}
                    updateInForm={(value) => handleItemsUpdate(value, "role")}
                    form={form}
                />
            )}
        </>
    );
};

export default UserForm;
