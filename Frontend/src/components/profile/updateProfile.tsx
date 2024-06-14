import { useEffect, useState } from "react";
import axios from "axios";
import { Link ,useNavigate } from "react-router-dom";


export default function UpdateProfile(){
    const inputStyle = "p-2 rounded-xl w-[90%]"
    const navigate = useNavigate()

   const[name,setName] = useState("")
   const [profile  , setProfile] =  useState({
        FullName : '',
        Position :'',
        Address:'',
        Education: '',
        Experience : '',
        Skills :''
   })

   useEffect(() => {
    const fetchProfile = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.get('http://localhost:3002/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };
    fetchProfile();
}, []);


   const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
        ...prevState,
        [name]: value
    }));
}

   const submit  = (e:any) =>{
    e.preventDefault();
    const token = localStorage.getItem('accessToken')
    axios.post('http://localhost:3002/profile' , profile , {
        headers:{Authorization :`Bearer ${token}`}
    })
    .then(result =>{
        console.log(result);
        navigate('/home/profile')
        
    })
    .catch(err =>console.log(err));
   }






    return (
        <>
      
            <form onSubmit={submit} className="flex flex-col items-center bg-slate-100  gap-6 p-6 w-96">
                <h1>Edit Profile</h1>
                <input type="text" placeholder="FullName" name="FullName" className= {inputStyle}  onChange={handleChange} value = {profile.FullName} />
                <input type="text" placeholder="Position" name ="Position" className= {inputStyle} onChange={handleChange} value = {profile.Position}/>
                <input type="text" placeholder="Address" name ="Address" className= {inputStyle} onChange={handleChange} value = {profile.Address}/>
                <input type="text" placeholder="Education" name ="Education" className= {inputStyle} onChange={handleChange} value = {profile.Education}/>
                <input type="text" placeholder="Experience" name ="Experience" className= {inputStyle} onChange={handleChange} value = {profile.Experience}/>
                <input type="text" placeholder="Skills" name ="Skills" className= {inputStyle} onChange={handleChange} value = {profile.Skills}/>

                <div>
                <button className="bg-green-500 text-white p-2 w-20 rounded-xl">Save</button>
               <Link to='/home/profile'><button className="bg-red-500 text-white p-2 w-20 rounded-xl">Cancel</button></Link> 
                </div>
            </form>
        
           
        </>
    );
}