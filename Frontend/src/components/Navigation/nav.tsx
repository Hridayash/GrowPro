
export default function Nav({name}){
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
                
            </div>

            {/* </div> */}
            
        </nav>
    );

}