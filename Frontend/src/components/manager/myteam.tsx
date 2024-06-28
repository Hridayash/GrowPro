import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Myteam() {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3002/user/employeeList');
                setEmployee(response.data);
            } catch (error) {
                console.error("Error fetching employee list:", error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <>
        <h1 className="font-bold text-3xl">Team Members</h1>
        <table>
           <tbody className="divide-y divide-gray-200">
            {employee.map((employee) => (
              <tr key={employee.Id} className="hover:bg-gray-100">
               <Link to= {`/profile/${employee.Id}`}><td className="px-6 py-4 whitespace-nowrap">{employee.Name}</td> </Link>
                <td className="px-6 py-4 whitespace-nowrap">{employee.Email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.Role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-1">
                    
                   
                    
              
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </>
    );
}
