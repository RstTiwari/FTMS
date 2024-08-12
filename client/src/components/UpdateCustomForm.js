import React, { useState, useEffect } from "react";
import { Form, message, DatePicker, Divider } from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "../App.css";
import Header from "./Header";
import FormActionButtons from "./Comman/FormActionButton";
import CustomFormItem from "../module/Create/CreateModule";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import useFormActions from "Hook/useFormAction";
import useInitialFormValues from "Hook/useIntialFormValues";
import UpdateModule from "module/UpdateModule/UpdateModule";
import PageLoader from "pages/PageLoader";

const UpdateCustomForm = ({
    entityOfModal,
    height = "100vh",
    header = true,
    isModal = false,
}) => {
    const { entity, id } = useParams();
    const { appApiCall } = useAuth();
    const [form] = Form.useForm();
    const [unfilledField, setUnfilledField] = useState(null);
    const [changedField, setChangedField] = useState({});
    const { isFetching, initialValues, fetchInitialValues } =
        useInitialFormValues(entity, id);
    const { isLoading, error, handleFormSubmit } = useFormActions(
        entity,
        true,
        id
    );

    useEffect(() => {
        const fetchAndSetInitialValues = async () => {
            await fetchInitialValues();
            form.setFieldsValue(initialValues);
        };

        fetchAndSetInitialValues();
    }, []);

    const validateFields = async () => {
        try {
            const values = await form.validateFields();
            setUnfilledField(null); // Clear unfilledField state if validation succeeds
            handleFormUpdate(values); // Proceed with form submission logic
        } catch (error) {
            const firstField = error.errorFields[0].errors[0];
            setUnfilledField(firstField); // Set the first unfilled field
            return NotificationHandler.error(`${firstField}`);
        }
    };

    const handleFormUpdate = async (values) => {
        // Checking if image contains image object and is updated
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
        await handleFormSubmit(values);
    };

    const handleValueChange = (changeValues, allValues) => {
        setChangedField({ ...changedField, ...changeValues });
    };

    if (isFetching) {
        return (
            <PageLoader
                isLoading={true}
                text={"Fetching Details Please Wait"}
            />
        );
    }
    if (isLoading) {
        return (
            <PageLoader isLoading={true} text={"...Hold on Updating Data"} />
        );
    }

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
            <Divider orientation="center">
                {header ? (
                    <Header
                        onlyTitle={true}
                        title={`EDIT ${entity
                            .slice(0, entity.length - 1)
                            ?.toUpperCase()} DETAILS`}
                    />
                ) : null}
            </Divider>

            <Form
                name={`${entity}Form`}
                form={form}
                initialValues={initialValues}
                onFinish={handleFormUpdate}
                onFinishFailed={validateFields}
                onValuesChange={handleValueChange}
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
                        marginLeft: "10px",
                        marginTop: "10px",
                        flexGrow: 1,
                    }}
                >
                    <UpdateModule entity={entity} form={form} />
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
                        zIndex: 10000,
                    }}
                >
                    <FormActionButtons isUpdating={true} />
                </div>
            </Form>
        </div>
    );
};

export default UpdateCustomForm;
