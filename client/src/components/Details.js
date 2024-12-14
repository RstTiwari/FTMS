import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useInitialFormValues from "Hook/useIntialFormValues";
import DetailsHeader from "./DetailsHeader";
import PageLoader from "pages/PageLoader";
import DetailsModule from "module/DetailsModule/DetailsModule";
const Details = () => {
    const { entity, id } = useParams();
    const { initialValues, isFetching, fetchInitialValues } =
        useInitialFormValues(entity, "get", id);
    useEffect(() => {
        fetchInitialValues();
    }, [fetchInitialValues, entity, id]);

    if (isFetching) {
        return <PageLoader isLoading={true} text={"Fetching ...."} />;
    }
    return (
        <>
            <DetailsHeader values={initialValues} />
            <DetailsModule
                entity={entity}
                id={id}
                values={initialValues}
                loading={isFetching}
            />
        </>
    );
};
export default Details;
