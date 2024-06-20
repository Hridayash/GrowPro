import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3002/employeeList');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/delete-user/${id}`);
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.Id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Employee List</h2>
        <Link to="/add-user">
          <button className="bg-green-400 px-4 h-8 rounded-xl text-white">Add</button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="w-1/3 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="w-1/3 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
              <th className="w-1/3 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.Id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{employee.Name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.Email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.Role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-1">
                    <Link to={`edit-user/${employee.Id}`}>
                      <button className="bg-blue-500 px-4 h-8 rounded-xl text-white">
                        <FaPen />
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 px-4 h-8 rounded-xl text-white"
                      onClick={() => handleDelete(employee.Id)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
