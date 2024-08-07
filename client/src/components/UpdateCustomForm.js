import React, { useState, useEffect } from "react";
import { Form, message, DatePicker } from "antd";
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
import { epochInDDMMYY, jsDateIntoDayjsDate } from "Helper/EpochConveter";

dayjs.extend(localizedFormat);
dayjs.locale("en"); // Set the locale globally

const UpdateCustomForm = ({
    entityOfModal,
    height = "100vh",
    header = true,
    isModal = false,
}) => {
    const { entity, id } = useParams();
    const [form] = Form.useForm();
    const [unfilledField, setUnfilledField] = useState(null);
    const { loading, initialValues, fetchInitialValues } = useInitialFormValues(
        entity,
        id
    );

    useEffect(() => {
        const fetchAndSetInitialValues = async () => {
            await fetchInitialValues();
            form.setFieldsValue(initialValues);
        };

        fetchAndSetInitialValues();
    }, []);

    const { isLoading, error, handleFormSubmit } = useFormActions(
        entity,
        true,
        id
    );

    const handleFormUpdate = async (values) => {
        console.log(values);
    };

    if (loading) {
        return (
            <PageLoader
                isLoading={true}
                text={"Fetching Details Please Wait"}
            />
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
            {header ? (
                <Header
                    onlyTitle={true}
                    title={`EDIT ${entity
                        .slice(0, entity.length - 1)
                        ?.toUpperCase()} DETAILS`}
                />
            ) : null}

            <Form
                name={`${entity}Form`}
                form={form}
                initialValues={initialValues}
                onFinish={handleFormUpdate}
                validateTrigger={unfilledField}
                onValuesChange={hande}
                requiredMark={false}
                layout={isModal ? "vertical" : "horizontal"}
            >
                <div>
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
                    }}
                >
                    <FormActionButtons isUpdating={true} />
                </div>
            </Form>
        </div>
    );
};

export default UpdateCustomForm;
