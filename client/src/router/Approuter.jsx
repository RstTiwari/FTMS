import React, { lazy } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Dashbord from "../pages/dashbord";
import Layout from "../pages/layout/DashboardLayout";
import NotFound from "pages/Notfound";
import UpdateModule from "module/UpdateModule/UpdateModule";
import Organization from "pages/Orgnization/Orgnization";
import Templates from "pages/Templates/index";
import DetailsLayout from "pages/layout/DetailsLayout";
import Details from "components/Details";
import CustomForm from "components/CreateCustomForm";
import UpdateCustomForm from "components/UpdateCustomForm";
import RecordPayment from "pages/Payment/RecordPayment";
import EmailSendPage from "pages/Email/Email";
import PdfDetails from "pages/Details/PdfDetails";
import TestingPdf from "PdfTemplates/TestingPdf";

const Approuter = ({ profile }) => {
    const tenantId = profile?.tenant?.tenantId;
    const { entity } = useParams();
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
                    path="/app/:tenantId/"
                    element={
                        <Navigate to={`/app/${tenantId}/dashboard`} replace /> // it replaces show it the details basically
                    }
                />
                <Route
                    path="/app/:tenantId/dashboard"
                    exact
                    element={<Dashbord />}
                />
               <Route path="/app/:tenantId/:entity/:pageNo/:pageSize" element={<DetailsLayout />} /> 
               <Route path="/app/:tenantId/:entity/:pageNo/:pageSize/details/:id" element={<Details />} />

                <Route
                    path="/app/:tenantId/:entity/create"
                    element={<CustomForm entity={entity} />}
                />

                {/**Update Routes */}
                <Route
                    path="/app/:tenantId/update/:entity/:id"
                    element={<UpdateCustomForm />}
                />

                {/**Convet Modules */}
                <Route
                    path="/app/:tenantId/:entity/:id/recordPayment"
                    element={<RecordPayment />}
                />

                {/**Send Email  */}
                <Route
                    path="/app/:tenantId/:entity/:id/sendmail"
                    element={<EmailSendPage />}
                />
                {/*Mangaining setting Sidebar Profile */}
                <Route
                    path={`/app/:tenantId/settings/organization`}
                    element={<Organization />}
                />
                <Route
                    path="/app/:tenantId/setting/templates"
                    element={<Templates />}
                />
                <Route
                    path="/app/:tenantId/testingpdf"
                    element={<TestingPdf />}
                />

                <Route path="*" element={<NotFound />} />
                {/* <Route path="/app/websocket" element={<Notification />} /> */}


                {/**In case some one acess login page after being logged in */}
                <Route
                    path="/login"
                    element={
                        <Navigate to={`/app/${tenantId}/dashboard`} replace />
                    }
                />
            </Route>
            <Route
                path="/pdfDetails/:entity/:no/:tenantId/:id"
                element={<PdfDetails />}
            />
        </Routes>
    );
};

export default Approuter;
