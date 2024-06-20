import React from 'react';
import { FaUsers, FaTasks, FaChartLine, FaBell, FaProjectDiagram, FaStar } from 'react-icons/fa';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ManagerDashboard = () => {
  const performanceData = [
    { name: 'Jan', performance: 78 },
    { name: 'Feb', performance: 80 },
    { name: 'Mar', performance: 85 },
    { name: 'Apr', performance: 90 },
    { name: 'May', performance: 88 },
    { name: 'Jun', performance: 92 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Team Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaUsers className="text-3xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Team Overview</h2>
            <p>Number of team members: <span className="font-bold">10</span></p>
            <p>Projects in progress: <span className="font-bold">5</span></p>
          </div>
        </div>

        {/* Performance Tracking */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center"><FaChartLine className="text-blue-500 mr-2" />Performance Tracking</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <Line type="monotone" dataKey="performance" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Task Assignments */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaTasks className="text-3xl text-green-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Task Assignments</h2>
            <p>Pending tasks: <span className="font-bold">3</span></p>
            <p>Completed tasks: <span className="font-bold">20</span></p>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaBell className="text-3xl text-yellow-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            <ul className="list-disc ml-4">
              <li>Meeting at 3 PM</li>
              <li>Project deadline tomorrow</li>
            </ul>
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaProjectDiagram className="text-3xl text-purple-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Project Status</h2>
            <p>Current projects: <span className="font-bold">3</span></p>
            <p>Completed projects: <span className="font-bold">7</span></p>
          </div>
        </div>

        {/* Team Member Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaStar className="text-3xl text-orange-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Team Member Performance</h2>
            <p>Top performer: <span className="font-bold">John Doe</span></p>
            <p>Recent achievements: <span className="font-bold">5</span></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManagerDashboard;
