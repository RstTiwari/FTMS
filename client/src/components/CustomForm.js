import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import { useParams } from "react-router-dom";

import Header from "./Header";
import FormActionButtons from "../components/SmallComponent/FormActionButton";
import CustomFormItem from "../module/Create/CreateModule";
import "../App.css";
import moment from "moment";
import { useAuth } from "state/AuthProvider";

const CustomForm = ({
    entityOfModal,
    height = "100vh",
    header = true,
    isModal = false,
    modalFieldKey,
    passToModal,
}) => {
    //Checking the Enttiy of the Form if or fetch fromt the Router
    const { entity: entityOfForm } = useParams();
    const entity = isModal ? entityOfModal : entityOfForm;

    const [form] = Form.useForm();
    const { appApiCall } = useAuth();
    const [initialValues, setInitialValues] = useState({
        quoteDate: moment("2023-07-05T12:00:00Z"),
    });
    const [unfilledField, setUnfilledField] = useState(null);

    useEffect(() => {
        // Fetch initial values based on the entity
        setInitialValues({});
    }, [entity]);

    const handleFormFinish = async (values) => {
        // Handle Form Finish Logic and Loading after that if modal pass value
        if (initialValues) {
        } else {
            let response = await appApiCall();
            console.log("Form submitted:");
            // Handle form submission logic here
            if (isModal) {
                modalFieldKey.name = form.getFieldsValue([modalFieldKey.name]);
                modalFieldKey.id = response?._id;
                return passToModal(modalFieldKey);
            }
        }
    };

    // Validating Filed and setting the Values at that moment only
    const validateFields = async () => {
        try {
            const values = await form.validateFields();
            console.log(values, "--");
            setUnfilledField(null); // Clear unfilledField state if validation succeeds
            handleFormFinish(values); // Proceed with form submission logic
        } catch (error) {
            console.log("Validation error:", error);
            const firstField = error.errorFields[0].name[0];
            setUnfilledField(firstField); // Set the first unfilled field
            message.error(`Please fill in '${firstField}'`); // Display error message using Ant Design message component
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
