import React from "react";
import { Form, Input, Select } from "antd";
import CoustomerData from "Data/CoustomerData";
const AddressForm = () => {
    return (
        <div>
            <Form.Item
                name="street1"
                label="Street 1"
                rules={[{ required: true, message: "Please input Street 1!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="street2" label="Street 2">
                <Input />
            </Form.Item>
            <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Please input City!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="state"
                label="State"
                rules={[{ required: true, message: "Please select State!" }]}
            >
                <Select options={CoustomerData.states} />
            </Form.Item>
            <Form.Item
                name="pincode"
                label="Pincode"
                rules={[{ required: true, message: "Please input Pincode!" }]}
            >
                <Input />
            </Form.Item>
        </div>
    );
};

export default AddressForm;
