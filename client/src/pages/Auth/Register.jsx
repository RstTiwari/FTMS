import React from "react";
import "./Login.css";
import SideContent from "pages/Auth/SideContent";
import  RegisterForm from "../../Forms/Auth/RegisterForm";


const Register = () => {
    
    return (
        <div className="parent_clearfix">
            <SideContent />
            <div className="login">
                <div className="container">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default Register;
