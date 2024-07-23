import React,{useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailsHeader from "./DetailsHeader";
import DetailsModule from "module/DetailsModule/Details";
import useInitialFormValues from "Hook/useIntialFormValues";
import PageLoader from "pages/PageLoader";

const Details = () => {
    const { entity, id } = useParams();
    const { initialValues, loading,fetchInitialValues } = useInitialFormValues(entity, id);
    useEffect(() => {
       fetchInitialValues()
    }, [fetchInitialValues]);

    if (loading) {
        return <PageLoader isLoading={loading} />;
    }
    return (
        <>
            <DetailsHeader />
            <DetailsModule entity={entity} payload={initialValues} />
        </>
    );
};

export default Details;
