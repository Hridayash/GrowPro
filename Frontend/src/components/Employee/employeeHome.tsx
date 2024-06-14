
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "../Box/ sectionsBox";
import SideBar from "../sidebar/sidebar";
import NavEmployee from "../Navigation/navEmployee";
import SideBarEmployee from "../sidebar/sidebarEmployee";



export default function HomeEmployee(){

    const [user, setUser] = useState(null);
    const navigate = useNavigate()
 
     useEffect(()=>{
         console.log('fetching user details....')
         const fetchUserDetail = async ()=>{
             try{
                 const token = localStorage.getItem('accessToken');
                 const response = await axios.get('http://localhost:3002/user' , {
                     headers:{
                         Authorization: `Bearer ${token}`
                     },
                 });
                 setUser(response.data.Name);
 
             }catch(err){
                 console.log(err);
                 if(err.response && err.response.status ===401){
                     console.log('unauthorized')
                     navigate('/login')
 
                 }else{
                     console.log("data cannot be fetched")
                    
                 }
                 
             }
         }
         fetchUserDetail()
     } , [])

    return(
        <>
        <NavEmployee name={user}/>
        <div  className="flex ">
        <SideBarEmployee/>
       
        <main className="p-6 ml-60 mt-12">
    
        <h1>Hello <strong>{user}</strong> this is home page for employee</h1>
      



        </main>
        </div>
        </>
    );
    
}





  

   