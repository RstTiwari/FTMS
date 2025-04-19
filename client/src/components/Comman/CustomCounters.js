import React, { useState, useEffect } from "react";
import { Input, Button, Modal, Form ,Row,Col, Skeleton} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Counters from "Forms/App/Counters";
import FormActionButtons from "./FormActionButton";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";
import { fetchTitleName } from "Helper/PageTitle";

const CustomInputWithModal = ({ parentForm,preFillValue,updateInForm,width ,entity}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [loading,setLoading] = useState(false)
    const [prefix, setPrefix] = useState("");
    const [nextNumber, setNextNumber] = useState("");
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
        let {prefix,nextNumber ,suffix} = values
        parentForm.setFieldsValue({prefix:prefix,no:nextNumber,suffix:suffix||"" })
        setInputValue(formateInputValue(prefix, nextNumber, suffix));
        handleModalCancel()
    };

    const fetchCountersNumber = async (type) => {
        if (type === "update") {
            let prefix = parentForm?.getFieldValue("prefix");
            let no = parentForm.getFieldValue("no");
            let suffix = parentForm.getFieldValue("suffix");
            setInputValue(formateInputValue(prefix, no, suffix));
            form.setFieldsValue({
                prefix: prefix?.toUpperCase(),
                nextNumber: no,
                suffix: suffix ? suffix?.toUpperCase() : "",
            });
        } else if (type === "create") {
            const response = await appApiCall(
                "get",
                "fetchCountersNumber",
                {},
                { entityName: entity } // entityName is name of entity like invoice ,quoations, paymentsreceived
            );
            if (response.success) {
                const { prefix, nextNumber } = response.result;
                parentForm.setFieldsValue({ prefix: prefix, no: nextNumber });
                setInputValue(formateInputValue());
                parentForm.setFieldsValue({ prefix: prefix, no: nextNumber });
                form.setFieldsValue({
                    prefix: prefix?.toUpperCase(),
                    nextNumber: nextNumber,
                });
            } else {
                return NotificationHandler.error(response.message);
            }
        } else {
            return;
        }
    };

    function formateInputValue() {
        return `${
            parentForm.getFieldValue("prefix")
                ? parentForm.getFieldValue("prefix")?.toUpperCase()+"-"
                : ""
        }${parentForm.getFieldValue("no")}${
            parentForm.getFieldValue("suffix")
                ? parentForm.getFieldValue("suffix").toUpperCase()
                : ""
        }`;
    }

    useEffect(() => {
        if (preFillValue) {
            fetchCountersNumber("update")
        } else {
            fetchCountersNumber("create");
        }
    }, [preFillValue]);

   console.log(inputValue,'===')

    useEffect(()=>{
    },[parentForm])

    return (
        <div>
            <Row style={{ position: "relative", width: width }}>
                {inputValue ? (
                    <Input
                        value={inputValue}
                        disabled
                        onChange={handleInputChange}
                        style={{ paddingRight: "30px", width: "100%" }}
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
                open={modalVisible}
                onOk={handleModalOk}
                footer={null}
                closeIcon={false}
                width={"30vw"}
                style={{ overflow:"auto" }}
                bodyStyle={{
                    overflow: "auto",
                }}
            >
                <Form
                    form={form}
                    onFinish={handleFormFinish}
                    initialValues={{}}
                >
                    <Row align={"middle"}>
                        <Col span={12}>
                            <h3>{`CONFIGURE ${fetchTitleName(
                                entity
                            )?.toUpperCase()} NO`}</h3>
                        </Col>
                        <Col span={12} style={{ textAlign: "right" }}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{
                                    backgroundColor: "#22b378",
                                    cursor: "pointer",
                                }}
                            >
                                SAVE
                            </Button>
                            <Button onClick={handleModalCancel}>CLOSE</Button>
                        </Col>
                    </Row>
                    {loading ? (
                        <PageLoader
                            text={"Updating Counter pls wait"}
                            isLoading={loading}
                            height="20px"
                        />
                    ) : (
                        <Counters form={form} />
                    )}
                </Form>
            </Modal>
        </div>
    );
};

export default CustomInputWithModal;
