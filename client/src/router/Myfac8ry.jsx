import { lazy, Suspense } from "react";
import PageLoader from "pages/PageLoader";
import { useAuth } from "../state/AuthProvider";
import { useCookies } from "react-cookie";
import Approuter from "./Approuter";
import AuthRouter from "./AuthRouter";

const  Myfac8ry = ()=> {
    const [cookie,setCookie] = useCookies(["token"]);
    
    return(
        <Suspense fallback= {<PageLoader  text={"Please Wait Setting up For You"}/>}>
        {
             cookie.token? (<Approuter/>):(<AuthRouter/>)
        }
        </Suspense>
    )

    
}

export default Myfac8ry