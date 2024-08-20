import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserId } from '../authcheck/getRole';

interface Employee {
  Id: string;
  Name: string;
}

interface Manager {
  Name: string;
}

interface Goal {
  Id: string;
  Title: string;
  Description: string;
  Employee: Employee;
  Manager: Manager;
  Completed: boolean;
}

export default function SetGoal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ManagerId = getUserId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalsResponse, employeesResponse] = await Promise.all([
          axios.get('https://growpro.onrender.com/goal/employee-goals', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }),
          axios.get('https://growpro.onrender.com/user/employeeList', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }),
        ]);

        setGoals(goalsResponse.data);
        setEmployees(employeesResponse.data);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://growpro.onrender.com/goal/set-goal',
        { Title: title, Description: description, EmployeeId: employeeId, ManagerId: ManagerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      alert('Goal set successfully');
      setTitle('');
      setDescription('');
      setEmployeeId('');
      setShowForm(false); // Hide the form after submitting
      
    } catch (error) {
      console.error(error);
      alert('Failed to set goal');
    }
  };

  if (loading) return <div className="text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Employee Goals</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          {showForm ? 'Cancel' : 'Add Goal'}
        </button>
        {showForm && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Set Goal</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Employee</label>
                <select
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.Id} value={employee.Id}>
                      {employee.Name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Set Goal
              </button>
            </form>
          </div>
        )}
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
    </>
  );
}
