import React, { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashbord from "scenes/dashbord"
import Layout from "scenes/layout";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transaction from "scenes/transaction";
import NotFound from "pages/Notfound";
import Lead  from "scenes/Lead"
import NewLead from "pages/Lead/NewLead";
const Approuter = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashbord />} />
                <Route path="/lead" element={<Lead />} />
                <Route path="/lead/create" element={<NewLead />} />


                <Route path="/products" element={<Products />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/transactions" element={<Transaction />} />
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
