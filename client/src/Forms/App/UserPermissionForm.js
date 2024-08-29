import React, { useEffect, useState } from "react";
import {
    Form,
    Row,
    Col,
    Button,
    Select,
    Input,
    InputNumber,
    Collapse,
} from "antd";
import {
    PlusOutlined,
    MinusCircleOutlined,
    CaretRightOutlined,
} from "@ant-design/icons";
import { useCookies } from "react-cookie";
import CoustomButton from "../../components/Comman/CoustomButton";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useScrollTrigger } from "@mui/material";

const { Option } = Select;
const { Panel } = Collapse;

const UserPermission = ({ form, updateInForm, width = "30vw" }) => {
    // Capitalize the first letter of a string
    let { adminApiCall } = useAuth();
    const [permissionOption, setPermissinOption] = useState([]);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    let getPermissionOption = async () => {
        let response = await adminApiCall("get", "permissionData", {});
        if (!response.success) {
            return NotificationHandler.error(response.message);
        }
        setPermissinOption(response.result);
    };

    // Handle value changes in the form
    const handleItemsUpdate = (value, fieldName, row) => {
        let permissions = form.getFieldValue("permissions") || [];
        let changedRow = permissions[row];
        if (fieldName === "entity") {
            changedRow["entity"] = value;
        } else if (fieldName === "value") {
            changedRow["value"] = value;
        }

        permissions[row] = changedRow;
        form.setFieldsValue({ permissions: permissions });
    };
    //Handle changes in the form fields
    // Add a default term when the component mounts
    useEffect(() => {
        const otherCharges = form.getFieldValue("permissions") || [];
        if (otherCharges.length <= 0) {
            addDefaultTerm();
        }
    }, [form]);

    const addDefaultTerm = () => {
        const permissions = form.getFieldValue("permissions") || [];
        permissions.push({ entity: "", value: "" });
        form.setFieldsValue({ permissions: permissions });
    };
    useEffect(() => {
        getPermissionOption();
    }, []);

    return (
        <Collapse
            bordered={false}
            expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{
                background: "transparent",
                width: width,
            }}
        >
            <Panel
                header="Permissions"
                key="1"
                style={{ alignItems: "center" }}
                
            >
                <Form.List name="permissions">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(
                                ({ key, name, fieldKey, ...restField }) => (
                                    <Row
                                        key={key}
                                        align="middle"
                                        justify="start"
                                    >
                                        <Col span={12}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "entity"]}
                                                fieldKey={[fieldKey, "entity"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Select Add/Less",
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    onChange={(value) =>
                                                        handleItemsUpdate(
                                                            value,
                                                            "entity",
                                                            name
                                                        )
                                                    }
                                                    options={permissionOption}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={7}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "value"]}
                                                fieldKey={[fieldKey, "value"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Enter value Name",
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    onChange={(value) =>
                                                        handleItemsUpdate(
                                                            value,
                                                            "value",
                                                            name
                                                        )
                                                    }
                                                    options={[
                                                        {
                                                            label: "READ",
                                                            value: "read",
                                                        },
                                                        {
                                                            label: "WRITE",
                                                            value: "write",
                                                        },
                                                        {
                                                            label: "DELETE",
                                                            value: "delete",
                                                        },
                                                    ]}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={1}>
                                            <Form.Item>
                                                <MinusCircleOutlined
                                                    onClick={() => remove(name)}
                                                    style={{
                                                        color: "red",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            )}
                            <Row justify="start">
                                <Row justify="start">
                                    <CoustomButton
                                        text={"Add New"}
                                        onClick={() => add()}
                                        withIcon={true}
                                        details={true}
                                    />
                                </Row>
                            </Row>
                        </>
                    )}
                </Form.List>
            </Panel>
        </Collapse>
    );
};

export default UserPermission;
