import Box from "../Box/ sectionsBox";
import Nav from "../Navigation/nav";
import SideBar from "../sidebar/sidebar";

export default function Home(){
    return(
        <>
        <Nav/>
        <div  className="flex ">
        <SideBar/>
       
        <main className="p-6">
    
        <h1>Hello User this is home page</h1>
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