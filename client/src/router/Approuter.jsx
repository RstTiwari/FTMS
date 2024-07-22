import React, { lazy } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Dashbord from "../pages/dashbord";
import Layout from "../pages/layout";
import NotFound from "pages/Notfound";
import UpdateModule from "module/UpdateModule/UpdateModule";
import PdfModule from "module/PdfModule/PdfModule.js";
import Orgnization from "pages/Orgnization/Orgnization";
import Templates from "pages/Templates/index";
import SimpleWebSocketComponent from "pages/Websocket";
import CostomForm from "components/CustomForm"
import CreateModule from "module/Create/CreateModule";
import DetailsLayout from "pages/layout/DetailsLayout";
import Details from "components/Details";

const Approuter = ({ profile }) => {
    const tenantId = profile?.tenant?.tenantId;
    const {entity}  = useParams()
    return (
        <Routes>
            <Route element={<Layout profile={profile} />}>
                <Route
                    path="/"
                    element={
                        <Navigate to={`/app/${tenantId}/dashboard`} replace /> // it replaces show it the details basically
                    }
                />
                <Route
                    path="/app/:tenantId/dashboard"
                    exact
                    element={<Dashbord />}
                />
                <Route
                    path="/app/:tenantId/:entity/:pageNo/:pageSize"
                    element={<DetailsLayout />}
                >
                   <Route path="details/:id"  element ={<Details />}/>
                </Route>
                <Route
                    path="/app/:tenantId/:entity/create"
                    element={<CostomForm  entity ={entity} />}
                />
              

                {/**Routes for Read  Update And Pdf */}

                <Route path="/update/:entity/:id" element={<UpdateModule />} />
                <Route path="/download/:entity/:id" element={<PdfModule />} />

                {/*Mangaining Orgnization Profile */}
                <Route path="/app/:tenantId/orgnizationprofile" element={<Orgnization />} />
                <Route path="/app/:tenantId/templates" element={<Templates />} />
                <Route path="*" element={<NotFound />} />

                {/**In case some one acess login page after being logged in */}
                <Route
                    path="/login"
                    element={<Navigate to="/app/:tenantId/dashboard" replace />}
                />
            </Route>
        </Routes>
    );
};

export default Approuter;
