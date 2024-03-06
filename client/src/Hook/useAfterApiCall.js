import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import NotFound from "pages/Notfound";

const useAfterApiCall = (route) => {
    const navigate = useNavigate();
    navigate(`/${route}`);
    return (
        <div>
            <NotFound />
        </div>
    );
};

export default useAfterApiCall;
