import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GoalList() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:3002/goal/employee-goals', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // assuming token is stored in local storage
          },
        });
        setGoals(response.data);
      } catch (error) {
        console.error('Failed to fetch goals', error);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Employee Goals</h1>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Employee</th>
            <th className="py-2 px-4 border-b">Manager</th>
            <th className="py-2 px-4 border-b">Completed</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => (
            <tr key={goal.Id}>
              <td className="py-2 px-4 border-b">{goal.Title}</td>
              <td className="py-2 px-4 border-b">{goal.Description}</td>
              <td className="py-2 px-4 border-b">{goal.Employee.Name}</td>
              <td className="py-2 px-4 border-b">{goal.Manager.Name}</td>
              <td className="py-2 px-4 border-b">{goal.Completed ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
