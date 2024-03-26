import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UseNavigation = (success, redirectTo) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            navigate(`/${redirectTo}`);
        }
    }, [redirectTo, navigate, success]);
};

export default UseNavigation