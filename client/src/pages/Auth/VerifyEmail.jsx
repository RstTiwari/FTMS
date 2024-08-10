import React from "react";
import { useAuth } from "state/AuthProvider";
import SideContent from "pages/Auth/SideContent";
import "./Login.css";
import VerifyEmail from "Forms/Auth/VerifyEmail";

const ForgotPassword = () => {

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
