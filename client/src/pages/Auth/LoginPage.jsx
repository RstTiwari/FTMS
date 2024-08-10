import React, { useState } from "react";
import SideContent from "pages/Auth/SideContent";
import LoginForm from "../../Forms/Auth/LoginForm.js";
const Login = () => {
 
    return (
        <div className="parent_clearfix">
            <SideContent />
            <div className="login">
                <LoginForm  />
            </div>
        </div>
    );
};

export default Login;
