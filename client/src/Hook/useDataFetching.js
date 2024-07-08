import { useState, useCallback,useEffect } from "react";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useAuth } from "state/AuthProvider";
import { setLocalData, getLocalData } from "Helper/FetchingLocalData";
const useDataFetching = (entity, select, pageNo, pageSize) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { appApiCall } = useAuth();
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await appApiCall("post", "read", {
                entity,
                pageNo,
                pageSize,
                select,
            });

            if (response.success) {
                setData(response.result);
                NotificationHandler.success(response.message);
            } else {
                NotificationHandler.error(response.message);
            }
            // const localData = getLocalData(entity);
            // if (localData) {
            //     setData(localData);
            //     setIsLoading(false);
            // } else {
            //     const { success, result, message } = await getTableData(entity);
            //     if (!success) {
            //         setIsLoading(false);
            //         return NotificationHandler.error(message);
            //     } else {
            //         setIsLoading(false);
            //         setData(result);
            //         setLocalData(entity, result);
            //     }
            // }
        } catch (error) {
            NotificationHandler.error(error.message);
        }
        setIsLoading(false);
    }, [appApiCall, entity, pageNo, pageSize]);
    // Use useEffect to fetch data initially and whenever dependencies change
    useEffect(() => {
        fetchData();
    }, [fetchData]); // Ensure useEffect runs whenever fetchData changes
    return { data, isLoading, fetchData };
};

export default useDataFetching;
