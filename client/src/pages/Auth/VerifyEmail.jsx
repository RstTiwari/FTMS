import ForgetPasswordForm from "Forms/Auth/ForgetPassword";
import React, { useState } from "react";
import { Form, Row, Input, Col, Button } from "antd";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import SideContent from "pages/Auth/SideContent";
import PageLoader from "../PageLoader";
import "./Login.css";
import VerifyEmail from "Forms/Auth/VerifyEmail";

const ForgotPassword = () => {
    const { authApiCall } = useAuth();

    return (
        <div className="parent_clearfix">
            <SideContent />
            <div className="login">
                <VerifyEmail />
            </div>
        </div>
    );
};

export default ForgotPassword;
