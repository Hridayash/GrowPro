import  { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from '../authcheck/getRole';

interface Goal {
  Id: string;
  Title: string;
  Description: string;
  Completed: boolean;
}

export default function EmployeeGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const id = getUserId();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`https://growpro.onrender.com/goal/employee-goals/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Assuming token is stored in local storage
          }
        });
        setGoals(response.data);
      } catch (error) {
        setError('Failed to fetch goals. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [id]);

  const markAsCompleted = async (goalId: string) => {
    try {
      await axios.put(`https://growpro.onrender.com/goal/mark-goal/${goalId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Assuming token is stored in local storage
        }
      });
      setGoals(goals.map(goal => (goal.Id === goalId ? { ...goal, Completed: true } : goal)));
    } catch (error) {
      setError('Failed to mark goal as completed. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Goals</h1>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {goals.map(goal => (
          <li key={goal.Id} className="p-4 border rounded-lg">
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
