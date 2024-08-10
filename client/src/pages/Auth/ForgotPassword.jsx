import ForgetPasswordForm from "Forms/Auth/ForgetPassword";
import React, { useState } from "react";
import SideContent from "pages/Auth/SideContent";
import "./Login.css";
import ForgotPasswordForm from "../../Forms/Auth/ForgetPassword";

const ForgotPassword = () => {
   

    return (
        <>
            <div className="parent_clearfix">
                <SideContent />
                <div className="login">
                    <div className="container">
                        <ForgotPasswordForm
                           
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
