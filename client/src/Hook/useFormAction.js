import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";

const useFormActions = (entity, isUpdate, id,closeModal,form) => {
    const { appApiCall, adminApiCall } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    /**
     * Handles updating an existing entity.
     * @param {Object} values - The form values to update.
     * @param {boolean} isModal - Whether the action is triggered from a modal.
     * @param {Function} passToModal - Callback to pass the response to the modal.
     * @param {boolean} isAdmin - Determines which API call to use.
     */
    const handleUpdate = async (values, isModal, passToModal, isAdmin) => {
        // Determine the appropriate route based on the entity type
        const route = (entity === "paymentsreceived" || entity === "paymentsmade") 
            ? "updatePayment" 
            : "update";

        setIsLoading(true);
        try {
            const payLoad = { values };
            // Select the correct API call based on isAdmin
            const apiCall = isAdmin ? adminApiCall : appApiCall;
            
            const response = await apiCall("post", route, payLoad, {
                entity,
                id,
            });

            if (response.success) {
                NotificationHandler.success(response.message);
                if (isModal) {
                    return passToModal(response.result);
                }
                closeModal(true);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            NotificationHandler.error(error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles creating a new entity.
     * @param {Object} values - The form values to create.
     * @param {boolean} isModal - Whether the action is triggered from a modal.
     * @param {Function} passToModal - Callback to pass the response to the modal.
     * @param {boolean} isAdmin - Determines which API call to use.
     */
    const handleCreate = async (values, isModal, passToModal, isAdmin) => {
        setIsLoading(true);

        // Determine the appropriate route based on the entity type
        const route = (entity === "paymentsreceived" || entity === "paymentsmade") 
            ? "recordPayment" 
            : "create";

        // Determine the ID based on the entity type
        const relatedId = (entity === 'paymentsreceived') 
            ? values?.customer?._id 
            : values?.vendor?._id;

        try {
            const payLoad = { values };
            // Select the correct API call based on isAdmin
            const apiCall = isAdmin ? adminApiCall : appApiCall;

            const response = await apiCall("post", route, payLoad, { 
                entity, 
                id: relatedId 
            });

            if (response.success) {
                if (isModal) {
                    return passToModal(response.result);
                }
                closeModal(true);
            } else {
                NotificationHandler.error(response.message);
            }
        } catch (error) {
            NotificationHandler.error(error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles form submission by delegating to either handleUpdate or handleCreate.
     * @param {Object} values - The form values.
     * @param {boolean} isModal - Whether the action is triggered from a modal.
     * @param {Function} passToModal - Callback to pass the response to the modal.
     * @param {boolean} isAdmin - Determines which API call to use.
     */
    const handleFormSubmit = async (values, isModal, passToModal, isAdmin = false) => {
        clearError();
        if (isUpdate) {
            await handleUpdate(values, isModal, passToModal, isAdmin);
        } else {
            await handleCreate(values, isModal, passToModal, isAdmin);
        }
    };

    /**
     * Clears any existing errors.
     */
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
