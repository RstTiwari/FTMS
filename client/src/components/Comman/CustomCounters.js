import React, { useState, useEffect } from "react";
import { Input, Button, Modal, Form ,Row,Col, Skeleton} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Counters from "Forms/App/Counters";
import FormActionButtons from "./FormActionButton";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";

const CustomInputWithModal = ({ preFillValue,updateInForm,width }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [prefix, setPrefix] = useState("");
    const [nextNumber, setNextNumber] = useState("");
    const { tenantId, entity } = useParams();
    const { appApiCall } = useAuth();
    const [form] = Form.useForm();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        updateInForm(e.target.value);
    };

    const openModal = async () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleModalOk = () => {
        setModalVisible(false);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const handleFormFinish = async (values) => {
        const response = await appApiCall("post", "updateCountersNumber", {
            entity: "counters",
            values,
        });
        if (!response.success) {
            NotificationHandler.error(response.message);
        } else {
            handleModalCancel();
            fetchCountersNumber();
            updateInForm(values?.nextNumber);
            NotificationHandler.success("Counters updated successfully");
        }
    };

    const fetchCountersNumber = async () => {
        const response = await appApiCall(
            "get",
            "fetchCountersNumber",
            {},
            { entity: "counters", entityName: entity } // entityName is name of entity like invoice ,quoations, paymentsreceived
        );
        if (response.success) {
            const { prefix, nextNumber } = response.result;
            setPrefix(prefix);
            setNextNumber(nextNumber);
            form.setFieldsValue({ prefix, nextNumber });
            setInputValue(nextNumber);
            updateInForm(nextNumber);
        } else {
            return NotificationHandler.error(response.message);
        }
    };

    useEffect(() => {
        if(preFillValue){
            setInputValue(preFillValue)
        }else{
            fetchCountersNumber()
        }
    }, [preFillValue]);


    useEffect(()=>{

    },[preFillValue])

    return (
      <div>
        <Row style={{ position: "relative", width: width }}>
          {inputValue ? (
            <Input
              value={inputValue}
              onChange={handleInputChange}
              style={{ paddingRight: "30px", width: "100%" }} // Adjust padding-right to accommodate button width
            />
          ) : (
            <Skeleton.Input />
          )}

          <Button
            icon={<SettingOutlined />}
            onClick={openModal}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "10px", // Adjust this value based on your preference
              zIndex: 1,
              border: "none",
              background: "transparent",
              padding: 0,
              height: "100%", // Ensure the button height matches the input height
            }}
          />
        </Row>

        <Modal
          title={`CONFIGURE YOUR ${entity.toLocaleUpperCase()} NUMBER PREFERENCES`}
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={null}
          width={"40vw"}
          style={{ padding: 20 }}
          bodyStyle={{
            overflow: "auto",
          }}
        >
          <Form form={form} onFinish={handleFormFinish} initialValues={{}}>
            <Counters form={form} />
            <FormActionButtons />
          </Form>
        </Modal>
      </div>
    );
};

export default CustomInputWithModal;
