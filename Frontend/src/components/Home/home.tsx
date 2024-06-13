import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "../Box/ sectionsBox";
import Nav from "../Navigation/nav";
import SideBar from "../sidebar/sidebar";

export default function Home(){

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
        <Nav name={user}/>
        <div  className="flex ">
        <SideBar/>
       
        <main className="p-6 ml-60 mt-12">
    
        <h1>Hello <strong>{user}</strong> this is home page</h1>
        <div className="flex gap-6 ">
            <Box />
            <Box />
            <Box />
        </div>



        </main>
        </div>
        </>
 
    );
}