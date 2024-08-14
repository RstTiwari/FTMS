import React, { useEffect, useState } from "react";
import { Form, Row, Col, Input } from "antd";
import Taglabel from "components/Comman/Taglabel";
import CoustomButton from "components/Comman/CoustomButton";
import { Link } from "react-router-dom";
import PageLoader from "pages/PageLoader";
import useAuthApiCall from "Hook/useAuthApiCall";
import { useAuth } from "state/AuthProvider";
import { useParams } from "react-router-dom";


const VerifyEmail = () => {
    const [form] = Form.useForm();
    const [verifyData,setVerifyData]= useState(null)
    const {userId,tenantId} = useParams()
    const {fetchLocalData} = useAuth()
    const { isLoading, handleAuthApi } = useAuthApiCall(
    "verify"
  );

  const handleVerifyOtp = async () => {
    await handleAuthApi(verifyData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const localData = await fetchLocalData(userId);
      setVerifyData({
        email: localData?.user?.email,
        userId: userId,
        tenantId: tenantId,
      });
    };

    fetchData();
  }, [fetchLocalData, userId, tenantId]);

  if (isLoading) {
    return (
      <PageLoader
        isLoading={true}
        text={"...Hold On Making things Perfect for You"}
      />
    );
  }

  if(!verifyData){
    return <PageLoader  isLoading={true}  text={"HOld On.."} />
  }
  return (
    <Form form={form} onFinish={handleVerifyOtp}>
      <Row justify={"center"}>
        <Taglabel
          text={`OTP sent to email please verify it`}
          type={"amount"}
          weight={500}
        />
      </Row>
      <Row justify={"center"}>
        <Taglabel text={"Enter OTP to verify"} type="counter" />
      </Row>

      <Row justify={"center"}>
        <Col>
          <Form.Item
            name={"emailOtp"}
            labelAlign="left"
            labelCol={{ span: 10 }}
          >
            <Input
              onChange={(e) =>
                setVerifyData({ ...verifyData, emailOtp: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"} style={{ margin: "1rem" }}>
        <CoustomButton htmlType="submit" text={"VERIFY"} />
      </Row>
      <Row justify={"center"} style={{ margin: "1rem" }}>
        <Link to="/">BACK TO LOGIN</Link>
      </Row>
    </Form>
  );
};

export default VerifyEmail;
