import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function jobPost(){
   const [Title , setTitle ] = useState('')
   const[Description , setDescription] =  useState('')
   const navigate = useNavigate()

   

const  handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('accessToken')
            const response = await axios.post('http://localhost:3002/job' , {Title, Description} , {
                headers :{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)

           setTitle("")
           setDescription("")

           navigate('/job-postings')
        }catch(err){
            console.log(err)
            alert("faied to add user")
        }
        
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Title' value={Title} onChange={(e)=>setTitle(e.target.value)}   />
                <ReactQuill theme="snow" value={Description} onChange={setDescription} />
                <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Post
                </button>
                
            </form>
            
            
            
        </>
    );
}