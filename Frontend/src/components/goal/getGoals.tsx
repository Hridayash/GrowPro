import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from '../authcheck/getRole';

export default function EmployeeGoals() {
  const [goals, setGoals] = useState([]);
  const id = getUserId()

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(   `http://localhost:3002/goal/employee-goals/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // assuming token is stored in local storage
          }
        });
        setGoals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoals();
  }, []);

  const markAsCompleted = async (goalId) => {
    try {
      await axios.put(`http://localhost:3002/goal/mark-goal/${goalId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // assuming token is stored in local storage
        }
      });
      setGoals(goals.map(goal => (goal.Id === goalId ? { ...goal, Completed: true } : goal)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Goals</h1>
      <ul className="space-y-4">
        {goals.map(goal => (
          <li key={goal.Id} className="p-4 border rounded-lg">
            {console.log(goal.Id)}
            <h2 className="text-xl font-semibold">{goal.Title}</h2>
            <p className="text-gray-700">{goal.Description}</p>
            <p className="text-gray-600">Status: {goal.Completed ? 'Completed' : 'Pending'}</p>
            {!goal.Completed && (
              <button
                onClick={() => markAsCompleted(goal.Id)}

                className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Mark as Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
