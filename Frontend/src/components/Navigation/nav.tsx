import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Nav({name}){
    const navigate = useNavigate();

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

    return (
        <nav className="flex gap-6 items-center justify-between px-6 h-12 border-b-2">
            <h1 className=" font-black">GrowPro</h1>
            {/* <div className="flex justify-center items-center gap-6 "> */}
            <ul className="flex gap-6">
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
            </ul>
            <div className="flex items-center gap-2">
                <p>{name}</p>
                <div className=" bg-zinc-800 rounded-full w-9 h-9"></div>
                <button className=" bg-red-600 text-white rounded-lg p-2" onClick={logout}>Logout</button>
            </div>

            {/* </div> */}
            
        </nav>
    );

}