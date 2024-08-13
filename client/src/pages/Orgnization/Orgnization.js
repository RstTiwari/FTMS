import React, { useEffect, useState } from "react";
import { Form, Divider } from "antd";
import OrganizationForm from "Forms/App/OrgnizationForm";
import { useAuth } from "state/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import Header from "components/Header";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";
import FormActionButtons from "components/Comman/FormActionButton";

const Organization = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [unfilledField, setUnfilledField] = useState(null);

    const { adminApiCall, appApiCall } = useAuth();
    const { tenantId } = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        setIsLoading(true);
        const payload = {};
        const params = { entity: "tenant" };
        const { success, result, message } = await adminApiCall(
            "get",
            "read",
            payload,
            { entity: "tenant", tenantId: tenantId }
        );
        if (!success) {
            NotificationHandler.error(message);
        } else {
            form.setFieldsValue(result);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFormUpdate = async (values) => {
        setIsLoading(true);
        if (values.hasOwnProperty("logo")) {
            let logo = values?.logo;
            if (typeof logo === "object") {
                const formData = new FormData();
                formData.append("file", values.logo);
                const response = await appApiCall(
                    "post",
                    "upload",
                    formData,
                    {}
                );

                if (!response.success) {
                    NotificationHandler.error("Failed to Upload Image");
                    setIsLoading(false);
                    return;
                }
                values.logo = response.result;
            }
        }
        const payload = { values };
        const { success, result, message } = await adminApiCall(
            "post",
            "update",
            payload,
            { entity: "tenant", tenantId: tenantId }
        );
        if (!success) {
            NotificationHandler.error(message);
        } else {
            navigate(-1);
            NotificationHandler.success(message);
        }
        setIsLoading(false);
    };

    const validateFields = async () => {
        try {
            const values = await form.validateFields();
            setUnfilledField(null); // Clear unfilledField state if validation succeeds
            handleFormUpdate(values); // Proceed with form submission logic
        } catch (error) {
            const firstField = error.errorFields[0].errors[0];
            setUnfilledField(firstField); // Set the first unfilled field
            NotificationHandler.error(`${firstField}`);
        }
    };

    if (isLoading) {
        return <PageLoader isLoading={true} text={"Hold on Fetching Organization Details"} />;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Form
                form={form}
                name="organizationForm"
                requiredMark={false}
                style={{
                    flex: 1, // Makes the form container grow to fill available space
                    display: 'flex',
                    flexDirection: 'column',
                }}
                onFinish={handleFormUpdate}
                onFinishFailed={validateFields}
            >
                <Divider>
                    <Header
                        title={"SETUP ORGANIZATION DETAILS"}
                        onlyTitle={true}
                    />
                </Divider>
                <div style={{ flex: 1, marginLeft: "10px" }}>
                    <OrganizationForm form={form} />
                </div>
                <div
                    style={{
                        position: "sticky",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "#ffffff",
                        padding: "10px",
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

export default Organization;
