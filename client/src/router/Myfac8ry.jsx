import { lazy, Suspense } from "react";
import PageLoader from "pages/PageLoader";
import { useAuth } from "../state/AuthProvider";
import { useCookies } from "react-cookie";
import Approuter from "./Approuter";
import AuthRouter from "./AuthRouter";
import { App } from "antd";


const  Myfac8ry = ()=> {
    const [cookies,setCookie] = useCookies(["token"])
    return(
        <App>

        {
            cookies["token"] ? (<Approuter/>):(<AuthRouter/>)
        }
        </App>
    )

    
}

export default Myfac8ry