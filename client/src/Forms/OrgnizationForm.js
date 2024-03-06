import React from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const OrganizationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    // You can handle form submission here, such as sending data to backend
  };

  // Custom Upload Button
  const customUploadButton = (
    <div>
      <UploadOutlined /> Upload
    </div>
  );

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="companyName"
        label="Company Name"
        rules={[{ required: true, message: "Please enter company name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="logo"
        label="Logo"
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
      >
        <Upload
          listType="picture"
          accept="image/*"
          maxCount={1}
          beforeUpload={() => false} // Prevent default upload behavior
        >
          {customUploadButton}
        </Upload>
      </Form.Item>
      <Form.Item
        name="industry"
        label="Industry"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["address", "street"]}
        label="Street"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["address", "city"]}
        label="City"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["address", "state"]}
        label="State"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["address", "pinCode"]}
        label="Pin Code"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrganizationForm;
