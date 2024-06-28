import { useEffect, useState } from "react";

import axios from "axios";

import {  useParams } from "react-router-dom";


export default function ProfileRead(){

    const { id: employeeId } = useParams();

 
   

    const [profile, setProfile] = useState({
        FullName:"", 
        Position:"", 
        Address:"", 
        Education:"", 
        Experience:"", 
        Skills:""


    })
   

   

    useEffect(() => {
        const fetchUserProfile = async () => {
           
            try {
                const response = await axios.get(`http://localhost:3002/profile/${employeeId}`)
                
                console.log('Profile Data:', response.data);
                setProfile(response.data);
                
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserProfile();
    }, [employeeId]);




    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };



    return(
        <>
        
            {/* users basic details  */}
            <div className="w-[90%] mx-[10%] ">
                {/* cover picture */}
                <div className="bg-gray-400 w-full h-56 flex  justify-end p-6 rounded-t-xl">
               
                </div>
                {/* user details */}
                <div className="flex items-center justify-between bg-white rounded-b-xl">
                    <div className="flex flex-col relative pt-32 p-10">
                    <div className="h-56 w-56 bg-slate-400 rounded-full border-white border-8 absolute -top-32 left-10"></div>
                    <h1 className=" font-medium text-2xl">{profile.FullName}</h1>
                    <p>{profile.Position}</p>
                    <p>{profile.Address}</p>
                    
                    </div>
                    <div className="flex gap-2 items-center p-10">
                        <div className=" bg-red-400 rounded-full w-8 h-8"></div>
                        <h1></h1>
                    </div>
                   

                </div>    
            </div> 
            {/* Experience */}
            <div className="flex flex-col   bg-white rounded-xl w-[80%] mx-[10%] p-10 gap-10 my-2">

                <h1 className=" font-medium text-2xl">Experience</h1>
                <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center items-center">X</div>
                    <div>
                        <h1>Software Engineer</h1>
                        <p>Great Company</p>
                        <p>oct-2020 - Present</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center items-center">X</div>
                    <div>
                        <h1>Software Engineer</h1>
                        <p>Great Company</p>
                        <p>oct-2020 - Present</p>
                    </div>
                </div>

            </div>
            {/* Eduction */}
            <div className="flex flex-col   bg-white rounded-xl w-[80%] mx-[10%] p-10 gap-10 my-2">

                <h1 className=" font-medium text-2xl">Education</h1>
                <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center items-center">X</div>
                    <div>
                        <h1>Niagara College Toronto</h1>
                        <p>PhD in Computer Programming </p>
                        <p>Sep 2023 - Sep 25</p>
                        <p>Grade:81%</p>
                        <p className="">Proficient in various programming languages, algorithms, and software development methodologies. <br/>Extensive hands-on experience in Javascript. Specialized in Front End development. Ready to contribute to innovative software solutions.</p>
                       
                    </div>
                    
                </div>
                

            </div>

            {/* Skills */}
            <div className="flex flex-col   bg-white rounded-xl w-[80%] mx-[10%] p-10 gap-10 my-2">

                <h1 className=" font-medium text-2xl">Skills</h1>
                <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center items-center">X</div>
                    <div>
                        <h1>Full Stack app dev</h1>
                        <p>Udemy</p>
                        <p>Sep 2023</p>
                        
                       
                    </div>
                    
                </div>
                

            </div>
       
        </>
    );
}