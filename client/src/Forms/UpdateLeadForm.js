import {
    Form,
    Select,
    Row,
    Col,
    Input,
    Button,
    Divider,
    DatePicker,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useAuth } from "state/AuthProvider";
import { LeadOption } from "Data/LeadData";
import { leadStatus } from "Data/LeadData";
import { epochConveter, epochInDDMMYY } from "Helper/EpochConveter";
import NotificationHandler from "EventHandler/NotificationHandler";

const UpdateLeadForm = ({ initialValues, id }) => {
    const [form] = Form.useForm();
    const [company, setCompany] = useState([]);
    const [toUpdate,setToUpdate] = useState(false)

    const { getDropDownData,updateData } = useAuth();

    const onFinish = async(value) => {
        if(!toUpdate) return NotificationHandler.error("Nothing to Update")
        value._id = id;
        value.recivedDate = epochConveter(value.recivedDate.$d)
        let payload = { entity: "lead", value };
        const { success, result, message } = await updateData(payload);
        if (success) {
            return NotificationHandler.success(message);
        } else {
            return NotificationHandler.error(message);
        }
    };
    const handleValueChange = ()=>{
        setToUpdate(true)
    }

    const handelCustomerClick = async (value) => {
        let entity = "customer";
        let fieldName = "customerName";
        let data = await getDropDownData(entity, fieldName);
        setCompany(data);
    };
    const handleCustomerChange = (value, label) => {
        form.setFieldsValue({ customer: value });
    };

    useEffect(() => {
        handelCustomerClick();
    }, []);
    return (
        <Form
            name="leadUpdateForm"
            form={form}
            initialValues={initialValues}
            onFinish={onFinish}
            onValuesChange={handleValueChange}
        >
            <Form.Item
                label="Recvied Date"
                name="recivedDate"
                disabled
                rules={[
                    {
                        required: true,
                        message: "Please Select Source",
                    },
                ]}
            >
                <DatePicker disabled />
            </Form.Item>
            <Form.Item
                label="Source"
                name="source"
                hasFeedback
                allowClear={true}
                disabled
                rules={[
                    {
                        required: true,
                        message: "Please Select Source",
                    },
                ]}
            >
                <Select disabled>
                    {LeadOption.map((item) => {
                        const { label, value } = item;
                        return (
                            <>
                                <Select.Option value={value}>
                                    {label}
                                </Select.Option>
                            </>
                        );
                    })}
                </Select>
            </Form.Item>

            <Form.Item
                label={"Select Customer"}
                name={"customer"}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Plese Select Customer",
                    },
                ]}
            >
                <Select
                    options={company}
                    disabled
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => (
                        <>
                            <div>
                                {menu}
                                <Divider />
                                <Button
                                    type="primary"
                                    style={{
                                        margin: "0.1rem",
                                    }}
                                >
                                    Add New
                                </Button>
                            </div>
                        </>
                    )}
                    onChange={handleCustomerChange}
                />
            </Form.Item>
            <Form.Item
                label="Status"
                name="status"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Plese Select Status",
                    },
                ]}
            >
                <Select options={leadStatus} />
            </Form.Item>
            <Form.List name={"comments"}>
                {(subFileds, subOpt) => (
                    <div>
                        {subFileds.map((subField, index) => (
                            <Row justify={"center"} align={"middle"}>
                                <Col span={16}>
                                    <Form.Item
                                        label="Add Remark"
                                        name={[subField.name, "comment"]}
                                        key={subField.name}
                                    >
                                        <Input.TextArea
                                            style={{ width: 200 }}
                                        />
                                    </Form.Item>
                                </Col>

                                <Form.Item>
                                    <DeleteOutlined
                                        disabled
                                        onClick={() => {
                                            subOpt.remove(index);
                                        }}
                                    />
                                </Form.Item>
                            </Row>
                        ))}
                        <Row justify={"center"}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    subOpt.add({
                                        comment: "",
                                        edit: true,
                                    });
                                }}
                                icon={<PlusOutlined />}
                                style={{
                                    marginBottom: "1rem",
                                    background: "green",
                                }}
                            >
                                Add Remark
                            </Button>
                        </Row>
                    </div>
                )}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update Lead
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateLeadForm;
