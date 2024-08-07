import { useState, useEffect, useCallback } from "react";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useAuth } from "state/AuthProvider";

const useInitialFormValues = (entity, id) => {
    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const { appApiCall } = useAuth();

    const fetchInitialValues = useCallback(async () => {
        setLoading(true);
        try {
            const response = await appApiCall("get", "get", {}, { entity, id });
            if (!response.success) {
                NotificationHandler.error(response.message);
                setLoading(false);
                return;
            }
            setInitialValues(response.result); //Assuming response.data contains the initial values
            setLoading(false);
        } catch (error) {
            setInitialValues(null);
            setLoading(false);
            NotificationHandler.error(error.message);
        }
    }, [appApiCall, entity, id]);

    useEffect(() => {
        fetchInitialValues();
    }, [fetchInitialValues]);

    return { initialValues, loading, fetchInitialValues };
};

export default useInitialFormValues;
