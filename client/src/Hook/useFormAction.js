import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";

const useFormActions = (entity, isUpdate, id) => {
    const { appApiCall } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleUpdate = async (values, isModal, passToModal) => {
        let route =
            entity === "paymentsrecived"
                ? "updatePayment"
                : entity === "paymentsmade"
                ? "updatePayment"
                : "update"; // Changin for Only record and Updating the paymentsrecived
        setIsLoading(true);
        try {
            const payLoad = { values: values };
            const response = await appApiCall("post", route, payLoad, {
                entity,
                id,
            });
            if (response.success) {
                NotificationHandler.success(response?.message);
                if (isModal) {
                    return passToModal(response.result);
                }
                navigate(-1);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            NotificationHandler.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (values, isModal, passToModal) => {
        setIsLoading(true);
        let route =
            entity === "paymentsrecived"
                ? "recordPayment"
                : entity === "paymentsmade"
                ? "recordPayment"
                : "create";
        // Changin for Only record and Updating the paymentsrecived

        try {
            const payLoad = { values: values };
            const response = await appApiCall("post", route, payLoad,{entity:entity,id:id});
            if (response.success) {
                NotificationHandler.success(response?.message);
                if (isModal) {
                    return passToModal(response.result);
                }
                navigate(-1);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            NotificationHandler.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (values, isModal, passToModal) => {
        clearError();
        if (isUpdate) {
            await handleUpdate(values, isModal, passToModal);
        } else {
            await handleCreate(values, isModal, passToModal);
        }
    };

    const clearError = () => {
        setError(null);
    };

    return {
        isLoading,
        error,
        handleFormSubmit,
    };
};

export default useFormActions;
