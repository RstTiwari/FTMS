import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";

import "../App.css";
import Header from "./Header";
import FormActionButtons from "./Comman/FormActionButton";
import CustomFormItem from "../module/Create/CreateModule";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import useFormActions from "Hook/useFormAction";

const CustomForm = ({
    entityOfModal,
    height = "100vh",
    header = true,
    isModal = false,
    modalFieldKey,
    passToModal,
}) => {
    //Checking the Enttiy of the Form if or fetch fromt the Router

    const { entity: entityOfForm, action } = useParams();
    const entity = isModal ? entityOfModal : entityOfForm;
    const isUpdate = action ? true : false;
    const { appApiCall } = useAuth();

    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState({});
    const [unfilledField, setUnfilledField] = useState(null);

    useEffect(() => {
        // Fetch initial values based on the entity
        setInitialValues({});
    }, [entity]);

    const { isLoading, error, handleFormSubmit } = useFormActions(
        entity,
        isUpdate
    );

    const handleFormFinish = async (values) => {
        console.log(values);
        //Checking if form contains any image file then uploading that
        if (values.hasOwnProperty("image")) {
            //then now upload the file before saving it
            const formData = new FormData();
            formData.append("file", values.image);
            const response = await appApiCall("post", "upload", formData, {});
            if (!response.success) {
                return NotificationHandler.error("failed to Upload Image");
            }
            values.image = response.result;
        }

        // Formatting the Dates Dynamically
        const formattedValues = Object.keys(values).reduce((acc, key) => {
            if (key.includes("Date")) {
                acc[key] = values[key].toDate(); // Convert dayjs to Date oject in js
            } else {
                acc[key] = values[key];
            }
            return acc;
        }, {});

        //Handle Form Finish Logic and Loading after that if modal pass value
        handleFormSubmit(values, isModal, passToModal);
    };

    // Validating Filed and setting the Values at that moment only
    const validateFields = async () => {
        try {
            const values = await form.validateFields();
            setUnfilledField(null); // Clear unfilledField state if validation succeeds
            handleFormFinish(values); // Proceed with form submission logic
        } catch (error) {
            const firstField = error.errorFields[0].errors[0];
            setUnfilledField(firstField); // Set the first unfilled field
            return NotificationHandler.error(`${firstField}`);
        }
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: height,
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            {/**Only show in page now on the Mode */}
            {header ? <Header onlyTitle={true} /> : null}

            <Form
                name={`${entity}Form`}
                form={form}
                initialValues={initialValues}
                onFinish={handleFormFinish}
                onFinishFailed={validateFields}
                validateTrigger={unfilledField}
                requiredMark={false}
                layout={isModal ? "vertical" : "horizontal"}
            >
                <div>
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
                    }}
                >
                    <FormActionButtons isUpdating={false} />
                </div>
            </Form>
        </div>
    );
};

export default CustomForm;
