import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTasks, FaClipboardList, FaBell } from 'react-icons/fa';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Fetch tasks
//     const fetchTasks = async () => {
//       const response = await axios.get('/api/tasks');
//       setTasks(response.data);
//     };

//     // Fetch performance reviews
//     const fetchReviews = async () => {
//       const response = await axios.get('/api/reviews');
//       setReviews(response.data);
//     };

//     // Fetch notifications
//     const fetchNotifications = async () => {
//       const response = await axios.get('/api/notifications');
//       setNotifications(response.data);
//     };

//     fetchTasks();
//     fetchReviews();
//     fetchNotifications();
//   }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaTasks className="text-blue-500 mr-2" />Tasks
          </h2>
          <ul className="list-disc ml-4">
            {tasks.map(task => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>

        {/* Performance Reviews */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaClipboardList className="text-yellow-500 mr-2" />Performance Reviews
          </h2>
          <ul className="list-disc ml-4">
            {reviews.map(review => (
              <li key={review.id}>{review.title}</li>
            ))}
          </ul>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaBell className="text-red-500 mr-2" />Notifications
          </h2>
          <ul className="list-disc ml-4">
            {notifications.map(notification => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default EmployeeDashboard;
