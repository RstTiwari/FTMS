import { useState } from "react";
import { message } from "antd";
import { navigate } from "react-router-dom";

const useFormActions = (onSubmit) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSave = async (values) => {
        setIsLoading(true);
        try {
            const success = await onSubmit(values);
            setIsLoading(false);
            return success;
        } catch (error) {
            setIsLoading(false);
            setError(error.message || "An error occurred");
            return false;
        }
    };

    const clearError = () => {
        setError(null);
    };

    const handleFormSubmit = async (values) => {
        const success = await handleSave(values);
        if (success) {
            message.success("Saved successfully");
            navigate(-1); // Navigate back to previous page on success
        } else {
            message.error(error || "Failed to save");
            clearError(); // Clear error state
        }
    };

    return {
        isLoading,
        error,
        handleFormSubmit,
    };
};

export default useFormActions;
