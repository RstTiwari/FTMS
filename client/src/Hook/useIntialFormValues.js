import { useState, useEffect, useCallback } from "react";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useAuth } from "state/AuthProvider";

const useInitialFormValues = (entity, id) => {
    const [initialValues, setInitialValues] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const { appApiCall } = useAuth();

    const fetchInitialValues = useCallback(async () => {
        setIsFetching(true);
        try {
            const response = await appApiCall("get", "get", {}, { entity, id });
            if (!response.success) {
                NotificationHandler.error(response.message);
                setIsFetching(false);
                return;
            }
            setInitialValues(response.result); //Assuming response.data contains the initial values
            setIsFetching(false);
        } catch (error) {
            setInitialValues(null);
            setIsFetching(false);
            NotificationHandler.error(error.message);
        }
    }, [appApiCall, entity, id]);

    useEffect(() => {
        fetchInitialValues();
    }, [fetchInitialValues]);

    return { initialValues, isFetching, fetchInitialValues };
};

export default useInitialFormValues;
