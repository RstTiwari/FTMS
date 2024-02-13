import { useState, useCallback } from "react";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useAuth } from "state/AuthProvider";
import { setLocalData, getLocalData } from "Helper/FetchingLocalData";
const useDataFetching = (entity) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getTableData } = useAuth();
    const fetchData = useCallback(async () => {
        try {
            const localData = getLocalData(entity);
            if (localData) {
                setData(localData);
                setIsLoading(false);
            } else {
                const { success, result, message } = await getTableData(entity);
                if (!success) {
                    setIsLoading(false);
                    return NotificationHandler.error(message);
                } else {
                    setIsLoading(false);
                    setData(result);
                    setLocalData(entity, result);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
            NotificationHandler.error("Failed to fetch data");
        }
    }, [getTableData, entity]);
    return { data, isLoading, fetchData };
};

export default useDataFetching;
