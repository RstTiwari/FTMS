import { useState, useEffect, useCallback } from "react";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useAuth } from "state/AuthProvider";

const useSearch = (entity ,searchText,select={}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { appApiCall } = useAuth();

    const searchData = useCallback(async () => {
        if (!searchText?.trim()) return;

        setIsLoading(true);
        try {
            const response = await appApiCall("get", "search",{}, {
                entity,
                search: searchText,
                select,
            });
            console.log(response,"response")

            if (response.success) {
                setData(response.data || []);
            } else {
                NotificationHandler.error(response.message);
            }
        } catch (error) {
            NotificationHandler.error(error.message || "Search failed");
        } finally {
            setIsLoading(false);
        }
    }, [appApiCall, entity, searchText]);

    useEffect(() => {
        if (searchText?.trim()) {
            searchData();
        }
    }, [searchText, searchData]);

    return {
        data,
        isLoading,
    };
};

export default useSearch;
