import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function Myteam() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3002/user/employeeList');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);



  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-3xl">Team Members</h1>
        <Link to='/add-user'>
          <button className="bg-blue-500 text-white rounded-xl p-2 px-4">+ Add</button>
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.Id} className="hover:bg-gray-100">
                <Link to={`/profile/${employee.Id}`} className="contents">
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer">{employee.Name}</td>
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer">{employee.Email}</td>
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer">{employee.Role}</td>
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                    <div className="flex gap-1">
                      <Link to={`/manage-user/edit-user/${employee.Id}`}>
                        <button className="bg-blue-500 px-4 h-8 rounded-xl text-white">
                          <FaPen />
                        </button>
                      </Link>
                  
                    </div>
                  </td>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
