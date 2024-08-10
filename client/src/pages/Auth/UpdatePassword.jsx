import React from "react";
import SideContent from "pages/Auth/SideContent";
import UpdatePasswordForm from "../../Forms/Auth/UpdatePasswordForm";
import "./Login.css";


const UpdatePassword = () => {
 
    return (
        <>
            <div className="parent_clearfix">
                <SideContent />
                <div className="login">
                    <div className="container">
                        <UpdatePasswordForm
                           
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePassword;
