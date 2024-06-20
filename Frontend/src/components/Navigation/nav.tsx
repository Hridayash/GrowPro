import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav({name}){
    const navigate = useNavigate();


    const [profileOption, setProfileOption] = useState(false);

    function logout(){

           

            const token = localStorage.getItem('accessToken');
            axios.post('http://localhost:3002/logout' , {} , {
                headers : {Authorization: `Bearer ${token}` }
            })
            .then(()=>{
                localStorage.removeItem('accessToken');
                navigate('/login')
            })
            .catch(err =>{
                console.log(err)
            })
    }
    function toggleProfile(){
        setProfileOption(prevState => !prevState);
    }

  

    return (
        <>
        <nav className="fixed top-0 left-0 w-full flex gap-6 items-center justify-between px-6 h-12 border-b-2 z-10 bg-white mb-13">
            <Link to="/"><h1 className=" font-black">GrowPro</h1></Link>
            
            {/* <ul className="flex gap-6">
                <li>
                    Dashboard
                </li>
                <li>
                   Training
                </li>
                <li>
                    Reviews
                </li>
                <li>
                   Directory
                </li>
                <li>
                    Benefits
                </li>
            </ul> */}
            <button className="flex items-center gap-2" onClick={toggleProfile}>
                <p>{name}</p>
                <div className=" bg-yellow-500 rounded-full w-9 h-9"></div>
               
            </button>

           
            
        </nav>
        {/* profile setting  options */}

        { profileOption && (
             <div className=" absolute right-0 top-14 bg-slate-100 flex flex-col rounded-lg items-center w-[20%] p-6 gap-3">
                <h1>{name}</h1>
              <Link to='/profile'> <h1>Profile</h1></Link> 
                <button className=" bg-red-600 text-white rounded-lg p-2" onClick={logout}>Logout</button>
            </div>
            )}
            
       
        </>

    );

}