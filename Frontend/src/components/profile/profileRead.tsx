import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EmployeePerformanceReviews from "../Reviews/ViewReview";

// Define types for the profile state
interface Profile {
  FullName: string;
  Position: string;
  Address: string;
  ProfileUrl: string;
  Email: string;
}

// Define a type for handling API errors
interface ApiError {
  message: string;
}

export default function ProfileRead() {
  const { id } = useParams<{ id: string }>(); // Type parameter for useParams

  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>({
    FullName: "",
    Position: "",
    Address: "",
    ProfileUrl: "",
    Email: ""
  });
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!id || !token) return; // Guard clause to handle missing id or token

      try {
        const response = await axios.get<Profile>(`https://growpro.onrender.com/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        console.log('Profile Data:', response.data);
        setProfile(response.data);
        setName(response.data.FullName);
        setEmail(response.data.Email);
        console.log(response.data);

      } catch (err) {
        console.log('Error fetching profile:', (err as ApiError).message);
      }
    };

    fetchUserProfile();
  }, [id]); // Add id as a dependency




  return (
    <>
      {/* User's basic details */}
      <div className="w-[90%] mx-[10%]">
       
        {/* Cover picture */}
        <div className="bg-blue-400 w-full h-56 flex justify-end p-6 rounded-t-xl">
        
        </div>
        {/* User details */}
        <div className="flex items-center justify-between bg-white rounded-b-xl">
          <div className="flex flex-col relative pt-32 p-10">
            <div className="h-56 w-56 rounded-full border-white border-8 absolute -top-32 bg-gray-500 left-10 z-10 overflow-hidden">
              <img src={profile.ProfileUrl || ''} className="" alt="Profile" />
            </div>
            <h1 className="font-medium text-2xl">{name}</h1>
            <p>{profile.Position}</p>
            <p>{profile.Address}</p>
            <p>{email}</p>
          </div>
          <div className="flex gap-2 items-center p-10">
            <div className="bg-red-400 rounded-full w-8 h-8"></div>
            <h1></h1>
          </div>
        </div>
      </div>
      {/* Experience */}
      <div className="flex flex-col bg-white rounded-xl w-[80%] mx-[10%] p-10 gap-10 my-2">
        <h1 className="font-medium text-2xl">Experience</h1>
        <div className="flex items-center gap-6">
          <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center items-center">X</div>
          <div>
            <h1>Software Engineer</h1>
            <p>Great Company</p>
            <p>Oct 2020 - Present</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center items-center">X</div>
          <div>
            <h1>Software Engineer</h1>
            <p>Great Company</p>
            <p>Oct 2020 - Present</p>
          </div>
        </div>
      </div>
      {/* Education */}
      <div className="flex flex-col bg-white rounded-xl w-[80%] mx-[10%] p-10 gap-10 my-2">
        <h1 className="font-medium text-2xl">Education</h1>
        <div className="flex items-center gap-6">
          <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center items-center">X</div>
          <div>
            <h1>Niagara College Toronto</h1>
            <p>PhD in Computer Programming</p>
            <p>Sep 2023 - Sep 2025</p>
            <p>Grade: 81%</p>
            <p className="">
              Proficient in various programming languages, algorithms, and software development methodologies. <br />
              Extensive hands-on experience in JavaScript. Specialized in Front End development. Ready to contribute to innovative software solutions.
            </p>
          </div>
        </div>
      </div>
      {/* Skills */}
      <div className="flex flex-col bg-white rounded-xl w-[80%] mx-[10%] p-10 gap-10 my-2">
        <h1 className="font-medium text-2xl">Skills</h1>
        <div className="flex items-center gap-6">
          <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center items-center">X</div>
          <div>
            <h1>Full Stack App Dev</h1>
            <p>Udemy</p>
            <p>Sep 2023</p>
          </div>
        </div>
      </div>
      <EmployeePerformanceReviews />
    </>
  );
}
