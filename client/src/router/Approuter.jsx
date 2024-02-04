import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashbord from "../pages/dashbord"
import Layout from "../pages/layout"
import NotFound from "pages/Notfound";
import Lead  from "../pages/Lead"
import NewLead from "pages/Lead/NewLead";
import Quote  from "../pages/Quote"
import NewQuote from "pages/Quote/NewQuote"
import Coustomer from "../pages/Customer"
import NewCoustomer from "pages/Customer/NewCustomer";
import Invoice from "../pages/Invoice"
import NewInvoice from "pages/Invoice/NewInvoice"
import ReadModule from "module/ReadModule/ReadModule";
import UpdateModule from "module/UpdateModule/UpdateModule";


const Approuter = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashbord />} />
                <Route path="/customers" element ={<Coustomer/>}/>
                <Route path="/customers/create" element ={<NewCoustomer/>}/>

                <Route path="/lead" element={<Lead />} />
                <Route path="/lead/create" element={<NewLead />} />
                <Route path="/quotation" element={<Quote />} />
                <Route path="/quotation/create" element={<NewQuote />} />
        
                <Route path="/invoice" element ={<Invoice/>}/>
                <Route path="/invoice/create" element ={<NewInvoice/>}/>

                {/**Routes for Read  Update And Pdf */}
                <Route path="/read/:entity/:id" element ={<ReadModule />}/>
                <Route path="/update/:entity/:id" element ={<UpdateModule />}/>


                <Route path="*" element={<NotFound />} />

                {/**In case some one acess login page after being logged in */}
                <Route
                    path="/login"
                    element={<Navigate to="/dashboard" replace />}
                />
             
            </Route>
        </Routes>
    );
};

export default Approuter;
