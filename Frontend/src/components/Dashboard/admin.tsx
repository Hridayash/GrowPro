import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaUserEdit, FaUserTimes, FaChartPie } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await axios.get('/api/users');
//       setUsers(response.data);
//     };

//     fetchUsers();
//   }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* User Management */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUserPlus className="text-blue-500 mr-2" />User Management
          </h2>
          <button className="w-full p-2 bg-green-500 text-white rounded mb-2">Add User</button>
          <button className="w-full p-2 bg-yellow-500 text-white rounded mb-2">Edit User</button>
          <button className="w-full p-2 bg-red-500 text-white rounded">Remove User</button>
        </div>

        {/* Role Assignment */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUserEdit className="text-yellow-500 mr-2" />Role Assignment
          </h2>
          <ul>
            {users.map(user => (
              <li key={user.id} className="flex justify-between items-center mb-2">
                <span>{user.email}</span>
                <select className="p-2 border rounded" defaultValue={user.role}>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
              </li>
            ))}
          </ul>
        </div>

        {/* System Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaChartPie className="text-purple-500 mr-2" />System Statistics
          </h2>
          <div>
            <p>Total Users: {users.length}</p>
            <p>Admins: {users.filter(user => user.role === 'admin').length}</p>
            <p>Managers: {users.filter(user => user.role === 'manager').length}</p>
            <p>Employees: {users.filter(user => user.role === 'employee').length}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
