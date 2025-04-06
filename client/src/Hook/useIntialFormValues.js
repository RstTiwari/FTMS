import { useState, useEffect, useCallback } from "react";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useAuth } from "state/AuthProvider";

const useInitialFormValues = (entity, route, id) => {
  const [initialValues, setInitialValues] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { appApiCall } = useAuth();

  const fetchInitialValues = useCallback(
    async (period = null) => {
      // Default to null if period is not provided
      setIsFetching(true);
      try {
        const response = await appApiCall(
          "get",
          route,
          {},
          { entity, id, period } // Include period in the API call
        );
        if (!response.success) {
          NotificationHandler.error(response.message);
          setIsFetching(false);
          return;
        }
        setInitialValues(response.result); // Assuming response.result contains the initial values
      } catch (error) {
        setInitialValues(null);
        NotificationHandler.error(error.message);
      } finally {
        setIsFetching(false);
      }
    },
    [appApiCall, entity, id, route]
  );

  useEffect(() => {
    fetchInitialValues(); // Call with no period initially
  }, [fetchInitialValues]);

  return { initialValues, isFetching, fetchInitialValues };
};

export default useInitialFormValues;
