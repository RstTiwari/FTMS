import { useState, useEffect } from "react";
import { fetchDataById } from "./api"; // Adjust import as per your API fetching method

const useInitialFormValues = (entity, id) => {
    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInitialValues = async () => {
            setLoading(true);
            try {
                const data = await fetchDataById(entity, id); // Replace with your API call
                setInitialValues(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching initial values:", error);
                setInitialValues(null);
                setLoading(false);
            }
        };

        if (entity && id) {
            fetchInitialValues();
        }
    }, [entity, id]);

    return { initialValues, loading };
};

export default useInitialFormValues;
