import { FaUserFriends } from "react-icons/fa";
import { IoBriefcaseSharp } from "react-icons/io5";
import { PiBooksBold } from "react-icons/pi";
import { TfiCup } from "react-icons/tfi";



export default function SideBar (){
    const linkStyle =  "hover:bg-slate-100 flex gap-2 justify-right items-center";
    return(
        <>
        <nav className=" bg-slate-100 w-60 h-screen flex  flex-col gap-8 px-6 pt-6">
       
        <ul className="flex  flex-col gap-8">
                <li className={linkStyle}>
                   <FaUserFriends/> Employee Directory
                </li>
                <li className={linkStyle}>
                   <IoBriefcaseSharp/> Promotions
                </li>
                <li className={linkStyle}>
                   <PiBooksBold/> Training Courses
                </li>
                <li className={linkStyle}>
                   <TfiCup/> Talent Pool
                </li>
            </ul>  
        </nav>
           
        </>
    );
}  