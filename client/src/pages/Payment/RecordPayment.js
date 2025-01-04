import React, { useEffect, useState } from "react";
import { Form, message, Spin, Divider, Row, Col, Button } from "antd";
import useInitialFormValues from "Hook/useIntialFormValues";
import useFormActions from "Hook/useFormAction";
import PageLoader from "pages/PageLoader";
import CoustomFormItem from "module/Create/CreateModule";
import { fetchTitleName } from "Helper/PageTitle";
const RecordPayment = ({ entity, id, tenantId, closeModal }) => {
  const [form] = Form.useForm();
  let preFillEntity = entity === "paymentsmade" ? "vendors" : "customers";
  const { initialValues, isFetching, fetchInitialValues } =
    useInitialFormValues(preFillEntity, "get", id);
  const { isLoading, error, handleFormSubmit } = useFormActions(
    entity,
    false,
    id,
    closeModal
  );

  useEffect(() => {
    fetchInitialValues();
  }, []);

  useEffect(() => {
    let preFilledkey = entity === "paymentsreceived" ? "customer" : "vendor";
    if (initialValues) {
      const { name, _id } = initialValues;
      form.setFieldsValue({ [preFilledkey]: { _id: _id, name: name } });
    }
  }, [form, initialValues]);

  if (isFetching) {
    return <PageLoader isLoading={true} text={"Fetching payment Records"} />;
  }

  if (isLoading) {
    return <PageLoader isLoading={true} text="Updating Payment Hold on" />;
  }

  const handleFormFinish = async (values) => {
    handleFormSubmit(values);
  };
  const handleClose = () => {
    form.resetFields(); // Reset form fields when closing the modal
    closeModal(); // Trigger custom close logic
  };

  return (
    <Form
      name={`${entity}Form`}
      form={form}
      initialValues={initialValues}
      onFinish={handleFormFinish}
      requiredMark={false}
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row align={"middle"}>
        <Col span={12}>
          <h3>{`ADD NEW ${fetchTitleName(entity).toUpperCase()}`}</h3>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            htmlType="submit"
            type="primary"
            style={{ backgroundColor: "#22b378", cursor: "pointer" }}
          >
            SAVE
          </Button>
          <Button onClick={handleClose}>CLOSE</Button>{" "}
          {/* Trigger custom close logic */}
        </Col>
      </Row>

      <CoustomFormItem entity={entity} isUpdate={false} form={form} />
    </Form>
  );
};

export default RecordPayment;
