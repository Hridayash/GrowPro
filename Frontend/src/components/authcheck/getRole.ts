import { jwtDecode } from "jwt-decode";


const getUserRole = ()=>{
    const token = localStorage.getItem('accessToken')
    if(!token){
        return null
    }
    const decodeToken = jwtDecode(token)
   
    return decodeToken.role

}
const getUserId = ()=>{
    const token = localStorage.getItem('accessToken')
    if(!token){
        return null
    }
    const decodeToken = jwtDecode(token)
    
    return decodeToken.userId

}
export{getUserId}
export default getUserRole;