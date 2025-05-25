import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";

const useAuthApiCall = (backendApi) => {  // backendApi is backend backendApi
  const { authApiCall,storeLocalData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleApiCall = async (values,params) => {
    setIsLoading(true);
    try {
      const response = await authApiCall(backendApi, values,params);
      if (response.success) {
        const {result} = response
        const {user,tenant} = result
        if (response?.emailVerified == false) {
          storeLocalData(user?.userId, response?.result)
          navigate(`/verifyEmail/${user?.userId}/${tenant?.tenantId}`);
          return NotificationHandler.success(
            "Please Verify Your Email Before Proceeding"
          );
        };

        if (backendApi === "login") {
            // Storing Data for login
            storeLocalData(
                "token",
                response?.result?.token,
                response?.result?.expiresIn
            );
            storeLocalData(
                "profile",
                JSON.stringify(response?.result),
                response?.result?.expiresIn
            );
            navigate("/");
        } else if (backendApi === "register") {
            storeLocalData(user?.userId, response.result);
            navigate(`/verifyEmail/${user?.userId}/${tenant?.tenantId}`);
        } else if (backendApi === "verify") {
            //Storing Data for login
            storeLocalData(
                "token",
                response?.result?.token,
                response?.result?.expiresIn
            );
            storeLocalData(
                "profile",
                JSON.stringify(response?.result),
                response?.result?.expiresIn
            );
            navigate("/");
        } else if (backendApi === "forgetPassword") {
            console.log(user.userId,response.result,"==")
            storeLocalData(user?.userId, response.result);
            navigate(`/updatePassword/${user?.userId}/${tenant?.tenantId}`);
        } else if (backendApi === "updatePassword") {
            navigate("/login");
        } else if (backendApi === "onboardUser") {
            navigate("/login");
        }
          return NotificationHandler.success(response?.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      NotificationHandler.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthApi = async (values,params) => {
    handleApiCall(values,params);
  };

  return {
    isLoading,
    handleAuthApi,
  };
};

export default useAuthApiCall;
