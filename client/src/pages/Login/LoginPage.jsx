import React, { useState } from "react";
import "./Login.css";
import PageLoader from "pages/PageLoader";
import SideContent from "module/AuthModule/SideContent";
import { LoginForm } from "Forms/LoginForm";
import {useGetUserLoginQuery} from "state/api"
import {authApi} from "state/apiFunction.js";
import { useAuth } from "../../state/AuthProvider";
import { useCookies } from "react-cookie";
const Login = () => {
    const [login, setLogin] = useState("");
    const {logoutUser,loginUser } = useAuth()
    const [cookie,setCookie] = useCookies(["token"])
    let token = cookie && cookie.token.token
    
    const handleLoginChange = async (value) => {
        setLogin(value);
        let response = await authApi("login",token, value);
        if (response.success === 1) {
            loginUser(response.result);
        }else{

        }
    };
    return (
        <>
            <div className="parent_clearfix">
                <SideContent />
                <div className="login">
                    <div className="container">
                        <div className="login-form">
                            <LoginForm handleLoginChange={handleLoginChange} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
