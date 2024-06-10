import { Link } from "react-router-dom";

export default function Login(){
    const inputStyle = " border rounded-md p-2 w-[20%] "
    return(
       <main>
            <nav>
                <h1 className=" font-extrabold text-4xl m-6" >GrowPro</h1>
            </nav>
                <form action="post" className="flex flex-col justify-center items-center gap-10 mt-40">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h1 className=" font-semibold text-3xl">Welcome to GrowPro</h1>
                        <h2 className=" font-semibold text-xl text-neutral-500">To get Started, Please sign in</h2>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[100%] gap-8">
                    <input type="email" placeholder="Email" className={inputStyle}/>
                    <input type="password" placeholder="password" className={inputStyle} />
            
                    <button className=" bg-blue-500 rounded-lg w-[20%] p-2 text-white hover:bg-blue-700">Log In</button>
                    <Link to="/" ><p>Don't have account?</p></Link>
                    </div>
                </form>
       </main> 
    );

}