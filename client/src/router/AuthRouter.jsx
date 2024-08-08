import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/LoginPage";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import { App } from "antd";
import UpdatePassword from "pages/Auth/UpdatePassword";
import VerifyEmail from "pages/Auth/VerifyEmail";

export default function AuthRouter() {
    return (
        <App>
            <Routes>
                <Route element={<Login />} path="/login" />
                <Route path="*" element={<Navigate to="/login" />} replace />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/updatePassword" element={<UpdatePassword />} />
                <Route path="/verifyEmail" element={<VerifyEmail />} />
            </Routes>
        </App>
    );
}
