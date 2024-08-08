import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";

const useAuthApiCall = (entity, route ,nextRoute) => {
    const { authApiCall,loginUser,logOutUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleApiCall = async (values) => {
        setIsLoading(true);
        console.log(values,"==")
        try {
            const response = await authApiCall("post", route, values );
            if (response.success) {
                NotificationHandler.success(response?.message);
                if(route ==="login"){
                    loginUser(response.result)
                }
                navigate(nextRoute);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            NotificationHandler.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

   

    const handleAuthApi = async (values) => {
        handleApiCall(values)
    };

    return {
        isLoading,
        error,
        handleAuthApi,
    };
};

export default useAuthApiCall;
