import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const PageNotFound = () => {

    const location = useLocation();
    const navigate = useNavigate()
    useEffect(()=> {
        let timer = setTimeout(() => {
            navigate('/')
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [])


    return(
        <>
            <h4>{location.pathname} page not found</h4>
            <h4>Redirecting you to Home...</h4>
        </>
    )
}

export default PageNotFound;