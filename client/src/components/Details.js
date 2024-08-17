import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useInitialFormValues from "Hook/useIntialFormValues";
import DetailsHeader from "./DetailsHeader";
import PageLoader from "pages/PageLoader";
import DetailsModule from "module/DetailsModule/Details";
const Details = () => {
    const { entity, id } = useParams();
    const { initialValues, loading, fetchInitialValues } = useInitialFormValues(
        entity,
        "get",
        id
    );
    useEffect(() => {
        if (entity === "customers" || entity === "payments")
            fetchInitialValues();
    }, [fetchInitialValues, loading]);

    if (loading) {
        return <PageLoader isLoading={loading} />;
    }
    return (
        <>
            <DetailsHeader />
            <DetailsModule
                entity={entity}
                id={id}
                values={initialValues}
                loading={loading}
            />
        </>
    );
};
export default Details;
