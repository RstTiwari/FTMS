import React, { useEffect, useState } from "react";
import { Form, Row, Col, Input } from "antd";
import { useAuth } from "state/AuthProvider";
import CoustomButton from "components/Comman/CoustomButton";
import Taglabel from "components/Comman/Taglabel";
import { useParams } from "react-router-dom";
import useAuthApiCall from "Hook/useAuthApiCall";
import PageLoader from "pages/PageLoader";

const UpdatePasswordForm = () => {
  const [form] = Form.useForm();
  const { userId, tenantId } = useParams();
  const [verifyData, setVerifyData] = useState(null);
  const { fetchLocalData } = useAuth();
  const { isLoading, handleAuthApi } = useAuthApiCall("updatePassword");

  const handlePasswordUpdate = async (values) => {
    values.userId = userId;
    values.tenantId = tenantId;
    await handleAuthApi(values);
  };

  useEffect(() => {
    let localData = fetchLocalData(userId);
    setVerifyData({
      ...verifyData,
      email: localData?.user?.email,
      userId: userId,
      tenantId: tenantId,
    });
  }, [useAuthApiCall]);

  if (isLoading) {
    return <PageLoader isLoading={true} text={"Updating Password pls wait"} />;
  }

  return (
    <Form name="updatePassword" form={form} onFinish={handlePasswordUpdate}>
      <Row justify={"center"}>
        <Taglabel
          text={`OTP has been  send to - `}
          type={"amount"}
          weight={500}
        />
        <Taglabel text={verifyData?.email} type={"customer"} weight={1000} />
      </Row>
      <Form.Item
        name={"otp"}
        label={<Taglabel text={"Enter Received OTP"} />}
        labelAlign="left"
        labelCol={{ span: 12 }}
        rules={[
          {
            required: true,
            message: "Please Enter OTP",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"password"}
        label={<Taglabel text={"Enter The New Password"} />}
        labelAlign="left"
        labelCol={{ span: 12 }}
        rules={[
          {
            required: true,
            message: "Please Enter New Password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name={"password2"}
        label={<Taglabel text={"Re-Enter The New Password"} />}
        dependencies={["password"]}
        labelAlign="left"
        labelCol={{ span: 12 }}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Both Password  not matching!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Row justify={"center"}>
        <Form.Item>
          <CoustomButton text={"UPDATE"} htmlType="submit" />
        </Form.Item>
      </Row>
    </Form>
  );
};

export default UpdatePasswordForm;
