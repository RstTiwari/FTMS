import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, message, Spin, Divider } from "antd";
import PaymentForm from "../../Forms/App/PaymentForm";
import useInitialFormValues from "Hook/useIntialFormValues";
import useFormActions from "Hook/useFormAction";
import PageLoader from "pages/PageLoader";
import Header from "components/Header";
import FormActionButtons from "components/Comman/FormActionButton";

const RecordPayment = () => {
    const [form] = Form.useForm();
    const { tenantId, entity, id } = useParams();

    const { initialValues, isFetching, fetchInitialValues } =
        useInitialFormValues("customers", "get", id);
    const { isLoading, error, handleFormSubmit } = useFormActions(
        entity,
        false,
        id
    );

    useEffect(() => {
        fetchInitialValues();
    }, []);

    useEffect(() => {
        if (initialValues) {
            const { name, _id } = initialValues;
            form.setFieldsValue({ customer: { _id, name } });
        }
    }, [form, initialValues]);

    if (isFetching) {
        return (
            <PageLoader isLoading={true} text={"Fetching payment Records"} />
        );
    }

    if (isLoading) {
        return <PageLoader isLoading={true} text="Updating Payment Hold on" />;
    }

    const handleFormFinish = async (values) => {
        handleFormSubmit(values);
    };

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
                <Header onlyTitle={true} title={"RECORD NEW PAYMENT"} />
            </Divider>
            <Form
                name={`${entity}Form`}
                form={form}
                initialValues={initialValues}
                onFinish={handleFormFinish}
                requiredMark={false}
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
                    <PaymentForm form={form} isUpdate={false} />
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
                    <FormActionButtons isUpdating={false} />
                </div>
            </Form>
        </div>
    );
};

export default RecordPayment;
