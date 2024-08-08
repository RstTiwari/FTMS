import React, { useState } from "react";
import "./Login.css";
import { Button, Form, Input, Row, Col, Spin, Alert } from "antd";
import SideContent from "pages/Auth/SideContent";
import  RegisterForm from "../../Forms/Auth/RegisterForm";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpVerify, setIsOtpVerify] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const { loginUser, authApiCall } = useAuth();

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
