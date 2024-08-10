import React from "react";
import { Form, Input, Row} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CoustomButton from "components/Comman/CoustomButton";
import useAuthApiCall from "Hook/useAuthApiCall";
import PageLoader from "pages/PageLoader";


 const RegisterForm = () => {
    const [form] = Form.useForm();
    const { isLoading, handleAuthApi } = useAuthApiCall("register");

   const handleRegisterFormFinish = async (values) => {
     await handleAuthApi(values);
   };

   if (isLoading) {
     return (
       <PageLoader
         isLoading={true}
         text={"...Hold Just Creating Your Organization"}
       />
     );
   }

   return (
     <Form  form ={form} name="registerFrom" onFinish={handleRegisterFormFinish}>
       <Form.Item
         label={"Company Name"}
         name={"companyName"}
         labelAlign="left"
         labelCol={{ span: 6 }}
         rules={[
           {
             required: true,
           },
         ]}
       >
         <Input placeholder="Company Name" size={"large"} />
       </Form.Item>
       <Form.Item
         label={"Your Name"}
         name={"name"}
         labelAlign="left"
         labelCol={{ span: 6 }}
         rules={[
           {
             required: true,
           },
         ]}
       >
         <Input placeholder="Your Name" size={"large"} />
       </Form.Item>
       <Form.Item
         label={"Email"}
         name={"email"}
         labelAlign="left"
         labelCol={{ span: 6 }}
         rules={[
           {
             required: true,
           },
           {
             type: "email",
           },
         ]}
       >
         <Input
           prefix={<UserOutlined />}
           placeholder={"Email"}
           type={"email"}
           size={"large"}
         />
       </Form.Item>
       <Form.Item
         label={"password"}
         name={"password"}
         rules={[
           {
             required: true,
           },
         ]}
         labelAlign="left"
         labelCol={{ span: 6 }}
       >
         <Input.Password
           prefix={<LockOutlined />}
           placeHolder="password"
           size="large"
         />
       </Form.Item>
       <Form.Item>
         <Row align={"middle"}></Row>
       </Form.Item>
       <Form.Item>
         <Row justify={"center"}>
           ExistingUser - <Link to={"/login"}> LOGIN</Link>
         </Row>
       </Form.Item>

       <Form.Item>
         <Row justify={"center"}>
           <CoustomButton htmlType="submit" text={"REGISTER"} />
         </Row>
       </Form.Item>
     </Form>
   );
 };


export default RegisterForm