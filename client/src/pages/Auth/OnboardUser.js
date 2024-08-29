import React from "react";
import SideContent from "pages/Auth/SideContent";
import OnboardUserForm from "../../Forms/Auth/OnbordUserForm";
import "./Login.css";


const OnboardUser = () => {
 
    return (
        <>
            <div className="parent_clearfix">
                <SideContent />
                <div className="login">
                    <div className="container">
                        <OnboardUserForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OnboardUser;
