import { lazy, Suspense } from "react";
import PageLoader from "pages/PageLoader";
import { useAuth } from "../state/AuthProvider";
import { useCookies } from "react-cookie";
import Approuter from "./Approuter";
import AuthRouter from "./AuthRouter";

const  Myfac8ry = ()=> {
    const [cookies,setCookie] = useCookies(["token"])
    return(
        <div>
        {
            cookies["token"] ? (<Approuter/>):(<AuthRouter/>)
        }
        </div>
    )

    
}

export default Myfac8ry