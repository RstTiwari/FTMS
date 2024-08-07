import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";

const useFormActions = (entity, isUpdate,id) => {
    const { appApiCall } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleUpdate = async (values, isModal, passToModal) => {
        setIsLoading(true);
        try {
            const payLoad = { entity: entity, values: values };
            const response = await appApiCall("post", "update", payLoad);
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

    const handleCreate = async (values,isModal,passToModal) => {
        setIsLoading(true);
        try {
            const payLoad = { entity: entity, values: values };
            const response = await appApiCall("post", "create", payLoad);
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
