import { Navigate } from "react-router-dom"
export default function AuthRoute({children} : {children :JSX.Element}){

    const token = localStorage.getItem('accessToken')

    if(!token){
        return <Navigate to = "/login" replace />
    }

    return children;
}