import React, { useState, useEffect } from "react";
import { Button, Col, Divider, Form, message, Row, Modal } from "antd";
import { useParams } from "react-router-dom";
import useFormActions from "Hook/useFormAction";

import "../App.css";
import CustomFormItem from "../module/Create/CreateModule";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";
import { fetchTitleName } from "Helper/PageTitle";

const CustomForm = ({
  entityOfModal,
  height,
  isModal = false,
  modalFieldKey,
  passToModal,
  isUpdate = false,
  closeModal,
}) => {
  const { entity: entityOfForm, id } = useParams();
  const entity = isModal ? entityOfModal : entityOfForm;
  const { appApiCall } = useAuth();

  const [form] = Form.useForm();
  const [unfilledField, setUnfilledField] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false); // Track form changes

  const { isLoading, error, handleFormSubmit } = useFormActions(
    entity,
    isUpdate,
    id,
    closeModal
  );

  // isAdmin to check whether the API to call is an Admin API
  let isAdmin = entity === "user" ? true : false;

  const handleFormFinish = async (values) => {
    if (values.hasOwnProperty("image")) {
      let image = values?.image;
      if (typeof image === "object") {
        // Upload the file before saving it
        const formData = new FormData();
        formData.append("file", values.image);
        const response = await appApiCall("post", "upload", formData, {});
        if (!response.success) {
          return NotificationHandler.error("Failed to Upload Image");
        }
        values.image = response.result;
      }
    }

    handleFormSubmit(values, isModal, passToModal, isAdmin);
    setIsFormChanged(false); // Reset change flag after form submission
  };

  const validateFields = async () => {
    try {
      const values = await form.validateFields();
      setUnfilledField(null);
      handleFormFinish(values);
    } catch (error) {
      const firstField = error.errorFields[0].errors[0];
      setUnfilledField(firstField);
      return NotificationHandler.error(`${firstField}`);
    }
  };

  const handleCloseModal = () => {
    if (isFormChanged) {
      Modal.confirm({
        title: "Are you sure you want to discard your changes?",
        content: "Your changes will be lost if you do not save them.",
        okText: "Yes, discard",
        cancelText: "No, keep editing",
        onOk: () => {
          closeModal(false);
          form.resetFields();

        },
      });
    } else {
      closeModal(false);
      form.resetFields();
    }
  };

  const handleValuesChange = (changedValues) => {
    // Set flag to true if any form field changes
    setIsFormChanged(true);
  };

  useEffect(() => {
    form.resetFields();
  }, [entity]);

  useEffect(()=>{

  },[form])

  if (isLoading) {
    return <PageLoader isLoading={true} text={"Wait, creating the data..."}  height="auto"/>;
  }

  return (
    <Form
      name={`${entity}Form`}
      form={form}
      initialValues={{}}
      onFinish={handleFormFinish}
      onFinishFailed={validateFields}
      onValuesChange={handleValuesChange} // Track form changes
      validateTrigger={unfilledField}
      requiredMark={false}
      layout={"horizontal"}
    >
        <Row align={"middle"}>
          <Col span={12}>
            <h3>{`NEW ${fetchTitleName(entity).toUpperCase()}`}</h3>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{ backgroundColor: "#22b378", cursor: "pointer" }}
            >
              SAVE
            </Button>
            <Button onClick={handleCloseModal}>CLOSE</Button>{" "}
            {/* Trigger custom close logic */}
          </Col>
        </Row>

      <CustomFormItem entity={entity} form={form} />
    </Form>
  );
};

export default CustomForm;
