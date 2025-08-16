import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Select,
  Modal,
  Divider,
  message,
  Row,
  Col,
  Card,
} from "antd";
import { useAuth } from "../../state/AuthProvider";
import FormItemCol from "./FormItemCol";
import CustomLabel from "./CustomLabel";
import CoustomerData from "Data/CoustomerData";

const AddressComponent = ({ id }) => {
  const { appApiCall } = useAuth();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [editType, setEditType] = useState(null); // "billing" or "shipping"

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await appApiCall("get", "get", {}, { id, entity: "customers" });
      if (res?.result) {
        setData(res.result);
      }
    } catch (error) {
      message.error("Failed to fetch address data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      setOpen(false); // Close modal
      setEditType(null); // Reset editType
      form.resetFields(); // Reset form
      fetchData(); // Fetch new customer data
    }
  }, [id]);

  const handleEditClick = (type) => {
    if (!data) return;
  
    setEditType(type);
  
    // Construct the address object to set
    const addressData =
      type === "billing"
        ? { ...data.billingAddress, name: data.name } // 👈 Use customer name for billing
        : data.shippingAddress;
  
    // Set form values
    form.setFieldsValue({
      [`${type}Address`]: addressData || {},
    });
  
    setOpen(true);
  };
  

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updatedAddress = values[`${editType}Address`];
      const payload = {
        ...data,
        [`${editType}Address`]: updatedAddress,
      };

      await appApiCall("post", "update", {values:payload}, {
        id,
        entity: "customers",
      });

      message.success(`${editType === "billing" ? "Billing" : "Shipping"} address updated successfully.`);
      setData(payload);
      setOpen(false);
      setEditType(null);
    } catch (error) {
      message.error("Update failed.");
    }
  };
  const renderAddressBlock = (type) => {
    const address = data?.[`${type}Address`];
    const title = type === "billing" ? "Billing Address" : "Shipping Address";
  
    // 👇 Dynamic name: from customer.name for billing, else from shippingAddress.name
    const name =
      type === "billing" ? data?.name : address?.name;
  
    return (
      <Col span={6}>
        <Card
          title={title}
          extra={
            <Button type="link" onClick={() => handleEditClick(type)}>
              Edit
            </Button>
          }
        >
          {address ? (
            <>
              <b> NAME :{name || ""}</b>
              <div>{address.street1}</div>
              <div>{address.street2}</div>
              <div>
                {address.city}, {address.state} - {address.pincode}
              </div>
            </>
          ) : (
            <div>No {type} address found.</div>
          )}
        </Card>
      </Col>
    );
  };
  

  return (
      <div>
          <Row gutter={24} style={{ marginBottom: 16 }}>
              {renderAddressBlock("billing")}
              {renderAddressBlock("shipping")}
          </Row>

          {/* Modal for editing selected address */}
          <Modal
              title={`Edit ${
                  editType === "billing" ? "Billing" : "Shipping"
              } Address`}
              open={open}
              onOk={handleUpdate}
              onCancel={() => setOpen(false)}
              okText="Update"
              confirmLoading={loading}
              destroyOnClose
              width={600}
          >
             <Form form={form} layout="vertical">
  {editType && (
    <>
      <Divider orientation="left">
        {editType === "billing" ? "Billing Address" : "Shipping Address"}
      </Divider>

      <FormItemCol
        name={[`${editType}Address`, "name"]}
        label="Name"
        type="text"
        required
        labelAlign="left"
        width={"30vw"}
        labelCol={{ span: 8 }}
        
      />

      <FormItemCol
        name={[`${editType}Address`, "street1"]}
        label="Street 1"
        type="text"
        required
        labelAlign="left"
        width={"30vw"}
        labelCol={{ span: 8 }}
      />
      <FormItemCol
        name={[`${editType}Address`, "street2"]}
        label="Street 2"
        type="text"
        labelAlign="left"
        width={"30vw"}
        labelCol={{ span: 8 }}
      />
      <FormItemCol
        name={[`${editType}Address`, "city"]}
        label="City"
        type="text"
        required
        labelAlign="left"
        width={"30vw"}
        labelCol={{ span: 8 }}
      />
      <FormItemCol
        name={[`${editType}Address`, "pincode"]}
        label="Pincode"
        type="number"
        required
        labelAlign="left"
        width={"30vw"}
        labelCol={{ span: 8 }}
      />
      <Form.Item
        label={<CustomLabel label="State" required />}
        name={[`${editType}Address`, "state"]}
        labelAlign="left"
        labelCol={{ span: 5 }}
        rules={[
          {
            required: true,
            message: "Please select a state",
          },
        ]}
      >
        <Select
          options={CoustomerData.states}
          style={{ width: "100%" }}
        />
      </Form.Item>
    </>
  )}
</Form>

          </Modal>
      </div>
  );
};

export default AddressComponent;
