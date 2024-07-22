import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "pages/Notfound";

const PdfModule = () => {
    const { entity, id } = useParams();
    let componentToRender = <NotFound/>
    switch (entity) {
         default:
            break;
    }
    return <>{componentToRender}</>;
};

export default PdfModule;
