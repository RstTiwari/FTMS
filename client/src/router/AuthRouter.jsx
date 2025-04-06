import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/LoginPage";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import { App } from "antd";
import UpdatePassword from "pages/Auth/UpdatePassword";
import OnboardUser from "pages/Auth/OnboardUser";
import VerifyEmail from "pages/Auth/VerifyEmail";
import PdfDetails from "pages/Details/PdfDetails";

export default function AuthRouter() {
    return (
        <App>
            <Routes>
                <Route element={<Login />} path="/login" />
                <Route path="*" element={<Navigate to="/login" />} replace />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route
                    path="/verifyEmail/:userId/:tenantId"
                    element={<VerifyEmail />}
                />
                <Route
                    path="/updatePassword/:userId/:tenantId"
                    element={<UpdatePassword />}
                />
                <Route path="/onboardUser/:token" element={<OnboardUser />} />
                <Route
                    path="/pdfDetails/:entity/:no/:tenantId/:id"
                    element={<PdfDetails />}
                />
            </Routes>
        </App>
    );
}
