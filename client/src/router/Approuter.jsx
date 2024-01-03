import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashbord from "scenes/layout/Dashbord/index";
import Layout from "scenes/layout/Dashbord/index";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transaction from "scenes/transaction";
import NotFound from "pages/Notfound";
const Approuter = () => {
    return (
        <BrowserRouter>
         <Routes>
            <Route element={<Layout />}>
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashbord />} />
                <Route path="/products" element={<Products />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/transactions" element={<Transaction />} />
                <Route path="*" element={<NotFound />} />

            </Route>
        </Routes>
        </BrowserRouter>
       
    );
};

export default Approuter;
