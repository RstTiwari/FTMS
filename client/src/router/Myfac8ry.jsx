import { lazy, Suspense } from "react";
import PageLoader from "pages/PageLoader";
import { useAuth } from "../state/AuthProvider";


const  Myfac8ry = ()=> {
    const  isToken  = window.localStorage.getItem("auth");
    const Approuter = lazy(()=> import("./Approuter"))
    const AuthRouter = lazy(()=> import("./AuthRouter"))
    return(
        <Suspense fallback= {<PageLoader/>}>
        {
            isToken ? (<Approuter/>):(<AuthRouter/>)
        }
        </Suspense>
    )

    
}

export default Myfac8ry