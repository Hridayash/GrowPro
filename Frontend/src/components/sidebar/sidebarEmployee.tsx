import { FaUserFriends } from "react-icons/fa";
import { IoBriefcaseSharp } from "react-icons/io5";
import { PiBooksBold } from "react-icons/pi";
import { TfiCup } from "react-icons/tfi";



export default function SideBarEmployee(){
    const linkStyle =  "hover:bg-slate-100 flex gap-2 justify-right items-center";
    return(
        <>
        <nav className=" bg-slate-100 w-60 h-screen flex  flex-col gap-8 px-6 pt-6 mt-12 fixed left-0">
       
        <ul className="flex  flex-col gap-8">
                <li className={linkStyle}>
                   <FaUserFriends/> Dashboard
                </li>
                <li className={linkStyle}>
                   <IoBriefcaseSharp/> Performance Review
                </li>
                <li className={linkStyle}>
                   <PiBooksBold/> Training Courses
                </li>
                <li className={linkStyle}>
                   <TfiCup/> Job Openings
                </li>
            </ul>  
        </nav>
           
        </>
    );
}  