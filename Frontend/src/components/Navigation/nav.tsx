
export default function Nav(){
    return (
        <nav className="flex gap-6 items-center justify-between px-6 h-12 border-b-2">
            <h1 className=" font-black">GrowPro</h1>
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
        </nav>
    );

}