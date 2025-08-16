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

import PreviewModal from "./Comman/PDFPreviewModal";

const CustomForm = ({
    entityOfModal,
    height,
    isModal = false,
    modalFieldKey,
    passToModal,
    isUpdate = false,
    closeModal,
    parentForm
}) => {
    const { entity: entityOfForm, id } = useParams();
    const entity = isModal ? entityOfModal : entityOfForm;
    const { tenantId } = useParams();

    const { appApiCall, adminApiCall } = useAuth();

    const [form] = Form.useForm();
    const [unfilledField, setUnfilledField] = useState(null);
    const [isFormChanged, setIsFormChanged] = useState(false); // Track form changes
    const [open, setOpen] = useState(false);
    const [data,setData] = useState(null)
    const { pdfGenerate } = useAuth();
    const [loading, setLoading] = useState(false); // Track loading state

       const fetchPdfUrl = async (data) => {
        // let get the customer of vendor data
        let checkFilterKey = ["quotations","invoices","challans"].includes(entity) ? "customer":"vendor"
    
        let cusOrVenData = await appApiCall("get","get",{},{id:data[checkFilterKey],entity:`${checkFilterKey}s`})
        data[checkFilterKey] = cusOrVenData.result
           try {
               const url = await pdfGenerate(
                   entity,
                   id,
                   null,
                   "display",
                   tenantId,
                   true,
                   data
               );
               return window.open(url, "_blank");
           } catch (error) {
               console.error("Failed to generate PDF:", error);
               setLoading(false);
           }
       };

      

    const { isLoading, error, handleFormSubmit } = useFormActions(
        entity,
        isUpdate,
        id,
        closeModal,
        form
    );
    const fetchData = async () => {
        const payload = {};
        const params = { entity: "tenant" };
        const { success, result, message } = await adminApiCall(
            "get",
            "read",
            payload,
            { entity: "tenant", tenantId: tenantId }
        );
        
        form.setFieldsValue({
            terms: result.terms,
            specification: result.specification,
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    let isAdmin = entity === "user" ? true : false;
    const handleFormFinish = async (values) => {
        if (values.hasOwnProperty("image")) {
            let image = values?.image;
            if (typeof image === "object") {
                // Upload the file before saving it
                const formData = new FormData();
                formData.append("file", values.image);
                const response = await appApiCall(
                    "post",
                    "upload",
                    formData,
                    {}
                );
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

    const openPreviewModal = () => {
        if (!form.getFieldValue("customer") &&entity !== "workorders") {
            return NotificationHandler.error(
                "Please Select customer to see pdf"
            );
        }
        setData(form.getFieldsValue());
        fetchPdfUrl(form.getFieldsValue());
    };

    useEffect(() => {
        form.resetFields();
    }, [entity]);

    useEffect(() => {}, [form]);
    const defaultMessage = `Respected Sir/Madam,
Kindly find attached Quote for the Play Equipments/Indoor Equipments/ Soft Play Equipments / Outdoor Gym Equipments / Rubber Flooring / Benches /Dustbins. Terms & Conditions for Supply, Installation, Services and Warranty are as follows`;


  

    return (
        <Form
            name={`${entity}Form`}
            form={form}
            initialValues={{
                message:defaultMessage
            }}
            onFinish={handleFormFinish}
            onFinishFailed={validateFields}
            onValuesChange={handleValuesChange}
            validateTrigger={unfilledField}
            requiredMark={false}
            layout={"horizontal"}
        >
            <Row align={"middle"}>
                <Col span={12}>
                    <h3>{`NEW ${fetchTitleName(entity)?.toUpperCase()}`}</h3>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                    {[
                        "purchases",
                        "invoices",
                        "quotations",
                        "challans",
                        "workorders",
                    ].includes(entity) && (
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: "#22b245",
                                cursor: "pointer",
                                margin: "10px",
                            }}
                            onClick={openPreviewModal}
                        >
                            VIEW PDF
                        </Button>
                    )}

                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{
                            backgroundColor: "#22b378",
                            cursor: "pointer",
                            margin: "10px",
                        }}
                        loading={isLoading}
                    >
                        SAVE
                    </Button>
                    <Button onClick={handleCloseModal}>CLOSE</Button>
                </Col>
            </Row>

            <CustomFormItem entity={entity} form={form}  isModal={isModal}/>
        </Form>
    );
};

export default CustomForm;
