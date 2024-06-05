import { FaUserPlus } from "react-icons/fa";

export default function Box(){

    return(
        <div  className="flex flex-col gap-6 border-2 rounded-lg p-6 mt-36">
            <span>
            <h1>Something</h1>
            <p>Details about something</p>
            </span>
            


            <div className="flex items-center gap-2">
                {/*cards stating buttons */}
                <FaUserPlus className=" bg-amber-200 rounded-full text-4xl p-2" />
                <div>
                    <h2>Employee Onboarded</h2>
                    <p>20 New employees onBoarded</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/*cards stating buttons */}
                <FaUserPlus className=" bg-amber-200 rounded-full text-4xl p-2" />
                <div>
                    <h2>Employee Onboarded</h2>
                    <p>20 New employees onBoarded</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/*cards stating buttons */}
                <FaUserPlus className=" bg-amber-200 rounded-full text-4xl p-2" />
                <div>
                    <h2>Employee Onboarded</h2>
                    <p>20 New employees onBoarded</p>
                </div>
            </div>
        </div>
    );
}