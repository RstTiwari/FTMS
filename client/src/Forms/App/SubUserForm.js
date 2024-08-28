import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select, notification } from "antd";
import { useCookies } from "react-cookie";
import FormItemCol from "components/Comman/FormItemCol";

const { Option } = Select;

const SubUserForm = ({ form }) => {
    const [loading, setLoading] = useState(false);
    const [sidebar, setSidebar] = useState(null);
    const [cookies, setCookie] = useCookies(["token"]);
    let profile = cookies["profile"];



 

    const onFinish = (values) => {};

    const handleItemsUpdate = (value, fieldName) => {};
    useEffect(() => {
        if(profile){
            setSidebar(profile.tenant.sidebar);

        }
    }, [sidebar]);

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
                preFillValue={form.getFieldValue("role")}
            />

            <Form.Item label="Permissions">
                {sidebar && sidebar.map((module) => (
                    <Form.Item key={module} label={module}>
                        <Form.Item
                            name={[module, "read"]}
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Read</Checkbox>
                        </Form.Item>
                        <Form.Item
                            name={[module, "write"]}
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox style={{ marginLeft: 8 }}>Write</Checkbox>
                        </Form.Item>
                        <Form.Item
                            name={[module, "delete"]}
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox style={{ marginLeft: 8 }}>
                                Delete
                            </Checkbox>
                        </Form.Item>
                    </Form.Item>
                ))}
            </Form.Item> 
        </>
    );
};

export default SubUserForm;
