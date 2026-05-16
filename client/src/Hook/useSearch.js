import { useState, useEffect } from "react";
import NotificationHandler from "EventHandler/NotificationHandler";
import useDebounce from "./useDebounce";
import { useAuth } from "state/AuthProvider";

const useSearch = (entity, searchText, date, status,bank, select = {}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedSearch = useDebounce(searchText, 300);
    const debouncedDate = useDebounce(date, 300);
    const debouncedStatus = useDebounce(status, 300);
    const debounceBank  = useDebounce(bank,300)

    const { appApiCall } = useAuth();

    const fetchSearch = async () => {
        const hasFilter =
            debouncedSearch?.trim() || debouncedDate || debouncedStatus || debounceBank;

        if (!hasFilter) {
            setData([]);
            return;
        }

        setIsLoading(true);

        try {
            console.log("🔥 API CALL:", {
                search: debouncedSearch,
                date: debouncedDate,
                status: debouncedStatus,
            });

            const response = await appApiCall(
                "get",
                "search",
                {},
                {
                    entity,
                    search: debouncedSearch || "",
                    date: debouncedDate || "",
                    status: debouncedStatus || "",
                    bank:debounceBank,
                    select,
                }
            );

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
    };

    useEffect(() => {
        fetchSearch();
    }, [entity, debouncedSearch, debouncedDate, debouncedStatus,debounceBank]);

    return {
        data,
        isLoading,
        refetch: fetchSearch, 
    };
};

export default useSearch;