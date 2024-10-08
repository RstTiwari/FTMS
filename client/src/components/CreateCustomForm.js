import React, { useState, useEffect } from "react";
import { Divider, Form, message } from "antd";
import { useParams } from "react-router-dom";
import useFormActions from "Hook/useFormAction";

import "../App.css";
import Header from "./Header";
import FormActionButtons from "./Comman/FormActionButton";
import CustomFormItem from "../module/Create/CreateModule";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";
import { fetchTitleName } from "Helper/PageTitle";

const CustomForm = ({
    entityOfModal,
    header = true,
    height,
    isModal = false,
    modalFieldKey,
    passToModal,
    isUpdate = false,
}) => {
    const { entity: entityOfForm, id } = useParams();
    const entity = isModal ? entityOfModal : entityOfForm;
    const { appApiCall } = useAuth();

    const [form] = Form.useForm();
    const [unfilledField, setUnfilledField] = useState(null);

    const { isLoading, error, handleFormSubmit } = useFormActions(
        entity,
        isUpdate,
        id
    );
    /**
     * isAdmin to cehck weather the api that i m going to call will is Admin api
     *  */
    let isAdmin = entity =="user" ? true:false
    const handleFormFinish = async (values) => {
        if (values.hasOwnProperty("image")) {
            let image = values?.image;
            if (typeof image === "object") {
                //then now upload the file before saving it
                const formData = new FormData();
                formData.append("file", values.image);
                const response = await appApiCall(
                    "post",
                    "upload",
                    formData,
                    {}
                );
                if (!response.success) {
                    return NotificationHandler.error("failed to Upload Image");
                }
                values.image = response.result;
            }
        }

        handleFormSubmit(values, isModal, passToModal,isAdmin);
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
    if (isLoading) {
        return <PageLoader isLoading={true} text={"wait Creating the Data"} />;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <Divider orientation="center">
                {header && (
                    <Header
                        onlyTitle={true}
                        title={`New ${fetchTitleName(entity)}`}
                    />
                )}
            </Divider>
            <Form
                name={`${entity}Form`}
                form={form}
                initialValues={{}}
                onFinish={handleFormFinish}
                onFinishFailed={validateFields}
                validateTrigger={unfilledField}
                requiredMark={false}
                layout={isModal ? "vertical" : "horizontal"}
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        flexGrow: 1,
                        overflowY: "auto",
                        padding: "10px ",
                    }}
                >
                    <CustomFormItem
                        entity={entity}
                        form={form}
                        isModal={isModal}
                    />
                </div>
                <div
                    style={{
                        position: "sticky",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "#ffffff",
                        padding: "5px",
                        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
                        width: "100%",
                        zIndex: 1000000,
                    }}
                >
                    <FormActionButtons isUpdating={isUpdate} />
                </div>
            </Form>
        </div>
    );
};

export default CustomForm;
